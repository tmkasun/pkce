import WordArray from "crypto-js/lib-typedarrays";
import Base64 from "crypto-js/enc-base64";
import sha256 from "crypto-js/sha256";

import { nanoid } from "nanoid";

class Utils {
  static generateCodeVerifier(method = 1) {
    switch (method) {
      case 0:
        const random32Octets = WordArray.random(32);
        return Base64.stringify(random32Octets)
          .replace(/\+/g, "-")
          .replace(/\//g, "_")
          .replace(/=/g, "");

      case 1:
        // min 43 max 128
        return nanoid(48);
      default:
        break;
    }
  }
  static generateHash(value) {
    /**
     * 
      plain
          code_challenge = code_verifier

      S256
          code_challenge = BASE64URL-ENCODE(SHA256(ASCII(code_verifier)))
     */
    const encoder = new TextEncoder("ascii");
    return crypto.subtle
      .digest("SHA-256", encoder.encode(value))
      .then((hashedCC) => {
        return Utils.arrayBufferToBase64(hashedCC);
      });
  }

  static arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const b64 = window.btoa(binary);
    console.log(b64);
    return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  }
}

export default Utils;
