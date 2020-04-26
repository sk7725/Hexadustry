const shadowcolor=new Color(0,0,0,0.71);
const copperwall = extendContent(Wall, "copperwall", {
  draw(tile) {
    /*
    Draw.proj().setOrtho(0, 0, Vars.tilesize, Vars.tilesize);
    Fill.rect(tile.drawx()+(Math.floor(tile.y)%2)*Vars.tilesize/2+0.5, tile.drawy()+0.5, 1, 1);
    */

    //Draw.rect("shadow-hex"), tile.drawx()+(Math.floor(tile.y)%2)*Vars.tilesize/2, tile.drawy());
    Draw.rect(Core.atlas.find(this.name), tile.drawx()+(Math.floor(tile.y)%2)*Vars.tilesize/2, tile.drawy());
  },
  drawPlace(x,y,rotation,valid) {
    if(valid){
      Draw.rect(Core.atlas.find(this.name), x+(Math.floor(y)%2)*Vars.tilesize/2, y);
    }
    else{
      this.super$drawPlace(x,y,rotation,valid);
    }
  }
  /*
  bounds(x,y,rect){
    try{
      return rect.setSize(this.size * Vars.tilesize).setCenter(x * Vars.tilesize +(Math.floor(y)%2)*Vars.tilesize/2+ this.offset(), y * Vars.tilesize + this.offset());
    }
    catch(err){
      print("HEX: "+err);
      this.super$bounds(x,y,rect);
    }
  }
  */
});
