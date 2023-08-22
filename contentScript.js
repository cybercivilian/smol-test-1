```javascript
import { gpt4, CommentSchema } from './AICommentGenerator.js';
import { saveComment, loadComments, renderComment, initExtension } from './background.js';

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'GENERATE_COMMENT') {
    const commentText = gpt4.generateComment(request.options);
    const comment = new CommentSchema(window.location.href, commentText, request.options);
    saveComment(comment);
    renderComment(comment);
    sendResponse({ status: 'Comment generated and saved.' });
  } else if (request.message === 'LOAD_COMMENTS') {
    const comments = loadComments(window.location.href);
    comments.forEach(comment => renderComment(comment));
    sendResponse({ status: 'Comments loaded.' });
  }
});

// Initialize the extension when a tweet page is loaded
window.addEventListener('load', () => {
  initExtension();
});
```