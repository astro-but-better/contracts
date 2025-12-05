// ============================================================================
// CAPABILITY — functional site behaviors
// ============================================================================

export namespace Capability {
  export interface Search {
    search: {
      SearchBox: any;
      SearchResults: any;
    };
  }

  export interface Related {
    related: {
      RelatedList: any;
      RelatedGraph?: any;
    };
  }

  export interface Outline {
    outline: {
      TableOfContents: any;
    };
  }

  export interface Taxonomy {
    taxonomy: {
      TagCloud?: any;
      CategoryList?: any;
    };
  }
}
