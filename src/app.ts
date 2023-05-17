import i18next from 'i18next'
import { changeLanguage, resources } from './i18n'
import { speechRecognition } from './speech-recognition'
import { encrypterRegExp, flip, render, toggleSwitcherAnimation } from './utils'
import removeAccents from 'remove-accents'

type CodesType = { [key: string]: string }

export const app = (() => {
  function clipboard () {
    const btn = document.querySelector<HTMLButtonElement>('[data-js="copy-btn"]')!

    const handleCopyFromClipboard = () => {
      const text = document.querySelector<HTMLParagraphElement>('[data-js="result"]')!.innerHTML

      navigator.clipboard.writeText(text)
    }

    btn.addEventListener('click', handleCopyFromClipboard)
  }

  function recognitionResult () {
    const textField = document.querySelector<HTMLTextAreaElement>('[data-js="text-field"]')!
    const recognition = speechRecognition.getInstance()

    if (recognition) {
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interimResult = ''

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            textField.value = event.results[i][0].transcript
          } else {
            interimResult += event.results[i][0].transcript
          }
        }

        if (interimResult) {
          textField.value = interimResult
        }
      }
    }
  }

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

      if (value) {
        if (id === 'encrypt') {
          re = encrypterRegExp<CodesType>(codes)
          result = value.replace(re, (match: string) => codes[match])
        } else {
          const flipedCodes = flip<CodesType>(codes)
          re = encrypterRegExp<CodesType>(flipedCodes)
          result = value.replace(re, (match: string) => flipedCodes[match])
        }

        const outputHtml = `
          <p data-js="result" class="output-container__result">${result}</p>

          <button data-js="copy-btn" data-lng="baseBtnCopy" class="base-btn base-btn--copy">${resources[i18next.language as keyof typeof resources].translation.baseBtnCopy}</button>
        `

        render(outputEl, outputHtml)
        clipboard()
      }
    }

    encrypterBtns.map(btn => btn.addEventListener('click', handleClick))
  }

  function  switcher (type: 'mode' | 'language') {
    const btns = Array.from(document.querySelectorAll(`[data-js="${type}-btn"]`))

    const handleSwitcherClick = (e: Event) => {
      const btn = e.currentTarget as HTMLButtonElement
      const current = btn.dataset.id!
      const recognition = speechRecognition.getInstance()

      if (!btn.classList.contains(`active-${type}`)) {
        btns.map(btn => btn.classList.remove(`active-${type}`))

        if (recognition) {
          if (type === 'mode') {
            btn.classList.add(`active-mode`)
            toggleSwitcherAnimation(type)
            const textField = document.querySelector(`[data-lng="inputContainerTextField"]`)!
            let placeholder

            if (current === 'speech') {
              placeholder = resources[i18next.language as keyof typeof resources].translation.inputContainerTextFieldSpeech
              recognition.start()
              recognitionResult()
            } else {
              recognition.stop()
              placeholder = resources[i18next.language as keyof typeof resources].translation.inputContainerTextField
            }

            textField.setAttribute('placeholder', placeholder)
          }
        }

        const speechBtn = document.querySelector<HTMLButtonElement>(`[data-id="speech"]`)!

        const event = () => {
          if (recognition) {
            if (speechBtn.classList.contains('active-mode')) {
              recognition.start()
              recognitionResult()
            } else {
              recognition.stop()
            }
          }
        }

        if (type === 'language') {
          changeLanguage(current)

          if (recognition) {
            recognition.stop()
            recognition.lang = current
            recognition.onend = event
          }
        }
      }
    }

    btns.map(btn => btn.addEventListener('click', handleSwitcherClick))
  }

  function switchMode () {
    const recognition = speechRecognition.getInstance()

    if (recognition) {
      switcher('mode')
    } else {
      const btn = document.querySelector<HTMLButtonElement>('[data-id="speech"]')!
      btn.setAttribute('disabled', 'true')
    }
  }

  function switchLanguage () {
    switcher('language')
  }

  return {
    switchMode,
    switchLanguage,
    encrypter,
    recognitionResult,
  }
})()
