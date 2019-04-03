class GameScene extends Phaser.Scene{
    constructor(){
        super({key: "GameScene"});
    };

    

    preload(){
        this.load.image("livePlayer", "assets/aliveSprite.png");
        this.load.image("infected", "assets/infectedSprite.png");
        this.load.image('backgroundGame', "assets/Untitled-1.png");
        this.load.image("barrier", "assets/barrier.png")


    };

    create(){
        //this.physics.startSystem(Phaser.Physics.ARCADE);
        
        
        this.add.sprite(500, 500, "backgroundGame")
        this.walls = this.physics.add.staticGroup();
        this.player = this.physics.add.sprite(150, 400, "livePlayer")
        this.player.setCollideWorldBounds(true);
        

        var level = [
            "xxxxxxxxxxxxxxxxxxxxxxxxxx",
            "x                        x",
            "x                        x",
            "x                        x",
            "x                        x",
            "x                        x",
            "x                        x",
            "x                        x",
            "xxxxxxxxxxxxxxxxxxxxxxxxxx",
        ]

        for(var i = 0; i < level.length; i+=1 ){
            for(var j = 0; j < level[i].length; j += 1){
                if(level[i][j] == "x"){
                    this.walls.create(30+20*j, 30+20*i, "barrier");
                }
            }
        }

        this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)


    }

    update() {
        this.physics.collide(this.player, this.walls)

        this.player.body.velocity.x = 0
        this.player.body.velocity.y = 0

        if (this.key_A.isDown){
            this.player.body.velocity.x = -150
        }else if (this.key_D.isDown){
            this.player.body.velocity.x = 150;
        }
    
        if (this.key_W.isDown){
            this.player.body.velocity.y = -150
        }else if (this.key_S.isDown){
            this.player.body.velocity.y = 150;
        }
    }

    

}