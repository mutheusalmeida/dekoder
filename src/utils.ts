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

  on<T extends Element>(event: string, el: NodeListOf<T> | T, callback: (e: Event) => void) {
    if ('forEach' in el) {
      el.forEach(item => item.addEventListener(event, callback))
    } else {
      el.addEventListener(event, callback)
    }
  }

  query<T>(selector: string, nodeList?: boolean) {
    if (nodeList) {
      const elements = document.querySelectorAll(selector)!
      
      return elements as T
    }
    
    const el = document.querySelector(selector)!

    return el as T
  }
}