
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.scheduleOnce(this.boom.bind(this),0.1);
    },
    boom(){
      this.node.destroy();  
    },

    // update (dt) {},
});
