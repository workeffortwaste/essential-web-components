export class PositionRandom extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    const { shadowRoot } = this
    const positions = [
      'static',
      'relative',
      'fixed',
      'absolute',
      'sticky'
    ]
    shadowRoot.innerHTML = `
        <slot></slot>
        `
    this.setAttribute('style', `position:${positions[Math.floor(Math.random() * positions.length)]}`)
  }
}
window.customElements.define('position-random', PositionRandom)
