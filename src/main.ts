import { render } from './utils'
import { logo } from './assets/logo'
import { speechIcon } from './assets/speech-icon'
import { textIcon } from './assets/text-icon'
import { notFoundIllustra } from './assets/not-found-illustra'
import { app } from './app'
import { i18n } from './i18n'

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
        <ul class="header__actions">
          <li>
            <div class="modes">
              <div data-id="mode-bg" class="modes__bg"></div>

              <button data-js="mode-btn" data-id="text" class="modes__item active-mode">
                ${textIcon}
              </button>

              <button data-js="mode-btn" data-id="speech" class="modes__item">
                ${speechIcon}
              </button>
            </div>
          </li>

          <li>
            <div class="language">
              <div data-id="language-bg" class="language__bg"></div>

              <button data-js="language-btn" data-id="pt-BR" class="language__item active-language">
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

          <button class="input-container__btn input-container__btn--decrypt">Descriptografar</button>
        </div>
      </div>

      <div class="output-container">
        <div class="empty-container">
          <div class="empty-container__illustra">
            ${notFoundIllustra}
          </div>

          <h2 data-lng="emptyContainerTitle" class="empty-container__title">Nenhuma mensagem encontrada</h2>

          <p class="empty-container__para">Digite um texto que você deseja criptografar ou descriptografar.</p>
        </div>
      </div>
    </main>
  </div>
`)

i18n.init()
app.switchMode()
app.switchLanguage()
