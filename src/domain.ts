// ============================================================================
// DOMAIN — document semantics (layout roles)
// ============================================================================

export namespace Domain {
  // ---- Core Domain (required by every theme) ----
  export interface Core {
    Page: any;
    PageIndex: any;
  }

  // ---- Documentation Domain ----
  export interface Documentation {
    DocumentationPage: any;
    DocumentationIndex: any;
    DocumentationSidebar?: any;
  }

  // ---- Blog Domain ----
  export interface Blog {
    BlogPost: any;
    BlogIndex: any;
    TagsIndex?: any;
    CategoriesIndex?: any;
  }

  // ---- Marketing Domain ----
  export interface Marketing {
    LandingPage: any;
    FeaturePage?: any;
    AboutPage?: any;
    ContactPage?: any;
  }
}
