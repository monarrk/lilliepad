import { h, html } from "sinuous";

import './text-input.css'

const nop = () => {}

function resize(textarea) {
  textarea.style.height = 0;
  textarea.style.height =  textarea.scrollHeight
  // todo: make same height always
}

const textInputHandleInput = e => {
  resize(e.currentTarget);
};
const textInputHandleKeydown = (e, onsubmit) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    onsubmit(e)
    e.currentTarget.value = "";
    resize(e.currentTarget);
  }
};
export const TextInput = (props = {}) => {
  return html`
    <textarea
      class="TextInput"
      rows="1"
      oninput=${textInputHandleInput}
      onkeydown=${e => textInputHandleKeydown(e, props.onsubmit)}
      ...${props}
    ></textarea>
  `;
}

export default TextInput