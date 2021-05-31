export default interface Feedback {
  matches: any[],
  query: string,
  selection: {
    match: string,
    value: any
  }
}