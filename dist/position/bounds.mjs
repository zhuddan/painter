
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
import { calcMin, calcMax } from '../utils.mjs';
import { createPoint, Point } from './point.mjs';
import '../common/event.mjs';

class Bounds {
    min;
    max;
    constructor(point1, point2) {
        point1 = createPoint(point1);
        point2 = createPoint(point2);
        const minX = calcMin([point1.x, point2.x]);
        const minY = calcMin([point1.y, point2.y]);
        const maxX = calcMax([point1.x, point2.x]);
        const maxY = calcMax([point1.y, point2.y]);
        this.min = new Point([minX, minY]);
        this.max = new Point([maxX, maxY]);
    }
    get width() {
        return this.max.x - this.min.x;
    }
    get height() {
        return this.max.y - this.min.y;
    }
    translate(p) {
        this.min.translate(p);
        this.max.translate(p);
        return this;
    }
    // 开始坐标移动到原点
    origin() {
        return this.translate(this.min.clone().reverse());
    }
    clone() {
        return new Bounds(this.min, this.max);
    }
}
function createBounds(b) {
    if (b instanceof Bounds) {
        return b;
    }
    return new Bounds(...b);
}

export { Bounds, createBounds };
