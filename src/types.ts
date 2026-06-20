export interface GenerationInputs {
  name: string;
  brandName?: string;
  industry: string;
  targetAudience: string;
  platforms: ('Instagram' | 'LinkedIn' | 'Facebook')[];
  goal: 'Engagement' | 'Awareness' | 'Leads' | 'Education' | 'Personal Branding';
  description: string;
  keyMessage: string;
  tone: 'Professional' | 'Friendly' | 'Inspirational' | 'Educational' | 'Promotional';
}

export interface SocialMediaIdea {
  title: string;
  concept: string;
  visualSuggestion: string;
}

export interface PlatformContent {
  platform: 'Instagram' | 'LinkedIn' | 'Facebook';
  caption: string;
  hashtags: string[];
  outline: string[];
  engagementTip: string;
}

export interface GeneratedSocialContent {
  headline: string;
  overview: string;
  ideas: SocialMediaIdea[];
  platformSpecifics: PlatformContent[];
  brandingAdvisory: string;
}
