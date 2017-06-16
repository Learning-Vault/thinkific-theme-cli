# think-npm
Thinkific NPM Tool

# How to install
* Run `npm i -g git://git@github.com:thinkific/think-npm.git#implement-global-cli`

# How to use:
* You'll need a thinkific API V1 key
* Run `thinkcli` and you should be able to continue from there

# Know issues
* Help message isn't very friendly eg. `thinkcli themes <subcommand:list|download> <theme_id>`
* As it is at the moment, the sync is strict. Nothing should happen to the theme when sync command
is not watching the files.

# How to develop
* Clone it `git clone git@github.com:thinkific/think-npm.git`
* Install dependencies `npm install`

# License

Copyright (c) 2017 Thinkific

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
