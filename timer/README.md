CX Timer (Documentación incompleta)
==

Comodinx Javascript library


Índice
------

* [Introducción][introduction].
* [¿Como se utiliza?][getting_started].
	+ [Ejecución periodica][periodical_executor].
* [Licencia][license].


Introducción
------------
CX Timer consta de cx-class.js y cx-timer.js. 


¿Como se utiliza?
-----------------

#### Utilizar una instancia

Ejecución periodica.

```javascript
  var count = 0;
	new TimerExec(function(te) {
    if (count == 3) {
		  console.log('Finalize TimerExec');
			te.stop();
    }
    console.log('TimerExec [' + count++ + ']');
  });
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
[periodical_executor]: #ejecucin-periodica
[object_base64]: #utilizar-directamente-el-objeto-base64
[license]: #licencia
