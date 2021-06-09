import StiAutoComplete from './autocomplete'
import cachedAutoComplete from './cached'
import multiAutoComplete from './multi'
import ApiOptions from '../types/apiOptions'

/**
  * transforma o input em um autocomplete com opções carregadas localmente ou por ajax
  */
function autoComplete(opcoes: ApiOptions) {
  return new StiAutoComplete(opcoes)
}

autoComplete.cached = cachedAutoComplete
autoComplete.multi = multiAutoComplete

export default autoComplete