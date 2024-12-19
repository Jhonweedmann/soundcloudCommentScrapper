# Get all the comments of a song on soundcloud in JSON format

*Simple way to get all the comments, with the user's name, of a song (or multiple songs) on Soundcloud in JSON format with just the URL.*
### Requirements:
- NodeJS , Latest version
- Puppeteer (npm), " 23.11.0 "

## How to use
**Step 0:**
- Create a basic NodeJS project, if installed just use:
```js
npm init -y
```
Then you can grab **soundcloudCommentScrapper.js** and put it inside the project.
**Step 1:**
- You search for a song on soundcloud and copy the URL and paste it in “links” inside **soundcloudCommentScrapper.js**.
```js

  const links = [
    "https://soundcloud.com/user/song-name",    <= HERE YOU PUT THE URL
    "https://soundcloud.com/user/song-name",    <= EXAMPLE, IF NOT USED DELETE
    "https://soundcloud.com/user/song-name",    <= EXAMPLE, IF NOT USED DELETE
  ];
    (...)
```

**Step 2:**
- Run in the terminal 
```
node soundcloudCommentScrapper.js
```

**Step 3:**
- Wait for it to finish, the result will be the JSON files with the name “comment-[name of song].JSON”

### Possible errors
- It is possible that not all comments are saved in songs with more than 80 comments, if so just modify the value of the **for**:
```js
(...)
        for (let i = 0; i < 12; i++) {
          window.scrollTo(0, scrollHeight);
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second between scrolls
          scrollHeight = document.documentElement.scrollHeight; // Update the scroll height
        }
        //modify the value of "for" from 12 to a higher value.
        //But remember that for each iteration the time will increase linearly.
```
- In the same way, if you feel it takes too long to read the comments of song with less than 50 comments, you can reduce the value.

### Why use this and not the official API?
Don't do it. If you have the opportunity to use the official soundcloud API don't waste it. I created this project because I was unable to understand how to get access to the soundcloud API, besides all the packages (npm) I found were extensions of the official API, which I didn't know how to use either. It's just an amateur project that someone may find a use for, don't take it too seriously.

