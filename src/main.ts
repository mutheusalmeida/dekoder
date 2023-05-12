import { Component, replaceHTML } from './utils'
import { Header } from './header/header'

import './reset.css'
import './style.css'

export type Counter = { counter: number }

class AppComponent extends Component<Counter> {
  state = {
    counter: 0
  }

  increase () {
    const btn = this.query('[data-js="increase-btn"]')

    const handleBtnClick = () => {
      this.setState(prev => ({
        ...prev,
        counter: prev.counter + 1
      }))
    }

    this.on('click', btn, handleBtnClick)
  }

  render () {
    const root = this.query<HTMLDivElement>('[data-js="root"]')

    replaceHTML(root, `
      <header class="header" data-js="header"></header>

      <div class="container">
        parent counter is ${this.state.counter}
        
        <button data-js="increase-btn">Increase</button>
      </div>
    `)
  
    this.increase()
    Header.render()
  }
}

const App = new AppComponent()

document.addEventListener('DOMContentLoaded', () => App.render())
App.addEventListener('rerender', () => App.render())