CX Logger
==

Comodinx Javascript library


Índice
------

* [Introducción][introduction].
* [Características][features].
* [¿Como se utiliza?][getting_started].
	+ [Nuevo logger][new_logger].
	+ [Métodos de registración][log_methods].
	+ [Métodos para verificar el nivel de registración][is_methods].
	+ [Definiendo un nuevo controlador][new_handler].
* [Docs][docs]
  + [Opciones de inicialización][docs_options].
* [Licencia][license].


Introducción
------------
CX Logger consta de cx-class.js y cx-logger.js. 

Permite la registración de mensajes.

	
Características
---------------
* Registración de mensajes personalizable.


¿Como se utiliza?
-----------------

#### new Logger(options);

Crea una instancia de Logger.

`options` puede ser de tipo `string` indicando el nombre del logger o un objeto donde se especifique las [opciones deseadas][docs_options].

```javascript
	var log1 = new Logger('MyApp');
	
	//------------------------------------------------------------
	
	var log2 = new Logger({
		name: 'MyApp'
	});
```

#### logger.&#91;method&#93;(message &#91;, error&#93;);

Registra un mensaje.

```javascript
	var log = new Logger('MyApp');
	
	log.trace('mi mensaje trace');
	log.debug('mi mensaje debug');
	log.info('mi mensaje info');
	log.warn('mi mensaje warn');
	log.error('mi mensaje error');
	log.fatal('mi mensaje fatal');
```

#### logger.is&#91;level&#93;Enabled();

Indica si esta habilitado el registro de mensajes para el nivel especificado.

```javascript
	var log = new Logger('MyApp');
	
	if (log.isTraceEnabled()) {
		log.trace('mi mensaje trace');
	}
	
	if (log.isDebugEnabled()) {
		log.debug('mi mensaje debug');
	}
	
	if (log.isInfoEnabled()) {
		log.info('mi mensaje info');
	}
	
	if (log.isWarnEnabled()) {
		log.warn('mi mensaje warn');
	}
	
	if (log.isErrorEnabled()) {
		log.error('mi mensaje error');
	}
	
	if (log.isFatalEnabled()) {
		log.fatal('mi mensaje fatal');
	}
```

#### Nuevo controlador.

Permite establecer un nuevo controlador de registración de mensajes.

```javascript
	var log = new Logger({
		name: 'MyApp',
		handler: function(message, level) {
			window.console.log('My handler -> ' + message);
		}
	});
```


Docs
----

#### Opciones de inicialización.
<table>
	<thead>
		<tr>
			<th>Nombre</th>
			<th>Tipo</th>
			<th>Default</th>
			<th>Descripción</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>name</td>
			<td>String</td>
			<td>"Log"</td>
			<td>Indica el prefijo de mensaje a registrar.</td>
		</tr>
		<tr>
			<td>separator</td>
			<td>String</td>
			<td>" - "</td>
			<td>Indica el separador de las partes del mensaje a registrar.</td>
		</tr>
		<tr>
			<td>level</td>
			<td>Number</td>
			<td>Logger.DEBUG (0)</td>
			<td>
				Indica el nivel de mensaje que se debe registrar.
				Posibles valores: 
				<ul>
					<li>Logger.TRACE: -1</li>
					<li>Logger.DEBUG: 0</li>
					<li>Logger.INFO: 1</li>
					<li>Logger.WARN: 2</li>
					<li>Logger.ERROR: 3</li>
					<li>Logger.FATAL: 4</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>date</td>
			<td>Boolean</td>
			<td>true</td>
			<td>Indica si se debe mostrar la fecha del mensaje.</td>
		</tr>
		<tr>
			<td>handler</td>
			<td>Function</td>
			<td>Logger.CONSOLE</td>
			<td>
				Función encargada de procesar los mensajes.
				Posibles valores: 
				<ul>
					<li>Logger.CONSOLE</li>
					<li>Logger.ALERT</li>
					<li>O una función controladora.</li>
				</ul>
				Nota: El tipo es del logger es personalizable.
			</td>
		</tr>
	</tbody>
</table>


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
[new_logger]: #new-loggeroptions
[log_methods]: #loggermethodmessage--error
[is_methods]: #loggerislevelenabled
[new_handler]: #nuevo-controlador
[docs]: #docs
[docs_options]: #opciones-de-inicializacin
[license]: #licencia
