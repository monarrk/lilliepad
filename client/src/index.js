/*

  lilliepad - a fancy discord client that runs in your web browser
  Copyright (C) 2018-2020  superwhiskers <whiskerdev@protonmail.com>

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU Affero General Public License as published
  by the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU Affero General Public License for more details.

  You should have received a copy of the GNU Affero General Public License
  along with this program.  If not, see <https://www.gnu.org/licenses/>.

*/

import './index.css'

import { h, html, o } from 'sinuous'
import { MessageList } from './components/message-list'
import { TextInput } from './components/text-input'

const exampleAuthorA = {
  username: "bree",
  tag: "0000",
  avatar: "http://avatar.3sd.me/16"
};

const exampleAuthorB = {
  username: "lillie",
  tag: "9999",
  avatar: "http://avatar.3sd.me/100"
};

const exampleMessages = o([
  {
    content: "Hello!",
    author: exampleAuthorA,
    timestamp: Date.now() - 1000000
  },
  {
    content: "ping",
    author: exampleAuthorA,
    timestamp: Date.now() - 1000000
  },
  {
    content: "pong!",
    author: exampleAuthorB,
    timestamp: Date.now() - 900000
  },
  {
    content: "hi",
    author: exampleAuthorA,
    timestamp: Date.now() - 3000
  }
]);

exampleMessages([...exampleMessages(), ...(exampleMessages().map(m => ({...m, timestamp: Date.now()})))])
exampleMessages([...exampleMessages(), ...(exampleMessages().map(m => ({...m, timestamp: Date.now()})))])
exampleMessages([...exampleMessages(), ...(exampleMessages().map(m => ({...m, timestamp: Date.now()})))])

document.body.append(html`
  <div class="main">
    <nav class="navigation">
    </nav>
    <section class="messaging">
      <${MessageList} messages=${exampleMessages} />
    </section>
    <section class="text-input">
      <div class="input-area">
        <${TextInput} onsubmit=${e => {
          exampleMessages(exampleMessages().concat([{
            content: e.target.value.trim(),
            author: exampleAuthorA,
            timestamp: Date.now()
          }]))
        }} />
      </div>
    </section>
  </div>
`);