
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
    threshold?: number,
    debounce?: number,
    resultsList?: {
      render?: boolean,
      destination?: string | (() => HTMLInputElement),
      maxResults?: number,
      noResults?: boolean,
      element?: (list: HTMLUListElement, feedback: Feedback) => void
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
