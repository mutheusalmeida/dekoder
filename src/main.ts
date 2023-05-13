import { render } from './utils'
import { logo } from './assets/logo'
import { speechIcon } from './assets/speech-icon'
import { textIcon } from './assets/text-icon'
import { app } from './app'

import './reset.css'
import './style.css'

const root = document.querySelector('[data-js="root"]')!

render(root, `
  <div class="container">
    <header class="header" data-js="header">
      <h1 class="header__logo" title="dekoder">
        <a href="/">
          ${logo}
        </a>
      </h1>

      <nav class="header__nav">
        <ul class="actions">
          <li class="actions__item">
            <div class="modes">
              <button data-js="mode-btn" data-id="text" class="modes__item active-mode">
                ${textIcon}
              </button>

              <button data-js="mode-btn" data-id="speech" class="modes__item">
                ${speechIcon}
              </button>
            </div>
          </li>

          <li class="actions__item">
            <div class="language">
              <button data-js="language-btn" data-id="pt" class="language__item active-language">
                PT
              </button>

              <button data-js="language-btn" data-id="en" class="language__item">
                EN
              </button>
            </div>
          </li>
        </ul>
      </nav>
    </header>

    <main class="content">
      <div class="input-container">
        <textarea class="input-container__text-field" placeholder="Digite seu texto"></textarea>

        <div class="input-container__actions">
          <button class="input-container__btn input-container__btn--encrypt">Criptografar</button>

          <button class="input-container__btn--decrypt">Descriptografar</button>
        </div>
      </div>

      <div class="output-container">
      </div>
    </main>
  </div>
`)

app.switchMode()
app.switchLanguage()
