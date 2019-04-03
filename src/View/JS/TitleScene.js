class TitleScene extends Phaser.Scene{

    constructor(){
        super({key: "TitleScene"});
    }

    preload(){
        this.load.image('background', "assets/LoadScreen.png")
        this.load.image('playBut', "assets/playButton.png")
        this.load.image('abtBut', "assets/About.png")
    }

    create(){
        this.add.sprite(0,0, "background")
    }

}