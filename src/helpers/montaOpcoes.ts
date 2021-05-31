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
    threshold: opcoes.threshold,
    placeHolder: opcoes.placeHolder,
    resultsList: {
      render: true,
      maxResults: 10,
      destination: () => opcoes.elemento,
      noResults: noResults(opcoes, hiddenInput),
    },
    resultItem: resultItem(opcoes)
  }
}

function noResults(opcoes: ApiOptions, hiddenInput?: HTMLInputElement) {
  const randomId = generateRandomId()
  const onOther = opcoes.onOther

  return ({ query }: Feedback) => {
    const noResult = `
      <ul class="autoComplete_list" role="listbox" aria-label="Search" tabindex="-1">
        ${opcoes.onOther ? `
          <li class="autoComplete_result" role="option" id="${randomId}">
            ${query.toUpperCase()}
          </li>
          ` : `
          <li class="no_results" id="${randomId}">
            Nenhum resultado encontrado para ${query}
          </li>
        `}
      </ul>
    `

    opcoes.elemento.insertAdjacentHTML('afterend', noResult)

    if (!onOther) return

    const noResultElement = document.getElementById(randomId)
    if (!noResultElement) throw new Error('Não foi possível encontrar "no_results"')
    noResultElement.onclick = () => {
      opcoes.elemento.value = query.toUpperCase()
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
