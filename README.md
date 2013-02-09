iconfig
========

`icnf` is a nodejs module for supporting configeration.


**License: This project is under GPL/BSD**

Intro
-----
There already exists a module named `config`, but for me, it is too large: i dont want supporting yml etc features, i just a simple solution.

So that's why i create this module. Certainly choice is in your mind.

How to install
--------------
`npm install icnf`

How to use
-----------
* create several config files under some directory in your project, for example:

```
<YOUR PROJECT>
+ etc/
  + production.json
  + testing.json
  + development.json
```

according to your needs. The format should always be **json format**.

* use icnf in your code

```
var icnf = require('icnf')(__dirname); // app root directory, that is <YOUR PROJECT>

var config = icnf(); // default is process.env.NODE_ENV || 'production', so it will auto use etc/production.json.

var config = icnf('development'); // then, now it will choose etc/development.json
```

### How to use _idiff_
There is also a tool named _idiff_ under bin/ above v0.0.3. This tool only check the key in the config file. For example:

```
$ ../bin/idiff production
  checking /Users/yarco/Sites/js/icnf/test/etc/development.json
- database.port
- database.more.name
! database.more.port
- keywords.1
```

Argument _production_ is the standard config file in this example. (That means you may treat that file as a standard.)
This file should be located in _etc/_ (etc/production.json).

* **-** means the key _database.port_ is lost in _development.json_ when comparing with _production.json_
* **!** means type does't match

**Notice:**

* Array like _keywords_ here will always treat as an object.
* Key exists in _development_ but not in _production_ will be totally ignored.
* _extend_ part won't be checked. cause it is used for common part

development to production (you could also add more files there, example: testing.json):

```
$ ../bin/idiff development
  checking /Users/yarco/Sites/js/icnf/test/etc/production.json
- gf
- database.more.kk
! database.more.port
```

Extra notice
------------
* the config file is `<PROJECT>/etc/<ENV>.json`
* files in subdirectories under etc/ will be totally ignored when using _idiff_

ChangeLog
----------
* 0.0.1 to 0.0.3
  * add _idiff_
  * add _extend_ feature for common part, see example under tests/

Sugguestion
-----------
You could contact [me][] through <yarco.wang@gmail.com> for this extension.
Or for programming related things, whatever.

This guy currently works in Wiredcraft.com. So you could also get him by <yarco@wiredcraft.com>

All rights reserved.

[me]:http://bbish.net