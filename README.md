# Sti Autocomplete
Wrapper para a biblioteca [@tarekraafat/autocomplete.js](https://tarekraafat.github.io/autoComplete.js/#/)
Criado para abstrair parte da configuração necessária, criando 3 presets diferentes:
- AutoComplete
- CachedAutoComplete
- MultiAutoComplete

# AutoComplete
O autocomplete padrão, mais flexível que os outros

## Opções
A seguir encontra-se a interface das opções.
Mais abaixo, cada uma das opções é detalhada.
```typescript
interface AutoCompleteOptions {
  src: any[] | (() => Promise<any[]> | any[]),
  keys: string[],
  elemento: HTMLInputElement,
  hiddenInput?: string,
  resultTemplate?: (result: any) => string,
  selectedTemplate?: (feedback: Feedback) => string,
  cache?: boolean,
  threshold?: number,
  onChange?: (feedback: Feedback) => void,
  onOther?: (hiddenInput?: HTMLInputElement) => void,
}
```

### src
A fonte de dados do autocomplete. Neles serão feitas as buscas.  
A lista retornada deve ser uma lista de objetos.
A função pode ser async.

Exemplo:
```javascript
  src: async () => {
    const response = await axios.get('/api/alunos')
    return response.data
  },
```

### keys
lista de atributos a serem buscados pelo autocomplete.  
O autocomplete exibirá quaisquer resultados que incluam pelo menos um atributo 
que corresponda com a query feita pelo usuário.


Exemplo:
```javascript
  keys: ['nome', 'matricula', 'iduff'],
```

### elemento
O elemento a ser transformado em um autocomplete.
Deve ser um `<input>` com `type` igual à `'text'` ou `'search'`

Exemplo:  
html
```html
 <input type="text" id="autocomplete-alunos">
```
javascript
```javascript
  elemento: document.getElementById('autocomplete-alunos'),
```

### hiddenInput - opcional
Chave do atributo a ser colocada no `input` de `type="hidden"` associado.  
Só é possível utilizar esta opção caso o autocomplete possua um `name` e esteja dentro de um `<form>`.  
Será buscado um `<input type="hidden">` que possua o mesmo `name` que o autocomplete, caso não exista será criado um.
Esta opção forçará com que o `name` do autocomplete seja renomeado, adicionando `_autocomplete` ao final dele.

Exemplo:  
html
```html
  <input type="text" name="aluno[curso_id]" id="autocomplete-cursos" value="Física">
  <input type="hidden" name="aluno[curso_id]" value="150">
```
javascript
```javascript
  hiddenInput: 'id',
```

após a execução, o html será transformado para:
```html
  <input type="text" name="aluno[curso_id_autocomplete]" id="autocomplete-cursos" value="Física" autocomplete="off">
  <input type="hidden" name="aluno[curso_id]" value="150" id="_f2N4xnM5j">
```

### resultTemplate - opcional
Define o formato dos resultados da busca.
O padrão é o valor do primeiro atributo da opção `keys`.
Recebe como parâmetro um objeto contendo:
- **match**: o valor do atributo que corresponde à busca
- **value**: o objeto buscado

Exemplo:
```javascript
  resultTemplate: ({ match, value }) => `
    ${match}
    <p>${value.nome}</p>
    <p>${value.matricula}</p>
  `,
```

Padrão:
```javascript
  resultTemplate: ({ match }) => match,
```

### selectedTemplate - opcional
Define o formato do valor que será exibido no input assim que uma opção seja escolhida.
Recebe como parâmetro o [Feedback](#Feedback) do autocomplete.

Exemplo:
```javascript
  selectedTemplate: ({ selection }) => `${selection.value.matricula} - ${selection.value.nome}`,
```

Padrão:
```javascript
  selectedTemplate: ({ selection }) => selection.value[opcoes.keys[0]],
```

### cache - opcional
Define se o resultado de [src](#src) será cacheado ou não.

Padrão: `false`

### threshold - opcional
O mínimo de caracteres para que a busca seja feita.

Padrão: `0`

### onChange - opcional
Função que será executada sempre que uma seleção for feita pelo usuário.
Recebe [Feedback](#Feedback) como parâmetro.

Padrão: `null`

### onOther - opcional
Função que será executada quando um outro valor não existente for escolhido.  
Ao ser definida, o aviso de 'Nenhum resultado encontrado para ${query}' será trocado 
por uma nova opção com valor igual à query do usuário.  
Recebe o `hiddenInput` como parâmetro.

Exemplo:
```javascript
  onOther: hiddenInput => {
    hiddenInput.value = 0
  },
```

Padrão: `null`

# AutoComplete.cached
Preset que requere menos configuração.
```typescript
interface CachedAutoCompleteOptions {
  elemento: HTMLInputElement,
  url: string,
  keys: string[],
  hiddenInput?: string,
  onChange?: (feedback: Feedback) => void,
  onOther?: (hiddenInput?: HTMLInputElement) => void
}
```

## Opções
Inclui as seguinte opções do preset padrão:
- elemento
- keys
- hiddenInput
- onChange
- onOther

E a opção `src` é substituida por `url`.
### url
A url de onde carregar os resultados do autocomplete  

Exemplo:
```javascript
  url: '/api/alunos',
```

# AutoComplete.multi
Preset que permite a seleção de mais de um resultado

# Objetos
## Selection
### key: string
O atributo encontrado pela busca

Exemplo: `nome`

### match: string
O valor da chave, com a parte correspondente com a query envolvida por `<mark>`

Exemplo: `<mark>LEONARDO</mark> GURGEL`

### value: any
O objeto encontrado.

## Feedback
### event: [MouseEvent](https://developer.mozilla.org/pt-BR/docs/Web/API/MouseEvent)
O  que fez a seleção.

### query: string
A string que o usuário digitou na pesquisa.

### results: [Selection[]](#Selection)
Lista dos resultados encontrados.

### selection: [Selection](#Selection)
A seleção feita pelo usuário.