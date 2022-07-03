class InfuriatingButton extends HTMLElement {
  constructor() {
    super()
    this.hovering = false

    this.attachShadow({ mode: 'open' })
    const wrapper = document.createElement('button')

    const slot = document.createElement('slot')
    wrapper.appendChild(slot)

    this.shadowRoot.append(wrapper)

    this.addEventListener('mouseenter', this.onMouseEnter)
    this.addEventListener('mouseleave', this.onMouseLeave)

    console.log(this)
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
  }
}

customElements.define('infuriating-button', InfuriatingButton)
