
cc.Class({
    extends: cc.Component,

    properties: {
        speed:0,
        bulletrDuration:0,
        timer:0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.bulletrDuration=0.7;
        this.timer=0.8;
        this.speed=3;
        this.parent=this.node.getParent();
        this.game=this.parent.getComponent('game');

    },

   
    update (dt) {
        this.node.y-=this.speed;
        if(this.node.y<-500)
            this.node.destroy(); 

        if (this.timer > this.bulletrDuration) {
            this.game.spawnEnemyBullet(this.node.x,this.node.y+this.node.height/2-65);
            this.timer=0;
            return;
        }
        this.timer += dt;   
    },    
    
});
