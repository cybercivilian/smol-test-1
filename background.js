```javascript
import { gpt4, storage } from './AICommentGenerator.js';
import { CommentSchema } from './storageManager.js';

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setPopup({ popup: 'popup.html' });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'SAVE_COMMENT') {
    saveComment(request.data);
  } else if (request.type === 'LOAD_COMMENTS') {
    loadComments(request.data);
  } else if (request.type === 'GENERATE_COMMENT') {
    generateComment(request.data);
  }
});

function saveComment(data) {
  const comment = new CommentSchema(data);
  storage.set({ [data.url]: comment }, () => {
    console.log('Comment saved');
  });
}

function loadComments(url) {
  storage.get(url, (items) => {
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError);
    } else {
      chrome.runtime.sendMessage({ type: 'COMMENTS_LOADED', data: items[url] });
    }
  });
}

function generateComment(options) {
  gpt4.generateComment(options, (comment) => {
    chrome.runtime.sendMessage({ type: 'COMMENT_GENERATED', data: comment });
  });
}
```