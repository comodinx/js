CX Cipher
==

Comodinx Javascript library


Índice
------

* [Introducción][introduction].
* [¿Como se utiliza?][getting_started].
	+ [Cipher.utf8Encode][cipher_utf8encode].
	+ [Cipher.base64Encode][cipher_base64encode].
	+ [Cipher.base64Decode][cipher_base64decode].
	+ [Cipher.hexaEncode][cipher_hexaencode].
	+ [Cipher.hexaDecode][cipher_hexadecode].
	+ [Cipher.binaryEncode][cipher_binaryencode].
	+ [Cipher.binaryDecode][cipher_binarydecode].
	+ [Cipher.decimalEncode][cipher_decimalencode].
	+ [Cipher.decimalDecode][cipher_decimaldecode].
	+ [Cipher.sha1][cipher_sha1].
	+ [Cipher.md5][cipher_md5].
	+ [Cipher.rot5][cipher_rot5].
	+ [Cipher.rot13][cipher_rot13].
	+ [Cipher.rot47][cipher_rot47].
* [Licencia][license].


Introducción
------------
CX Cipher consta de cx-class.js y cx-cipher.js. 

Permite realizar las siguientes codificaciones:

 * UTF8
 * Base64
 * Hexadecimal
 * Binario
 * Decimal
 * SHA1
 * MD5
 * ROT 5
 * ROT 13
 * ROT 47


¿Como se utiliza?
-----------------

#### Cipher.utf8Encode(input);

Permite codificar un string en UTF8.

```javascript
	var cipher = new Cipher();
		, input = 'Prueba de codificación en UTF8';
		
	cipher.utf8Encode(input); // Prueba de codificaciÃ³n en UTF8
```

```javascript
	var input = 'Prueba de codificación en UTF8';
		
	Cipher.utf8Encode(input); // Prueba de codificaciÃ³n en UTF8
```

#### Cipher.base64Encode(input);

Permite codificar un string en Base64.

```javascript
	var cipher = new Cipher();
		, input = 'admin';
		
	cipher.base64Encode(input); // YWRtaW4=
```

```javascript
	var input = 'admin';
		
	Cipher.base64Encode(input); // YWRtaW4=
```

#### Cipher.base64Decode(input);

Permite decodificar un Base64 en string.

```javascript
	var cipher = new Cipher();
		, input = 'UHJ1ZWJhIEJhc2U2NCBkZWNvZGU=';
		
	cipher.base64Decode(input); // Prueba Base64 decode
```

```javascript
	var input = 'UHJ1ZWJhIEJhc2U2NCBkZWNvZGU=';
		
	Cipher.base64Decode(input); // Prueba Base64 decode
```

#### Cipher.hexaEncode(input[, separator]);

Permite codificar un string en hexadecimal.

```javascript
	var cipher = new Cipher();
		, input = 'admin';
		
	cipher.hexaEncode(input); // 61 64 6d 69 6e
	
	cipher.hexaEncode(input, ""); // 61646d696e
```

```javascript
	var input = 'admin';
		
	Cipher.hexaEncode(input); // 61 64 6d 69 6e
	
	Cipher.hexaEncode(input, ""); // 61646d696e
```

#### Cipher.hexaDecode(input[, separator]);

Permite decodificar un hexadecimal en string.

```javascript
	var cipher = new Cipher();
		, input = '5072756562612048657861646563696d616c20746f20537472696e67';
		
	cipher.hexaDecode(input); // Prueba Hexadecimal to String
	
	input = '50 72 75 65 62 61 20 48 65 78 61 64 65 63 69 6d 61 6c 20 74 6f 20 53 74 72 69 6e 67';
	cipher.hexaDecode(input, " "); // Prueba Hexadecimal to String
```

```javascript
	var input = '5072756562612048657861646563696d616c20746f20537472696e67';
		
	Cipher.hexaDecode(input); // Prueba Hexadecimal to String
	
	input = '50 72 75 65 62 61 20 48 65 78 61 64 65 63 69 6d 61 6c 20 74 6f 20 53 74 72 69 6e 67';
	Cipher.hexaDecode(input, " "); // Prueba Hexadecimal to String
```

#### Cipher.binaryEncode(input[, separator]);

Permite codificar un string en binario.

```javascript
	var cipher = new Cipher();
		, input = 'ABCD1234';
		
	cipher.binaryEncode(input); // 1000001 1000010 1000011 1000100 110001 110010 110011 110100
```

