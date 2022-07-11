import randomHelper from './randomHelper'

const horizontalOffsetVar = '--horizontal-offset'
const verticalOffsetVar = '--vertical-offset'

export class InfuriatingButton extends HTMLElement {
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
    this.addEventListener('click', this.onClick, { capture: true })
  }

  connectedCallback() {
    this.moveTimeout = this.getAttribute('move-timeout') ?? 200
    this.clickFailureProbability = this.getAttribute('click-failure-probability') ?? 0.05
    this.confirmationText =
      this.getAttribute('confirmation-text') ?? 'Are you sure you want to click?'

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
    const horizontalOffset = this.parseProperty(root, horizontalOffsetVar)
    const verticalOffset = this.parseProperty(root, verticalOffsetVar)
    root.style.setProperty(horizontalOffsetVar, `${horizontalOffset + movement.horizontal}px`)
    root.style.setProperty(verticalOffsetVar, `${verticalOffset + movement.vertical}px`)

    this.boundingBox = this.wrapper.getBoundingClientRect()
  }

  parseProperty(root, property) {
    return Number(root.style.getPropertyValue(property).replace('px', '')) || 0
  }

  onClick(e) {
    if (
      randomHelper.randomEvent(this.clickFailureProbability) ||
      !window.confirm(this.confirmationText)
    )
      e.stopImmediatePropagation()
  }
}

customElements.define('infuriating-button', InfuriatingButton)
