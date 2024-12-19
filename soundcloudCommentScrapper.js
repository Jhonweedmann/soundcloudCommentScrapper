import puppeteer from "puppeteer";
import fs from "fs";

(async () => {
  // Links to process
  const links = ["https://soundcloud.com/its_anbv/power-up"];

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  for (const link of links) {
    console.log(`Processing: ${link}`);
    try {
      // Navigate to the song page on SoundCloud
      await page.goto(link, {
        waitUntil: "networkidle2",
      });

      // Wait for comments to load in the DOM
      await page.waitForSelector(".commentItem");

      // Scroll through the entire page to load the comments
      await page.evaluate(async () => {
        let scrollHeight = document.documentElement.scrollHeight;

        for (let i = 0; i < 12; i++) {
          window.scrollTo(0, scrollHeight);
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second between scrolls
          scrollHeight = document.documentElement.scrollHeight; // Update the scroll height
        }
      });

      // Extract authors and comments, excluding replies
      const comments = await page.evaluate(() => {
        // Find all comment elements that are NOT replies
        const commentElements = Array.from(
          document.querySelectorAll(".commentItem")
        ).filter(
          (commentElement) => !commentElement.classList.contains("m-isReply")
        );

        // Extract author and comment from each element
        return commentElements.map((commentElement) => {
          const authorElement = commentElement.querySelector(
            ".commentItem__usernameLink"
          );
          const commentTextElement = commentElement.querySelector(
            ".commentItem__body p"
          );

          // Extract the author's and comment's text
          const author = authorElement
            ? authorElement.textContent.trim()
            : null;
          const commentText = commentTextElement
            ? commentTextElement.textContent.trim()
            : null;

          return { author, commentText };
        });
      });

      // Save the comments in a file with the name based on the URL
      const fileName = `comments-${link.split("/").pop()}.json`;
      fs.writeFileSync(fileName, JSON.stringify(comments, null, 2));
      console.log(`Comments saved in: ${fileName}`);
    } catch (error) {
      console.error(`Error processing ${link}:`, error.message);
    }
  }

  // Close the browser
  await browser.close();
  console.log("Process completed.");
})();
