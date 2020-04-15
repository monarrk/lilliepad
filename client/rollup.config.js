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
import html from '@rollup/plugin-html'
import copy from 'rollup-plugin-copy-assets'
import postcss from 'rollup-plugin-postcss'

import precss from 'precss'
import postcss_import from 'postcss-import'
import autoprefixer from 'autoprefixer'
import clean from 'postcss-clean'

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
        html({
            title:    'lilliepad',
            fileName: 'index.html',
            template: async ({ attributes, files, publicPath, title }) => {
                const scripts = (files.js || [])
                    .map(({ fileName }) => `<script src="${publicPath}${fileName}"${make_attrs(attributes.script)}></script>`)
                    .join('\n')

                const links = (files.css || [])
                    .map(({ fileName }) => `<link href="${publicPath}${fileName}" rel="stylesheet"${make_attrs(attributes.link)}>`)
                    .join('\n')

                return `<!--

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

-->
<html${make_attrs(attributes.html)}>
<head>
    <meta charset="utf-8">
    <title>${title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta property="og:title" content="${title}"/>
    <meta property="og:description" content="an open-source web discord client"/>
    <meta property="og:type" content="website"/>
    <link href="assets/inter/inter.css" rel="stylesheet"${make_attrs(attributes.link)}>
    ${links}
</head>
<body>
    ${scripts}
</body>
</html>`
            },
            //inject:   'head',
            /*externals: [
                {
                    file: 'dist/assets/inter/inter.css',
                    type: 'css',
                    pos:  'before',
                },
                {
                    file: 'dist/bundle.css',
                    type: 'css',
                    pos:  'before',
                },
            ],*/
        }),
        copy({
            assets: [
                /* contains inter and the favicon */
                'src/assets',
            ],
        }),
    ],
}
