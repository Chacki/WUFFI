

export function generate_uuid() {
    function Er() {
        return function decimalToHex(e) {
            for (var t = e.toString(16); t.length < 2;)
                t = "0" + t;
            return t
        }
    }

    function isGuid(e) {
        return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(e)
    }
    try {
        var e = new Uint8Array(16);
        return crypto.getRandomValues(e),
            e[6] |= 64,
            e[6] &= 79,
            e[8] |= 128,
            e[8] &= 191,
        Er.decimalToHex(e[0]) + Er.decimalToHex(e[1]) + Er.decimalToHex(e[2]) + Er.decimalToHex(e[3]) + "-" + Er.decimalToHex(e[4]) + Er.decimalToHex(e[5]) + "-" + Er.decimalToHex(e[6]) + Er.decimalToHex(e[7]) + "-" + Er.decimalToHex(e[8]) + Er.decimalToHex(e[9]) + "-" + Er.decimalToHex(e[10]) + Er.decimalToHex(e[11]) + Er.decimalToHex(e[12]) + Er.decimalToHex(e[13]) + Er.decimalToHex(e[14]) + Er.decimalToHex(e[15])
    } catch (e) {
        for (var t = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx", r = "0123456789abcdef", n = 0, o = '', i = 0; i < 36; i++)
            "-" !== t[i] && "4" !== t[i] && (n = 16 * Math.random() | 0),
                "x" === t[i] ? o += r[n] : "y" === t[i] ? (n &= 3,
                    o += r[n |= 8]) : o += t[i];
        if (isGuid(o) === true) {
            return o
        } else throw 'Ошибка при генерации UUID'
    }
}
