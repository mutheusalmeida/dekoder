import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { render, toggleSwitcherAnimation } from './utils'

const translation = {
  emptyContainerTitle: 'Nenhuma mensagem encontrada',
  inputContainerTextField: 'Digite seu texto',
  inputContainerBtnEncrypt: 'Criptografar',
  inputContainerBtnDecrypt: 'Descriptografar',
  emptyContainerPara: 'Digite um texto que você deseja criptografar ou descriptografar.',
}

export const i18n = (() => {
  function init () {
    i18next.init({
      fallbackLng: 'en',
      resources: {
        'pt-BR': {
          translation,
        },
        en: {
          translation: {
            emptyContainerTitle: 'No message found',
            inputContainerTextField: 'Type your text',
            inputContainerBtnEncrypt: 'Encrypt',
            inputContainerBtnDecrypt: 'Decrypt',
            emptyContainerPara: 'Type a text that you want to encrypt or decrypt.',
          },
        },
      },
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
  for (let key in translation) {
    if (key.includes('TextField')) {
      document.querySelector(`[data-lng="${key}"]`)!.setAttribute('placeholder', i18next.t(key))
    } else {
      render(document.querySelector(`[data-lng="${key}"]`)!, i18next.t(key))
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
  const langBtn = document.querySelector(`[data-id="${i18next.resolvedLanguage}"]`)!
  langBtn.classList.add('active-language')
  toggleSwitcherAnimation('language')
})
