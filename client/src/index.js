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

import { h, html } from 'sinuous'
import { Message } from './components/message'

document.body.append(html`
  <h1>hello, world</h1>
  <${Message} content=${"Hello World!"} />
`)
