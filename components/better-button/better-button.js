export class BetterButton extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  closestElement (
    selector,
    base = this,
    __Closest = (el, found = el && el.closest(selector)) =>
      !el || el === document || el === window
        ? null
        : found || __Closest(el.getRootNode().host)
  ) {
    return __Closest(base)
  }

  connectedCallback () {
    const { shadowRoot } = this
    this.value = this.getAttribute('value') || undefined
    this.name = this.getAttribute('name') || undefined
    shadowRoot.innerHTML = `
      <style> 
      .better-button {
        appearance: button;
        -webkit-writing-mode: horizontal-tb !important;
        text-rendering: auto;
        color: black, white;
        letter-spacing: normal;
        word-spacing: normal;
        text-transform: none;
        text-indent: 0px;
        text-shadow: none;
        display: inline-block;
        text-align: center;
        align-items: flex-start;
        cursor: default;
        background-color: rgb(239, 239, 239);
        box-sizing: border-box;
        margin: 0em;
        font: 400 13.3333px Arial;
        padding: 2px 6px;
        border-width: 1px;
        border-style: solid;
        border-color: rgb(118, 118, 118);
        border-image: initial;
      }
      .better-button:hover{
        background-color: rgb(229 229 229);
      }
      </style>
      <div class="better-button"><slot></slot></div>
      `

    if ((this.getAttribute('type') === 'submit' || this.getAttribute('type') === undefined) && this.closest('form')) {
      shadowRoot.querySelector('.better-button').addEventListener('click', e => {
        this.closest('form').submit()
        var event = new Event('submit', {
          bubbles: true,
          cancelable: true
        })
        this.closest('form').dispatchEvent(event)
      })
    }
  }
}
window.customElements.define('better-button', BetterButton)
