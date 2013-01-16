iConfig
========

`iCnf` is a nodejs module for supporting configeration.


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

Extra notice
------------
* the config file is `<PROJECT>/etc/<ENV>.json`

ChangeLog
----------

Sugguestion
-----------
You could contact [me][] through <yarco.wang@gmail.com> for this extension.
Or for programming related things, whatever.

This guy currently works in Wiredcraft.com. So you could also get him by <yarco@wiredcraft.com>

All rights reserved.

[me]:http://bbish.net