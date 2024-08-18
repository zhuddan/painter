"use strict";var t=require("../utils.js"),n=require("./point.js");class i{min;max;constructor(i,e){i=n.createPoint(i),e=n.createPoint(e);const r=t.calcMin([i.x,e.x]),s=t.calcMin([i.y,e.y]),a=t.calcMax([i.x,e.x]),c=t.calcMax([i.y,e.y]);this.min=new n.Point([r,s]),this.max=new n.Point([a,c])}get width(){return this.max.x-this.min.x}get height(){return this.max.y-this.min.y}translate(t){return this.min.translate(t),this.max.translate(t),this}origin(){return this.translate(this.min.clone().reverse())}clone(){return new i(this.min,this.max)}}exports.Bounds=i,exports.createBounds=function(t){return t instanceof i?t:new i(...t)};
//# sourceMappingURL=bounds.js.map
