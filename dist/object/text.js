
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
'use strict';

var tslib_es6 = require('../tslib.es6-E-TKQeY2.js');
var common_intercept = require('../common/intercept.js');
var style_textStyle = require('../style/text-style.js');
var utils = require('../utils.js');
var object_display = require('./display.js');
require('../app.js');
require('../const.js');
require('../style/base-style.js');
require('../position/point.js');
require('../common/event.js');

class Text extends object_display.Display {
    style;
    constructor(text, x, y) {
        super();
        this.style = new style_textStyle.TextStyle();
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
        ctx.font = utils.createCanvasFontString(this.style);
        // ctx.fontStretch = _style.fontStretch
        // ctx.fontVariantCaps = _style.fontVariantCaps
        // ctx.letterSpacing = formatValue(_style.letterSpacing)
        // ctx.wordSpacing = formatValue(_style.wordSpacing)
        // ctx.textAlign = _style.textAlign
        // ctx.textBaseline = _style.textBaseline
        ctx.fillText(this.text, this.position.x, this.position.y);
    }
}
tslib_es6.__decorate([
    common_intercept.interceptUpdate()
], Text.prototype, "text", null);

exports.Text = Text;
//# sourceMappingURL=text.js.map
