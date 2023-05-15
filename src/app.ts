import { changeLanguage } from './i18n'
import { toggleSwitcherAnimation } from './utils'

export const app = (() => {
  function  switcher (type: 'mode' | 'language') {
    const btns = Array.from(document.querySelectorAll(`[data-js="${type}-btn"]`))

    let current

    const handleSwitcherClick = (e: Event) => {
      const btn = e.currentTarget as HTMLButtonElement
      current = btn.dataset.id!

      if (!btn.classList.contains(`active-${type}`)) {
        btns.map(btn => btn.classList.remove(`active-${type}`))

        if (type === 'mode') {
          btn.classList.add(`active-mode`)
          toggleSwitcherAnimation(type)
        }

        if (type === 'language') {
          changeLanguage(current)
        }
      }
    }

    btns.map(btn => btn.addEventListener('click', handleSwitcherClick))
  }

  function switchMode () {
    switcher('mode')
  }

  function switchLanguage () {
    switcher('language')
  }

  return {
    switchMode,
    switchLanguage,
  }
})()
