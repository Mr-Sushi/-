
cc.Class({
    extends: cc.Component,

    properties: {
        bullet_1Prefab: {
            default: null,
            type: cc.Prefab
        },
        player: {
            default: null,
            type: cc.Node
        },
        enemyPrefab:{
            default: null,
            type: cc.Prefab
        },
        enemyBulletPrefab:{
            default: null,
            type: cc.Prefab
        },
        score:{
            default:null,
            type:cc.Label
        },
        scoreAudio: {
            default: null,
            type: cc.AudioClip
        },
        bullet_2Prefab: {
            default: null,
            type: cc.Prefab
        },
        boomPrefab:{
            default: null,
            type: cc.Prefab
        },
        enemyBuffPrefab:{
            default: null,
            type: cc.Prefab
        },
        buff:{
            default: null,
            type: cc.Prefab
        }
    },
    onLoad() {
        this.tran=0;
        this.Score=0;
        this.bulletrDuration=2;
        this.timer=0;
        this.player.getComponent('player').game = this;
        
    },

    start () {
        
    },

    update (dt) {
        //enemy plane
        if (this.timer > this.bulletrDuration) {
            this.spawnNewEnemy();
            this.timer=0;
            return;
        }
        this.timer += dt; 
    },

    //bullet
    spawnNewBullet: function(X,Y) {
        switch(this.tran) {
            case 0:
                var newBullet = cc.instantiate(this.bullet_1Prefab);
                this.node.addChild(newBullet);
                newBullet.setPosition(cc.v2(X,Y));
                break;
            case 1:
                var newBullet = cc.instantiate(this.bullet_2Prefab);
                this.node.addChild(newBullet);
                newBullet.setPosition(cc.v2(X,Y));
                break;
        }
    },

    //enemy plane random location
    spawnNewEnemy: function() {
        if(Math.random()<0.3)
        {
            var newEnemy = cc.instantiate(this.enemyBuffPrefab);
            this.node.addChild(newEnemy);
            newEnemy.setPosition(this.getNewEnemyPosition());
        }
        else{
            var newEnemy = cc.instantiate(this.enemyPrefab);
            this.node.addChild(newEnemy);
            newEnemy.setPosition(this.getNewEnemyPosition());
        }   
    },
    getNewEnemyPosition: function () {
        var randX = 0;
        //  get the x coordiate through screen width
        var maxX = this.node.width/2;
        randX = (Math.random() - 0.5) * 2 * maxX;
        return cc.v2(randX, 480);
    },

    //enemy plane's bullet
    spawnEnemyBullet: function(X,Y) {
        var newEnemyBullet = cc.instantiate(this.enemyBulletPrefab);
        this.node.addChild(newEnemyBullet);
        newEnemyBullet.setPosition(cc.v2(X,Y));
    },

    //score
    addScore:function(){
        cc.audioEngine.playEffect(this.scoreAudio, false);
        this.Score++;
        this.score.string="Scoer: "+this.Score;
    },
    //boom
    addBoom:function(X,Y){
        var newBoom = cc.instantiate(this.boomPrefab);
        this.node.addChild(newBoom);
        newBoom.setPosition(cc.v2(X,Y));
    },
    //buff
    addBuff:function(X,Y){
        var newBuff = cc.instantiate(this.buff);
        this.node.addChild(newBuff);
        newBuff.setPosition(cc.v2(X,Y));
    },
    tran_Bullet:function(X){
        this.tran=X;
    },
    gameOver(){
        cc.sys.localStorage.setItem("AIR_PLANE_LAST_SCORE", this.Score);
        var maxScore = cc.sys.localStorage.getItem("AIR_PLANE_MAX_SCORE") || 0;
        if (maxScore < this.Score) {
            cc.sys.localStorage.setItem("AIR_PLANE_MAX_SCORE", this.Score);
        }
        cc.director.loadScene('end')
    }

});
