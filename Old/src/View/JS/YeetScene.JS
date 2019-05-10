class YeetScene extends Phaser.Scene{
    constructor(){
        super({key: "YeetScene"})
    }

    preload(){
        this.load.image('background', "assets/LoadScreen.png")
        this.load.image("yeetBut", "assets/yeet-meme-illustration.jpg")
    }

    create(){
        this.add.sprite(500,500, "background")

        this.YeetBut = this.add.sprite(500, 400, "yeetBut").setInteractive();

        this.YeetBut.on("pointerdown", function(event){
            this.scene.start('TitleScene')
        }, this)
    }

}