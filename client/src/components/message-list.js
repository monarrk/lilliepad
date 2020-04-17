import { h, html } from "sinuous";
import { map } from "sinuous/map";

import { Message } from "./message";

import './message-list.css'

export const MessageList = props => {
  let lastMessage;
  const renderMessage = msg => {
    const res = html`
      <${Message}
        content=${msg.content}
        author=${msg.author}
        timestamp=${msg.timestamp}
        siblingMessage=${lastMessage &&
          lastMessage.author.username === msg.author.username}
      />
    `;
    lastMessage = msg;
    return res;
  };

  return html`
    <div class="MessageList" ...${props}>
      ${map(props.messages, renderMessage)}
    </div>
  `;
}

export default MessageList;
