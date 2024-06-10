function textToBigInt(text) {
    let hex = '';
    for (let i = 0; i < text.length; i++) {
        hex += text.charCodeAt(i).toString(16).padStart(2, '0');
    }
    return BigInt('0x' + hex);
}

function bigIntToText(bigInt) {
    let hex = bigInt.toString(16);
    if (hex.length % 2) {
        hex = '0' + hex;
    }
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
}

function generatePrime(bits) {
    const min = BigInt(2) ** BigInt(bits - 1);
    const max = BigInt(2) ** BigInt(bits) - BigInt(1);
    let prime;

    while (true) {
        prime = getRandomBigInt(min, max);
        if (isPrime(prime)) {
            return prime;
        }
    }
}

function isPrime(n, k = 10) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2n === 0n || n % 3n === 0n) return false;

    let d = n - 1n;
    while (d % 2n === 0n) {
        d /= 2n;
    }

    for (let i = 0; i < k; i++) {
        if (!millerRabinTest(n, d)) {
            return false;
        }
    }
    return true;
}

function millerRabinTest(n, d) {
    const a = getRandomBigInt(2n, n - 2n);
    let x = modPow(a, d, n);

    if (x === 1n || x === n - 1n) return true;

    while (d !== n - 1n) {
        x = modPow(x, 2n, n);
        d *= 2n;

        if (x === 1n) return false;
        if (x === n - 1n) return true;
    }

    return false;
}

function modPow(base, exponent, modulus) {
    if (modulus === 1n) return 0n;
    let result = 1n;
    base = base % modulus;
    while (exponent > 0) {
        if (exponent % 2n === 1n) {
            result = (result * base) % modulus;
        }
        exponent = exponent >> 1n;
        base = (base * base) % modulus;
    }
    return result;
}

function getRandomBigInt(min, max) {
    const range = max - min + 1n;
    const randomBytes = crypto.getRandomValues(new Uint8Array(range.toString(2).length / 8 + 1));
    const randomBigInt = BigInt('0x' + Array.from(randomBytes).map(x => x.toString(16).padStart(2, '0')).join(''));
    return min + (randomBigInt % range);
}

function gcd(a, b) {
    while (b) {
        [a, b] = [b, a % b];
    }
    return a;
}

function modInverse(e, phi) {
    let [a, m] = [e, phi];
    let [m0, y, x] = [m, 0n, 1n];

    if (m === 1n) return 0n;

    while (a > 1n) {
        let q = a / m;
        [a, m] = [m, a % m];
        [x, y] = [y, x - q * y];
    }

    if (x < 0n) x += m0;

    return x;
}

function generateRSAKeys(bits) {
    const p = generatePrime(bits / 2);
    const q = generatePrime(bits / 2);
    const n = p * q;
    const phi = (p - 1n) * (q - 1n);
    let e = 65537n;
    while (gcd(e, phi) !== 1n) {
        e += 2n;
    }
    const d = modInverse(e, phi);

    return {
        publicKey: { e, n },
        privateKey: { d, n }
    };
}

function encrypt(message, publicKey) {
    const { e, n } = publicKey;
    const m = textToBigInt(message);
    return modPow(m, e, n);
}

function decrypt(ciphertext, privateKey) {
    const { d, n } = privateKey;
    const m = modPow(ciphertext, d, n);
    return bigIntToText(m);
}

const bits = 512;
const { publicKey, privateKey } = generateRSAKeys(bits);

const message = '12345';
const encryptedMessage = encrypt(message, publicKey);
const decryptedMessage = decrypt(encryptedMessage, privateKey);

console.log(`Wiadomość: ${message}`);
console.log(`Zaszyfrowana wiadomość: ${encryptedMessage}`);
console.log(`Odszyfrowana wiadomość: ${decryptedMessage}`);