```javascript
	var input = 'ABCD1234';
		
	Cipher.binaryEncode(input); // 1000001 1000010 1000011 1000100 110001 110010 110011 110100
```

#### Cipher.binaryDecode(input[, separator]);

Permite decodificar un string binario en string.

```javascript
	var cipher = new Cipher();
		, input = '1000001 1000010 1000011 1000100 110001 110010 110011 110100';
		
	cipher.binaryDecode(input); // ABCD1234
```

```javascript
	var input = '1000001 1000010 1000011 1000100 110001 110010 110011 110100';
		
	Cipher.binaryDecode(input); // ABCD1234
```

#### Cipher.decimalEncode(input[, separator]);

Permite codificar un string en decimal.

```javascript
	var cipher = new Cipher();
		, input = 'ABCD1234';
		
	cipher.decimalEncode(input); // 65 66 67 68 49 50 51 52
```

```javascript
	var input = 'ABCD1234';
		
	Cipher.decimalEncode(input); // 65 66 67 68 49 50 51 52
```

#### Cipher.decimalDecode(input[, separator]);

Permite decodificar un string decimal en string.

```javascript
	var cipher = new Cipher();
		, input = '65 66 67 68 49 50 51 52';
		
	cipher.decimalDecode(input); // ABCD1234
```

```javascript
	var input = '65 66 67 68 49 50 51 52';
		
	Cipher.decimalDecode(input); // ABCD1234
```

#### Cipher.sha1(input);

Permite codificar un string en SHA1.

```javascript
	var cipher = new Cipher();
		, input = 'admin';
		
	cipher.sha1(input); // d033e22ae348aeb5660fc2140aec35850c4da997
```

```javascript
	var input = 'admin';
		
	Cipher.sha1(input); // d033e22ae348aeb5660fc2140aec35850c4da997
```

#### Cipher.md5(input);

Permite codificar un string en MD5.

```javascript
	var cipher = new Cipher();
		, input = 'admin';
		
	cipher.md5(input); // 21232f297a57a5a743894a0e4a801fc3
```

```javascript
	var input = 'admin';
		
	Cipher.md5(input); // 21232f297a57a5a743894a0e4a801fc3
```

#### Cipher.rot5(input);

Permite codificar y decodificar un string en ROT5.

```javascript
	var cipher = new Cipher();
		, input = 'ABCD1234';
		
	cipher.rot5(input); // ABCD6789
```

```javascript
	var input = 'ABCD1234';
		
	Cipher.rot5(input); // ABCD6789
```

#### Cipher.rot13(input);

Permite codificar y decodificar un string en ROT13.

```javascript
	var cipher = new Cipher();
		, input = 'ABCD1234';
		
	cipher.rot13(input); // NOPQ1234
```

```javascript
	var input = 'ABCD1234';
		
	Cipher.rot13(input); // NOPQ1234
```

#### Cipher.rot47(input);

Permite codificar y decodificar un string en ROT47.

```javascript
	var cipher = new Cipher();
		, input = 'ABCD1234';
		
	cipher.rot47(input); // pqrs`abc
```

```javascript
	var input = 'ABCD1234';
		
	Cipher.rot47(input); // pqrs`abc
```


Licencia
--------
The MIT License (MIT)

Copyright (c) 2013 - 2014 [Nicolás Molina - Comodinx and contributions]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

<!-- deep links -->
[introduction]: #introduccin
[getting_started]: #como-se-utiliza
[cipher_utf8encode]: #cipherutf8encodeinput
[cipher_base64encode]: #cipherbase64encodeinput
[cipher_base64decode]: #cipherbase64decodeinput
[cipher_hexaencode]: #cipherhexaencodeinput-separator
[cipher_hexadecode]: #cipherhexadecodeinput-separator
[cipher_binaryencode]: #cipherbinaryencodeinput-separator
[cipher_binarydecode]: #cipherbinarydecodeinput-separator
[cipher_decimalencode]: #cipherdecimalencodeinput-separator
[cipher_decimaldecode]: #cipherdecimaldecodeinput-separator
[cipher_sha1]: #ciphersha1input
[cipher_md5]: #ciphermd5input
[cipher_rot5]: #cipherrot5input
[cipher_rot13]: #cipherrot13input
[cipher_rot47]: #cipherrot47input
[license]: #licencia
