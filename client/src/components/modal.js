import { h, html } from 'sinuous'

import './modal.css'

const modalHandleClick = event => {
  event.currentTarget.remove()
};
const modalSlotHandleClick = event => {
  event.stopPropagation()
}
export const Modal = props => {
  return html`
    <div class="Modal" onclick=${modalHandleClick} ...${props}>
      <div class="slot" onclick=${modalSlotHandleClick}>${props.slot}</div>
    </div>
  `;
}