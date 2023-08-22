```javascript
import { gpt4 } from './background.js';

export class AICommentGenerator {
  constructor() {
    this.options = {
      tone: 'neutral',
      writingStyle: 'formal',
      voice: 'neutral',
      characterEmulation: 'none',
      creativeOptions: []
    };
  }

  updateOptions(newOptions) {
    this.options = { ...this.options, ...newOptions };
  }

  async generateComment(prompt) {
    const creativeOptions = this.options.creativeOptions.join(', ');
    const fullPrompt = `${prompt}\nTone: ${this.options.tone}\nWriting Style: ${this.options.writingStyle}\nVoice: ${this.options.voice}\nCharacter Emulation: ${this.options.characterEmulation}\nCreative Options: ${creativeOptions}`;

    const response = await gpt4.generate({
      prompt: fullPrompt,
      maxTokens: 100,
      temperature: 0.7,
    });

    return response.choices[0].text.trim();
  }
}
```