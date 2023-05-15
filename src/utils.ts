export const render = <T extends Element>(el: T, html: string) => {
  el.replaceChildren()
  el.insertAdjacentHTML('afterbegin', html)
}

export const toggleSwitcherAnimation = (type: 'mode' | 'language') => {
  const blob = document.querySelector<HTMLDivElement>(`[data-id="${type}-bg"]`)!

  if (blob.classList.contains('forward')) {
    blob.classList.remove('forward')
    blob.classList.add('backward')
  } else {
    blob.classList.remove('backward')
    blob.classList.add('forward')
  }
}
