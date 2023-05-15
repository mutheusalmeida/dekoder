import i18next from 'i18next'
import { render } from './utils'

const translation = {
  emptyContainerTitle: 'Nenhuma mensagem encontrada',
}

export const i18n = (() => {
  function init () {
    i18next.init({
      lng: 'pt-BR',
      debug: true,
      resources: {
        'pt-BR': {
          translation,
        },
        en: {
          translation: {
            emptyContainerTitle: 'No message found',
          },
        },
      },
    }, () => {
      updateContent()
    })
  }

  return {
    init,
  }
})()

const updateContent = () => {
  for (let key in translation) {
    render(document.querySelector(`[data-lng="${key}"]`)!, i18next.t(key))
  }
}

export const changeLanguage = (language: string) => {
  i18next.changeLanguage(language)
}

i18next.on('languageChanged', () => {
  updateContent()
})
