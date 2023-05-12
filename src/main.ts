import { Component, replaceHTML } from './utils'
import { Header } from './header/header'

import './reset.css'
import './style.css'

export type Counter = { counter: number }

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
      <header class="header" data-js="header"></header>

      <div class="container">
        parent counter is ${this.state.counter}
        
        <button data-js="increase-btn">Increase</button>
      </div>
    `)
  
    this.increase('[data-js="increase-btn"]')
    Header.render('[data-js="header"]')
  }
}

const App = new AppComponent()

document.addEventListener('DOMContentLoaded', () => App.render('[data-js="root"]'))
App.addEventListener('rerender', () => App.render('[data-js="root"]'))