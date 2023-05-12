import { Counter } from '../main'
import { Component, replaceHTML } from '../utils'

import './style.css'

class HeaderComponent extends Component<Counter> {
  state = {
    counter: 0
  }

  decrease (selector: string) {
    const btn = document.querySelector(selector)!
    
    btn.addEventListener('click', () => {
      this.setState(prev => ({
        ...prev,
        counter: prev.counter - 1
      }))
    })
  }

  render (selector: string) {
    const el = document.querySelector(selector)!

    replaceHTML(el, `
      <div class="container">
        children counter is ${this.state.counter}
        
        <button data-js="decrease-btn">Decrease</button>
      </div>
    `)
  
    this.decrease('[data-js="decrease-btn"]')
  }
}
export const Header = new HeaderComponent()
Header.addEventListener('rerender', () => Header.render('[data-js="header"]'))