
export default class CenaMenu extends Phaser.Scene {
    constructor() {
        super('CenaMenu');
    }

    preload() {
        
    }

    create() {
        this.sound.pauseOnBlur = false;
        this.sound.play('Intro', { loop: true });
        
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, 'Logo').setDepth(1);
        this.add.image(0, 0, 'TitleBG2').setOrigin(0).setDepth(0);
        let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'Play').setDepth(1);
        let optionsButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, 'Options').setDepth(1);

        let hoverSprite = this.add.sprite(100, 100, 'King');
        hoverSprite.setScale(2);
        hoverSprite.setVisible(false);

        //cria animação do sprite on hover
        this.anims.create({
            key: "walk",
            frameRate: 4,
            repeat: -1, //repeat forever,
            frames: this.anims.generateFrameNumbers("King", {
                frames: [1,3]
            })
        })
       
        playButton.setInteractive();

        playButton.on("pointerover", () => {
            hoverSprite.setVisible(true);
            hoverSprite.play("walk");
            hoverSprite.x = playButton.x - playButton.width;
            hoverSprite.y = playButton.y;

        })

        playButton.on("pointerout", () => {
            hoverSprite.setVisible(false);
        })

        playButton.on("pointerup", () => {
            
            this.cameras.main.on('camerafadeoutcomplete', function () {
                this.scene.start('Cena1');
            }, this);

            var red = Phaser.Math.Between(50, 255);
            var green = Phaser.Math.Between(50, 255);
            var blue = Phaser.Math.Between(50, 255);

            this.cameras.main.fade(2000, red, green, blue);
        })

        optionsButton.setInteractive();

        optionsButton.on("pointerover", () => {
            hoverSprite.setVisible(true);
            hoverSprite.play("walk");
            hoverSprite.x = optionsButton.x - optionsButton.width;
            hoverSprite.y = optionsButton.y;
        })

        optionsButton.on("pointerout", () => {
            hoverSprite.setVisible(false);
        })

        optionsButton.on("pointerup", () => {
            //this.scene.launch();
        })

    }

    update() {
        //this.player.update();
    }
}