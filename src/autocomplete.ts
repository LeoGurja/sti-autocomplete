import TarekAutoComplete from '@tarekraafat/autocomplete.js'

import montaOpcoes from './helpers/montaOpcoes'
import montaNameNovo from './helpers/montaNameNovo'
import generateRandomId from './helpers/generateRandomId'
import criaHiddenInput from './helpers/criaHiddenInput'

import ApiOptions from '../types/apiOptions'
import AutoCompleteEvent from "../types/autoCompleteEvent"
import Feedback from '../types/feedback'



export default class StiAutoComplete {
  opcoes: ApiOptions
  hiddenInput: HTMLInputElement | undefined
  autocomplete?: TarekAutoComplete
  elemento: HTMLInputElement

  constructor(opcoes: ApiOptions) {
    if (!opcoes.elemento) throw new Error('elemento não encontrado para autocomplete')

    this.opcoes = opcoes
    this.elemento = opcoes.elemento
    
    this.handleTextInput()
    this.handleHiddenInput()
    this.handleEventListener()
    this.autocomplete = new TarekAutoComplete(montaOpcoes(opcoes, this.hiddenInput))
  }

  handleTextInput() {
    this.elemento.autocomplete = 'off'
    this.elemento.classList.add('autoComplete_input')
  }


  handleHiddenInput() {
    if (!this.opcoes.hiddenInput) return

    const name = this.elemento.name
    this.elemento.name = montaNameNovo(this.elemento.name)
  
    if (!this.elemento.form) throw new Error('Não é possível usar o atributo "hidden" fora de um form')
  
    const hiddenInput: HTMLInputElement = (
      this.elemento.form.querySelector(`[type="hidden"][name="${name}"]`) ||
      criaHiddenInput(this.elemento, name)
    )
  
    hiddenInput.id = generateRandomId()
  
    this.hiddenInput = hiddenInput
  }

  handleEventListener() {
    const selectedTemplate = this.opcoes.selectedTemplate || (({ selection }: Feedback) => selection.value[this.opcoes.keys[0]])

    this.elemento.addEventListener('selection', (event: AutoCompleteEvent) => {
      const element: any = event.target
      console.log(event)
      if (!event.target) throw new Error('Não há um target para o evento "selection"')
      if (!event.detail) throw new Error('Não há o atributo detail no evento')
      
      element.value = selectedTemplate(event.detail)
      console.log(event.detail)
      if (this.opcoes.hiddenInput && this.hiddenInput) {
        this.hiddenInput.value = event.detail.selection.value[this.opcoes.hiddenInput]
      }
  
      this.opcoes.onChange && this.opcoes.onChange(event.detail)
    })
  }
  
}

