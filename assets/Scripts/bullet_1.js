
cc.Class({
    extends: cc.Component,

    properties: {
        speed:0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.speed=10;
        this.parent=this.node.getParent();
        this.game=this.parent.getComponent('game');
        cc.director.getCollisionManager().enabled=true;
        cc.director.getCollisionManager().enabledDebugDraw = false;
    },

    start () {

    },

    update (dt) {
        this.node.y+=this.speed;
        if(this.node.y>470)
            this.node.destroy();
    },
    onCollisionEnter:function(other,self){  
                   
        if(other.node.group == 'enemy') 
        {
            var X=other.node.x;
            var Y=other.node.y;   
            this.node.destroy(); 
            other.node.destroy();
            this.game.addBoom(X,Y);
            this.game.addScore();
        }
        else if(other.node.group == 'enemybuff')
        {
            var X=other.node.x;
            var Y=other.node.y;   
            this.node.destroy(); 
            other.node.destroy();
            this.game.addBuff(X,Y);
            this.game.addScore();
        }

    },
});
