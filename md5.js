hexcase=0

var site_url = "undefined" == typeof hiui ? "https://user.hiwifi.com/" : hiui.webSite.getUserDomain();
var store_url = "undefined" == typeof hiui ? "http://store.hiwifi.com/" : hiui.webSite.getStoreDomain();
var offcial_url = "undefined" == typeof hiui ? "http://www.hiwifi.com/" : hiui.webSite.getWebDomain();
var bbs_url = "undefined" == typeof hiui ? "http://bbs.hiwifi.com/" : hiui.webSite.getBbsDomain();
var products_url = offcial_url + "/products/";
var services_url = offcial_url + "/services/";
var mycross = site_url, hexcase = 0, b64pad = "", chrsz = 8, base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1];

function hex_md5(e) {
    return binl2hex(core_md5(str2binl(e), e.length * chrsz))
}
function b64_md5(e) {
    return binl2b64(core_md5(str2binl(e), e.length * chrsz))
}
function str_md5(e) {
    return binl2str(core_md5(str2binl(e), e.length * chrsz))
}
function hex_hmac_md5(e, t) {
    return binl2hex(core_hmac_md5(e, t))
}
function b64_hmac_md5(e, t) {
    return binl2b64(core_hmac_md5(e, t))
}
function str_hmac_md5(e, t) {
    return binl2str(core_hmac_md5(e, t))
}
function md5_vm_test() {
    return "900150983cd24fb0d6963f7d28e17f72" == hex_md5("abc")
}

function core_md5(e, t) {
    e[t >> 5] |= 128 << t % 32, e[(t + 64 >>> 9 << 4) + 14] = t;
    for (var i = 1732584193, n = -271733879, s = -1732584194, o = 271733878, r = 0; e.length > r; r += 16) {
        var a = i, l = n, c = s, u = o;
        i = md5_ff(i, n, s, o, e[r + 0], 7, -680876936), o = md5_ff(o, i, n, s, e[r + 1], 12, -389564586), s = md5_ff(s, o, i, n, e[r + 2], 17, 606105819), n = md5_ff(n, s, o, i, e[r + 3], 22, -1044525330), i = md5_ff(i, n, s, o, e[r + 4], 7, -176418897), o = md5_ff(o, i, n, s, e[r + 5], 12, 1200080426), s = md5_ff(s, o, i, n, e[r + 6], 17, -1473231341), n = md5_ff(n, s, o, i, e[r + 7], 22, -45705983), i = md5_ff(i, n, s, o, e[r + 8], 7, 1770035416), o = md5_ff(o, i, n, s, e[r + 9], 12, -1958414417), s = md5_ff(s, o, i, n, e[r + 10], 17, -42063), n = md5_ff(n, s, o, i, e[r + 11], 22, -1990404162), i = md5_ff(i, n, s, o, e[r + 12], 7, 1804603682), o = md5_ff(o, i, n, s, e[r + 13], 12, -40341101), s = md5_ff(s, o, i, n, e[r + 14], 17, -1502002290), n = md5_ff(n, s, o, i, e[r + 15], 22, 1236535329), i = md5_gg(i, n, s, o, e[r + 1], 5, -165796510), o = md5_gg(o, i, n, s, e[r + 6], 9, -1069501632), s = md5_gg(s, o, i, n, e[r + 11], 14, 643717713), n = md5_gg(n, s, o, i, e[r + 0], 20, -373897302), i = md5_gg(i, n, s, o, e[r + 5], 5, -701558691), o = md5_gg(o, i, n, s, e[r + 10], 9, 38016083), s = md5_gg(s, o, i, n, e[r + 15], 14, -660478335), n = md5_gg(n, s, o, i, e[r + 4], 20, -405537848), i = md5_gg(i, n, s, o, e[r + 9], 5, 568446438), o = md5_gg(o, i, n, s, e[r + 14], 9, -1019803690), s = md5_gg(s, o, i, n, e[r + 3], 14, -187363961), n = md5_gg(n, s, o, i, e[r + 8], 20, 1163531501), i = md5_gg(i, n, s, o, e[r + 13], 5, -1444681467), o = md5_gg(o, i, n, s, e[r + 2], 9, -51403784), s = md5_gg(s, o, i, n, e[r + 7], 14, 1735328473), n = md5_gg(n, s, o, i, e[r + 12], 20, -1926607734), i = md5_hh(i, n, s, o, e[r + 5], 4, -378558), o = md5_hh(o, i, n, s, e[r + 8], 11, -2022574463), s = md5_hh(s, o, i, n, e[r + 11], 16, 1839030562), n = md5_hh(n, s, o, i, e[r + 14], 23, -35309556), i = md5_hh(i, n, s, o, e[r + 1], 4, -1530992060), o = md5_hh(o, i, n, s, e[r + 4], 11, 1272893353), s = md5_hh(s, o, i, n, e[r + 7], 16, -155497632), n = md5_hh(n, s, o, i, e[r + 10], 23, -1094730640), i = md5_hh(i, n, s, o, e[r + 13], 4, 681279174), o = md5_hh(o, i, n, s, e[r + 0], 11, -358537222), s = md5_hh(s, o, i, n, e[r + 3], 16, -722521979), n = md5_hh(n, s, o, i, e[r + 6], 23, 76029189), i = md5_hh(i, n, s, o, e[r + 9], 4, -640364487), o = md5_hh(o, i, n, s, e[r + 12], 11, -421815835), s = md5_hh(s, o, i, n, e[r + 15], 16, 530742520), n = md5_hh(n, s, o, i, e[r + 2], 23, -995338651), i = md5_ii(i, n, s, o, e[r + 0], 6, -198630844), o = md5_ii(o, i, n, s, e[r + 7], 10, 1126891415), s = md5_ii(s, o, i, n, e[r + 14], 15, -1416354905), n = md5_ii(n, s, o, i, e[r + 5], 21, -57434055), i = md5_ii(i, n, s, o, e[r + 12], 6, 1700485571), o = md5_ii(o, i, n, s, e[r + 3], 10, -1894986606), s = md5_ii(s, o, i, n, e[r + 10], 15, -1051523), n = md5_ii(n, s, o, i, e[r + 1], 21, -2054922799), i = md5_ii(i, n, s, o, e[r + 8], 6, 1873313359), o = md5_ii(o, i, n, s, e[r + 15], 10, -30611744), s = md5_ii(s, o, i, n, e[r + 6], 15, -1560198380), n = md5_ii(n, s, o, i, e[r + 13], 21, 1309151649), i = md5_ii(i, n, s, o, e[r + 4], 6, -145523070), o = md5_ii(o, i, n, s, e[r + 11], 10, -1120210379), s = md5_ii(s, o, i, n, e[r + 2], 15, 718787259), n = md5_ii(n, s, o, i, e[r + 9], 21, -343485551), i = safe_add(i, a), n = safe_add(n, l), s = safe_add(s, c), o = safe_add(o, u)
    }
    return [i, n, s, o]
}

