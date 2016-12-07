/**
 * @author youngoat@163.com
 */

var MODULE_REQUIRE
	/* built-in */

	/* NPM */

	/* in-package */
	;

var _parse_modes = function(modes) {
	if (!modes) {
		modes = [];
	}
	else {
		modes = modes.split(',');
		for (var i = 0; i < modes.length; i++) {
			modes[i] = modes[i].trim();
		}
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

	// (Action)
	else if (arguments[0] instanceof Action) {
		if (MODES.length > 0) {
			value = arguments[0];
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

dev.run = function FOO() {
	var onDev = false, action;
	if (typeof arguments[0] == 'string' && typeof arguments[1] == 'function') {
		onDev = dev(arguments[0]);
		action = arguments[1];
	}

	else if (typeof arguments[0] == 'function') {
		onDev = dev();
		action = arguments[0];
	}

	else {
		throw new Error('Invalid dev.run() invoking.');
	}

	if (onDev) action();

	var ret = {
		elif: function() {
			if (!onDev) return FOO.apply(null, arguments);
			else return ret;
		},

		else: function(fn) {
			if (!onDev) fn();
		}
	};

	return ret;
};

dev.if = dev.run;

module.exports = dev;
