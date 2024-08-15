'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var bounds = require('./bounds.js');
var point = require('./point.js');
var utils = require('./utils.js');

const dpr = 1; // window.devicePixelRatio ?? 1
// window.devicePixelRatio = 1
class Painter {
    canvas;
    ctx;
    defaultTextStyle;
    defaultLineBaseStyle;
    _defaultTransform = { angle: 0, scale: 1, skew: 0, anchor: 0 };
    constructor() {
        const defaultTextBaseStyle = {
            fontFamily: '"Microsoft YaHei"',
            fontSize: 32,
            fontWeight: 'normal',
            fontStyle: 'normal',
            fill: '#000',
            stroke: undefined,
            fontStretch: 'normal',
            fontVariantCaps: 'normal',
            letterSpacing: 'normal',
            wordSpacing: 'normal',
            textAlign: 'left',
            textBaseline: 'top',
        };
        this.defaultTextStyle = Object.assign({
            ...this._defaultTransform,
        }, defaultTextBaseStyle);
        const defaultBaseStyle = {
            fill: undefined,
            stroke: '#000',
            dash: false,
            dashOffset: 0,
            lineCap: 'butt',
            lineJoin: 'miter',
        };
        this.defaultLineBaseStyle = Object.assign({ ...this._defaultTransform }, defaultBaseStyle);
    }
    /**
     * 检查init函数是否执行
     */
    _checkCtx() {
        if (!this.ctx) {
            throw new Error('请先执行 init() 函数');
        }
        return true;
    }
    /**
     * 设置颜色 fillStyle strokeStyle
     */
    setColor(_style) {
        this._create((ctx) => {
            if (_style.fill) {
                ctx.fillStyle = _style.fill;
            }
            if (_style.stroke) {
                ctx.strokeStyle = _style.stroke;
                ctx.lineWidth = typeof _style.strokeWeight === 'undefined' ? 1 : _style.strokeWeight;
            }
            if (_style.alpha !== undefined) {
                ctx.globalAlpha = utils.ensureBetween(_style.alpha);
            }
        }, false);
    }
    /**
     * 设置线段样式
     */
    setLineStyle(_style) {
        this._create((ctx) => {
            if (_style.dash) {
                if (_style.dash === true) {
                    ctx.setLineDash([4, 4]);
                }
                else {
                    ctx.setLineDash(_style.dash);
                }
            }
            ctx.lineDashOffset = _style.dashOffset;
            ctx.lineCap = _style.lineCap;
            ctx.lineJoin = _style.lineJoin;
        }, false);
    }
    setTransform(style, bounds, isArc = false) {
        this._create((ctx) => {
            let { angle = 0, scale = 1, skew = 0, anchor = 0, } = style;
            scale = point.createPoint(scale);
            skew = point.createPoint(skew);
            anchor = point.createPoint(anchor);
            // 角度转换为弧度
            const radians = angle * Math.PI / 180;
            // 计算变换矩阵的各个元素
            const scaleX = Math.cos(radians) * scale.x; // 缩放并旋转后，x轴方向的缩放
            const skewX = Math.sin(radians) * scale.x; // 缩放并旋转后，y轴方向的偏移（旋转+缩放）
            const skewY = -Math.sin(radians) * scale.y + skew.x; // 缩放并旋转后，x轴方向的偏移（旋转+缩放+倾斜）
            const scaleY = Math.cos(radians) * scale.y + skew.y; // 缩放并旋转后，y轴方向的缩放
            const min = bounds.min;
            const translateX = isArc
                ? bounds.width + bounds.width / 2 + bounds.width * (0.5 - anchor.x) / 2
                : min.x + bounds.width * anchor.x;
            const translateY = isArc
                ? bounds.height + bounds.height / 2 + bounds.height * (0.5 - anchor.y) / 2
                : min.y + bounds.height * anchor.x;
            const transform = ([
                scaleX,
                skewX,
                skewY,
                scaleY,
                translateX,
                translateY,
            ].map(e => e * dpr));
            console.log(transform);
            ctx.setTransform(...transform);
        }, false);
    }
    getAnchor(style) {
        return point.createPoint(style.anchor ?? 0);
    }
    /**
     * 初始化
     * @param width
     * @param height
     */
    init(width, height) {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.width = utils.formatValue(width);
        this.canvas.style.height = utils.formatValue(height);
        this.canvas.width = width * dpr;
        this.canvas.height = height * dpr;
        this.ctx.scale(dpr, dpr);
        return this;
    }
    /**
     * 绘制文本
     * @param text
     * @param x
     * @param y
     * @param style
     */
    text(text, x, y, style = {}) {
        return this._create((ctx) => {
            /**
             * 镂空
             */
            const _style = Object.assign({}, this.defaultTextStyle, style);
            /**
             * 镂空
             */
            const isHollowOut = !style.fill && style.stroke;
            /**
             * 填充颜色
             */
            this.setColor(_style);
            /**
             * font
             */
            ctx.font = utils.createCanvasFontString(_style);
            ctx.fontStretch = _style.fontStretch;
            ctx.fontVariantCaps = _style.fontVariantCaps;
            ctx.letterSpacing = utils.formatValue(_style.letterSpacing);
            ctx.wordSpacing = utils.formatValue(_style.wordSpacing);
            ctx.textAlign = _style.textAlign;
            ctx.textBaseline = _style.textBaseline;
            const fontSize = Number(Number.parseInt(`${_style.fontSize}`));
            /**
             * 文本宽度
             */
            let textWidth = 0;
            /**
             * 文本高度
             */
            let textHeight = Number.isNaN(fontSize) ? 0 : fontSize;
            // 多行文本绘制
            if (_style.maxWidth && _style.lineHeight) {
                textWidth = _style.maxWidth;
                const texts = text.split('');
                const splitText = [];
                let multilineText = [];
                for (let i = 0; i < texts.length; i++) {
                    const currentStr = texts[i];
                    multilineText.push(currentStr);
                    const rowStr = multilineText.join('');
                    if (ctx.measureText(rowStr).width > _style.maxWidth) {
                        multilineText.pop();
                        splitText.push(multilineText.join(''));
                        multilineText = [currentStr];
                        continue;
                    }
                    if (i === texts.length - 1) {
                        splitText.push(rowStr);
                    }
                }
                if (!splitText.length) {
                    textHeight = 0;
                }
                else if (splitText.length === 1) {
                    const measure = ctx.measureText(splitText[0]);
                    textHeight = Math.max(...[
                        measure.actualBoundingBoxDescent - measure.actualBoundingBoxAscent,
                        Number.isNaN(fontSize) ? 0 : fontSize,
                    ]);
                }
                else {
                    textHeight = (splitText.length - 1) * _style.lineHeight + textHeight;
                }
                const bounds$1 = new bounds.Bounds([x, y], [x + textWidth, y + textHeight]);
                this.setTransform(_style, bounds$1);
                const anchor = this.getAnchor(_style);
                const offsetX = x + anchor.x * bounds$1.width;
                const offsetY = y + anchor.y * bounds$1.height;
                x -= offsetX;
                y -= offsetY;
                for (let i = 0; i < splitText.length; i++) {
                    if (_style.stroke) {
                        ctx.strokeText(splitText[i], x, y + i * _style.lineHeight);
                    }
                    if (!isHollowOut) {
                        ctx.fillText(splitText[i], x, y + i * _style.lineHeight);
                    }
                }
            }
            // 单行文本绘制
            else {
                const measure = ctx.measureText(text);
                textWidth = measure.width;
                textHeight = Math.max(...[
                    measure.actualBoundingBoxDescent - measure.actualBoundingBoxAscent,
                    Number.isNaN(fontSize) ? 0 : fontSize,
                ]);
                const bounds$1 = new bounds.Bounds([x, y], [x + textWidth, y + textHeight]);
                this.setTransform(_style, bounds$1);
                const anchor = this.getAnchor(_style);
                const offsetX = x + anchor.x * bounds$1.width;
                const offsetY = y + anchor.y * bounds$1.height;
                x -= offsetX;
                y -= offsetY;
                if (_style.stroke) {
                    ctx.strokeText(text, x, y);
                }
                if (!isHollowOut) {
                    ctx.fillText(text, x, y);
                }
            }
            return textHeight;
        });
    }
    /**
     * 绘制线段
     * 你也可以使用此方法绘制多边形
     * @param lines
     * @param style
     */
    line(lines, style = {}) {
        return this._create((ctx) => {
            if (lines.length < 2) {
                console.warn('至少两个点');
                return;
            }
            const _style = Object.assign({}, this.defaultLineBaseStyle, style);
            this.setColor(_style);
            this.setLineStyle(_style);
            const x = utils.calcMin(lines.map(e => e[0]));
            const y = utils.calcMin(lines.map(e => e[1]));
            const x2 = utils.calcMax(lines.map(e => e[0]));
            const y2 = utils.calcMax(lines.map(e => e[1]));
            const bounds$1 = new bounds.Bounds([x, y], [x2, y2]);
            this.setTransform(_style, bounds$1);
            const anchor = this.getAnchor(style);
            const offsetX = anchor.x * bounds$1.width + lines[0][0];
            const offsetY = anchor.y * bounds$1.height + lines[0][1];
            lines = lines.map((e) => {
                return [e[0] - offsetX, e[1] - offsetY];
            });
            ctx.beginPath();
            ctx.moveTo(...lines.shift());
            for (let index = 0; index < lines.length; index++) {
                const point = lines[index];
                ctx.lineTo(...point);
            }
            if (_style.close) {
                ctx.closePath();
            }
            if (_style.stroke) {
                ctx.stroke();
            }
            if (_style.fill) {
                ctx.fill();
            }
        });
    }
    /**
     * 绘制矩形(圆角请设置 style.radii )
     * @param x
     * @param y
     * @param w
     * @param h
     * @param style
     */
    rect(x, y, w, h, style = {}) {
        return this._create((ctx) => {
            const _style = Object.assign({}, this.defaultLineBaseStyle, style);
            ctx.save();
            const bounds$1 = new bounds.Bounds([x, y], [x + w, y + h]);
            this.setTransform(_style, bounds$1);
            const anchor = this.getAnchor(_style);
            const offsetX = anchor.x * bounds$1.width + x;
            const offsetY = anchor.y * bounds$1.width + y;
            x -= offsetX;
            y -= offsetY;
            this.setColor(_style);
            this.setLineStyle(_style);
            ctx.beginPath();
            if (_style.radii) {
                ctx.roundRect(x, y, w, h, _style.radii);
            }
            else {
                ctx.rect(x, y, w, h);
            }
            if (_style.fill) {
                ctx.fill();
            }
            if (style.stroke) {
                ctx.stroke();
            }
        });
    }
    /**
     * 绘制圆弧
     * @param x
     * @param y
     * @param radius
     * @param style
     */
    arc(x, y, radius, style = {}) {
        return this._create((ctx) => {
            const base = {
                startDeg: 0,
                endDeg: 360,
            };
            const _style = Object.assign({ ...base }, this.defaultLineBaseStyle, style);
            const bounds$1 = new bounds.Bounds([
                x - radius,
                y - radius,
            ], [
                x + radius,
                y + radius,
            ]);
            this.setColor(_style);
            this.setLineStyle(_style);
            this.setTransform(_style, bounds$1, true);
            const anchor = point.createPoint(style.anchor ?? 0);
            const offsetX = (bounds$1.width + bounds$1.width / 2 + bounds$1.width * (0.5 - anchor.x) / 2);
            const offsetY = (bounds$1.height + bounds$1.height / 2 + bounds$1.height * (0.5 - anchor.x) / 2);
            x -= offsetX;
            y -= offsetY;
            const startAngle = _style.startAngle
                ? _style.startAngle
                : (_style.startDeg) * Math.PI / 180;
            const endAngle = _style.endAngle
                ? _style.endAngle
                : (_style.endDeg) * Math.PI / 180;
            ctx.beginPath();
            ctx.arc(x, y, radius, startAngle, endAngle, !!_style.counterclockwise);
            if (_style.stroke) {
                ctx.stroke();
            }
            if (_style.fill) {
                ctx.fill();
            }
        });
    }
    /**
     * 参考[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/arcTo)
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @param radius
     * @param style
     */
    arcTo(x1, y1, x2, y2, radius, style = {}) {
        return this._create((ctx) => {
            const _style = Object.assign({}, this.defaultLineBaseStyle, style);
            const bounds$1 = new bounds.Bounds([x1, y1], [x2, y2]);
            this.setTransform(_style, bounds$1);
            const anchor = this.getAnchor(_style);
            const offsetX = anchor.x * bounds$1.width + bounds$1.min.x;
            const offsetY = anchor.y * bounds$1.height + bounds$1.min.y;
            x1 -= offsetX;
            x2 -= offsetX;
            y1 -= offsetY;
            y2 -= offsetY;
            this.setColor(_style);
            this.setLineStyle(_style);
            ctx.beginPath();
            ctx.moveTo(x1, y2);
            ctx.arcTo(x1, y1, x2, y2, radius);
            if (_style.stroke) {
                ctx.stroke();
            }
            if (_style.fill) {
                ctx.fill();
            }
        });
    }
    /**
     * [绘制贝塞尔曲线](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/bezierCurveTo)
     */
    bezier(start, cp1, cp2, end, style = {}) {
        return this._create((ctx) => {
            start = point.createPoint(start);
            cp1 = point.createPoint(start);
            cp2 = point.createPoint(start);
            end = point.createPoint(start);
            const _style = Object.assign({}, this.defaultLineBaseStyle, style);
            const bounds$1 = new bounds.Bounds([start.x, start.y], [end.x, end.y]);
            this.setTransform(_style, bounds$1);
            const anchor = this.getAnchor(_style);
            const offsetX = anchor.x * bounds$1.width + start.x;
            const offsetY = anchor.y * bounds$1.height + start.y;
            start.x -= offsetX;
            cp1.x -= offsetX;
            cp2.x -= offsetX;
            end.x -= offsetX;
            start.y -= offsetY;
            cp1.y -= offsetY;
            cp2.y -= offsetY;
            end.y -= offsetY;
            this.setColor(_style);
            ctx.beginPath();
            ctx.moveTo(start.x, start.y);
            ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
            if (_style.stroke) {
                ctx.stroke();
            }
            if (_style.fill) {
                ctx.fill();
            }
        });
    }
    image(maybeImage, x, y, style = {}) {
        this._create((ctx) => {
            const _style = Object.assign({}, this.defaultLineBaseStyle, style);
            if (maybeImage instanceof HTMLImageElement) {
                /**
                 * 原始大小
                 */
                const imgSize = point.createPoint([maybeImage.width, maybeImage.height]);
                /**
                 * 用户传入的大小
                 */
                const size = point.createPoint(_style.size ?? imgSize.clone());
                /**
                 * 原点
                 */
                const _anchor = point.createPoint(_style.anchor ?? 0);
                /**
                 * 裁剪边框
                 */
                const _cropBounds = bounds.createBounds(_style.crop ?? bounds.createBounds([[0, 0], imgSize]));
                /**
                 * 裁剪边框
                 */
                const cropBounds = _cropBounds.clone().origin().translate([x, y]);
                this.setTransform(_style, cropBounds);
                x -= cropBounds.width * _anchor.x + x;
                y -= cropBounds.height * _anchor.y + y;
                this.setColor(_style);
                // 只有
                if (!_style.crop && _style.size && _style.objectFit) {
                    const diff = utils.calcDiff([imgSize.x, imgSize.y]);
                    switch (_style.objectFit) {
                        case 'contain':
                            if (imgSize.x < imgSize.y) {
                                x += diff / 2;
                                size.x -= diff;
                            }
                            else if (imgSize.x > imgSize.y) {
                                y -= diff / 2;
                                size.y += diff;
                            }
                            break;
                    }
                }
                const args = [
                    maybeImage,
                    _cropBounds.min.x,
                    _cropBounds.min.y,
                    _cropBounds.max.x,
                    _cropBounds.max.y,
                    x,
                    y,
                    size.x,
                    size.y,
                ];
                ctx.drawImage(...args);
            }
        });
    }
    /**
     *
     * @param callback
     * @param save
     */
    _create(callback, save = true) {
        if (!this._checkCtx()) {
            throw new Error('未执行init函数');
        }
        const ctx = this.ctx;
        if (save) {
            ctx.save();
        }
        const result = callback(ctx);
        if (save) {
            ctx.restore();
        }
        return result;
    }
}
// test
const p = new Painter();
p.init(600, 600);
p.rect(0, 0, 600, 600, {
    fill: '#81D4FA',
});
p.text('单行文本', 50, 50, {
    fill: 'red',
    anchor: 0.5,
    // angle: -30,
    alpha: 0.3,
    // skew: {
    //   x: -0.5,
    //   y: 0.1,
    // },
});
p.text('平林漠漠烟如织，寒山一带伤心碧。暝色入高楼，有人楼上愁。玉阶空伫立，宿鸟归飞急。何处是归程？长亭更短亭', 200, 0, {
    fontFamily: '黑体',
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 900,
    maxWidth: 250,
    lineHeight: 20,
    letterSpacing: 10,
    wordSpacing: 50,
    stroke: 'blue',
    fill: 'red',
    alpha: 0.3,
    anchor: 0.5,
    angle: -20,
    skew: {
        x: -0.5,
        y: -0.1,
    },
});
p.line([
    [250, 160],
    [250 + 300, 160],
    [250 + 300, 160 + 120],
], {
    fill: '#26A69A',
    close: true,
    strokeWeight: 4,
    stroke: '#7effdb',
    lineCap: 'round',
    lineJoin: 'round',
    anchor: 0.5,
    angle: 100,
    skew: -0.1,
});
p._create((ctx) => {
    ctx.beginPath();
    [100, 200, 300, 400, 500].forEach((e) => {
        ctx.moveTo(e, 0);
        ctx.lineTo(e, 600);
        ctx.moveTo(0, e);
        ctx.lineTo(600, e);
    });
    ctx.stroke();
    ctx.textBaseline = 'top';
    ctx.font = '12px 黑体';
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 6; col++) {
            ctx.fillText(`${row * 100},${col * 100}`, row * 100, col * 100);
        }
    }
}, false);
console.log('arc222');
p.arc(200, 500, 90, {
    strokeWeight: 0,
    lineJoin: 'round',
    fill: '#FFF176',
    alpha: 0.5,
    // anchor: 0.5,
    // skew: {
    //   x: 0.1,
    //   y: 0.1,
    // },
    // scale: 1.5,
    // startAngle: 0.5,
});
p.arcTo(200, 600, 50, 100, 60, {
    stroke: '#e84a5f',
    strokeWeight: 10,
    alpha: 0.5,
    // scale: 1.5,
    anchor: 0.5,
});
p.rect(150, 450, 100, 100, {
    strokeWeight: 9,
    lineJoin: 'round',
    fill: 'blue',
    alpha: 0.5,
    anchor: 0.5,
    scale: 1.5,
    skew: {
        x: 0.8,
        y: 0.2,
    },
    // scale: 0.5,
});
const start = { x: 50, y: 20 + 300 };
const cp1 = { x: 230, y: 30 + 300 };
const cp2 = { x: 150, y: 80 + 300 };
const end = { x: 250, y: 100 + 300 };
p.bezier(start, cp1, cp2, end, {
    strokeWeight: 2,
    stroke: '#2eb872',
    scale: 1,
    // anchor: 0.5,
});
const img = new Image();
img.src = '/th.jpg';
// const k = 0.5
img.onload = () => {
    setTimeout(() => {
        p.image(img, 0, 0, {
            anchor: 0.5,
            // angle: 15,
            size: 300,
            // size: 250,
            objectFit: 'contain',
            // crop: [
            //   [300 * k, 379 * k],
            //   [300, 379],
            // ],
        });
    });
};
// const img2 = new Image()
// img2.src = '/eva-0.jpg'
// img2.onload = () => {
//   p.image(img, 300, 0, {
//   })
// }
const canvas = p.canvas;

exports.Painter = Painter;
exports.canvas = canvas;
exports.default = Painter;
