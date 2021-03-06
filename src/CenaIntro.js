
export default class CenaIntro extends Phaser.Scene {
    constructor() {
        super('CenaIntro');
    }

    preload() {
        
    }

    create () {
        var content = [
            'No século XII, havia um reino chamado Castelópolis. Este reino era governado por um rei muito poderoso, seu nome era Baldomiro.',
            'Certa vez na história, este reino em questão se encontrava em guerra com outros reinos da Europa. Em um momento de vulnerabilidade, um dos inimigos do mesmo contratou alguns assassinos para tentar se livrar do rei Baldomiro.',
            'Ao realizar uma investida furtiva com intenção de eliminar nosso rei, este acaba ficando sem seus guardas reais. Com isso, ele se encontra em uma enorme jornada para retornar ao seu reino são e salvo.'
        ];
    
        var graphics = this.make.graphics();
        graphics.fillRect(92, 133, 320, 250);
    
        var mask = new Phaser.Display.Masks.GeometryMask(this, graphics);
        var text = this.add.text(100, 280, content, { fontFamily: 'Arial', color: '#ffffff', wordWrap: { width: 310 } }).setOrigin(0);
        text.setMask(mask);
    
        var zone = this.add.zone(92, 130, 320, 256).setOrigin(0).setInteractive();
    
        zone.on('pointermove', function (pointer) {
            if (pointer.isDown)
            {
                text.y += (pointer.velocity.y / 10);
                text.y = Phaser.Math.Clamp(text.y, -400, 300);
            }
        });

        this.cameras.main.on('camerafadeoutcomplete', function () {
            this.scene.start('Cena1');
        }, this);

        this.input.keyboard.once('keydown', function () {
            this.cameras.main.fade(1000, 0, 0, 0);
        }, this);
    }

    update () {
        
    }
}