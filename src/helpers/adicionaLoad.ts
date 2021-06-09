import generateRandomId from './generateRandomId'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/fontawesome'

export default function adicionaLoad(elemento: HTMLElement, src: Function) {
  return async() => {
    elemento.classList.add('loading')
    const data = await src()
    elemento.classList.remove('loading')

    return data
  }
}
