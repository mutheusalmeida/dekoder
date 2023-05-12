import { Counter } from '../main'
import { Component, replaceHTML } from '../utils'

import './style.css'

class HeaderComponent extends Component<Counter> {
  state = {
    counter: 0
  }

  decrease () {
    const btn = this.query('[data-js="decrease-btn"]')

    const handleBtnClick = () => {
      this.setState(prev => ({
        ...prev,
        counter: prev.counter - 1
      }))
    }
    
    this.on('click', btn, handleBtnClick)
  }

  render () {
    const el = this.query('[data-js="header"]')

    replaceHTML(el, `
      <div class="container">
        children counter is ${this.state.counter}
        
        <button data-js="decrease-btn">Decrease</button>
      </div>
    `)
  
    this.decrease()
  }
}
export const Header = new HeaderComponent()
Header.addEventListener('rerender', () => Header.render())