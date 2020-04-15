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

import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import postcss from 'rollup-plugin-postcss'
import copy from 'rollup-plugin-copy'

import precss from 'precss'
import postcss_import from 'postcss-import'
import autoprefixer from 'autoprefixer'
import clean from 'postcss-clean'

import handlebars from 'handlebars'

const make_attrs = (attrs) => Object.keys(attrs || {}).reduce((acc, key) => (acc += ` ${key}="${attrs[key]}"`), '')

export default {
    input: 'src/index.js',
    output: {
        file:   'dist/bundle.js',
        format: 'iife',
    },
    plugins: [
        babel(), resolve(), terser(),
        postcss({
            extract: true,
            plugins: [postcss_import(), precss(), autoprefixer, clean()],
        }),
        copy({
            targets: [
                // inter, favicon, etc...
                {src: 'src/assets/**/*', dest: 'dist/assets'},

                // index template
                {
                    src:       'src/index.hbs',
                    dest:      'dist/',
                    rename:    'index.html',
                    transform: (contents) => handlebars.compile(contents.toString())({
                        links:   ["assets/inter/inter.css", "bundle.css"],
                        scripts: ["bundle.js"],
                    }),
                },
            ],
        }),
    ],
}
