import Feedback from './feedback'

export default interface ApiOptions {
  src: () => Promise<any> | any[],
  keys: string[],
  elemento: HTMLInputElement,
  hiddenInput?: string,
  resultTemplate?: (result: any) => string,
  selectedTemplate?: (feedback: Feedback) => string
  placeHolder?: string,
  cache?: boolean,
  threshold?: number,
  onChange?: (feedback: Feedback) => void,
  onOther?: (hiddenInput?: HTMLInputElement) => void,
}