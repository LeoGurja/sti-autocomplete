import autoComplete from './index'
import getParents from './helpers/getParents'
import 'styles/multi-autocomplete.scss'

/**
 * transforma o input em um autocomplete com opções carregadas localmente ou por ajax
 * adiciona templates com os resultados em um output container
 * @param {{
 *   elemento: HTMLElement,
 *   src: Function,
 *   key: Array<string>,
 *   cache: boolean?,
 *   output: HTMLElement?,
 *   resultTemplate: Function?,
 *   outputTemplate: Function,
 *   wrapperTemplate: Function?,
 *   onAdd: Function?,
 *   onRemove: Function?
 * }} opcoes opções do autocomplete
 * @returns {AutoComplete} autocomplete
 */
export default function multiAutoComplete(opcoes) {
  const output = opcoes.output || encontraOutput(opcoes.elemento)

  opcoes = { ...opcoesPadrao(opcoes.elemento, output, opcoes), ...opcoes }

  habilitaBotoes(output, opcoes)
  return autoComplete(opcoes)
}

function encontraOutput(elemento) {
  let output = elemento.parentNode.querySelector('.output:not([data-used])')
  if (!output || output.dataset.used) output = criaOutput(elemento)
  output.dataset.used = true
  return output
}

function criaOutput(elemento) {
  const output = document.createElement('ul')
  output.classList.add('output')
  elemento.insertAdjacentElement('afterend', output)
  return output
}

function habilitaBotoes(output, opcoes) {
  output.addEventListener('click', event => {
    if (event.target.tagName === 'BUTTON') {
      const outputItem = getParents(event.target, '.output-item')[0]
      const destroy = outputItem.querySelector('[name*="_destroy"]')

      if (destroy) {
        destroy.value = 1
        outputItem.hidden = true
      } else {
        outputItem.remove()
      }
      opcoes.onRemove && opcoes.onRemove()
    }
  })
}

function opcoesPadrao(elemento, output, opcoes) {
  const wrapperTemplate = opcoes.wrapperTemplate || defaultWrapperTemplate
  return {
    wrapperTemplate,
    onChange: feedback => {
      output.insertAdjacentHTML('beforeend', wrapperTemplate(opcoes.outputTemplate(feedback)))
      opcoes.onAdd && opcoes.onAdd()
      elemento.value = ''
      elemento.focus()
    }
  }
}

function defaultWrapperTemplate(content) {
  return `
    <li class="output-item">
      <span>${content}</span>
      <button type="button" class="botao vermelho">Remover</button>
    </li>
  `
}
