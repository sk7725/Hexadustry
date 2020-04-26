
const copperwall = extendContent(Wall, "copperwall", {
  draw(tile) {
    Draw.rect(Core.atlas.find(this.name), tile.drawx()+(Math.floor(tile.y)%2)*Vars.tilesize/2, tile.drawy());
  },
  bounds(x,y,rect){
    try{
      return rect.setSize(this.size * Vars.tilesize).setCenter(x * Vars.tilesize +(Math.floor(y)%2)*Vars.tilesize/2+ this.offset(), y * Vars.tilesize + this.offset());
    }
    catch(err){
      print("HEX: "+err);
      this.super$bounds(x,y,rect);
    }
  }
});
