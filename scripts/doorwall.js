const shadowcolor=new Color(0,0,0,0.71);
const tilesize=Vars.tilesize;
const hexdooropen=newEffect(10, e => {
    Lines.stroke(e.fout() * 1.6);
    Lines.poly(e.x, e.y,6, tilesize / 2 + e.fin() * 2,0);
});
const hexdoorclose=newEffect(10, e => {
    Lines.stroke(e.fout() * 1.6);
    Lines.poly(e.x, e.y,6, tilesize / 2 + e.fout() * 2,0);
});

const doorwall = extendContent(Door, "doorwall", {
  draw(tile) {
    Draw.rect(Core.atlas.find(this.name+((tile.ent().open)?"-open":"")), tile.drawx()+(Math.floor(tile.y)%2)*Vars.tilesize/2, tile.drawy());
  },
  onHexDoorToggle(player,tile,open){
    var entity=tile.ent();
    if(entity != null){
      entity.open = open;

      //pathfinder.updateTile(tile);
      if(!entity.open){
          Effects.effect(hexdooropen, tile.drawx()+(Math.floor(tile.y)%2)*Vars.tilesize/2, tile.drawy());
      }else{
          Effects.effect(hexdoorclose, tile.drawx()+(Math.floor(tile.y)%2)*Vars.tilesize/2, tile.drawy());
      }
      Sounds.door.at(tile);
    }
  },
  tapped(tile,player){
    try{
      var entity = tile.ent();
      if((Units.anyEntities(tile) && entity.open) || !tile.entity.timer.get(0, 30)){
        return;
      }
      this.onHexDoorToggle(null, tile, !entity.open);
    }
    catch(err){
      print(err);
    }
  },
  drawRequestRegion(req, list){
    var reg = this.getRequestRegion(req, list);
    Draw.rect(reg, req.drawx()+(Math.floor(req.drawy()/Vars.tilesize)%2)*Vars.tilesize/2, req.drawy(),
    reg.getWidth() * req.animScale * Draw.scl,
    reg.getHeight() * req.animScale * Draw.scl,
    !this.rotate ? 0 : req.rotation * 90);
    if(req.hasConfig){
      this.drawRequestConfig(req, list);
    }
  },
  drawTeam(tile){
    Draw.color(tile.getTeam().color);
    Draw.rect("block-border", tile.drawx() - this.size * Vars.tilesize / 2 + 4+(Math.floor(tile.y)%2)*Vars.tilesize/2, tile.drawy() - this.size * Vars.tilesize / 2 + 4);
    Draw.color();
  },
  doclamp(x,mi,ma){
    return Math.max(mi,Math.min(x,ma));
  },
  drawCracks(tile){
    if(!tile.entity.damaged()) return;
    var id = tile.pos();
    var region = this.cracks[this.size - 1][this.doclamp(Math.floor((1 - tile.entity.healthf()) * this.crackRegions), 0, this.crackRegions-1)];
    Draw.colorl(0.2, 0.1 + (1 - tile.entity.healthf())* 0.6);
    Draw.rect(region, tile.drawx()+(Math.floor(tile.y)%2)*Vars.tilesize/2, tile.drawy(), (id%4)*90);
    Draw.color();
  }
});
