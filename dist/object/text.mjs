
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
import { _ as __decorate } from '../tslib.es6-Dn8e3nS6.js';
import { interceptUpdate } from '../common/intercept.mjs';
import { TextStyle } from '../style/text-style.mjs';
import { createCanvasFontString, formatValue } from '../utils.mjs';
import { Display } from './display.mjs';
import '../style/base-style.mjs';
import '../position/point.mjs';

class Text extends Display {
    style;
    constructor(text, x, y) {
        super();
        this.style = new TextStyle();
        this.position.x = x;
        this.position.y = y;
        this.text = text;
    }
    _text = '';
    set text(text) {
        console.log('text', text);
        this._text = text;
    }
    get text() {
        return this._text;
    }
    _render(ctx) {
        ctx.textBaseline = 'top';
        ctx.fillStyle = this.style.fill;
        ctx.font = createCanvasFontString(this.style);
        ctx.fontStretch = this.style.fontStretch;
        ctx.fontVariantCaps = this.style.fontVariantCaps;
        ctx.letterSpacing = formatValue(this.style.letterSpacing);
        ctx.wordSpacing = formatValue(this.style.wordSpacing);
        ctx.textAlign = this.style.textAlign;
        ctx.textBaseline = this.style.textBaseline;
        ctx.fillText(this.text, this.position.x, this.position.y);
    }
}
__decorate([
    interceptUpdate()
], Text.prototype, "text", null);

export { Text };
