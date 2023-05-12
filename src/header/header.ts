import { logo } from '../assets/logo'
import { speechIcon } from '../assets/speech-icon'
import { textIcon } from '../assets/text-icon'
import { Component, replaceHTML } from '../utils'

import './style.css'

type ModeType = 'speech' | 'text'
type LanguageType = 'pt' | 'en'

type StateType = {
  mode: ModeType
  language: LanguageType
}

class HeaderComponent extends Component<StateType> {
  state = {
    mode: 'text' as ModeType,
    language: 'pt' as LanguageType
  }

  setLanguage () {
    const btns = this.query<NodeListOf<HTMLButtonElement>>('[data-js="language-btn"', true)

    const handleLanguageChange = (e: Event) => {
      const btn = e.currentTarget as HTMLButtonElement

      this.setState(prev => ({
        ...prev,
        language: btn.dataset.id as LanguageType
      }))
    }
    
    this.on('click', btns, handleLanguageChange)
  }

  setMode () {
    const btns = this.query<NodeListOf<HTMLButtonElement>>('[data-js="mode-btn"', true)

    const handleModeChange = (e: Event) => {
      const btn = e.currentTarget as HTMLButtonElement

      this.setState(prev => ({
        ...prev,
        mode: btn.dataset.id as ModeType
      }))
    }
    
    this.on('click', btns, handleModeChange)
  }

  render () {
    const el = this.query<Element>('[data-js="header"]')

    replaceHTML(el, `
      <h1 class="header__logo" title="dekoder">
        <a href="/">
          ${logo}
        </a>
      </h1>

      <nav class="header__nav">
        <ul class="actions">
          <li class="actions__item">
            <div class="modes">
              <button data-js="mode-btn" data-id="text" class="modes__item ${this.state.mode === 'text' ? 'active-mode' : ''}">
                ${textIcon}
              </button>
              
              <button data-js="mode-btn" data-id="speech" class="modes__item ${this.state.mode === 'speech' ? 'active-mode' : ''}">
                ${speechIcon}
              </button>
            </div>
          </li>

          <li class="actions__item">
            <div class="language">
              <button data-js="language-btn" data-id="pt" class="language__item ${this.state.language === 'pt' ? 'active-language' : ''}">
                PT
              </button>
              
              <button data-js="language-btn" data-id="en" class="language__item ${this.state.language === 'en' ? 'active-language' : ''}">
                EN
              </button>
            </div>
          </li>
        </ul>
      </nav>
    `)
  
    this.setMode()
    this.setLanguage()
  }
}
export const Header = new HeaderComponent()
Header.addEventListener('rerender', () => Header.render())