"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParams = exports.maybeTranslate = exports.maybeDecompress = void 0;
// https://github.com/danmactough/node-feedparser/blob/master/examples/compressed.js
const zlib_1 = __importDefault(require("zlib"));
const iconv_1 = __importDefault(require("iconv"));
/**
 * レスポンスの圧縮解凍
 * zlibは、データの圧縮および伸張を行うためのフリーのライブラリである。
 */
function maybeDecompress(res, encoding) {
    var decompress;
    if (encoding.match(/\bdeflate\b/)) {
        decompress = zlib_1.default.createInflate();
    }
    else if (encoding.match(/\bgzip\b/)) {
        decompress = zlib_1.default.createGunzip();
    }
    return decompress ? res.pipe(decompress) : res;
}
exports.maybeDecompress = maybeDecompress;
function maybeTranslate(res, charset) {
    var iconv;
    // Use iconv if its not utf8 already.
    if (!iconv && charset && !/utf-*8/i.test(charset)) {
        try {
            iconv = new iconv_1.default(charset, 'utf-8');
            console.log('Converting from charset %s to utf-8', charset);
            // iconv.on('error', done);
            // If we're using iconv, stream will be the output of iconv
            // otherwise it will remain the output of request
            res = res.pipe(iconv);
        }
        catch (err) {
            res.emit('error', err);
        }
    }
    return res;
}
exports.maybeTranslate = maybeTranslate;
function getParams(str) {
    var params = str.split(';').reduce(function (params, param) {
        var parts = param.split('=').map(function (part) { return part.trim(); });
        if (parts.length === 2) {
            params[parts[0]] = parts[1];
        }
        return params;
    }, {});
    return params;
}
exports.getParams = getParams;
//# sourceMappingURL=parse.js.map