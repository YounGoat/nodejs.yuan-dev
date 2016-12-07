See [CHANGE LOG](./CHANGELOG.md) for notable changes.

#	Yuan-DEV

*yuan-dev* makes it easy to return something different for debug.

## Quick Start

For example, normally we will start the http server listening to port 80, however, we may want it listening to port 8080 instead when debugging:

```javascript
// index.js

const http = require('http');
const dev = require('yuan-dev');

const server = http.createServer((req, res) => {
	res.end('Hello Yuan DEV!');
});

var port = dev('LOCAL', 8080, 80);
server.listen(port);
```

By default, the port will be 80. While run with env DEV set, port 8080 will be used:

```bash
DEV=LOCAL node index
```

##	Define Values For More Dev Modes

Of course, We can also do it by the way more ordinary:

```javascript
var port = dev('LOCAL') ? 8080 : 80;
```

Or, to accomplish more, we can define different values:

```javascript
var port = dev({ LOCAL: 8080, FAT: 8088, UAT: 3000 }, 80);
```

The, we will get:

```bash
# port 8088
DEV=FAT node index

# port 3000
DEV=UAT node index
```

The __DEV__ environment variable SHOULD be comma-delimited names, e.g.
```bash
DEV=FAT,INFO node index
```

##	About Returned Values

Although the values used in *yuan-dev*  are generally simple scalars (number, string or boolean), they may also be anything including function object:

```javascript
var fnGetPort = dev({
	LOCAL : () => 8080 },
	FAT   : () => 8088 },
	UAT   : () => 3000 }
}, () => 80 );

var port = fnGetPort();
```

##	Do Something On Dev Mode

And, if you want do something special on dev mode, ```dev.action()``` is helpful:

```javascript
var port = dev({
	LOCAL: dev.action(() => {
		console.log('The server will listen to 8080.');
		return 8080;
	}
}, 80);
```

```dev.action()``` will not do play outside of ```dev()```.

However, another method is offered:

```javascript
//  Run immediately on DEV mode.
dev.run(() => {
	console.log('We are under DEV mode now.');
});

// Equals to,
if (dev()) {
	console.log('We ares under DEV mode now.');
}

// Of course, we can do something ONLY on special DEV mode.
dev.run('LOCAL', () => {
	console.log('We are under DEV mode (LOCAL) now.');
});

// In more complex cases, we can use functions similiar to logic control statements.
// if() ... elif()/elseif() ... else()
dev
	.if('LOCAL', () => {
		console.log('We are under DEV mode (LOCAL) now.');
	})
	.elseif('FAT', () => {
		console.log('We are under DEV mode (FAT) now.');
	})
	.else(() => {
		console.log('We ares NOT under DEV mode (LOCAL) or DEV mode (FAT) now.');
		console.log('ATTENTION: But maybe we are under some DEV mode other than LOCAL or FAT.');
	});

dev
	.if(() => {
		console.log('We are under DEV mode.');
	})
	.else(() => {
		console.log('We are NOT under any DEV mode.');
	})
```

Not everybody like this syntax sugar, but I think it is more elegant using ```dev.if().else()``` than the general ```if ... else ...``` control statement.

##	more

Run the next commands to install devDependencies and run *mocha* unit test:
```bash
npm install
npm test
```
