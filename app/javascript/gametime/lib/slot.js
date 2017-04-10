const hexHelper = require('./hex-helper');

var defaultImage = new Image();
defaultImage.src = require("../images/slot_hex.svg")

var image_width = (hexHelper.size * 2) - 2;

function Slot(hex, context){
  this.hex = hex;
  this._context = context;
}

Slot.prototype.draw = function(){
  var pixels = this.hex.toPixels();
  var img = this.tile == undefined ? defaultImage : this.tile.image;
  var pixels = hexHelper.addVector2(pixels, hexHelper.boardOffset);
  pixels = hexHelper.subVector2(pixels, hexHelper.vector2Size);
  this._context.drawImage(img, pixels.x, pixels.y, image_width, image_width);
}

module.exports = Slot;
