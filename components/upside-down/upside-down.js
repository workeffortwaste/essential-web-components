export class UpsideDown extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    const { shadowRoot } = this
    shadowRoot.innerHTML = `
      <style> 
      .flip-it {
        transform: rotate(180deg);
        width: max-content;
      }
      </style>
      <div class="flip-it"><slot></slot></div>
      `
  }
}
window.customElements.define('upside-down', UpsideDown)
