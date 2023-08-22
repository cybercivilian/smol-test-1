```javascript
import { gpt4, CommentSchema } from './AICommentGenerator.js';
import { storage } from './storageManager.js';

document.addEventListener('DOMContentLoaded', initExtension);

function initExtension() {
  document.getElementById('submitComment').addEventListener('click', saveComment);
  loadComments();
}

function saveComment() {
  const commentText = document.getElementById('commentBox').value;
  const creativeOptions = Array.from(document.getElementById('optionsForm').elements).reduce((options, element) => {
    options[element.name] = element.value;
    return options;
  }, {});

  const comment = new CommentSchema(window.location.href, commentText, creativeOptions);
  storage.set({ [window.location.href]: comment }, () => {
    console.log('Comment saved');
  });

  document.getElementById('commentBox').value = '';
}

function loadComments() {
  storage.get(window.location.href, (items) => {
    const comments = items[window.location.href];
    if (comments) {
      comments.forEach(renderComment);
    }
  });
}

function renderComment(comment) {
  const commentElement = document.createElement('li');
  commentElement.textContent = comment.text;
  document.getElementById('commentList').appendChild(commentElement);
}

document.getElementById('generateComment').addEventListener('click', () => {
  const creativeOptions = Array.from(document.getElementById('optionsForm').elements).reduce((options, element) => {
    options[element.name] = element.value;
    return options;
  }, {});

  gpt4.generateComment(creativeOptions).then((generatedComment) => {
    document.getElementById('commentBox').value = generatedComment;
  });
});
```