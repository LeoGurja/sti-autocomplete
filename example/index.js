import autoComplete from '../build/index.js'

const elemento = document.getElementById('autocomplete-alunos')

autoComplete.multi({
  elemento,
  url: 'https://api.github.com/users',
  keys: ['login'],
  hiddenInput: 'id'
})