# think-npm
Thinkific NPM Tool

# How to install
* Clone it `git clone git@github.com:thinkific/think-npm.git`
* install dependencies `npm install`

# How to use:
* You'll need a thinkific API V1 key
* switch to the cloned directory
* start with `./think.js` and you should be able to continue from there

# Know issues
* help message isn't very friendly eg. `think.js themes <subcommand:list|download> <theme_id>`
* As it is at the moment, the sync is strict. Nothing should happen to the theme when sync command
is not watching the files.