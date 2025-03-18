import { openai } from '@ai-sdk/openai';
import { fireworks } from '@ai-sdk/fireworks';
import { customProvider, extractReasoningMiddleware, wrapLanguageModel } from 'ai';

export const myProvider = customProvider({
	languageModels: {
		'chat-model-small': openai('gpt-4o-mini'),
		'chat-model-large': openai('gpt-4o'),
		'chat-model-reasoning': wrapLanguageModel({
			model: fireworks('accounts/fireworks/models/deepseek-r1'),
			middleware: extractReasoningMiddleware({ tagName: 'think' })
		}),
		'title-model': openai('gpt-4-turbo'),
		'artifact-model': openai('gpt-4o-mini')
	},
	imageModels: {
		'small-model': openai.image('dall-e-2'),
		'large-model': openai.image('dall-e-3')
	}
});
