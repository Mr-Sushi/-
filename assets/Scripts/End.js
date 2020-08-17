// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

        restartButton: cc.Button,
        lastScore: cc.Label,
        maxScore: cc.Label,
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    onLoad() {
        this.setMaxScore();
        this.setLastScore();
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    restart() {
        cc.director.loadScene('game');
    },

    setMaxScore() {
        this.maxScore.string = "Max Score: "+cc.sys.localStorage.getItem("AIR_PLANE_MAX_SCORE") || 0;
    },

    setLastScore(){
        this.lastScore.string = "Score: "+cc.sys.localStorage.getItem("AIR_PLANE_LAST_SCORE") || 0;
    },

    // update (dt) {},
});
