import Player from "./Player.js";
import Enemy from "./Enemy.js";
import Item from "./Item.js";
// import DialogModalPlugin from './dialog_plugin';

export default class Cena1 extends Phaser.Scene {
    constructor() {
        super('Cena1');
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    preload() {
        Player.preload(this, 'king');
        Enemy.preload(this, 'thief');
        Enemy.preload(this, 'elite_knight');
        Item.preload(this, 'pocao');
        Item.preload(this, 'lever');
        // this.load.plugin('DialogModalPlugin', './dialog_plugin');
    }

    createPotions() {
        //this.potions = this.add.group();
    }

    collectPocao() {
        console.log('pocao');
    }

    doDamage(bodyA, bodyB) {
        let label = bodyA.label.includes('enemy') ? bodyA.label.replace('Collider','').replace('Sensor','') : bodyB.label.replace('Collider','').replace('Sensor','');
        this.enemies.some(
        
        // switch(label) {
        //     case this.enemy1.label:
        //         this.enemy1.takeDamage(this.player);
        //         break;
        //     case this.enemy2.label:
        //         this.enemy2.takeDamage(this.player);
        //         break;
        //     case this.enemy3.label:
        //         this.enemy3.takeDamage(this.player);
        //         break;
        //     case this.enemy4.label:
        //         this.enemy4.takeDamage(this.player);
        //         break;
        //     case this.enemy5.label:
        //         this.enemy5.takeDamage(this.player);
        //         break;
        //     default:
        //         break;
        // }

    }

    create() {
        const map = this.make.tilemap({ key: 'map' });

        const tileset1 = map.addTilesetImage('RPG Nature Tileset', 'tiles1', 32, 32, 0, 0);
        //const tileset2 = map.addTilesetImage('ItemPack_Outline_Black', 'tiles2', 24, 24, 0, 0);
        const layer1 = map.createStaticLayer('Camada de Tiles 1', tileset1, 0, 0);
        const layer2 = map.createStaticLayer('Camada de Tiles 2', tileset1, 0, 0);
        //const layer3 = map.createStaticLayer('Camada de Tiles 3', tileset2, 0, 0);
        layer1.setCollisionByProperty({ collides: true });
        layer2.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(layer1);
        this.matter.world.convertTilemapLayer(layer2);

        this.player = new Player({ scene: this, x: 50, y: 50, texture: 'king', frame: 'king_r_idle_1', hp: 3, damage: 1 });
        
        this.enemies = [
            new Enemy({ scene: this, x: 155, y: 60, texture: 'thief', frame: 'thief_idle_1', label: 'enemy1', hp: 2, damage: 1 }),
            new Enemy({ scene: this, x: 450, y: 60, texture: 'thief', frame: 'thief_idle_1', label: 'enemy2', hp: 2, damage: 1 }),
            new Enemy({ scene: this, x: 350, y: 200, texture: 'thief', frame: 'thief_idle_1', label: 'enemy3', hp: 2, damage: 1 }),
            new Enemy({ scene: this, x: 65, y: 400, texture: 'thief', frame: 'thief_idle_1', label: 'enemy4', hp: 2, damage: 1 }),
            new Enemy({ scene: this, x: 500, y: 400, texture: 'elite_knight', frame: 'largeeliteknight_idle_1', label: 'enemy5', hp: 4, damage: 1 })
        ];
        // this.enemy1 = new Enemy({ scene: this, x: 155, y: 60, texture: 'thief', frame: 'thief_idle_1', label: 'enemy1', hp: 2, damage: 1 });
        // this.enemy2 = new Enemy({ scene: this, x: 450, y: 60, texture: 'thief', frame: 'thief_idle_1', label: 'enemy2', hp: 2, damage: 1 });
        // this.enemy3 = new Enemy({ scene: this, x: 350, y: 200, texture: 'thief', frame: 'thief_idle_1', label: 'enemy3', hp: 2, damage: 1 });
        // this.enemy4 = new Enemy({ scene: this, x: 65, y: 400, texture: 'thief', frame: 'thief_idle_1', label: 'enemy4', hp: 2, damage: 1 });
        
        // this.enemy5 = new Enemy({ scene: this, x: 500, y: 400, texture: 'elite_knight', frame: 'largeeliteknight_idle_1', label: 'enemy5', hp: 4, damage: 1 });
        
        this.pocao1 = new Item({ scene: this, x: 125, y: 470, texture: 'pocao', frame: 'pocao_idle_1' });
        this.pocao2 = new Item({ scene: this, x: 272, y: 138, texture: 'pocao', frame: 'pocao_idle_1' });
        this.pocao3 = new Item({ scene: this, x: 288, y: 270, texture: 'pocao', frame: 'pocao_idle_1' });
        this.lever1 = new Item({ scene: this, x: 410, y: 370, texture: 'lever', frame: 'lever_idle_1' });

        this.player.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            attack: Phaser.Input.Keyboard.KeyCodes.O,
            defense: Phaser.Input.Keyboard.KeyCodes.P,
            catch: Phaser.Input.Keyboard.KeyCodes.I
        });

        this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
            if ((bodyA.label === 'playerSensor' && bodyB.label.replace(/[0-9]/g, '') === 'enemySensor') || (bodyB.label === 'playerSensor' && bodyB.label.replace(/[0-9]/g, '') === 'enemySensor')) {
                // this.sys.dialogModal.init();
                console.log('atrai inimigo');
                console.log(this.player.getHP);
                if (bodyB.label.replace(/[0-9]/g, '') === 'enemySensor')
                        bodyA.startFollowingPlayer(this.player);
                    else
                        bodyB.startFollowingPlayer(this.player);
            }
            if ((bodyA.label === 'playerCollider' && bodyB.label.replace(/[0-9]/g, '') === 'itemSensor') || (bodyB.label === 'playerCollider' && bodyB.label.replace(/[0-9]/g, '') === 'itemSensor')) {
                console.log('coleta poção');
                console.log(this.player.getHP);
                this.player.heal(1);
                if (bodyB.label.replace(/[0-9]/g, '') === 'itemSensor')
                        bodyA.destroy();
                    else
                        bodyB.destroy();
            }
            if ((bodyA.label === 'playerSensor' && bodyB.label.replace(/[0-9]/g, '') === 'enemyCollider') || (bodyB.label === 'playerSensor' && bodyB.label.replace(/[0-9]/g, '') === 'enemyCollider')) {
                console.log('alcance para golpes');
                if (this.player.isAttacking)
                    doDamage(bodyA, bodyB);
            }
            if ((bodyA.label === 'playerCollider' && bodyB.label.replace(/[0-9]/g, '') === 'enemyCollider') || (bodyB.label === 'playerCollider' && bodyB.label.replace(/[0-9]/g, '') === 'enemyCollider')) {
                if (this.player.isAttacking)
                    doDamage(bodyA, bodyB);
                else
                    this.player.takeDamage(1);
            }
        }, this);

        this.matter.world.on('collisionend', function (event, bodyA, bodyB) {
            if ((bodyA.label === 'playerSensor' && bodyB.label.replace(/[0-9]/g, '') === 'enemySensor') || (bodyB.label === 'playerSensor' && bodyA.label.replace(/[0-9]/g, '') === 'enemySensor')) {
                console.log('para de atrair inimigo');
                // if (bodyA.label.replace(/[0-9]/g, '') === 'enemySensor')
                //         bodyA.stopFollowingPlayer();
                //     else
                //         bodyB.stopFollowingPlayer();
                //console.log("collision end, between", bodyA.label, bodyB.label);
            }
            if ((bodyA.label === 'playerCollider' && bodyB.label.replace(/[0-9]/g, '') === 'itemSensor') || (bodyB.label === 'playerCollider' && bodyA.label.replace(/[0-9]/g, '') === 'itemSensor')) {
                console.log('deixa de coletar poção');
                //console.log("collision end, between", bodyA.label, bodyB.label);
            }
        }, this);

        // this.sys.plugins.install('DialogModalPlugin');
        // console.log(this.sys.plugins.get('DialogModalPlugin'));
        // this.sys.plugins.get('dialogModal').init();
        // this.plugins.dialogModal.setText('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', true);

        // this.player.body.setOnCollideWith(this.enemy4.body.parts, pair => {
        //     console.log('collides');
        //     this.enemy1.takeDamage(this.player)
        // });

        this.cameras.main.on('camerafadeoutcomplete', function () {
            this.scene.start('Cena2');
        }, this);

        this.input.once('pointerdown', function () {
            //  Get a random color
            var red = Phaser.Math.Between(50, 255);
            var green = Phaser.Math.Between(50, 255);
            var blue = Phaser.Math.Between(50, 255);

            this.cameras.main.fade(2000, red, green, blue);
        }, this);
        // enemy1.update();
    }

    update() {
        this.player.update();
        this.enemies.map(function(enemy, i) {
            enemy.update();
        }
        // this.pocao1.update();
        // this.pocao2.update();
        // this.pocao3.update();
        // this.key1.update();
    }
}