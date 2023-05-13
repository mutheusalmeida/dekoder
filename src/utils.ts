export const render = <T extends Element>(el: T, html: string) => {
  el.replaceChildren()
  el.insertAdjacentHTML('afterbegin', html)
}