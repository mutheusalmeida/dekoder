import i18next from 'i18next'

export const speechRecognition = (() => {
  let instance: SpeechRecognition | undefined

  function init () {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition
      instance = new SpeechRecognition()
      instance.continuous = true
      instance.interimResults = true
      instance.lang = i18next.resolvedLanguage
    }
  }

  function getInstance () {
    return instance
  }

  return {
    init,
    getInstance,
  }
})()
