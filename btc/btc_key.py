import getpass
import hashlib
from argparse import ArgumentParser
import bech32


def sha256(data) -> bytes:
    digest = hashlib.new("sha256")
    digest.update(data)
    return digest.digest()

def ripemd160(x) -> bytes:
    d = hashlib.new("ripemd160")
    d.update(x)
    return d.digest()

B58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
def b58(data: bytes) -> str:

    if data[0] == 0:
        return "1" + b58(data[1:])

    x = sum([v * (256 ** i) for i, v in enumerate(data[::-1])])
    ret = ""
    while x > 0:
        ret = B58[x % 58] + ret
        x = x // 58

    return ret

def b58_decode(encoded: str) -> bytes:
    x = 0
    n_leading_zero = 0
    for i, c in enumerate(encoded[::-1]):
        x += B58.index(c) * (58 ** i)
        if B58.index(c) == 0:
            n_leading_zero += 1
        else:
            n_leading_zero = 0

    ret = []
    while x > 0:
        ret.append(x % 256)
        x = x // 256

    return bytes([0] * n_leading_zero + ret[::-1])

class Point:
    def __init__(self,
        x=0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798,
        y=0x483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8,
        p=2**256 - 2**32 - 2**9 - 2**8 - 2**7 - 2**6 - 2**4 - 1):
        self.x = x
        self.y = y
        self.p = p

    def __add__(self, other):
        return self.__radd__(other)

    def __mul__(self, other):
        return self.__rmul__(other)

    def __rmul__(self, other):
        n = self
        q = None

        for i in range(256):
            if other & (1 << i):
                q = q + n
            n = n + n

        return q

    def __radd__(self, other):
        if other is None:
            return self
        x1 = other.x
        y1 = other.y
        x2 = self.x
        y2 = self.y
        p = self.p

        if self == other:
            l = pow(2 * y2 % p, p-2, p) * (3 * x2 * x2) % p
        else:
            l = pow(x1 - x2, p-2, p) * (y1 - y2) % p

        newX = (l ** 2 - x2 - x1) % p
        newY = (l * x2 - l * newX - y2) % p

        return Point(newX, newY)

    def toBytes(self, compress=False) -> bytes:
        x = self.x.to_bytes(32, "big")
        y = self.y.to_bytes(32, "big")
        if not compress:
            return b"\x04" + x + y
        else:
            return bytes([0x02 + (y[-1] % 2)]) + x


def getPublicKey(privkey: bytes) -> Point:
    SPEC256k1 = Point()
    pk = SPEC256k1 * int.from_bytes(privkey, "big")
    return pk


def getHash160(pubkey: Point, compress=False) -> bytes:
    hash160 = ripemd160(sha256(pubkey.toBytes(compress)))
    return hash160


def getLegacyAddress(hash160: bytes) -> str:
    address = b"\x00" + hash160
    address = b58(address + sha256(sha256(address))[:4])
    return address


def public_key_to_taproot_address(public_key: Point):
    # Convert the public key to a 32-byte X coordinate
    x_only_pubkey = public_key.x.to_bytes(32, "big")

    address = bech32.encode("bc", 1, x_only_pubkey)
    return address


def getBech32Address(hash160: bytes) -> str:
    address = bech32.encode("bc", 0, hash160)
    return address

def getWif(privkey: bytes, compressed=False) -> str:
    wif = b"\x80" + privkey
    if compressed:
        wif += b"\x01"
    wif = b58(wif + sha256(sha256(wif))[:4])
    return wif

def WifToPrivateKey(wif: str) -> bytes:
    privkey = b58_decode(wif)[1:-4]
    if len(privkey) == 33:
        assert privkey[-1] == 1, 'compressed WIF must end with 0x01'
        print('compressed WIF')
        privkey = privkey[:-1]
    return privkey

if __name__ == "__main__":
    parser = ArgumentParser()
    parser.add_argument("format", choices=['hex', 'WIF'], default='hex')
    parser.add_argument("--print-wif", action='store_true')
    args = parser.parse_args()

    input_privkey = getpass.getpass(f"Enter private key in {args.format} format: ")
    if args.format == 'hex':
        privkey = bytes.fromhex(input_privkey)
    elif args.format == 'WIF':
        privkey = WifToPrivateKey(input_privkey)
    else:
        pass

    if len(privkey) != 32:
        raise ValueError(f"Private key must be 32 bytes. actual: {len(privkey)}")

    pubkey = getPublicKey(privkey)
    hash160 = getHash160(pubkey)
    print("Address: " + getLegacyAddress(hash160))

    compressed_hash160 = getHash160(pubkey, compress=True)
    print("Compressed Address: " + getLegacyAddress(compressed_hash160))
    print("Native SegWit Address: " + getBech32Address(compressed_hash160))

    print("Taproot Address (WIP): " + public_key_to_taproot_address(pubkey))

    if args.print_wif:
        print("Privkey(32-bytes WIF): " + getWif(privkey))
        print("Privkey(33-bytes WIF): " + getWif(privkey, compressed=True))

    assert WifToPrivateKey(getWif(privkey)) == privkey

    if args.format == 'WIF':
        assert input_privkey in [getWif(privkey), getWif(privkey, compressed=True)]
        print('input WIF format is correct')
