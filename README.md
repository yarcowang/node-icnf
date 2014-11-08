ICNF
========
_icnf_ is a nodejs module for supporting simple configeration in json format (but powerfull).

**License: GPL/BSD**

Intro
-----
There already exists a module named _config_, but for me, it is too large -- i dont want supporting yml etc features, i just want a simple solution but exactly have what i want.

So that's why i do this module. And of cause choice is yours.

How to install
--------------
`npm install icnf`

How to use
-----------
1. create several config files under `etc/` directory in your project, for example:

    ```
    <YOUR PROJECT>
    + etc/
      + production.json
      + testing.json
      + development.json
			comm/   -- this contains comm settings for all of the environments, but still configerable
				+ comm.json
				+ comm2.json
    ```

2. use _icnf_ in your code

    ```
    var icnf = require('icnf')(__dirname);
    // app root directory, that is <YOUR PROJECT>

    var config = icnf(); 
    // default is process.env.NODE_ENV || 'production', so it will automatically choose etc/production.json.

    var config = icnf('development'); 
    // choose etc/development.json explicitly
    ```

### How to use _idiff_
There is also a tool named _idiff_ under bin/ above v0.0.3. This tool only check the **key** in the config file. For example:

```
$ idiff production
  checking /Users/yarco/Sites/js/icnf/test/etc/development.json
- database.port
- database.more.name
! database.more.port
- keywords.1
```

Argument _production_ is the standard config file in this example. (That means you may treat that file as a standard.)
This file should be located in _etc/_ (etc/production.json).

* **-** means the key _database.port_ is lost in _development.json_ when comparing to _production.json_
* **!** means type does't match

**Notice:**

* Array like keys (ex. _keywords_ here) will always treat as an object.
* Key exists in _development_ but not in _production_ will be totally ignored.
* _extend_ part won't be checked. cause it is used for common part

Here is _development to production_ (you could also add more files there, ex. testing.json):

```
$ idiff development
  checking /Users/yarco/Sites/js/icnf/test/etc/production.json
- gf
- database.more.kk
! database.more.port
```

Extra notice
------------
* config file is `<PROJECT>/etc/<ENV>.json`, the name of `etc` is fixed
* the directory for comm part is `comm` (`<PROJECT>/etc/comm/<YOUR>.json`), is also fixed
* files in subdirectories under etc/ will be totally ignored when using _idiff_
* You can use environment variable now (>= v0.0.5), just prefix with **$**, for example: `{ "NODE_ENV": "$NODE_ENV" }`. _$NODE_ENV_ will be expanded to its real value.

ChangeLog
----------
* 0.0.5 to 0.0.6
  * add supporting multi-confs in `extend` keyword, see example: test/etc/production.json , key extend 
	* add key `extendEnvValue` in config if you want to disable checking environment variable
* 0.0.4 to 0.0.5
	* add support for environment variables, the value prefix with '$' will be expanded. (that means _"KEY": "$VALUE"_ will be treated as _"KEY": process.env.VALUE_ )
* 0.0.3 to 0.0.4
  * move repos from _yarcowang/icnf_ to _Yet-Another-Org/node-icnf_
  * change a bit README
  * add default argument in idiff (so, it will default choose `process.env.NODE_ENV || 'production'` without type `production`
* 0.0.1 to 0.0.3
  * add _idiff_
  * add _extend_ feature for common part, see example under tests/

Contact
--------
You could contact [me][] through <yarco.wang@gmail.com> according to further debugging or maintance. Programming related topics are also welcomed.

timezone: GMT+0800

[me]:http://bbish.net
