import randomHelper from './randomHelper'

const horizontalOffsetVar = '--horizontal-offset'
const verticalOffsetVar = '--vertical-offset'

class InfuriatingButton extends HTMLElement {
  constructor() {
    super()
    this.hovering = false

    this.attachShadow({ mode: 'open' })
    this.wrapper = document.createElement('button')
    this.wrapper.style.position = 'relative'
    this.wrapper.style.left = `var(${horizontalOffsetVar})`
    this.wrapper.style.top = `var(${verticalOffsetVar})`

    const slot = document.createElement('slot')
    this.wrapper.appendChild(slot)

    this.shadowRoot.append(this.wrapper)

    this.addEventListener('mouseenter', this.onMouseEnter)
    this.addEventListener('mouseleave', this.onMouseLeave)
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

    this.boundingBox = this.wrapper.getBoundingClientRect()
  }

  onMouseEnter() {
    this.hovering = true
    setTimeout(() => {
      if (this.hovering) this.move()
    }, this.moveTimeout)
  }

  onMouseLeave() {
    this.hovering = false
  }

  move() {
    const possibleMovements = []

    const xPosition = this.boundingBox.x
    const yPosition = this.boundingBox.y
    const horizontalMovement = this.boundingBox.width + 5
    const verticalMovement = this.boundingBox.height + 5
    if (horizontalMovement <= xPosition)
      possibleMovements.push({ horizontal: -horizontalMovement, vertical: 0 })
    if (horizontalMovement <= document.documentElement.clientWidth - xPosition)
      possibleMovements.push({ horizontal: horizontalMovement, vertical: 0 })
    if (verticalMovement <= yPosition)
      possibleMovements.push({ horizontal: 0, vertical: -verticalMovement })
    if (verticalMovement <= document.documentElement.clientHeight - yPosition)
      possibleMovements.push({ horizontal: 0, vertical: verticalMovement })

    const movement = randomHelper.getRandomFromArray(possibleMovements)
    const root = document.querySelector(':root')
    const horizontalOffset = Number(root.style.getPropertyValue(horizontalOffsetVar)) || 0
    const verticalOffset = Number(root.style.getPropertyValue(verticalOffsetVar)) || 0
    root.style.setProperty(horizontalOffsetVar, horizontalOffset + movement.horizontal)
    root.style.setProperty(verticalOffsetVar, verticalOffset + movement.vertical)

    this.boundingBox = this.wrapper.getBoundingClientRect()
  }
}

customElements.define('infuriating-button', InfuriatingButton)
