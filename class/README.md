CX Class
==

Comodinx Javascript library

Inspirado en [DOJO][Dojo] y [Prototype][Prototype].


�ndice
------

* [Introducci�n][introduction].
* [Caracter�sticas][features].
* [�Como se utiliza?][getting_started].
* [Licencia][license].


Introducci�n
------------
CX Class consta �nicamente de cx-class.js. 

Permite la creaci�n de clases bas�ndose en el patr�n "Herencia de prototipos".

	
Caracter�sticas
---------------
* Herencia
* Invocaci�n de constructores o m�todos de la s�per clase mediante el m�todo `inherited`.


�Como se utiliza?
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

Agrega el m�todo `name` a los m�todos por defecto, que tendr�n todas las clases creadas por `Class.create`.

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
Copyright (c) 2013 - 2013 [Nicol�s Molina - Comodinx and contributions]

Licenciado bajo MIT License

<!-- deep links -->
[introduction]: #introduccin
[features]: #caractersticas
[getting_started]: #como-se-utiliza
[licence]: #licencia

<!-- links to third party projects -->
[Dojo]: http://dojotoolkit.org/
[Prototype]: http://prototypejs.org/
