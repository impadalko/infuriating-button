class InfuriatingButton extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
    const wrapper = document.createElement('button')

    const slot = document.createElement('slot')
    wrapper.appendChild(slot)

    this.shadowRoot.append(wrapper)
  }
}

customElements.define('infuriating-button', InfuriatingButton)
