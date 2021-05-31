import generateRandomId from './generateRandomId'

/**
  * cria um input hidden para assumir o name do autocomplete,
  * e o coloca na DOM depois da lista de resultados
  * retorna um hidden input caso já haja um com o mesmo name.
  */
export default function criaHiddenInput(elemento: HTMLInputElement) {
  const name = elemento.name
  elemento.name = montaNameNovo(elemento.name)

  if (!elemento.form) throw new Error('Não é possível usar o atributo "hidden" fora de um form')

  const hiddenInput: HTMLInputElement = (
    elemento.form.querySelector(`[type="hidden"][name="${name}"]`) ||
    criaNovoHiddenInput(elemento, name)
  )

  hiddenInput.id = generateRandomId()

  return hiddenInput
}

function criaNovoHiddenInput(elemento: HTMLInputElement, name: string) {
  const novo: HTMLInputElement = Object.assign(document.createElement('input'), {
    type: 'hidden',
    value: elemento.value,
    name
  })

  elemento.parentElement?.insertAdjacentElement('beforeend', novo)
  elemento.value = ''

  return novo
}

function montaNameNovo(name: string) {
  const atributos = name.split(/\[/).map(s => s.replace(/\]/, ''))

  mudaUltimoAtributo(atributos, atributos.length - 1)

  return atributos.reduce((acc, i) => `${acc}[${i}]`)
}

function mudaUltimoAtributo(atributos: string[], indice: number): void {
  if (indice < 0) throw new Error('impossível mudar name')

  if (atributos[indice] === '' || parseInt(atributos[indice])) {
    return mudaUltimoAtributo(atributos, indice - 1)
  }

  atributos[indice] += '_autocomplete'
}
