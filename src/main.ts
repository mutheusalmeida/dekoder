import { Component, replaceHTML } from './utils'
import { Header } from './header/header'

import './reset.css'
import './style.css'

type Counter = { counter: number }

class AppComponent extends Component<Counter> {
  state = {
    counter: 0
  }

  increase () {
    const btn = this.query<HTMLButtonElement>('[data-js="increase-btn"]')

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
      <div class="container">
        <header class="header" data-js="header"></header>

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