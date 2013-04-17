/**
 * CX Logger - Version 1.0
 * 
 * Description:
 * 	Allows messages register.
 * 
 * Dependecias:
 * 	cx-class >= 1.0
 * 
 * License:
 * 	MIT license. 
 * 
 * Copyright:
 * 	Copyright (c) 2013 - 2013 [Nicolas Molina - Comodinx] (http://opensource.org/licenses/mit-license.php)
 * 
 * Maintained by
 * 	Nicolas Molina <molinan@firstsystems.com.ar>, <comodinx@gmail.com>
 */
 
!function(window) {
	
	function isUndefined(o) {
		return typeof o === 'undefined';
	}
	
	window.Logger = window.Class.create('Logger', (function() { 
	
		var Logger = function(options) {
			options = (options || {})
		
			if (typeof options === 'string') {
				options = {name: options};
			}
			
			this._name = (options.name || 'Log');
			this._separator = (options.separator || ' - ');
			this._level = (options.level || Logger.DEBUG);
			this._handler = (options.handler || Logger.CONSOLE);
			this._showDate = (!isUndefined(options.date) ? options.date : true);
		}; 

		// Logger type
		Logger.CONSOLE = function(message) {
			window.console.log(message);
		};
		
		Logger.ALERT = function(message) {
			alert(message);
		};

		// Logger level
		Logger.TRACE 	= -1;
		Logger.DEBUG 	= 0;
		Logger.INFO 	= 1;
		Logger.WARN 	= 2;
		Logger.ERROR 	= 3;
		Logger.FATAL 	= 4;
		
		function leftPad(str, size, padStr) {
			if (isUndefined(str)) {
				return;
			}
			if (isUndefined(padStr) || padStr.length == 0) {
				padStr = " ";
			}
			
			str = str.toString();
			if ((size - str.length) <= 0) {
				return str; // returns original String when possible
			}
			
			var padLen = padStr.length
				, strLen = str.length
				, pads = size - strLen
				, padding
				, padChars
				, i;
			if (pads == padLen) {
				return padStr.concat(str);
				
			} else if (pads < padLen) {
				return padStr.substring(0, pads).concat(str);
				
			} else {
				padding = [];
				padChars = padStr.split();
				for (i = 0; i < pads; i++) {
					padding.push(padChars[i % padLen]);
				}
				return padding.join('').concat(str);
			}
		}

		function _resolveDate(log) {
			var messageBuilder = []
				, date;
			if (log._showDate) {
				date = new Date();
				messageBuilder.push(date.getFullYear())
				messageBuilder.push('-');
				messageBuilder.push(leftPad(date.getMonth(), 2, '0'));
				messageBuilder.push('-');
				messageBuilder.push(leftPad(date.getDate(), 2, '0'));
				messageBuilder.push(' ');
				messageBuilder.push(leftPad(date.getHours(), 2, '0'));
				messageBuilder.push(':');
				messageBuilder.push(leftPad(date.getMinutes(), 2, '0'));
				messageBuilder.push(':');
				messageBuilder.push(leftPad(date.getSeconds(), 2, '0'));
				messageBuilder.push(',');
				messageBuilder.push(date.getMilliseconds());
				messageBuilder.push(' ');
			}
			return messageBuilder.join('');
		}
		
		function _resolveError(log, error) {
			var messageBuilder = []
				, throwError;
			if (error) {
				if (error.stack) {
					throwError = error.stack;
				} else if (error.message) {
					throwError = error.message;
				} else {
					throwError = error.toString();
				}
			}
			if (throwError) {
				messageBuilder.push(log._separator);
				messageBuilder.push('\n');
				messageBuilder.push(throwError);
			}
			return messageBuilder.join('');
		}
		
		function _log(log, stringLevel, message, error) {
			var level = Logger[stringLevel]
				, messageBuilder;
		 if (!isUndefined(level) && log._level <= level ) {
				messageBuilder = [];
			messageBuilder.push(_resolveDate(log));
			messageBuilder.push('[');
			messageBuilder.push(stringLevel);
			messageBuilder.push('] ');
			messageBuilder.push(log._name);
			messageBuilder.push(log._separator);
			messageBuilder.push((message || ''));
			messageBuilder.push(_resolveError(log, error));
			log._handler(messageBuilder.join(''), stringLevel);
		 }
		};
		
		return {
			constructor: Logger,
			
			trace: function(message, error) { return _log(this, "TRACE", message, error); },
			debug: function(message, error) { return _log(this, "DEBUG", message, error); },
			info: function(message, error) { return _log(this, "INFO",  message, error); },
			warn: function(message, error) { return _log(this, "WARN",  message, error); },
			error: function(message, error) { return _log(this, "ERROR", message, error); },
			fatal: function(message, error) { return _log(this, "FATAL", message, error); },
			
			isTraceEnabled: function() { return this._level <= Logger.TRACE; },
			isDebugEnabled: function() { return this._level <= Logger.DEBUG; },
			isInfoEnabled: function() { return this._level <= Logger.INFO; },
			isWarnEnabled: function() { return this._level <= Logger.WARN; },
			isErrorEnabled: function() { return this._level <= Logger.ERROR; },
			isFatalEnabled: function() { return this._level <= Logger.FATAL; }
		};
		
	})());
	
}(window);