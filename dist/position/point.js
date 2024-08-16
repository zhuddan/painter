
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
'use strict';

var tslib_es6 = require('../tslib.es6-E-TKQeY2.js');
var common_event = require('../common/event.js');
var common_intercept = require('../common/intercept.js');
require('../app.js');
require('../const.js');
require('../utils.js');

class Point extends common_event.Event {
    shouldUpdate = false;
    _x = -Infinity;
    set x(x) {
        this._x = x;
    }
    get x() {
        return this._x;
    }
    _y = -Infinity;
    set y(y) {
        this._y = y;
    }
    get y() {
        return this._y;
    }
    constructor(arg1) {
        super();
        if (Array.isArray(arg1)) {
            [this._x, this._y] = arg1;
        }
        else {
            this._x = arg1.x;
            this._y = arg1.y;
        }
    }
    translate(p) {
        p = createPoint(p);
        this.x += p.x;
        this.y += p.y;
        return this;
    }
    reverse() {
        this.x *= -1;
        this.y *= -1;
        return this;
    }
    clone() {
        return new Point([this.x, this.y]);
    }
}
tslib_es6.__decorate([
    common_intercept.interceptUpdate()
], Point.prototype, "x", null);
tslib_es6.__decorate([
    common_intercept.interceptUpdate()
], Point.prototype, "y", null);
function createPoint(maybePoint) {
    if (maybePoint instanceof Point) {
        return maybePoint;
    }
    return new Point(maybePoint);
}

exports.Point = Point;
exports.createPoint = createPoint;
//# sourceMappingURL=point.js.map
