class InfuriatingButton extends HTMLElement {
  constructor() {
    super()
    this.hovering = false

    this.attachShadow({ mode: 'open' })
    this.wrapper = document.createElement('button')

    const slot = document.createElement('slot')
    this.wrapper.appendChild(slot)

    this.shadowRoot.append(this.wrapper)

    this.addEventListener('mouseenter', this.onMouseEnter)
    this.addEventListener('mouseleave', this.onMouseLeave)
  }

  onMouseEnter() {
    this.hovering = true
    setTimeout(() => {
      if (this.hovering) console.log('Move not implemented yet')
    }, this.moveTimeout)
  }

  onMouseLeave() {
    this.hovering = false
  }

  connectedCallback() {
    this.moveTimeout = this.getAttribute('move-timeout') ?? 200

    const clazz = this.getAttribute('class')
    if (clazz) {
      this.wrapper.setAttribute('class', clazz)
      this.removeAttribute('class')
    }

    const id = this.getAttribute('id')
    if (id) {
      this.wrapper.setAttribute('id', id)
      this.removeAttribute('id')
    }
  }
}

customElements.define('infuriating-button', InfuriatingButton)
