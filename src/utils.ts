export const replaceHTML = <T extends Element>(el: T, html: string) => {
  el.replaceChildren()
  el.insertAdjacentHTML('afterbegin', html)
}

export class Component<T> extends EventTarget {
  state!: T

  setState(callback: (prevState: T) => T) {
    const newState = callback(this.state)
    this.state = newState
    this.dispatchEvent(new CustomEvent('rerender'))
  }
}