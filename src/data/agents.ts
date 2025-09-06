import { 
  FileText, 
  Mail, 
  BookOpen, 
  Code, 
  Bug, 
  Workflow,
  Calendar,
  BarChart3,
  Headphones,
  Image,
  Video,
  Share2,
  GraduationCap,
  Languages,
  Target
} from "lucide-react";

export interface Agent {
  id: string;
  title: string;
  description: string;
  icon: any;
  category: string;
  features: string[];
  isPopular?: boolean;
}

export const agentCategories = [
  {
    id: "content-writing",
    title: "Content & Writing",
    description: "AI agents for creating, editing, and optimizing written content",
    icon: FileText,
  },
  {
    id: "developer-technical", 
    title: "Developer & Technical",
    description: "Code generation, debugging, and technical automation tools",
    icon: Code,
  },
  {
    id: "productivity-business",
    title: "Productivity & Business", 
    description: "Streamline workflows and automate business processes",
    icon: BarChart3,
  },
  {
    id: "creative-design",
    title: "Creative & Design",
    description: "Visual content creation and creative assistance",
    icon: Image,
  },
  {
    id: "learning-personal",
    title: "Learning & Personal Help",
    description: "Educational support and personal productivity assistance", 
    icon: GraduationCap,
  },
];

export const agents: Agent[] = [
  // Content & Writing
  {
    id: "blog-generator",
    title: "Blog/Article Generator",
    description: "Research topics and write comprehensive blog posts and articles with proper structure and SEO optimization.",
    icon: FileText,
    category: "Content & Writing",
    features: ["Research", "SEO Optimized", "Multiple Formats"],
    isPopular: true,
  },
  {
    id: "email-resume-writer",
    title: "Email/Resume Writer",
    description: "Create professional emails, resumes, cover letters, and business documents tailored to your needs.",
    icon: Mail,
    category: "Content & Writing", 
    features: ["Professional", "Templates", "ATS Friendly"],
  },
  {
    id: "summarizer",
    title: "Summarizer Agent",
    description: "Condense PDFs, articles, lectures, and long documents into concise, actionable summaries.",
    icon: BookOpen,
    category: "Content & Writing",
    features: ["PDF Support", "Key Points", "Multiple Formats"],
  },

  // Developer & Technical
  {
    id: "code-generator",
    title: "Code Generator", 
    description: "Generate clean, efficient code from plain language descriptions across multiple programming languages.",
    icon: Code,
    category: "Developer & Technical",
    features: ["Multi-Language", "Clean Code", "Documentation"],
    isPopular: true,
  },
  {
    id: "debugger",
    title: "Debugger Agent",
    description: "Analyze error messages, explain issues, and provide step-by-step fixes for your code problems.",
    icon: Bug,
    category: "Developer & Technical",
    features: ["Error Analysis", "Fix Suggestions", "Best Practices"],
  },
  {
    id: "api-workflow",
    title: "API Workflow Agent",
    description: "Connect APIs, automate backend tasks, and create seamless integrations between different services.",
    icon: Workflow,
    category: "Developer & Technical", 
    features: ["API Integration", "Automation", "No-Code"],
  },

  // Productivity & Business
  {
    id: "meeting-notes",
    title: "Meeting Notes Agent",
    description: "Upload audio recordings to get comprehensive summaries, action items, and follow-up tasks.",
    icon: Calendar,
    category: "Productivity & Business",
    features: ["Audio Upload", "Action Items", "Follow-ups"],
  },
  {
    id: "data-analysis",
    title: "Data Analysis Agent",
    description: "Upload CSV/Excel files to get insights, charts, visualizations, and data-driven recommendations.",
    icon: BarChart3,
    category: "Productivity & Business",
    features: ["Excel/CSV", "Charts", "Insights"],
    isPopular: true,
  },
  {
    id: "customer-support",
    title: "Customer Support Agent",
    description: "Create intelligent chatbots trained on your company data to handle customer inquiries effectively.",
    icon: Headphones,
    category: "Productivity & Business",
    features: ["Custom Training", "24/7 Support", "Smart Responses"],
  },

  // Creative & Design
  {
    id: "image-generator",
    title: "Image Generator",
    description: "Create stunning logos, posters, UI mockups, and visual content using advanced AI image generation.",
    icon: Image,
    category: "Creative & Design",
    features: ["High Resolution", "Multiple Styles", "Commercial Use"],
    isPopular: true,
  },
  {
    id: "video-script",
    title: "Video Script Agent",
    description: "Generate engaging scripts for YouTube, TikTok, presentations, and marketing videos with hooks and CTAs.",
    icon: Video,
    category: "Creative & Design",
    features: ["Platform Optimized", "Engaging Hooks", "CTA Integration"],
  },
  {
    id: "social-media",
    title: "Social Media Content Agent", 
    description: "Create compelling captions, hashtags, post ideas, and content calendars for all social platforms.",
    icon: Share2,
    category: "Creative & Design",
    features: ["Multi-Platform", "Hashtags", "Content Calendar"],
  },

  // Learning & Personal Help
  {
    id: "ai-tutor",
    title: "AI Tutor Agent",
    description: "Get step-by-step explanations of complex concepts, homework help, and personalized learning paths.",
    icon: GraduationCap,
    category: "Learning & Personal Help", 
    features: ["Step-by-Step", "Personalized", "Multiple Subjects"],
  },
  {
    id: "language-translator",
    title: "Language Translator + Explainer",
    description: "Translate text between languages with cultural context and detailed explanations of grammar rules.",
    icon: Languages,
    category: "Learning & Personal Help",
    features: ["100+ Languages", "Context Aware", "Grammar Rules"],
  },
  {
    id: "life-coach",
    title: "Life/Task Coach Agent",
    description: "Get personalized productivity suggestions, task prioritization, and life optimization recommendations.",
    icon: Target,
    category: "Learning & Personal Help",
    features: ["Goal Setting", "Habit Tracking", "Productivity Tips"],
  },
];