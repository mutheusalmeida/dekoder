export const app = (() => {
  let mode
  let language

  function switchMode () {
    const btns = Array.from(document.querySelectorAll('[data-js="mode-btn"]'))

    const handleModeClick = (e: Event) => {
      const btn = e.currentTarget as HTMLButtonElement
      mode = btn.dataset.id

      if (!btn.classList.contains('active-mode')) {
        btns.map(btn => btn.classList.remove('active-mode'))
        btn.classList.add('active-mode')
      }

      console.log(mode)
    }

    btns.map(btn => btn.addEventListener('click', handleModeClick))
  }

  function switchLanguage () {
    const btns = Array.from(document.querySelectorAll('[data-js="language-btn"]'))

    const handleLanguageClick = (e: Event) => {
      const btn = e.currentTarget as HTMLButtonElement
      language = btn.dataset.id

      if (!btn.classList.contains('active-language')) {
        btns.map(btn => btn.classList.remove('active-language'))
        btn.classList.add('active-language')
      }

      console.log(language)
    }

    btns.map(btn => btn.addEventListener('click', handleLanguageClick))
  }

  return {
    switchMode,
    switchLanguage,
  }
})()