/**
 * CX Queue - Version 1.0
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

	var Queue = window.Class.create("Queue", (function() {
		
		// Constructor
		var Queue = function(options) {
			this._queue = ((options ? options.queue : []) || []);
			this._offset = 0;
		};
		
		function length() {
			return (this._queue.length - this._offset);
		}
		
		function isEmpty() {
			return (this._queue.length == 0);
		}
		
		function push(item) {
			this._queue.push(item);
		}
		
		function pop() {
			if (this.isEmpty()) { 
				return; 
			}
			
			var item = this._queue[this._offset];
			if ((++this._offset * 2) >= this._queue.length) {
				this._queue = Array.prototype.slice.call(this._queue, this._offset);
				this._offset = 0;
			}
			
			return item;
		}
		
		function peek(offset) {
			return (!this.isEmpty() ? this._queue[offset] : undefined);
		}
		
		function contains(item) {
			return (this._queue.indexOf(item) > -1);
		}
		
		function toString(offset) {
			if (this.isEmpty()) {
				return "[]";
			}
			
			var sb = [], i, l;
			sb.push("[");
			for(i = 0, l = this.length(); i < l; i++) {
				sb.push(this.peek(i));
				if ((i+1) < l) {
					sb.push(", ");
				}
			}
			sb.push("]");
			return sb.join("");
		}
		
		return {
			constructor: Queue,
			length: length,
			isEmpty: isEmpty,
			push: push,
			pop: pop,
      peek: peek,
			contains: contains,
			toString: toString
		};
	})());
	
	window.Queue = Queue;
	
}(window);