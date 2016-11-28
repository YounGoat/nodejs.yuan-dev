/**
 * @author youngoat@163.com
 */

var MODULE_REQUIRE
	/* built-in */

	/* NPM */

	/* in-package */
	;

var _parse_modes = function(modes) {
	modes = modes.split(',');
	for (var i = 0; i < modes.length; i++) {
		modes[i] = modes[i].trim();
	}
	return modes;
};

var MODES = _parse_modes(process.env.DEV);

function Action(fn) {
	this.todo = fn;
};

Action.prototype.run = function() {
	this.todo();
};

function dev() {
	var value;

	// ---------------------------
	// Args processing.

	// ()
	if (arguments.length == 0) {
		value = (MODES.length > 0);
	}

	// (mode)
	else if (typeof arguments[0] == 'string' && arguments.length == 1) {
		var modes = _parse_modes(arguments[0]);
		value = false;
		for (var i = 0; i < modes.length; i++) {
			if (MODES.indexOf(modes[i]) >= 0) {
				value = true;
				break;
			}
		}
	}

	// (mode, value, default)
	else if (typeof arguments[0] == 'string') {
		value = arguments[2];
		var modes = _parse_modes(arguments[0]);
		for (var i = 0; i < modes.length; i++) {
			if (MODES.indexOf(modes[i]) >= 0) {
				value = arguments[1];
				break;
			}
		}
	}

	// (modeValues, default)
	else if (typeof arguments[0] == 'object' && arguments.length < 3) {
		value = arguments[1];
		var modeValues = arguments[0];
		for (var i = 0; i < MODES.length; i++) {
			if (modeValues.hasOwnProperty(MODES[i])) {
				value = modeValues[MODES[i]];
				break;
			}
		}
	}

	else {
		throw new Error('Invalid dev() invoking.');
	}

	// ---------------------------
	// Find matching mode.

	// ---------------------------
	// Return matching value,
	// OR run the matchin action.
	return (value instanceof Action) ? value.run() : value;
};

dev.action = function(fn) {
	return new Action(fn);
};

dev.run = function() {
	if (typeof arguments[0] == 'string' && typeof arguments[1] == 'function') {
		if (dev(arguments[0])) arguments[1]();
	}

	else if (typeof arguments[0] == 'function') {
		if (dev()) arguments[0]();
	}

	else {
		throw new Error('Invalid dev.run() invoking.');
	}
};

module.exports = dev;
