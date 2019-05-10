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
        this.player = this.physics.add.sprite(150, 440, "livePlayer")
        this.player.setCollideWorldBounds(true);
        this.player.body.bounce.x = 1.0
        this.player.body.bounce.y = 1.0
        this.enemy = this.physics.add.sprite(800, 300, "infected")
        this.enemy.setCollideWorldBounds(true);
        this.enemy.body.bounce.x = 1.0
        this.enemy.body.bounce.y = 1.0

        this.key_down_text = this.add.text(990, 700, "", { fontSize: '32px', fill: '#000' }), this;

        var level = [
            "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "x                        x",
            "x                        x",
            "x                        x",
            "x                        x",
            "x                        x",
            "x                        x",
            "x                        x",
            "xxxxxxx            xxxxxxxxxxxxxxxxxxxxxxxxx",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "xxxxxxxxxx",
            "xxxxx",
            "xx                                      xxxxxxxxxxx",
            "                                              xxxxx",
            "                                                  x",
            "                      xxxxxxxx",
            "                      xxxxxxxx",
            "                         xxxxx",
            "",
            "",
            "            xxxxxx                     xxxxxxxxxxx ",
            "   xxx",
            "",
            "",
            "",
            "     xxxxxxxxxxxx",
            "     xxxxxxx",
            "     xxx" 
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

        this.cursors = this.input.keyboard.createCursorKeys();

        


    }

    update() {
        //PULL GAME STATE

        //UPDATE OTHER SPRITES

        //IF NAME BLANK ASSIGN SELF.NAME TO LEN JSON+1

        //WRITE GAMESTATE WITH SELF.NAME

        this.physics.collide(this.player, this.walls, function(){
            //alert("You've collided a wall")
        }, null, this)
        this.physics.collide(this.enemy, this.walls, function(){
            //alert("The enemy collided with a wall")
        }, null, this)
        this.physics.overlap(this.player, this.enemy, function(){
            let xpos = this.player.x
            let ypos = this.player.y
            this.WSpost = {
                "player": this.playername,
                "pos": {
                    'x':xpos,
                    'y': ypos
                },
                "status": "infected"
            }
            this.player.destroy()
            this.player = this.physics.add.sprite(xpos, this.player.y, "infected")
            this.player.setCollideWorldBounds(true)
            //post and change to infected scene
            //this.scene.start("YeetScene")
            alert("You've Been Tagged")
            
        },null, this)

        this.player.body.velocity.x = 0
        this.player.body.velocity.y = 0
        this.enemy.body.velocity.x = 0
        this.enemy.body.velocity.y = 0
        
        if (this.key_A.isDown){
            this.player.body.velocity.x = -150
            this.key_down_text.setText("A")
        }else if (this.key_D.isDown){
            this.player.body.velocity.x = 150;
            this.key_down_text.setText("D")
        }
    
        if (this.key_W.isDown){
            this.player.body.velocity.y = -150
            this.key_down_text.setText("W")
        }else if (this.key_S.isDown){
            this.player.body.velocity.y = 150;
            this.key_down_text.setText("S")
        }

        if (this.cursors.left.isDown){
    	    this.enemy.body.velocity.x = -170;
        }else if (this.cursors.right.isDown){
    	    this.enemy.body.velocity.x = 170;
        }

        if (this.cursors.up.isDown){
    	    this.enemy.body.velocity.y = -170;
        }else if (this.cursors.down.isDown){
    	    this.enemy.body.velocity.y = 170;
        }

        //SEND GAME STATE
        
    }


}