
cc.Class({
    extends: cc.Component,

    properties: {
        speed:0,
        bulletrDuration:0,
        timer:0,
    },
    onKeyDown (event) {
        // set a flag when key pressed
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = true;
                break;
            case cc.macro.KEY.d:
                this.accRight = true;
                break;
            case cc.macro.KEY.w:
                this.accFlow = true;
                break;
            case cc.macro.KEY.s:
                this.accDown = true;
                break;
        }
    },

    onKeyUp (event) {
        // unset a flag when key released
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = false;
                break;
            case cc.macro.KEY.d:
                this.accRight = false;
                break;
            case cc.macro.KEY.w:
                this.accFlow=false;
                break;
            case cc.macro.KEY.s:
                this.accDown=false;
                break;
        }
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.parent=this.node.getParent();
        this.game=this.parent.getComponent('game');

        this.accLeft = false;
        this.accRight = false;
        this.accDown=false;
        this.accFlow=false;

        
        cc.director.getCollisionManager().enabled=true;
        cc.director.getCollisionManager().enabledDebugDraw = false;

        // infiniate keyboard listerner
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);   
    },

    onDestroy () {
        // cancel keyboard listerner 
       

        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    start () {
        
    },
  
   update (dt) {
        if(this.accLeft&&this.node.x>-270)
            this.node.x -= this.speed;     
        else if(this.accRight&&this.node.x<270)
            this.node.x+=this.speed;
        else if(this.accFlow&&this.node.y<425)
            this.node.y+=this.speed;
        else if(this.accDown&&this.node.y>-425)
            this.node.y-=this.speed;
        else
           ;

        if (this.timer > this.bulletrDuration) {
            this.game.spawnNewBullet(this.node.x,this.node.y+this.node.height/2+13);
            this.timer=0;
            return;
        }
        this.timer += dt;      
    },

    onCollisionEnter:function(other,self){              
        if(other.node.group == 'enemy' || other.node.group == 'enemybuff') 
        {   
            this.node.destroy(); 
            other.node.destroy();
            this.game.gameOver();
        }
    },
   
});
