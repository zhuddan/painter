"use strict";var i=require("../coordinate/ObservablePoint.js"),s=require("../utils.js"),t=require("../app.js"),e=require("./display.js");require("../index-DdxX_nW5.js"),require("../const.js");class h extends e.Display{options;constructor(i,s){super(s),this.options=s,"string"==typeof i?(this.image=t.App.createImage(),this.image.src=i):this.image=i,this.image.complete?this._onImageComplete():this.image.addEventListener("load",(()=>{this._onImageComplete()}))}image;_size=new i.ObservablePoint(this,0,0);_imageSize=new i.ObservablePoint(this,0,0);set size(i){this.size!==i&&(this._size.copyFrom(i),this.shouldUpdateBounds())}get size(){return this._size}_slice=new i.ObservablePoint(this);set slice(i){this.slice!==i&&(this._slice.copyFrom(i),this.shouldUpdateBounds())}get slice(){return this._slice}_sliceSize=new i.ObservablePoint(this);set sliceSize(i){this.sliceSize!==i&&(this._sliceSize.copyFrom(i),this._onUpdate(),this.shouldUpdateBounds())}get sliceSize(){return this._sliceSize}_objectFit="none";set objectFit(i){this.objectFit!==i&&(this._objectFit=i,this.shouldUpdateBounds(),this._onUpdate())}get objectFit(){return this._objectFit}_rounded=0;set rounded(i){i=i<=0?0:i,this.rounded!==i&&(this._rounded=i,this._onUpdate())}_onUpdate(i){this._ready&&super._onUpdate(i)}get rounded(){return this._rounded}_ready=!1;_onImageComplete(){this._imageSize=new i.ObservablePoint(this,this.image.width,this.image.height),this.size=this.options?.size??{x:this.image.width,y:this.image.height},this.slice=this.options?.slice??this.slice,this.sliceSize=this.options?.sliceSize??{x:this.image.width,y:this.image.height},this.objectFit=this.options?.objectFit??this.objectFit,this.rounded=this.options?.rounded??this.rounded,this.emit("ready"),this._ready=!0,this._onUpdate(),this.shouldUpdateBounds()}get _shouldUpdate(){return!0}get _isSlice(){return!!this.slice.x||!!this.slice.y||!this.sliceSize.equals(this.size)}_render(i){if(this._isSlice){const s=[this.image,this.slice.x,this.slice.y,this.sliceSize.x,this.sliceSize.y,this.x,this.y,this.size.x,this.size.y];i.beginPath(),this.rounded?i.roundRect(this.x,this.y,this.size.x,this.size.y,this.rounded):i.rect(this.x,this.y,this.size.x,this.size.y),i.clip(),i.drawImage(...s)}else{const t=this.size.clone(),e=this.position.clone(),h=t.x/this._imageSize.x,o=s.calcDiff([this._imageSize.x,this._imageSize.y])*h,n=this._imageSize.x<this._imageSize.y,r=this._imageSize.x>this._imageSize.y;if(n||r)switch(this.objectFit){case"contain":n?(this.position.set(this.position.x-o/2,this.position.y),this.size.set(this.size.x-o,this.size.y)):(this.position.set(this.position.x,this.position.y+o/2),this.size.set(this.size.x,this.size.y-o)),i.beginPath(),this.rounded?i.roundRect(this.x,this.y,this.size.x,this.size.y,this.rounded):i.rect(this.x,this.y,this.size.x,this.size.y),i.clip();break;case"cover":n?(this.position.set(this.position.x+o/2,this.position.y),this.size.set(this.size.x+o,this.size.y)):(this.position.set(this.position.x-o/2,this.position.y),this.size.set(this.size.x+o,this.size.y)),i.beginPath(),this.rounded?i.roundRect(e.x,e.y,t.x,t.y,this.rounded):i.rect(e.x,e.y,t.x,t.y),i.clip()}i.drawImage(this.image,this.position.x,this.position.y,this.size.x,this.size.y),this.position=e,this.size=t}}transformWidth=0;transformHeight=0;updateTransformBounds(){this.transformHeight=this.size.x,this.transformWidth=this.size.y}}exports.Picture=h;
//# sourceMappingURL=picture.js.map
