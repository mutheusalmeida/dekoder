import { changeLanguage } from "./i18n"

type ModeType = 'text' | 'speech'
type LanguageType = 'pt-BR' | 'en'

export const app = (() => {
  let mode: ModeType = 'text'
  let language: LanguageType = 'pt-BR'

  function  switcher <T>(type: 'mode' | 'language', active: ModeType | LanguageType) {
    const btns = Array.from(document.querySelectorAll(`[data-js="${type}-btn"]`))
    const background = document.querySelector<HTMLDivElement>(`[data-id="${type}-bg"]`)!

    let value = active

    const handleSwitcherClick = (e: Event) => {
      const btn = e.currentTarget as HTMLButtonElement
      value = btn.dataset.id as ModeType | LanguageType

      if (!btn.classList.contains(`active-${type}`)) {
        btns.map(btn => btn.classList.remove(`active-${type}`))
        btn.classList.add(`active-${type}`)

        if (value === active) {
          background.classList.remove('right')
          background.classList.add('left')
        } else {
          background.classList.remove('left')
          background.classList.add('right')
        }
      }

      if (type === 'language') {
        changeLanguage(value)
      }
    }

    btns.map(btn => btn.addEventListener('click', handleSwitcherClick))

    return value as T
  }

  function switchMode () {
    mode = switcher<ModeType>('mode', mode)
  }

  function switchLanguage () {
    language = switcher<LanguageType>('language', language)
  }

  return {
    switchMode,
    switchLanguage,
  }
})()
