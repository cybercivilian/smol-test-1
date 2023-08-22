```javascript
// storageManager.js

const storage = chrome.storage.local;

// Comment Schema
const CommentSchema = {
  tweetUrl: '',
  commentText: '',
  creativeOptions: {}
};

// Save comment to Chrome Storage
function saveComment(comment) {
  const { tweetUrl } = comment;
  storage.get(tweetUrl, (result) => {
    let comments = result[tweetUrl] || [];
    comments.push(comment);
    storage.set({ [tweetUrl]: comments }, () => {
      console.log('Comment saved.');
    });
  });
}

// Load comments for a specific tweet from Chrome Storage
function loadComments(tweetUrl) {
  return new Promise((resolve, reject) => {
    storage.get(tweetUrl, (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result[tweetUrl] || []);
      }
    });
  });
}

// Export functions
export { saveComment, loadComments, CommentSchema };
```