// ---------------------------------------------------------------------------
// Chrome data types
// ---------------------------------------------------------------------------

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
  active?: boolean;
};

export type AuthorInfo = {
  id: string;
  name: string;
  url?: string;
  avatarUrl?: string;
  bio?: string;
};

export type FooterLink = {
  label: string;
  href: string;
};

export type FooterData = {
  text?: string;
  links?: FooterLink[];
};

// ---------------------------------------------------------------------------
// Search / related types
// ---------------------------------------------------------------------------

export interface SearchIndexItem {
  id: string;
  title: string;
  url: string;
  excerpt?: string;
  tags?: string[];
}

export type SearchIndex = SearchIndexItem[];

export interface RelatedItem {
  id: string;
  title: string;
  href: string;
  excerpt?: string;
}

// ---------------------------------------------------------------------------
// Theme providers (engine → theme DI)
// ---------------------------------------------------------------------------

export interface ThemeProviders {
  getNavigation: () => NavItem[];
  getAuthors: () => AuthorInfo[];
  getFooter: () => FooterData;

  getSearchIndex?: () => SearchIndex;
  getRelatedForEntry?: (entryId: string) => RelatedItem[];
}

// ---------------------------------------------------------------------------
// Layout roles
// ---------------------------------------------------------------------------

export type LayoutRole = "doc" | "index";

export interface LayoutProps<Entry = any> {
  entry: Entry;
  providers: ThemeProviders;
}

export type LayoutComponent<Entry = any> =
  (props: LayoutProps<Entry>) => any;

export interface LayoutComponents {
  doc: LayoutComponent;
  index: LayoutComponent;
}

// ---------------------------------------------------------------------------
// Theme contract + capabilities
// ---------------------------------------------------------------------------

export interface CoreThemeContract {
  layoutRoles: {
    doc: LayoutComponent;
    index: LayoutComponent;
  };
}

export interface SearchCapability {
  search: {
    SearchBox: any;
    SearchResults: any;
  };
}

export interface RelatedCapability {
  related: {
    RelatedList: any;
  };
}

export type ThemeContract =
  CoreThemeContract &
  Partial<SearchCapability & RelatedCapability>;

// ---------------------------------------------------------------------------
// Theme builder (DI wrapper)
// ---------------------------------------------------------------------------

export function buildTheme(
  layouts: LayoutComponents,
  defaultProviders: ThemeProviders,
  overrides?: Partial<ThemeProviders>
): ThemeContract {
  const providers: ThemeProviders = { ...defaultProviders, ...overrides };

  const wrap = (Comp: LayoutComponent): LayoutComponent =>
    (props) => Comp({ ...props, providers });

  return {
    layoutRoles: {
      doc: wrap(layouts.doc),
      index: wrap(layouts.index)
    }
  };
}

// ---------------------------------------------------------------------------
// Versioning
// ---------------------------------------------------------------------------

export const ASTRO_TURF_CONTRACT_VERSION = "0.1.0" as const;
export type AstroTurfContractVersion = typeof ASTRO_TURF_CONTRACT_VERSION;
