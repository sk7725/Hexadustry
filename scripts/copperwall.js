
const copperwall = extendContent(Wall, "copperwall", {
  draw(tile) {
    Draw.rect(Core.atlas.find(this.name), tile.drawx()+(Math.floor(tile.y)%2)*Vars.tilesize/2, tile.drawy());
  },
  bounds(x,y,rect){
    return rect.setSize(this.size * Vars.tilesize).setCenter(x * Vars.tilesize +(Math.floor(y)%2)*Vars.tilesize/2+ offset(), y * Vars.tilesize + offset());
  }
});
