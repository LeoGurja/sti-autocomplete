import ApiOptions from "../../types/apiOptions"
import AutoCompleteEvent from "../../types/autoCompleteEvent"
import Feedback from '../../types/feedback'

export default function criaEventListener(opcoes: ApiOptions, hiddenInput?: HTMLInputElement) {
  opcoes.elemento.addEventListener('selection', onSelection(opcoes, hiddenInput))
}

function onSelection(opcoes: ApiOptions, hiddenInput?: HTMLInputElement): EventListener {
  const selectedTemplate = opcoes.selectedTemplate || (({ selection }: Feedback) => selection.value[opcoes.keys[0]])

  return (event: AutoCompleteEvent) => {
    const element: any = event.target
    if (!event.target) throw new Error('Não há um target para o evento "selection"')
    if (!event.details) throw new Error('Não há o atributo details no evento')
    
    element.value = selectedTemplate(event.details)
    if (opcoes.hiddenInput && hiddenInput) {
      hiddenInput.value = event.details.selection.value[opcoes.hiddenInput]
    }

    opcoes.onChange && opcoes.onChange(event.details)
  }
}
