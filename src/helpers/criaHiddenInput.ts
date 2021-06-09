export default function criaNovoHiddenInput(elemento: HTMLInputElement, name: string) {
  const novo: HTMLInputElement = Object.assign(document.createElement('input'), {
    type: 'hidden',
    name
  })

  elemento.parentElement?.insertAdjacentElement('beforeend', novo)
  elemento.value = ''

  return novo
}
