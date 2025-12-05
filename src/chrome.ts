// ============================================================================
// CHROME — site-supplied presentation data
// ============================================================================

export namespace Chrome {
  export interface NavItem {
    label: string;
    href: string;
    children?: NavItem[];
    active?: boolean;
  }

  export interface AuthorInfo {
    id: string;
    name: string;
    url?: string;
    avatarUrl?: string;
    bio?: string;
  }

  export interface FooterLink {
    label: string;
    href: string;
  }

  export interface FooterData {
    text?: string;
    links?: FooterLink[];
  }

  // Optional future chrome
  export interface SiteIdentity {
    title: string;
    subtitle?: string;
    logoUrl?: string;
  }

  export interface SocialLinks {
    twitter?: string;
    github?: string;
    mastodon?: string;
    youtube?: string;
  }
}
