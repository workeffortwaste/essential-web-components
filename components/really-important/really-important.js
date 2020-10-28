export class reallyImportant extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    const { shadowRoot } = this
    shadowRoot.innerHTML = '<slot></slot>'

    shadowRoot.querySelector('slot').innerHTML = this.innerHTML
    const updatedStyles = document.createElement('style')
    Array.from(shadowRoot.styleSheets[0].cssRules).forEach(e => {
      // Add importants to every element
      const split = e.style.cssText.split(';').filter(i => i)
      split.forEach((css, key) => {
        if (!css.includes('!important')) {
          split[key] += '!important'
        }
      })
      // Get extra specific with standard class and id selectors
      e.style.cssText = split.join(';')
      e.selectorText += e.selectorText

      // Add the modified styles to the new <style> element
      updatedStyles.insertAdjacentText('beforeend', e.cssText)
    })

    this.innerHTML = updatedStyles.outerHTML
  }
}
window.customElements.define('really-important', reallyImportant)
