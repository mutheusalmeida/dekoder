import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { render, toggleSwitcherAnimation } from './utils'

type TranslationType = {
  emptyContainerTitle: string
  inputContainerTextField: string
  inputContainerTextFieldSpeech: string
  inputContainerBtnEncrypt: string
  inputContainerBtnDecrypt: string
  emptyContainerPara: string
}

type ResourcesType = {
  'pt-BR': { translation: TranslationType }
  en: { translation: TranslationType }
}

export const resources: ResourcesType = {
  'pt-BR': {
    translation: {
      emptyContainerTitle: 'Nenhuma mensagem encontrada',
      inputContainerTextField: 'Digite seu texto',
      inputContainerTextFieldSpeech: 'Fale algo...',
      inputContainerBtnEncrypt: 'Criptografar',
      inputContainerBtnDecrypt: 'Descriptografar',
      emptyContainerPara: 'Digite um texto que você deseja criptografar ou descriptografar.',
    }
  },
  en: {
    translation: {
      emptyContainerTitle: 'No message found',
      inputContainerTextField: 'Type your text',
      inputContainerTextFieldSpeech: 'Say something...',
      inputContainerBtnEncrypt: 'Encrypt',
      inputContainerBtnDecrypt: 'Decrypt',
      emptyContainerPara: 'Type a text that you want to encrypt or decrypt.',
    },
  },
}

export const i18n = (() => {
  function init () {
    i18next.init({
      fallbackLng: 'en',
      resources,
    }, () => {
      updateContent()
    })
    i18next.use(LanguageDetector)
  }

  return {
    init,
  }
})()

const updateContent = () => {
  for (let key in resources.en.translation) {
    const el = document.querySelector(`[data-lng="${key}"]`)

    if (key.includes('TextField')) {
      const textField = document.querySelector(`[data-lng="inputContainerTextField"]`)!
      const speechBtn = document.querySelector<HTMLButtonElement>('[data-id="speech"]')!

      if (speechBtn.classList.contains('active-mode')) {
        textField.setAttribute('placeholder', i18next.t('inputContainerTextFieldSpeech'))
      } else {
        textField.setAttribute('placeholder', i18next.t('inputContainerTextField'))
      }
    } else if (el) {
      render(el, i18next.t(key))
    }
  }

  const html = document.querySelector('html')!
  html.setAttribute('lang', i18next.language)
}

export const changeLanguage = (language: string) => {
  i18next.changeLanguage(language)
}

i18next.on('languageChanged', () => {
  updateContent()
  const langBtn = document.querySelector<HTMLButtonElement>(`[data-id="${i18next.resolvedLanguage}"]`)!
  langBtn.classList.add('active-language')
  toggleSwitcherAnimation('language')
})
