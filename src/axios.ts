import axios from 'axios'

// adiciona url relativa
const relativeUrl: HTMLMetaElement | null = document.querySelector('meta[name="relative_url"]')

if (relativeUrl) axios.defaults.baseURL = relativeUrl.content ?? undefined


// adiciona csrf token
const csrfTokenMeta: HTMLMetaElement | null = document.querySelector('meta[name="csrf-token"]')

if (csrfTokenMeta) axios.defaults.headers.common['X-CSRF-Token'] = csrfTokenMeta.content
axios.defaults.headers.common.Accept = 'application/json'

export default axios
