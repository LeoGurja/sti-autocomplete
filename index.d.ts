
declare module '@tarekraafat/autocomplete.js' {
  interface Feedback {
    matches: any[],
    query: string,
    selection: {
      match: string,
      value: any
    }
  }

  interface Options {
    selector?: string | Function,
    data: {
      src: Array<any> | (() => Promise<any[]>) | (() => any[]),
      keys: string[],
      cache?: boolean
    },
    placeHolder?: string,
    threshold?: number,
    debounce?: number,
    searchEngine?: string | ((query, record) => 'strict' | 'loose'),
    resultsList?: {
      render?: boolean,
      element?: string,
      destination?: string | (() => HTMLInputElement),
      maxResults?: number,
      noResults?: (feedback: Feedback) => void
    },
    resultItem?: {
      highlight: boolean,
      element?: string,
      content?: (item: any, element: HTMLElement) => void,
    }
  }

  export default class TarekAutoComplete {
    constructor(options: Options)
  }
}
