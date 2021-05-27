import Player from "./Player.js";
import Enemy from "./Enemy.js";
import Item from "./Item.js";
import { PhaserMatterCollisionPlugin } from "phaser-matter-collision-plugin";

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
        Item.preload(this, 'key');
    }

    createPotions() {
        //this.potions = this.add.group();
    }

    collectPocao() {
        console.log('pocao');
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
        let enemy1 = new Enemy({ scene: this, x: 155, y: 60, texture: 'thief', frame: 'thief_idle_1', hp: 2, damage: 1 }).create('thief');
        let enemy2 = new Enemy({ scene: this, x: 450, y: 60, texture: 'thief', frame: 'thief_idle_1', hp: 2, damage: 1 }).create('thief');
        let enemy3 = new Enemy({ scene: this, x: 350, y: 200, texture: 'thief', frame: 'thief_idle_1', hp: 2, damage: 1 }).create('thief');
        let enemy4 = new Enemy({ scene: this, x: 65, y: 400, texture: 'thief', frame: 'thief_idle_1', hp: 2, damage: 1 }).create('thief');
        let enemy5 = new Enemy({ scene: this, x: 500, y: 400, texture: 'elite_knight', frame: 'largeeliteknight_idle_1', hp: 4, damage: 1 }).create('elite_knight');
        let pocao1 = new Item({ scene: this, x: 125, y: 470, texture: 'pocao', frame: 'pocao_idle_1' }).create('potion');
        let pocao2 = new Item({ scene: this, x: 272, y: 138, texture: 'pocao', frame: 'pocao_idle_1' }).create('potion');
        let pocao3 = new Item({ scene: this, x: 288, y: 270, texture: 'pocao', frame: 'pocao_idle_1' }).create('potion');
        let lever1 = new Item({ scene: this, x: 410, y: 370, texture: 'lever', frame: 'lever_idle_1' }).create('lever');
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
            if ((bodyA.label === 'playerSensor' && bodyB.label === 'enemySensor') || (bodyB.label === 'playerSensor' && bodyA.label === 'enemySensor')) {
                this.sys.dialogModal.init();
                console.log('atrai inimigo');
            }
            if ((bodyA.label === 'playerCollider' && bodyB.label === 'itemSensor') || (bodyB.label === 'playerCollider' && bodyA.label === 'itemSensor')) {
                console.log('coleta poção');
            }
            if ((bodyA.label === 'playerCollider' && bodyB.label === 'enemyCollider') || (bodyB.label === 'playerCollider' && bodyA.label === 'enemyCollider')) {
                if ((this.player.currentAnim == 'attack_r' || this.player.currentAnim == 'attack_l') && this.player.anims.isPlaying) {
                    if (bodyA.label === 'enemyCollider')
                        bodyA.takeDamage(this.player.damage);
                    else
                        bodyB.takeDamage(this.player.damage);
                }
                else {
                    this.player.takeDamage(1);
                }
            }
        }, this);

        this.matter.world.on('collisionend', function (event, bodyA, bodyB) {
            if ((bodyA.label === 'playerSensor' && bodyB.label === 'enemySensor') || (bodyB.label === 'playerSensor' && bodyA.label === 'enemySensor')) {
                console.log('para de atrair inimigo');
                //console.log("collision end, between", bodyA.label, bodyB.label);
            }
            if ((bodyA.label === 'playerCollider' && bodyB.label === 'itemSensor') || (bodyB.label === 'playerCollider' && bodyA.label === 'itemSensor')) {
                console.log('deixa de coletar poção');
                //console.log("collision end, between", bodyA.label, bodyB.label);
            }
        }, this);

        this.plugins.install('DialogModalPlugin');
        console.log(this.sys.plugins.get('DialogModalPlugin'));
        this.sys.plugins.get('DialogModalPlugin').init();
        this.sys.dialogModal.setText('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', true);
    }

    update() {
        this.player.update();
        // this.enemy1.update();
        // this.enemy2.update();
        // this.enemy3.update();
        // this.enemy4.update();
        // this.pocao1.update();
        // this.pocao2.update();
        // this.pocao3.update();
        // this.key1.update();
    }
}