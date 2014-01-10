CX Class
==

Comodinx Javascript library

Inspirado en [DOJO][Dojo] y [Prototype][Prototype].


Índice
------

* [Introducción][introduction].
* [Caracterásticas][features].
* [¿Como se utiliza?][getting_started].
  + [Class.create][class_create].
  + [Class.addMethods][class_addmethods].
  + [Instance.addMethods][instance_addmethods].
  + [Class.type][class_type].
* [Licencia][license].


Introducción
------------
CX Class consta únicamente de cx-class.js. 

Permite la creación de clases basándose en el patrón "Herencia de prototipos".

  
Caracterásticas
---------------
* Herencia
* Invocación de constructores o métodos de la súper clase mediante el método `inherited`.


¿Como se utiliza?
-----------------

#### Class.create(name, properties);

Crea una clase de nombre `name` con las propiedades especificadas en `properties`.

```javascript
  var A = Class.create("A", {
    constructor: function A() {
      console.log("Class<A> <init>");
    }
  });
```

#### Class.create(name, superclass, properties);

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

#### Class.addMethods(name, fn);

Agrega el método `name` a los métodos por defecto, que tendrán todas las clases creadas por `Class.create`.

```javascript
  Class.addMethods("inspect", function() {
    return ['#', this.declareClass].join('');
  });
  
  var A = Class.create("A", {
    constructor: function A() {}
  });

  var a = new A();

  a.inspect(); // #A
  
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

  a.inspect();  // #A
  a.toString(); // Class<A>
```

#### Instance.addMethods(name, fn);

Agrega el método `name` a los métodos por defecto, que tendrán todas las instancias de `Instance`.

```javascript
  var A = Class.create("A", {
    constructor: function A() {}
  });
  
  A.addMethods("inspect", function() {
    return ['#', this.declareClass].join('');
  });

  var a = new A();

  a.inspect(); // #A
  
  //------------------------------------------------------------
  
  var A = Class.create("A", {
    constructor: function A() {}
  });
  
  A.addMethods({
    inspect: function() {
      return ['#', this.declareClass].join('');
    },
    
    toString: function() {
      return ['Class<', this.declareClass, '>'].join('');
    }
  });
  
  var B = Class.create("B", {
    constructor: function B() {}
  });

  var a = new A();
  var b = new B();

  a.inspect();  // #A
  a.toString(); // Class<A>
  b.inspect;    // undefined
```

#### Class.type(klass);

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
The MIT License (MIT)

Copyright (c) 2013 - 2013 [Nicolás Molina - Comodinx and contributions]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

<!-- deep links -->
[introduction]: #introduccin
[features]: #caractersticas
[getting_started]: #como-se-utiliza
[class_create]: #classcreatename-properties
[class_addmethods]: #classaddmethodsname-fn
[instance_addmethods]: #instanceaddmethodsname-fn
[class_type]: #classtypeklass
[license]: #licencia

<!-- links to third party projects -->
[Dojo]: http://dojotoolkit.org/
[Prototype]: http://prototypejs.org/
