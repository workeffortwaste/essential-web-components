export class BetterBlink extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    const { shadowRoot } = this

    shadowRoot.innerHTML = `
        <style> 
        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
        </style>
        <span class="better-blink"><slot></slot></span>
        `
    shadowRoot.querySelector('.better-blink').setAttribute('style', `animation: blink ${this.getAttribute('speed')} step-start infinite;`)
  }
}
window.customElements.define('better-blink', BetterBlink)
