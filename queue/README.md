CX Queue
==

Comodinx Javascript library


Índice
------

* [Introducción][introduction].
* [¿Como se utiliza?][getting_started].
  + [Queue.push][queue_push].
  + [Queue.pop][queue_pop].
  + [Queue.peek][queue_peek].
  + [Queue.lenght][queue_lenght].
  + [Queue.isEmpty][queue_isempty].
  + [Queue.contains][queue_contains].
  + [Queue.toString][queue_tostring].
* [Licencia][license].


Introducción
------------
CX Queue consta de cx-class.js y cx-queue.js. 

Permite encolar items.


¿Como se utiliza?
-----------------

#### Queue.push(item);

Agrega un item al final de la cola.

```javascript
	var queue = new Queue();
	
	queue.push("a");
```

#### Queue.pop();

Remueve el primer item de la cola.

```javascript
	var queue = new Queue();
	
	queue.pop(); // undefined
	
	queue.push("a");
	queue.push("b");
	queue.pop(); // a
```

#### Queue.peek(offset);

Devuelve el item ubicado en la posición `offset` de la cola.

```javascript
	var queue = new Queue();
	
	queue.push("a");
	queue.push("b");
	queue.push("c");
	queue.push("d");
	queue.peek(2); // c
```

#### Queue.length();

Devuelve el tamaño de la cola.

```javascript
	var queue = new Queue();
	
	queue.push("a");
	queue.push("b");
	queue.push("c");
	queue.push("d");
	queue.length(); // 4
```

#### Queue.isEmpty();

Indica si la cola contiene items.

```javascript
	var queue = new Queue();
	
	queue.isEmpty(); // true
	
	queue.push("a");
	queue.push("b");
	queue.push("c");
	queue.push("d");
	queue.isEmpty(); // false
```

#### Queue.contains(item);

Indica si la cola contiene a `item`.

```javascript
	var queue = new Queue();
	
	queue.contains("a"); // false
	
	queue.push("a");
	queue.contains("a"); // true
```

#### Queue.toString();

Devuelve una cadena de caracteres que representa la cola.

```javascript
	var queue = new Queue();
	
	queue.push("a");
	queue.push("b");
	queue.push("c");
	queue.push("d");
	queue.toString(); // [a, b, c, d]
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
[getting_started]: #como-se-utiliza
[queue_push]: #queuepushitem
[queue_pop]: #queuepop
[queue_peek]: #queuepeekoffset
[queue_length]: #queuelength
[queue_isempty]: #queueisempty
[queue_contains]: #queuecontainsitem
[queue_tostring]: #queuetostring
[license]: #licencia
