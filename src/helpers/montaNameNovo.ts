
export default function montaNameNovo(name: string) {
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
