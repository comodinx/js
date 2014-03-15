/**
 * CX Timer - Version 1.0
 * 
 * Dependecias:
 * 	cx-class >= 1.0
 * 
 * License:
 * 	MIT license. 
 * 
 * Copyright:
 * 	Copyright (c) 2013 - 2014 [Nicolas Molina - Comodinx] (http://opensource.org/licenses/mit-license.php)
 * 
 * Maintained by
 * 	Nicolas Molina <molinan@firstsystems.com.ar>, <comodinx@gmail.com>
 */
 
!function(window) {
	
	function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.substring(1).toLowerCase();
  }
	
	function extend(target, source) {
    var name;
		for(name in source) {
			target[name] = source[name];
		}
		return target;
  }
	
	function mixin(target) {
    var i, l;
		for(i = 1, l = arguments.length; i < l; i++) {
			extend(target, arguments[i]);
		}
		return target;
  }
	
	var TimerPool = window.Class.create("TimerPool", (function() {
		
		function _each(timers, callback) {
			for (var i = 0, l = timers.length; i < l; ) {
				if ( callback.call( timers[ i ], i, timers[ i++ ] ) === false ) {
					break;
				}
			}
		}
		
		function _resolveTimers(pool, timers) {
			var options, callback;
			_each(timers, function(i, timer) {
				if (typeof timer === 'function') {
					callback = timer;
				} else {
					callback = timer.callback;
					options = timer.options;
				}
				pool.add(callback, options);
			});
		}
		
		var TimerPool = function(options, timers) {
			if (Object.prototype.toString(options) === '[object Array]') {
				timers = options;
				options = {};
			}
			
			this.options = mixin({}, defaultTimerPoolOptions, (options || {}));
			this._timers = [];
			this._timerIdCount = 0;
			this.state = TimerTask.states.UNSTARTED;
			
			_resolveTimers(this, (timers || this._timers));
		}
		
		, defaultTimerPoolOptions = {
			interval: 1000,
			onChangeState: false,
			stopOnError: true,
			autoStart: false
		};
		
		function add(callback, options) {
			var opts = mixin({}, this.options, (options || {}))
				, timer = new TimerTask(callback, opts);
			
			this._timers.push(timer);
			if (!timer.timer_id) {
				timer.timer_id = ('TimerTask-' + (++this._timerIdCount));
			}
			
			if (this.state == TimerTask.states.RUNNING) {
				timer.start();
			}
			return timer;
		}
			
		function remove(index) {
			if (isNaN(index)) {
				index = this.indexOf(index);
			}
			
			if (index < 0 || index > this._timers.length-1) {
				return; 
			}
			var timer = this._timers.splice(index, 1);
			timer[0].stop();
			delete timer[0];
		}
			
		function clean() {
			this.stop();
			var i, l;
			for (i = 0; i < this.length();) {
				this.remove(i);
			}
		}
		
		function indexOf(id) {
			var i, l;
			for (i = 0, l = this.length(); i < l; i++) {
				if (this._timers[i].timer_id == id) {
					return i; 
				}
			}
			return -1;
		}
		
		function length() {
			return this._timers.length;
		}
		
		function start(delay) {
			this.state = TimerTask.states.RUNNING;
			_each(this._timers, function(i, timer) {
				timer.start(delay);
			});
			return this;
		}

		function stop(state) {
			state = (state || TimerTask.states.STOPPED);
			this.state = state;
			_each(this._timers, function(i, timer) {
				timer.stop(state);
			});
			return this;
		}

		function sleep(millis) {
			this.stop();
			this.start(millis);
			return this;
		}

		function cancel() {
			this.stop(TimerTask.states.CANCELED);
			return this;
		}

		function complete() {
			this.stop(TimerTask.states.COMPLETE);
			return this;
		}

		function setTime(time) {
			_each(this._timers, function(i, timer) {
				timer.setTime(time);
			});
			return this;
		}
		
		return {
			constructor: TimerPool,
			add: add,
			remove: remove,
			clean: clean,
			indexOf: indexOf,
			length: length,
			start: start,
			stop: stop,
			sleep: sleep,
			cancel: cancel,
			complete: complete,
			setTime: setTime
		};
		
	})())
	
	, TimerTask = window.Class.create("TimerTask", (function() {
		
		var TimerTask = function(callback, options) {
			options = (options || {});
			this.callback = callback;
			this.options = mixin({}, defaultOptions, options);
			this._timer = null;
			this._timerout = null;
			
			this.state = TimerTask.states.UNSTARTED;
			this.stateInfo = null;
			
			// Register history states
			if (this.options.history) {
				this.historyState = [];
			}
			// Auto start
			if (this.options.autoStart) {
				this.start();
			}
		}
		
		, defaultOptions = {
			interval: 1000,
			onChangeState: false,
			stopOnError: true,
			autoStart: false,
			history: false
		};
		
		TimerTask.states = {
			UNSTARTED:"unstarted",
			WAITING:"waiting",
			RUNNING:"running",
			STOPPED:"stopped",
			CANCELED:"canceled",
			COMPLETE:"complete",
			ERROR:"error"
		};
		
		function _start(timer) {
			_changeState(timer, TimerTask.states.RUNNING);
			timer._timer = setInterval(function() {
				try {
					// Execute function
					timer.callback(timer);
				} catch(e) {
					_changeState(timer, TimerTask.states.ERROR);
					timer.stateInfo = e;
					
					// Check if stop timer on error
					if (timer.options.stopOnError) {
						timer.stop(TimerTask.states.ERROR);
					} else {
						_changeState(timer, TimerTask.states.RUNNING);
					}
				}
			}, timer.options.interval);
		}
		
		function _changeState(timer, state) {
			if (timer.state != state) {
				var lastState = timer.state
					, eventState = timer.options[('on' + capitalize(state))];
				
				// Set new state
				timer.state = state;
				
				// Execute on change state
				if (timer.options.onChangeState) {
					timer.options.onChangeState(timer, lastState, state);
				}
				
				// Execute on event state
				if (eventState) {
					eventState(timer, lastState);
				}
				
				// Register history states
				if (timer.options.history) {
					timer.historyState.push({
						date: new Date(),
						state: lastState
					});
				}
			}
		}
		
		function start(delay) {
			if (this.state != TimerTask.states.RUNNING && this.state != TimerTask.states.WAITING) {
				var self = this;
				_changeState(self, TimerTask.states.WAITING);
				self._timerout = setTimeout(function() {
					_start(self);
				}, (delay || 0));
			}
			return this;
		}

		function stop(state) {
			if (this.state != TimerTask.states.STOPPED && this.state != TimerTask.states.CANCELED && 
					this.state != TimerTask.states.COMPLETE && this.state != TimerTask.states.ERROR) {
				_changeState(this, (state || TimerTask.states.STOPPED));
				// Clear timeout
				if (this._timerout != null) {
					clearTimeout(this._timerout);
					this._timerout = null;
				}
				// Clear interval
				if (this._timer != null) {
					clearInterval(this._timer);
					this._timer = null;
				}
			}
			return this;
		}

		function sleep(millis) {
			if (this.state == TimerTask.states.RUNNING || this.state == TimerTask.states.WAITING) {
				this.stop();
				this.start(millis);
			}
			return this;
		}

		function cancel() {
			if (this.state == TimerTask.states.RUNNING || this.state == TimerTask.states.WAITING) {
				this.stop(TimerTask.states.CANCELED);
			}
			return this;
		}

		function complete() {
			if (this.state == TimerTask.states.RUNNING || this.state == TimerTask.states.WAITING) {
				this.stop(TimerTask.states.COMPLETE);
			}
			return this;
		}

		function setTime(time) {
			var state = this.state;
			if (state == TimerTask.states.RUNNING || state == TimerTask.states.WAITING) {
				this.stop();
			}
			this.options.interval = time;
			if (state == TimerTask.states.RUNNING || state == TimerTask.states.WAITING) {
				this.start();
			}
			return this;
		}

		return {
			constructor: TimerTask,
			start: start,
			stop: stop,
			sleep: sleep,
			cancel: cancel,
			complete: complete,
			setTime: setTime
		};

	})())
	
	, TimerExec = window.Class.create("TimerExec", (function() {
		
		var TimerExec = function(callback, time) {
			this.callback = callback;
			this.time = (time || 1000);
			this.executing = false;
			this.start();
		};

		function start() {
			if (this.timer) return;
			
			var self = this;
			self.timer = setInterval(function() {
				if (!self.executing) {
					try {
						self.executing = true;
						self.callback(self);
						self.executing = false;
					} catch(e) {
						self.executing = false;
						throw e;
					}
				}
			}, self.time);
		}

		function stop() {
			if (!this.timer) return;
			clearInterval(this.timer);
			this.timer = null;
		}
		
		return {
			constructor: TimerExec,
			start: start,
			stop: stop
		};
		
	})());
	
	window.TimerPool = TimerPool;
	window.TimerTask = TimerTask;
	window.TimerExec = TimerExec;
	
}(window);