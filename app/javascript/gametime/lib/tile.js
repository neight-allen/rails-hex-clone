function Tile(image, context) {
  this.image = new Image();
  console.log(image)
  this.image.src = image;

  this._context = context;
}

module.exports = Tile;
