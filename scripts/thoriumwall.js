const shadowcolor=new Color(0,0,0,0.71);
const thoriumwall = extendContent(Wall, "thoriumwall", {
  draw(tile) {
    Draw.rect(Core.atlas.find(this.name), tile.drawx()+(Math.floor(tile.y)%2)*Vars.tilesize/2, tile.drawy());
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
