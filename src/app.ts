import { changeLanguage } from './i18n'
import { encrypterRegExp, flip, render, toggleSwitcherAnimation } from './utils'
import removeAccents from 'remove-accents'

type CodesType = { [key: string]: string }

export const app = (() => {
  function encrypter () {
    const encrypterBtns = Array.from(document.querySelectorAll('[data-js="encrypter-btn"]'))
    const textField = document.querySelector<HTMLTextAreaElement>('[data-js="text-field"]')!
    const outputEl = document.querySelector<HTMLDivElement>('[data-js="output"]')!
    const codes: CodesType = {
      e: 'enter',
      i: 'imes',
      a: 'ai',
      o: 'ober',
      u: 'ufat',
    }

    const handleClick = (e: Event) => {
      const btn = e.currentTarget as HTMLButtonElement
      const id = btn.dataset.id
      const value = removeAccents(textField.value).toLocaleLowerCase()
      let result
      let re

      if (id === 'encrypt') {
        re = encrypterRegExp<CodesType>(codes)
        result = value.replace(re, (match: string) => codes[match])
      } else {
        const flipedCodes = flip<CodesType>(codes)
        re = encrypterRegExp<CodesType>(flipedCodes)
        result = value.replace(re, (match: string) => flipedCodes[match])
      }

      const outputHtml = `<p>${result}</p>`

      render(outputEl, outputHtml)
    }

    encrypterBtns.map(btn => btn.addEventListener('click', handleClick))
  }

  function  switcher (type: 'mode' | 'language') {
    const btns = Array.from(document.querySelectorAll(`[data-js="${type}-btn"]`))

    const handleSwitcherClick = (e: Event) => {
      const btn = e.currentTarget as HTMLButtonElement
      const current = btn.dataset.id!

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
    encrypter,
  }
})()
