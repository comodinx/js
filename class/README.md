
CX Class
==

Comodinx Javascript library

Inspirado en [DOJO][Dojo] y [Prototype][Prototype].


Índice
------

* [Introducción][introduction].
* [Características][features].
* [¿Como se utiliza?][getting_started].
* [Licencia][license].


Introducción
------------
CX Class consta únicamente de cx-class.js. 

Permite la creación de clases basándose en el patrón "Herencia de prototipos".

	
Características
---------------
* Herencia
* Invocación de constructores o métodos de la súper clase mediante el método `inherited`.


¿Como se utiliza?
-----------------

#### Class.create(/*String*/name, /*Object*/properties);

Crea una clase de nombre `name` con las propiedades especificadas en `properties`.

```javascript
	var A = Class.create("A", {
		constructor: function A() {
			console.log("Class<A> <init>");
		}
	});
```

#### Class.create(/*String*/name, /*Function*/superclass, /*Object*/properties);

Crea una clase de nombre `name` con las propiedades especificadas en `properties`, que extiende de la clase `superclass`.

```javascript
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
```

#### Class.addMethods(/*String | Object*/name, /*Function?*/fn);

Agrega el método `name` a los métodos por defecto, que tendrán todas las clases creadas por `Class.create`.

```javascript
	Class.addMethods("inspect", function() {
		return ['#', this.declareClass].join('');
	});
	
	var A = Class.create("A", {
		constructor: function A() {}
	});

	var a = new A();

	a.inspect();
	
	//------------------------------------------------------------
	
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

	a.inspect();
	a.toString();
```

#### Class.type(/*Function*/klass);

Devuelve el tipo de una clase.

```javascript
	var A = Class.create("A", {
		constructor: function A() {}
	});

	var a = new A();

	Class.type(a); // -> "Class<A>"

	Class.type([]); // -> "[object Array]"
```


Licencia
--------
Copyright (c) 2013 - 2013 [Nicolás Molina - Comodinx and contributions]

Licenciado bajo MIT License

<!-- deep links -->
[introduction]: #introduccin
[features]: #caractersticas
[getting_started]: #como-se-utiliza
[examples]: #ejemplos

<!-- links to third party projects -->
[Dojo]: http://dojotoolkit.org/
[Prototype]: http://prototypejs.org/
