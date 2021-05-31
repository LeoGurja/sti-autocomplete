export default function getParents(elem: HTMLElement | null, selector: string) {
  // Setup parents array
  const parents = []

  // Get matching parent elements
  for (let i = elem; i; i = i.parentElement) {
    // If using a selector, add matching parents to array
    // Otherwise, add all parents
    if (selector) {
      if (i.matches(selector)) {
        parents.push(i)
      }
    } else {
      parents.push(i)
    }
  }

  return parents
}
