export class HTMLQuality extends HTMLElement {
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

    const reduceQuality = () => {
      // eslint-disable-next-line no-undef
      domtoimage.toJpeg(shadowRoot.getElementById('quality-control'), { quality: parseFloat(this.getAttribute('quality')), bgcolor: getBackgroundColour(this) })
        .then(function (dataUrl) {
          var img = new Image()
          img.src = dataUrl
          shadowRoot.getElementById('quality-control').innerHTML = ''
          shadowRoot.getElementById('quality-control').appendChild(img)
        })
    }

    const scriptTag = document.createElement('script')
    scriptTag.src = 'https://cdn.jsdelivr.net/npm/dom-to-image@2.6.0/src/dom-to-image.min.js'
    scriptTag.onload = reduceQuality
    shadowRoot.appendChild(scriptTag)
  }
}
window.customElements.define('html-quality', HTMLQuality)
