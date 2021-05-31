import axios from './axios'
import { StiAutoComplete } from './index'
import Feedback from '../types/feedback'

interface CachedAutoCompleteOptions {
  elemento: HTMLInputElement,
  url: string,
  keys: string[],
  hiddenInput?: string,
  onChange?: (feedback: Feedback) => void,
  onOther?: (hiddenInput?: HTMLInputElement) => void
}

/**
 * cria um autocomplete padrão que busca opções por ajax e insere o id do
 * resultado no target
 */
export default function cachedAutoComplete({ elemento, url, keys, hiddenInput, onChange, onOther }: CachedAutoCompleteOptions) {
  if (!elemento) {
    console.warn('elemento não encontrado para autocomplete cacheado')
    return
  }
  return new StiAutoComplete({
    elemento,
    keys,
    src: async() => {
      const response = await axios.get(url)
      return response.data
    },
    hiddenInput,
    cache: true,
    onChange,
    onOther
  })
}
