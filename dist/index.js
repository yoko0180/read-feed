"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getfeed = void 0;
const feedparser_1 = __importDefault(require("feedparser"));
const request_1 = __importDefault(require("request"));
const parse_1 = require("./parse");
function getfeed(feed) {
    let feedparser = new feedparser_1.default({});
    let items = [];
    return new Promise((resolve, reject) => {
        /**
         * ヘッダーを指定したうえでrequestのエラーハンドリングがわからなかったので苦肉の策でtry-catch
         */
        let req;
        try {
            req = request_1.default(feed, { timeout: 10000, pool: false });
        }
        catch (err) {
            reject(err);
        }
        req.setMaxListeners(50);
        // Some feeds do not respond without user-agent and accept headers.
        req.setHeader('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36');
        req.setHeader('accept', 'text/html,application/xhtml+xml');
        req.on('response', function (res) {
            if (res.statusCode !== 200) {
                // this.emit('error', new Error('Bad status code'));
                reject(new Error('Bad status code'));
            }
            else {
                // 正常なレスポンスをfeedparseへパイプ
                let encoding = res.headers['content-encoding'] || 'identity', charset = parse_1.getParams(res.headers['content-type'] || '').charset;
                res = parse_1.maybeDecompress(res, encoding);
                res = parse_1.maybeTranslate(res, charset);
                res.pipe(feedparser);
            }
        });
        feedparser.on('readable', function () {
            // let stream = this; // `this` is `feedparser`, which is a stream
            // let meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
            let item;
            while (item = this.read()) {
                items.push(item);
            }
        });
        feedparser.on('end', function () {
            resolve(items);
        });
        feedparser.on('error', function (error) {
            reject(error);
        });
    });
}
exports.getfeed = getfeed;
;
//# sourceMappingURL=index.js.map