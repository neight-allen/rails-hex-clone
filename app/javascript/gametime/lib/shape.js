const _ = require('underscore');
const Tile = require('./tile');
const hexHelper = require('./hex-helper');
const Hex = require('./hex')
const tiles = [
  require('../images/tile_hex_1.svg'),
  require('../images/tile_hex_2.svg'),
  require('../images/tile_hex_3.svg'),
  require('../images/tile_hex_4.svg'),
];

var image_width = (hexHelper.size * 2) - 2;

const possibleShapes = [
  {
    image: tiles[1],
    coords: [ [0,0,0] ],
  },
  {
    image: tiles[2],
    coords: [
      [-1,0,1],
      [0,0,0],
      [1,0,-1],
      [2,0,-2],
    ],
  },
  {
    image: tiles[2],
    coords: [
      [-1,1,0],
      [0,0,0],
      [1,-1,0],
      [2,-2,0],
    ],
  },
  {
    image: tiles[2],
    coords: [
      [0,-1,1],
      [0,0,0],
      [0,1,-1],
      [0,2,-2],
    ],
  },
  {
    image: tiles[3],
    coords: [
      [0,-1,1],
      [0,0,0],
      [0,1,-1],
      [1,-1,0],
    ],
  },
  {
    image: tiles[3],
    coords: [
      [0,-1,1],
      [0,0,0],
      [0,1,-1],
      [-1,1,0],
    ],
  },
  {
    image: tiles[3],
    coords: [
      [-1,1,0],
      [0,0,0],
      [1,-1,0],
      [0,1,-1],
    ],
  },
  {
    image: tiles[3],
    coords: [
      [-1,1,0],
      [0,0,0],
      [1,-1,0],
      [0,-1,1],
    ],
  },
  {
    image: tiles[3],
    coords: [
      [-1,0,1],
      [0,0,0],
      [1,0,-1],
      [-1,1,0],
    ],
  },
  {
    image: tiles[3],
    coords: [
      [-1,0,1],
      [0,0,0],
      [1,0,-1],
      [1,-1,0],
    ],
  },
  {
    image: tiles[0],
    coords: [
      [0,0,0],
      [-1,1,0],
      [-1,0,1],
      [0,-1,1],
    ],
  },
  {
    image: tiles[0],
    coords: [
      [0,0,0],
      [-1,1,0],
      [1,0,-1],
      [0,1,-1],
    ],
  },
]

function Shape(context){
  this._context = context;
  this.tiles = this.makeTilesFromCoords(_.sample(possibleShapes))

}

Shape.prototype.makeTilesFromCoords = function(shapeOpts) {
  var shape = this;
  this.image = shapeOpts.image;
  return shapeOpts.coords.map(function(coords) {
    var [x,y,z] = coords;
    return {
      hex: new Hex(x, y, z),
      tile: new Tile(shapeOpts.image)
    };
  });
}

Shape.prototype.draw = function(xOffset, yOffset, scale = 1) {
  var ctx = this._context
  this.tiles.forEach(function(tileOpts){
    // var [x,y] = hexHelper.hexToPixels(tileOpts.x, tileOpts.y, tileOpts.z).map(n => n * scale);
    pixels = tileOpts.hex.toPixels();

    pixels.x = pixels.x * scale + xOffset - hexHelper.size;
    pixels.y = pixels.y * scale + yOffset - hexHelper.size;

    img = tileOpts.tile.image;
    ctx.drawImage(img, pixels.x, pixels.y, image_width * scale, image_width * scale);
  })
}

module.exports = Shape;
