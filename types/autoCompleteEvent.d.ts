import Feedback from './feedback'

export default interface AutoCompleteEvent extends Event {
  details?: Feedback
}