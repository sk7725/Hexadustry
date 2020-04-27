const shadowcolor=new Color(0,0,0,0.71);
const tilesize=Vars.tilesize;
const hexdooropen=newEffect(10, e => {
    Lines.stroke(e.fout() * 1.6);
    Lines.poly(e.x, e.y,6, tilesize / 2 + e.fin() * 2);
});
const hexdoorclose=newEffect(10, e => {
    Lines.stroke(e.fout() * 1.6);
    Lines.poly(e.x, e.y,6, tilesize / 2 + e.fout() * 2);
});

const door = extendContent(Door, "door", {
  draw(tile) {
    Draw.rect(Core.atlas.find(this.name+((tile.ent().open)?"-open":"")), tile.drawx()+(Math.floor(tile.y)%2)*Vars.tilesize/2, tile.drawy());
  },
  onDoorToggle(player,tile,open){
    var entity=tile.ent();
    if(entity != null){
      entity.open = open;

      pathfinder.updateTile(tile);
      if(!entity.open){
          Effects.effect(hexdooropen, tile.drawx()+(Math.floor(tile.y)%2)*Vars.tilesize/2, tile.drawy());
      }else{
          Effects.effect(hexdoorclose, tile.drawx()+(Math.floor(tile.y)%2)*Vars.tilesize/2, tile.drawy());
      }
      Sounds.door.at(tile);
    }
  }
});