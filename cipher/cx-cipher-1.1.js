/**
 * CX Cipher - Version 1.1
 * 
 * Dependecias:
 * 	cx-class >= 1.0
 * 	cx-base64 >= 1.0
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
	
	var Cipher = window.Class.create("Cipher", (function() {
		
		// Constructor
		var Cipher = function() {};
		
		// UTF8
		Cipher.utf8Encode = function (input) {
			input = input.replace(/\r\n/g, "\n");
			var utftext = ""
				, c, n, l;

			for (n = 0, l = input.length; n < l; n++) {
				c = input.charCodeAt(n);
				if (c < 128) {
					utftext += String.fromCharCode(c);
				} else if ((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				} else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}
			}
			return utftext;
		};
		
		// Base64 encode
    Cipher.base64Encode = Base64.encode;
		
		// Base64 decode
    Cipher.base64Decode = Base64.decode;
		
		// String to Hex
		Cipher.strToHex = function (input, separator) {
			var a = []
				, i, l, c;
			separator = (typeof separator === 'undefined' ? " " : separator);
			for (i = 0, l = input.length; i < l; i++) {
				c = input.charCodeAt(i);
				a.push(c.toString(16));
				if ((i+1) < l) {
					a.push(separator);
				}
			}
			return a.join('');
		}
		
		// Hex to String
		Cipher.hexToStr = function (input, separator) {
			if (separator) {
				input = input.split(separator).join('');
			}
			
			var a = []
				, i, l, c;
      for (i = 0, l = input.length; i < l; i += 2) {
          c = parseInt(input.substr(i, 2), 16);
          if (c) {
            a.push(String.fromCharCode(c));
          }
      }
			return a.join('');
		}

		// MD5
		function _md5_rotateLeft(v, sb) {
			return (v << sb) | (v >>> (32 - sb));
		}

		function _md5_addUnsigned(x, y) {
			var x4, y4, x8, y8, r;
			x8 = (x & 0x80000000);
			y8 = (y & 0x80000000);
			x4 = (x & 0x40000000);
			y4 = (y & 0x40000000);
			r = (x & 0x3FFFFFFF) + (y & 0x3FFFFFFF);
			if (x4 & y4) {
				return (r ^ 0x80000000 ^ x8 ^ y8);
			}
			if (x4 | y4) {
				if (r & 0x40000000) {
					return (r ^ 0xC0000000 ^ x8 ^ y8);
				} else {
					return (r ^ 0x40000000 ^ x8 ^ y8);
				}
			} else {
				return (r ^ x8 ^ y8);
			}
		}

		function _md5_F(x, y, z) {
			return (x & y) | ((~x) & z);
		}
		
		function _md5_G(x, y, z) {
			return (x & z) | (y & (~z));
		}
		
		function _md5_H(x, y, z) {
			return (x ^ y ^ z);
		}
		
		function _md5_I(x, y, z) {
			return (y ^ (x | (~z)));
		}

		function _md5_FF(a, b, c, d, x, s, ac) {
			a = _md5_addUnsigned(a, _md5_addUnsigned(_md5_addUnsigned(_md5_F(b, c, d), x), ac));
			return _md5_addUnsigned(_md5_rotateLeft(a, s), b);
		}

		function _md5_GG(a, b, c, d, x, s, ac) {
			a = _md5_addUnsigned(a, _md5_addUnsigned(_md5_addUnsigned(_md5_G(b, c, d), x), ac));
			return _md5_addUnsigned(_md5_rotateLeft(a, s), b);
		}

		function _md5_HH(a, b, c, d, x, s, ac) {
			a = _md5_addUnsigned(a, _md5_addUnsigned(_md5_addUnsigned(_md5_H(b, c, d), x), ac));
			return _md5_addUnsigned(_md5_rotateLeft(a, s), b);
		}

		function _md5_II(a, b, c, d, x, s, ac) {
			a = _md5_addUnsigned(a, _md5_addUnsigned(_md5_addUnsigned(_md5_I(b, c, d), x), ac));
			return _md5_addUnsigned(_md5_rotateLeft(a, s), b);
		}

		function _md5_convertToWordArray(input) {
			var c
				, l = input.length
				, nwt1 = (l + 8)
				, nwt2 = ((nwt1 - (nwt1 % 64)) / 64)
				, nw = ((nwt2 + 1) * 16)
				, a = new Array(nw - 1)
				, bp = 0
				, bc = 0;
			while (bc < l) {
				c = (bc - (bc % 4)) / 4;
				bp = (bc % 4) * 8;
				a[c] = (a[c] | (input.charCodeAt(bc) << bp));
				bc++;
			}
			c = (bc - (bc % 4)) / 4;
			bp = (bc % 4) * 8;
			a[c] = a[c] | (0x80 << bp);
			a[nw - 2] = l << 3;
			a[nw - 1] = l >>> 29;
			return a;
		}
		
		function _md5_hex(input) {
			var v = ""
				, t = ""
				, b, i;
			for (i = 0; i <= 3; i++) {
				b = (input >>> (i * 8)) & 255;
				t = "0" + b.toString(16);
				v += t.substr(t.length - 2, 2);
			}
			return v;
		}
		
		Cipher.md5 = function(input) {
			var xl
				, x = []
				, k, AA, BB, CC, DD, a, b, c, d, temp
				, S11 = 7
				, S12 = 12
				, S13 = 17
				, S14 = 22
				, S21 = 5
				, S22 = 9
				, S23 = 14
				, S24 = 20
				, S31 = 4
				, S32 = 11
				, S33 = 16
				, S34 = 23
				, S41 = 6
				, S42 = 10
				, S43 = 15
				, S44 = 21;

			input = Cipher.utf8Encode(input);
			x = _md5_convertToWordArray(input);
			a = 0x67452301;
			b = 0xEFCDAB89;
			c = 0x98BADCFE;
			d = 0x10325476;

			xl = x.length;
			for (k = 0; k < xl; k += 16) {
				AA = a;
				BB = b;
				CC = c;
				DD = d;
				a = _md5_FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
				d = _md5_FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
				c = _md5_FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
				b = _md5_FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
				a = _md5_FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
				d = _md5_FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
				c = _md5_FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
				b = _md5_FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
				a = _md5_FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
				d = _md5_FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
				c = _md5_FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
				b = _md5_FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
				a = _md5_FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
				d = _md5_FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
				c = _md5_FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
				b = _md5_FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
				a = _md5_GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
				d = _md5_GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
				c = _md5_GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
				b = _md5_GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
				a = _md5_GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
				d = _md5_GG(d, a, b, c, x[k + 10], S22, 0x2441453);
				c = _md5_GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
				b = _md5_GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
				a = _md5_GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
				d = _md5_GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
				c = _md5_GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
				b = _md5_GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
				a = _md5_GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
				d = _md5_GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
				c = _md5_GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
				b = _md5_GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
				a = _md5_HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
				d = _md5_HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
				c = _md5_HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
				b = _md5_HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
				a = _md5_HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
				d = _md5_HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
				c = _md5_HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
				b = _md5_HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
				a = _md5_HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
				d = _md5_HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
				c = _md5_HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
				b = _md5_HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
				a = _md5_HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
				d = _md5_HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
				c = _md5_HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
				b = _md5_HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
				a = _md5_II(a, b, c, d, x[k + 0], S41, 0xF4292244);
				d = _md5_II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
				c = _md5_II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
				b = _md5_II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
				a = _md5_II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
				d = _md5_II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
				c = _md5_II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
				b = _md5_II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
				a = _md5_II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
				d = _md5_II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
				c = _md5_II(c, d, a, b, x[k + 6], S43, 0xA3014314);
				b = _md5_II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
				a = _md5_II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
				d = _md5_II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
				c = _md5_II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
				b = _md5_II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
				a = _md5_addUnsigned(a, AA);
				b = _md5_addUnsigned(b, BB);
				c = _md5_addUnsigned(c, CC);
				d = _md5_addUnsigned(d, DD);
			}

			temp = _md5_hex(a) + _md5_hex(b) + _md5_hex(c) + _md5_hex(d);

			return temp.toLowerCase();
		};

		// SHA1
		function _sha1_rotate(n, s) {
			var t4 = (n << s) | (n >>> (32 - s));
			return t4;
		}

		function _sha1_hex(input) {
			var str = ""
				, v, i;
			for (i = 7; i >= 0; i--) {
				v = (input >>> (i * 4)) & 0x0f;
				str += v.toString(16);
			}
			return str;
		};

		Cipher.sha1 = function (input) {
			var bs, i, l, j
				, W = []
				, wa = []
				, H0 = 0x67452301
				, H1 = 0xEFCDAB89
				, H2 = 0x98BADCFE
				, H3 = 0x10325476
				, H4 = 0xC3D2E1F0
				, A, B, C, D, E, temp;

			input = Cipher.utf8Encode(input);
			l = input.length;
			
			for (i = 0; i < l - 3; i += 4) {
				j = input.charCodeAt(i) << 24 | input.charCodeAt(i + 1) << 16 | input.charCodeAt(i + 2) << 8 | input.charCodeAt(i + 3);
				wa.push(j);
			}

			switch (l % 4) {
				case 0:
					i = 0x080000000;
					break;
				case 1:
					i = input.charCodeAt(l - 1) << 24 | 0x0800000;
					break;
				case 2:
					i = input.charCodeAt(l - 2) << 24 | input.charCodeAt(l - 1) << 16 | 0x08000;
					break;
				case 3:
					i = input.charCodeAt(l - 3) << 24 | input.charCodeAt(l - 2) << 16 | input.charCodeAt(l - 1) << 8 | 0x80;
					break;
			}

			wa.push(i);

			while ((wa.length % 16) != 14) {
				wa.push(0);
			}

			wa.push(l >>> 29);
			wa.push((l << 3) & 0x0ffffffff);

			for (bs = 0; bs < wa.length; bs += 16) {
				for (i = 0; i < 16; i++) {
					W[i] = wa[bs + i];
				}
				for (i = 16; i <= 79; i++) {
					W[i] = _sha1_rotate(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
				}


				A = H0;
				B = H1;
				C = H2;
				D = H3;
				E = H4;

				for (i = 0; i <= 19; i++) {
					temp = (_sha1_rotate(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
					E = D;
					D = C;
					C = _sha1_rotate(B, 30);
					B = A;
					A = temp;
				}

				for (i = 20; i <= 39; i++) {
					temp = (_sha1_rotate(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
					E = D;
					D = C;
					C = _sha1_rotate(B, 30);
					B = A;
					A = temp;
				}

				for (i = 40; i <= 59; i++) {
					temp = (_sha1_rotate(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
					E = D;
					D = C;
					C = _sha1_rotate(B, 30);
					B = A;
					A = temp;
				}

				for (i = 60; i <= 79; i++) {
					temp = (_sha1_rotate(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
					E = D;
					D = C;
					C = _sha1_rotate(B, 30);
					B = A;
					A = temp;
				}

				H0 = (H0 + A) & 0x0ffffffff;
				H1 = (H1 + B) & 0x0ffffffff;
				H2 = (H2 + C) & 0x0ffffffff;
				H3 = (H3 + D) & 0x0ffffffff;
				H4 = (H4 + E) & 0x0ffffffff;
			}

			temp = _sha1_hex(H0) + _sha1_hex(H1) + _sha1_hex(H2) + _sha1_hex(H3) + _sha1_hex(H4);
			return temp.toLowerCase();
		};

		// ROT
		
		// ROT 5
		Cipher.rot5 = function (input) {
			var s = []
				, i, l, c;
			for (i = 0, l = input.length; i < l; i++) {
				c = input.charCodeAt(i);
				if ((c >= 48) && (c <= 57)) {
					if (c <= 52) {
						s.push(String.fromCharCode(c + 5));
						
					} else {
						s.push(String.fromCharCode(c - 5));
					}
				} else {
					s.push(String.fromCharCode(c));
				}
			}
			return s.join('');
		}
		
		// ROT 13
		Cipher.rot13 = function (input) {
			return input.replace(/[a-zA-Z]/g, function(c) {
				return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
			});
		};
		
		// ROT 47
		Cipher.rot47 = function (input) {
			var s = []
				, i, l, c;
			for (i = 0, l = input.length; i < l; i++) {
				c = input.charCodeAt(i);
				if ((c >= 33) && (c <= 126)) {
					s.push(String.fromCharCode(33 + ((c + 14) % 94)));
					
				} else {
					s.push(String.fromCharCode(c));
				}
			}
			return s.join('');
		};
		
		// Binary
		Cipher.binary = function (input, separator) {
			var s = []
				, i, l, c;
			separator = (typeof separator === 'undefined' ? " " : separator);
			for (i = 0, l = input.length; i < l; i++) {
				c = input[i].charCodeAt(0);
				s.push(c.toString(2));
				if ((i+1) < l) {
					s.push(separator);
				}
			}
			return s.join('');
		};
		
		// Decimal
		Cipher.decimal = function (input, separator) {
			var s = []
				, i, l, c;
			separator = (typeof separator === 'undefined' ? " " : separator);
			for(i = 0, l = input.length; i < l; i++) {
				c = input.charCodeAt(i);
				s.push(c);
				if ((i+1) < l) {
					s.push(separator);
				}
			}
			return s.join('');
		};

		return {
			constructor: Cipher,
			utf8Encode: Cipher.utf8Encode,
			base64Encode: Cipher.base64Encode,
			base64Decode: Cipher.base64Decode,
			strToHex: Cipher.strToHex,
      hexToStr: Cipher.hexToStr,
			sha1: Cipher.sha1,
			md5: Cipher.md5,
			rot5: Cipher.rot5,
			rot13: Cipher.rot13,
			rot47: Cipher.rot47,
			binary: Cipher.binary,
			decimal: Cipher.decimal
		};
	})());
	
	window.Cipher = Cipher;
	
}(window);