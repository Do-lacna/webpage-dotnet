export interface InfoSectionContent {
  heading: string;
  body?: string;
  bullets?: string[];
}

export interface RelatedLink {
  to: string;
  labelKey: string;
  descriptionKey?: string;
}
