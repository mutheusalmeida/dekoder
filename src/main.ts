import { Component, replaceHTML } from './utils'

import './reset.css'
import './style.css'

type Counter = { counter: number }

class AppComponent extends Component<Counter> {
  state = {
    counter: 0
  }

  increase (selector: string) {
    const btn = document.querySelector(selector)!
    
    btn.addEventListener('click', () => {
      this.setState(prev => ({
        ...prev,
        counter: prev.counter + 1
      }))
    })
  }

  render (selector: string) {
    const root = document.querySelector<HTMLDivElement>(selector)!

    replaceHTML<HTMLDivElement>(root, `
      <header data-js="header"></header>

      <div class="container">
        parent counter is ${this.state.counter}
        
        <button data-js="increase-btn">Increase</button>
      </div>
    `)
  
    this.increase('[data-js="increase-btn"]')
    Header.render('[data-js="header"]')
  }
}

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

const App = new AppComponent()
const Header = new HeaderComponent()

document.addEventListener('DOMContentLoaded', () => App.render('[data-js="root"]'))

App.addEventListener('rerender', () => App.render('[data-js="root"]'))
Header.addEventListener('rerender', () => Header.render('[data-js="header"]'))