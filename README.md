#	Yuan-DEV

*yuan-dev* makes it easy to return something different for debug. For example, normally we will start the http server listening to port 80, however, we may want it listening to port 8080 instead when debugging:

```javascript
// index.js

const http = require('http');
const dev = require('dev');

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

```dev.action()``` will not do play outside of ```dev()```. However, another method is offered:

```javascript
dev.run(() => {
	console.log('We are under DEV mode now.');
});

dev.run('LOCAL', () => {
	console.log('WE are under DEV mode (LOCAL) now.');
});
```

##	more

```bash
npm install
npm test
```