
export default class CenaFinal extends Phaser.Scene {
    constructor() {
        super('CenaFinal');
    }

    preload() {
        
    }

    create () {
        var content = [
            'Graças a você, o Rei Baldomiro conseguiu voltar ao seu castelo são e salvo.',
            'Com a volta do Rei ao seu castelo, você concluiu o jogo.',
            'Parabéns pela caminhada até aqui, foi uma ardua batalha, porém, vitoriosa.'
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
            this.scene.start('CenaMenu');
        }, this);

        this.input.keyboard.once('keydown', function () {
            this.cameras.main.fade(1000, 0, 0, 0);
        }, this);

        content = [
            'Idealização e desenvolvimento:',
            'Pedro Lopes'
        ];
        this.add.text(100, 430, content, { fontFamily: 'Arial', color: '#ffffff', wordWrap: { width: 310 } }).setOrigin(0);
    }

    update () {
        
    }
}