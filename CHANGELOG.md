#   Change Log

Notable changes to this project will be documented in this file. This project adheres to [Semantic Versioning 2.0.0](http://semver.org/).

##	[0.0.4] - 2016-12

###	Added

Functions similiar to logic control statments ```if ... else ...``` offered, e.g.
```javascript
var dev = require('yuan-dev');

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

###	Fixed

In case of ```dev(dev.action(fn))```, action ```fn``` not invoked as expected on DEV mode.

---
This CHANGELOG.md follows [*Keep a CHANGELOG*](http://keepachangelog.com/).
