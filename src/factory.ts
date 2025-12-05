// ============================================================================
// ASTRO-TURF THEME FACTORY (buildTheme)
// ============================================================================

import type { ThemeProviders, ThemeContract } from "./types";

export interface LayoutComponents {
  Page: any;
  PageIndex: any;

  DocumentationPage?: any;
  DocumentationIndex?: any;
  DocumentationSidebar?: any;

  BlogPost?: any;
  BlogIndex?: any;
  TagsIndex?: any;
  CategoriesIndex?: any;

  LandingPage?: any;
  FeaturePage?: any;
  AboutPage?: any;
  ContactPage?: any;
}

export function buildTheme(
  layouts: LayoutComponents,
  defaultProviders: ThemeProviders,
  overrides?: Partial<ThemeProviders>
): ThemeContract {
  const providers: ThemeProviders = { ...defaultProviders, ...overrides };

  const wrap = (component: any) =>
    component ? ((props: any) => component({ ...props, providers })) : undefined;

  return {
    // Core
    Page: wrap(layouts.Page),
    PageIndex: wrap(layouts.PageIndex),

    // Documentation
    DocumentationPage: wrap(layouts.DocumentationPage),
    DocumentationIndex: wrap(layouts.DocumentationIndex),
    DocumentationSidebar: wrap(layouts.DocumentationSidebar),

    // Blog
    BlogPost: wrap(layouts.BlogPost),
    BlogIndex: wrap(layouts.BlogIndex),
    TagsIndex: wrap(layouts.TagsIndex),
    CategoriesIndex: wrap(layouts.CategoriesIndex),

    // Marketing
    LandingPage: wrap(layouts.LandingPage),
    FeaturePage: wrap(layouts.FeaturePage),
    AboutPage: wrap(layouts.AboutPage),
    ContactPage: wrap(layouts.ContactPage),
  };
}