function md5_cmn(e, t, i, n, s, o) {
    return safe_add(bit_rol(safe_add(safe_add(t, e), safe_add(n, o)), s), i)
}
function md5_ff(e, t, i, n, s, o, r) {
    return md5_cmn(t & i | ~t & n, e, t, s, o, r)
}
function md5_gg(e, t, i, n, s, o, r) {
    return md5_cmn(t & n | i & ~n, e, t, s, o, r)
}
function md5_hh(e, t, i, n, s, o, r) {
    return md5_cmn(t ^ i ^ n, e, t, s, o, r)
}
function md5_ii(e, t, i, n, s, o, r) {
    return md5_cmn(i ^ (t | ~n), e, t, s, o, r)
}
function core_hmac_md5(e, t) {
    var i = str2binl(e);
    i.length > 16 && (i = core_md5(i, e.length * chrsz));
    for (var n = Array(16), s = Array(16), o = 0; 16 > o; o++)
        n[o] = 909522486 ^ i[o], s[o] = 1549556828 ^ i[o];
    var r = core_md5(n.concat(str2binl(t)), 512 + t.length * chrsz);
    return core_md5(s.concat(r), 640)
}
function safe_add(e, t) {
    var i = (65535 & e) + (65535 & t), n = (e >> 16) + (t >> 16) + (i >> 16);
    return n << 16 | 65535 & i
}
function bit_rol(e, t) {
    return e << t | e >>> 32 - t
}
function str2binl(e) {
    for (var t = [], i = (1 << chrsz) - 1, n = 0; e.length * chrsz > n; n += chrsz)
        t[n >> 5] |= (e.charCodeAt(n / chrsz) & i) << n % 32;
    return t
}
function binl2str(e) {
    for (var t = "", i = (1 << chrsz) - 1, n = 0; 32 * e.length > n; n += chrsz)
        t += String.fromCharCode(e[n >> 5] >>> n % 32 & i);
    return t
}
function binl2hex(e) {
    for (var t = hexcase ? "0123456789ABCDEF" : "0123456789abcdef", i = "", n = 0; 4 * e.length > n; n++)
        i += t.charAt(15 & e[n >> 2] >> 8 * (n % 4) + 4) + t.charAt(15 & e[n >> 2] >> 8 * (n % 4));
    return i
}
function binl2b64(e) {
    for (var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = "", n = 0; 4 * e.length > n; n += 3)
        for (var s = (255 & e[n >> 2] >> 8 * (n % 4)) << 16 | (255 & e[n + 1 >> 2] >> 8 * ((n + 1) % 4)) << 8 | 255 & e[n + 2 >> 2] >> 8 * ((n + 2) % 4), o = 0; 4 > o; o++)
            i += 8 * n + 6 * o > 32 * e.length ? b64pad : t.charAt(63 & s >> 6 * (3 - o));
    return i
}

console.log(hex_md5('Wangju520'));
// 3257537e5566aa6d98371e2f4388b52e
s = new Date
console.log(s.getTime())

exports.hex_md5 = hex_md5;

