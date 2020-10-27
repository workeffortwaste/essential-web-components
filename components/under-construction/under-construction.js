export class UnderConstruction extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    const { shadowRoot } = this
    shadowRoot.innerHTML = `
        <style>
          .under-construction:before,
          .under-construction:after{
            content: '';
            display: block;
            height: 12px;
            width: 100%;
            background: repeating-linear-gradient(-45deg, yellow, yellow 12px, black 0, black 24px);
          }
          .notice{
            text-transform:uppercase;
            position:absolute;
            background:yellow;
            font-size:12px;
            top:-18px;
            padding:4px;
            padding-left:8px;
            padding-right:8px;
            right:10px;
            font-family:'Arial Black', Helvetica, sans-serif;
          }
          .under-construction{
            margin-top:18px;
          }
        </style>
        <div class="notice">Under Construction</div>
        <div class="under-construction">
        <slot></slot>
        </div>
        `
    this.setAttribute('style', 'position:relative;display:block;width:max-content;')
  }
}
window.customElements.define('under-construction', UnderConstruction)
