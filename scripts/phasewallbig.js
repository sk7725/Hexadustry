const shadowcolor=new Color(0,0,0,0.71);
const phasewallbig = extendContent(DeflectorWall, "phasewallbig", {
  draw(tile) {
    var shift="";
    if(Math.floor(tile.y)%2==1) shift="-1";
    Draw.rect(Core.atlas.find(this.name+shift), tile.drawx()+Vars.tilesize/4, tile.drawy());
  },
  getRequestRegion(req, list){
    return this.icon(Cicon.full);
  },
  drawRequestRegion(req, list){
    //print("req start");
    var reg = this.getRequestRegion(req, list);
    var shift="";
    if(Math.floor(req.drawy()/Vars.tilesize)%2==1) shift="-1";
    Draw.rect(Core.atlas.find(this.name+shift), req.drawx()+Vars.tilesize/4, req.drawy(),
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
    Draw.rect(region, tile.drawx()+Vars.tilesize/4, tile.drawy(), (id%4)*90);
    Draw.color();
  }
});
