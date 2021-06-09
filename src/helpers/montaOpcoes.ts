import adicionaLoad from './adicionaLoad'
import generateRandomId from './generateRandomId'
import ApiOptions from '../../types/apiOptions'
import Feedback from '../../types/feedback'

export default function montaOpcoes(opcoes: ApiOptions, hiddenInput?: HTMLInputElement) {
  return {
    data: {
      src: adicionaLoad(opcoes.elemento, opcoes.src),
      keys: opcoes.keys,
      cache: opcoes.cache
    },
    selector: () => opcoes.elemento,
    debounce: 700,
    threshold: opcoes.threshold || 1,
    resultsList: {
      render: true,
      maxResults: 10,
      destination: () => opcoes.elemento,
      noResults: true,
      element: noResults(opcoes, hiddenInput),
    },
    resultItem: resultItem(opcoes)
  }
}

function noResults(opcoes: ApiOptions, hiddenInput?: HTMLInputElement) {
  const randomId = generateRandomId()
  const onOther = opcoes.onOther

  return (list: HTMLUListElement, feedback: any) => {
    if (feedback.matches.length) return

    list.insertAdjacentHTML('afterbegin', 
      onOther ? `
        <li class="autoComplete_result" role="option" id="${randomId}">
          ${feedback.query.toUpperCase()}
        </li>
      ` : `
      <li class="autoComplete_no_results">
        Nenhum resultado encontrado para ${feedback.query}
      </li>
    `)

    if (!onOther) return

    const noResultElement = document.getElementById(randomId)
    if (!noResultElement) throw new Error('Não foi possível encontrar "no_results"')
    noResultElement.onclick = () => {
      opcoes.elemento.value = feedback.query.toUpperCase()
      onOther(hiddenInput)
    }
  }
}

function resultItem(opcoes: ApiOptions) {
  return {
    highlight: true,
    content: content(opcoes.resultTemplate)
  }
}

function content(resultTemplate: ((result: any) => string) | undefined): ((data: any, source: any) => void) | undefined {
  if (!resultTemplate) return
  
  return (data: any, source: any) => {
    source.innerHTML = resultTemplate(data)
  }
}
