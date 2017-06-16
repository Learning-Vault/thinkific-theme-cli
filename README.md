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
