// ============================================================================
// SHARED TYPES — used by both index.ts and factory.ts
// ============================================================================

import { Chrome } from "./chrome";
import { Domain } from "./domain";
import { Capability } from "./capability";

// -----------------------------
// Providers
// -----------------------------
export interface ThemeProviders {
  getNavigation: () => Chrome.NavItem[];
  getAuthors: () => Chrome.AuthorInfo[];
  getFooter: () => Chrome.FooterData;

  getSearchIndex?: () => SearchIndex;
  getRelatedForEntry?: (entryId: string) => RelatedItem[];
}

export type SearchIndex = any;
export type RelatedItem = any;

// -----------------------------
// ThemeContract
// -----------------------------
export type ThemeContract =
  Domain.Core &
  Partial<
    Domain.Documentation &
    Domain.Blog &
    Domain.Marketing &
    Capability.Search &
    Capability.Related &
    Capability.Outline &
    Capability.Taxonomy
  >;
