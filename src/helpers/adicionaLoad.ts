import generateRandomId from './generateRandomId'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/fontawesome'

export default function adicionaLoad(elemento: HTMLElement, src: Function) {
  const id = generateRandomId()
  const loadIcon = `
    <span class="icon-wrapper fa-lg hidden" id="${id}">
      <i class="fas fa-circle-notch fa-spin"></i>
    </span>
  `
  elemento.insertAdjacentHTML('afterend', loadIcon)

  return async() => {
    const load = document.getElementById(id)

    load?.classList.remove('hidden')
    const data = await src()
    load?.classList.add('hidden')

    return data
  }
}
