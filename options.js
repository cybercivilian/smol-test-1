```javascript
// Import shared dependencies
import { gpt4, storage } from './background.js';

// Define the options form
const optionsForm = document.getElementById('optionsForm');

// Load options from storage
function loadOptions() {
  storage.get('options', (data) => {
    if (data.options) {
      optionsForm.tone.value = data.options.tone;
      optionsForm.style.value = data.options.style;
      optionsForm.voice.value = data.options.voice;
      optionsForm.character.value = data.options.character;
      // ... load other 10 unique creative options
    }
  });
}

// Save options to storage
function saveOptions() {
  const options = {
    tone: optionsForm.tone.value,
    style: optionsForm.style.value,
    voice: optionsForm.voice.value,
    character: optionsForm.character.value,
    // ... save other 10 unique creative options
  };

  storage.set({ options }, () => {
    console.log('Options saved.');
  });
}

// Event listener for options form submission
optionsForm.addEventListener('submit', (e) => {
  e.preventDefault();
  saveOptions();
});

// Initialize options on load
document.addEventListener('DOMContentLoaded', loadOptions);
```