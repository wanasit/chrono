/**
 * to-hankaku.js
 * convert to ascii code strings.
 *
 * @version 1.0.1
 * @author think49
 * @url https://gist.github.com/964592
 * @license http://www.opensource.org/licenses/mit-license.php (The MIT License)
 */
export function toHankaku(text) {
    return String(text).replace(/\u2019/g, '\u0027')
        .replace(/\u201D/g, '\u0022')
        .replace(/\u3000/g, '\u0020')
        .replace(/\uFFE5/g, '\u00A5')
        .replace(/[\uFF01\uFF03-\uFF06\uFF08\uFF09\uFF0C-\uFF19\uFF1C-\uFF1F\uFF21-\uFF3B\uFF3D\uFF3F\uFF41-\uFF5B\uFF5D\uFF5E]/g, alphaNum);
}

function alphaNum (token) {
    return String.fromCharCode(token.charCodeAt(0) - 65248);
}