import StiAutoComplete from './autocomplete'
import getParents from './helpers/getParents'
import Feedback from '../types/feedback'

interface MultiAutoCompleteOptions {
  elemento: HTMLInputElement,
  src: () => Promise<any> | any,
  keys: string[],
  cache?: boolean,
  output?: HTMLElement,
  resultTemplate?: (feedback: Feedback) => string,
  outputTemplate: (feedback: Feedback) => string,
  wrapperTemplate?: (content: string) => string,
  onAdd?: () => void,
  onRemove?: () => void
}

/**
 * transforma o input em um autocomplete com opções carregadas localmente ou por ajax
 * adiciona templates com os resultados em um output container
 */
export default function multiAutoComplete(opcoes: MultiAutoCompleteOptions) {
  const output = opcoes.output || encontraOutput(opcoes.elemento)

  opcoes = { ...opcoesPadrao(opcoes.elemento, output, opcoes), ...opcoes }

  habilitaBotoes(output, opcoes)
  return new StiAutoComplete(opcoes)
}

function encontraOutput(elemento: HTMLInputElement) {
  if (!elemento.parentElement) throw new Error('Elemento não possui pai')
  let output: HTMLElement | null = elemento.parentElement.querySelector('.output:not([data-used])')
  if (!output || output.dataset.used) output = criaOutput(elemento)
  output.dataset.used = 'true'
  return output
}

function criaOutput(elemento: HTMLInputElement) {
  const output = document.createElement('ul')
  output.classList.add('output')
  elemento.insertAdjacentElement('afterend', output)
  return output
}

function habilitaBotoes(output:HTMLElement, opcoes: MultiAutoCompleteOptions) {
  output.addEventListener('click', event => {
    const target: any = event.target
    if (!target) throw new Error('Evento de clique não possui target')

    if (target.tagName === 'BUTTON') {
      const outputItem = getParents(target, '.output-item')[0]
      const destroy: HTMLInputElement | null = outputItem.querySelector('[name*="_destroy"]')

      if (destroy) {
        destroy.value = '1'
        outputItem.hidden = true
      } else {
        outputItem.remove()
      }
      opcoes.onRemove && opcoes.onRemove()
    }
  })
}

function opcoesPadrao(elemento: HTMLInputElement, output: HTMLElement, opcoes: MultiAutoCompleteOptions) {
  const wrapperTemplate = opcoes.wrapperTemplate || defaultWrapperTemplate
  return {
    wrapperTemplate,
    onChange: (feedback: Feedback) => {
      output.insertAdjacentHTML('beforeend', wrapperTemplate(opcoes.outputTemplate(feedback)))
      opcoes.onAdd && opcoes.onAdd()
      elemento.value = ''
      elemento.focus()
    }
  }
}

function defaultWrapperTemplate(content: string) {
  return `
    <li class="output-item">
      <span>${content}</span>
      <button type="button" class="botao vermelho">Remover</button>
    </li>
  `
}
