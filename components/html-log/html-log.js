export class HTMLLog extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    const { shadowRoot } = this
    shadowRoot.innerHTML = '<div style="background-color:inherit" id="quality-control"><slot></slot></div>'
    shadowRoot.querySelector('#quality-control').innerHTML = this.innerHTML

    const getBackgroundColour = (el) => {
      const backgroundColor = window.getComputedStyle(el).backgroundColor
      if (backgroundColor !== 'rgba(0, 0, 0, 0)') { return backgroundColor }
      if (!el.parentElement) { return 'rgb(255, 255, 255)' }
      return getBackgroundColour(el.parentElement)
    }

    const toConsole = () => {
      // eslint-disable-next-line no-undef
      domtoimage.toBlob(shadowRoot.getElementById('quality-control'), { bgcolor: getBackgroundColour(this) })
        .then(blob => {
          const r = new FileReader()
          r.readAsDataURL(blob)
          r.onloadend = () => {
            const o = 'background: url(\'' + r.result + '\') left top no-repeat; font-size: 2000px; background-size: contain; background-color:transparent'
            console.log('%c     ', o)
            shadowRoot.innerHTML = ''
          }
        })
    }

    const scriptTag = document.createElement('script')
    scriptTag.src = 'https://cdn.jsdelivr.net/npm/dom-to-image@2.6.0/src/dom-to-image.min.js'
    scriptTag.onload = toConsole
    shadowRoot.appendChild(scriptTag)
  }
}
window.customElements.define('html-log', HTMLLog)
