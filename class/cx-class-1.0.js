/**
 * CX Class - Version 1.0
 * 
 * Description:
 * 	Allows creation of classes.
 * 
 * Inspired in
 * 	Dojo Toolkit 1.8 - http://dojotoolkit.org/
 * 	Prototype 1.7.1 - http://prototypejs.org/
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
	var core_toString = Object.prototype.toString;

	function extend(destination, source) {
		for (var property in source) {
			destination[property] = source[property];
		}
		return destination;
	};
	
	var Class = (function() {
		
		function _forceNew(klass){
			tempKlass = new Function;
			tempKlass.prototype = klass.prototype;
			var instanceTempKlass = new tempKlass;
			tempKlass.prototype = null;
			return instanceTempKlass;
		}
		
		function _addMethods(target, name, fn) {
			if(core_toString.call(name) == "[object String]") {
				if((fn !== Object.prototype[name] || !(name in Object.prototype)) && name != 'constructor'){
					if(core_toString.call(fn) == "[object Function]"){
						fn.declareMethod = name;
					}
					target[name] = fn;
				}
			} else {
				for(var prop in name){
					_addMethods(target, prop, name[prop]);
				}
			}
		};
		
		var defaultMethods = {
			inherited: function inherited() {
				var args = arguments[0]
					, cache = this._inherited = this._inherited || {c: this.constructor};
				
				if(cache.c == Object) {
					cache.c = this.constructor;
				}
				
				// Handle method
				if(args.callee.declareMethod) {
					
					var exists = false
						, method = args.callee.declareMethod;
					
					cache.c = this.constructor;
					do {
						cache.c = cache.c._meta.superclass;
						if (cache.c.prototype[method]) {
							exists = true;
						}
					} while(cache.c._meta && !exists);
					
					var result = undefined;
					if(exists) {
						result = cache.c.prototype[method].apply(this, args);
					}
					return result;
					
				// Handle constructor
				} else {
					cache.c = cache.c._meta.superclass;
					return cache.c.apply(this, args);
				}
			},
			
			toString: function toString() {
				return ['Class<', this.declareClass, '>'].join('');
			}
		};
		
		var create = function (name, superclass, props) {
			if(typeof superclass !== 'function') {
				props = superclass;
				superclass = Object;
			}
			
			var proto = _forceNew(superclass), klass;
			
			if (!props.constructor) {
				props.constructor = Function;
			}
			
			klass = props.constructor;
			
			// Add default methods
			extend(proto, defaultMethods);
			
			// Add default properties
			extend(proto, {
				declareClass: name,
				constructor: klass
			});
			
			// Add properties
			_addMethods(proto, props);

			// Add prototype and metadata
			klass.prototype = proto;
			klass._meta = {
				superclass: superclass
			};
			
			return klass;
		};
		
		var addMethods = function(name, fn) {
			_addMethods(defaultMethods, name, fn);
		};
		
		var type = function(klass) {
			if (klass.declareClass) {
				return defaultMethods.toString.call(klass);
			}
			return core_toString.call(klass);
		};
		
		return {
			create: create,
			addMethods: addMethods,
			type: type
		};
	})();
	
	window.Class = Class;
	
}(window);
