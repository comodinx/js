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

/*
	
	// Examples

	console.log('Example 1: Expected shown in console "Class<A> <init>"');

	var A = Class.create("A", {
		constructor: function A() {
			console.log("Class<A> <init>");
		}
	});

	new A(); // ==> Shown in console "Class<A> <init>"

	//#########################################################
	//#########################################################
	//#########################################################

	console.log('Example 2: Expected shown in console "Class<B> <init>"');

	var A = Class.create("A", {
		constructor: function A() {
			console.log("Class<A> <init>");
		}
	});

	var B = Class.create("B", A, {
		constructor: function B() {
			console.log("Class<B> <init>");
		}
	});

	new B(); // ==> Shown in console "Class<B> <init>"

	//#########################################################
	//#########################################################
	//#########################################################

	console.log('Example 3: Expected shown in console "Class<A> <init>", "Class<B> <init>"');

	var A = Class.create("A", {
		constructor: function A() {
			console.log("Class<A> <init>");
		}
	});

	var B = Class.create("B", A, {
		constructor: function B() {
			this.inherited(arguments);
			console.log("Class<B> <init>");
		}
	});

	new B(); // ==> Shown in console "Class<A> <init>", "Class<B> <init>"

	//#########################################################
	//#########################################################
	//#########################################################

	console.log('Example 4: Expected shown in console "Class<B> <init>", "Class<A> <init>"');

	var A = Class.create("A", {
		constructor: function A() {
			console.log("Class<A> <init>");
		}
	});

	var B = Class.create("B", A, {
		constructor: function B() {
			console.log("Class<B> <init>");
			this.inherited(arguments);
		}
	});

	new B(); // ==> Shown in console "Class<B> <init>", "Class<A> <init>"

	//#########################################################
	//#########################################################
	//#########################################################

	console.log('Example 5: Expected shown in console "Class<A> <init>", "Class<B> <init>", "Class<C> <init>"');

	var A = Class.create("A", {
		constructor: function A() {
			console.log("Class<A> <init>");
		}
	});

	var B = Class.create("B", A, {
		constructor: function B() {
			this.inherited(arguments);
			console.log("Class<B> <init>");
		}
	});

	var C = Class.create("C", B, {
		constructor: function C() {
			this.inherited(arguments);
			console.log("Class<C> <init>");
		}
	});

	new C(); // ==> Shown in console "Class<A> <init>", "Class<B> <init>", "Class<C> <init>"

	//#########################################################
	//#########################################################
	//#########################################################

	console.log('Example 6: Expected shown in console "Class<B> <init>", "Class<C> <init>"');

	var A = Class.create("A", {
		constructor: function A() {
			console.log("Class<A> <init>");
		}
	});

	var B = Class.create("B", A, {
		constructor: function B() {
			console.log("Class<B> <init>");
		}
	});

	var C = Class.create("C", B, {
		constructor: function() {
			this.inherited(arguments);
			console.log("Class<C> <init>");
		}
	});

	new C(); // ==> Shown in console "Class<B> <init>", "Class<C> <init>"

	//#########################################################
	//#########################################################
	//#########################################################

	console.log('Example 7: Expected shown in console "Class<A> greet!!!"');

	var A = Class.create("A", {
		constructor: function A() {},

		greet: function() {
			console.log("Class<A> greet!!!");
		}
	});

	var B = Class.create("B", A, {
		constructor: function B() {
			this.inherited(arguments);
		}
	});

	var C = Class.create("C", B, {
		constructor: function C() {
			this.inherited(arguments);
		},

		greet: function() {
			this.inherited(arguments);
		}
	});

	var c = new C();

	c.greet(); // ==> Shown in console "Class<A> greet!!!"

	//#########################################################
	//#########################################################
	//#########################################################

	console.log('Example 8: Expected shown in console "#A"');

	Class.addMethods("inspect", function() {
		return ['#', this.declareClass].join('');
	});
	
	var A = Class.create("A", {
		constructor: function A() {}
	});

	var a = new A();

	console.log(a.inspect()); // ==> Shown in console "#A"

	//#########################################################
	//#########################################################
	//#########################################################

	console.log('Example 9: Expected shown in console "#A", "Class<A>"');

	Class.addMethods({
		inspect: function() {
			return ['#', this.declareClass].join('');
		},
		
		toString: function() {
			return ['Class<', this.declareClass, '>'].join('');
		}
	});
	
	var A = Class.create("A", {
		constructor: function A() {}
	});

	var a = new A();

	console.log(a.inspect()); // ==> Shown in console "#A"
	
	console.log(a.toString()); // ==> Shown in console "Class<A>"
	
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