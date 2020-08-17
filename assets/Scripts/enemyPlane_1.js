
cc.Class({
    extends: cc.Component,

    properties: {
        speed:0,
        bulletrDuration:0,
        timer:0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.speed=3;
        this.parent=this.node.getParent();
        this.game=this.parent.getComponent('game');

    },

   
    update (dt) {
        this.node.y-=this.speed;
        if(this.node.y<-500)
            this.node.destroy(); 
 
    },    
    
});
