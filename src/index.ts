import TarekAutoComplete from '@tarekraafat/autocomplete.js'
import montaOpcoes from './helpers/montaOpcoes'
import criaHiddenInput from './helpers/criaHiddenInput'
import ApiOptions from '../types/apiOptions'

export class StiAutoComplete {
  opcoes: ApiOptions
  hiddenInput: HTMLInputElement | undefined
  autocomplete?: TarekAutoComplete

  constructor(opcoes: ApiOptions) {
    this.opcoes = opcoes
    if (opcoes.hiddenInput) this.hiddenInput = criaHiddenInput(opcoes.elemento)

    if (!opcoes.elemento) {
      console.warn('elemento não encontrado para autocomplete')
      return
    }

    opcoes.elemento.autocomplete = 'off'
    this.autocomplete = new TarekAutoComplete(montaOpcoes(opcoes, this.hiddenInput))
  }
}

/**
  * transforma o input em um autocomplete com opções carregadas localmente ou por ajax
  */
export default function autoComplete(opcoes: ApiOptions) {
  return new StiAutoComplete(opcoes)
}
