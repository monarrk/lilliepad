// @flow

import { h, html } from "sinuous";
import fromnow from "fromnow";
import cls from "obj-str";

import { DisplayPicture } from "./display-picture";

// $FlowFixMe: ignore until proper inference for css files
import "./message.css";

type Author = {
  username: string,
  tag: string,
  avatar: string
}

type MessageProps = {
  content: string,
  author: Author,
  timestamp: number,
  siblingMessage: boolean
}

const defaultAuthor = {
  username: "author",
  tag: "0000",
  avatar: "",
};
export const Message = ({
  content,
  author = defaultAuthor,
  timestamp = 0,
  siblingMessage = false,
}: MessageProps = {}) => {
  return html`
    <article
      class=${cls({ Message: true, "message-sibling": siblingMessage })}
      data-author-id=${author.username}
    >
      <div class="message-aside">
        <${DisplayPicture} class="avatar" size="30px" src=${author.avatar} />
      </div>
      <header class="message-header">
        <div class="row">
          <div class="user"><span class="name">${author.username}</span></div>
          <time class="time"
            >${fromnow(timestamp, { and: true, suffix: true, max: 2 })}</time
          >
        </div>
        <hr />
      </header>
      <main class="message-body">
        <div class="content">${content}</div>
      </main>
    </article>
  `;
};
