import i18next from 'i18next'

export const speechRecognition = (() => {
  let speech = new webkitSpeechRecognition()

  function init () {
    if ('SpeechRecognition' in window) {
      speech = new SpeechRecognition()
    }

    speech.continuous = true
    speech.interimResults = true
    speech.lang = i18next.resolvedLanguage
  }

  return {
    init,
    speech,
  }
})()
