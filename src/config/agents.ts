export const EXTERNAL_AGENT_URLS = {
  'blog-generator': 'https://api.agenthub.ai/blog-generator',
  'email-resume-writer': 'https://api.agenthub.ai/email-resume-writer',
  'summarizer': 'https://api.agenthub.ai/summarizer',
  'code-generator': 'https://api.agenthub.ai/code-generator',
  'debugger': 'https://api.agenthub.ai/debugger',
  'api-workflow': 'https://api.agenthub.ai/api-workflow',
  'meeting-notes': 'https://api.agenthub.ai/meeting-notes',
  'data-analysis': 'https://api.agenthub.ai/data-analysis',
  'customer-support': 'https://api.agenthub.ai/customer-support',
  'image-generator': 'https://api.agenthub.ai/image-generator',
  'video-script': 'https://api.agenthub.ai/video-script',
  'social-media': 'https://api.agenthub.ai/social-media',
  'ai-tutor': 'https://api.agenthub.ai/ai-tutor',
  'language-translator': 'https://api.agenthub.ai/language-translator',
  'life-coach': 'https://api.agenthub.ai/life-coach'
} as const;

export type AgentId = keyof typeof EXTERNAL_AGENT_URLS;