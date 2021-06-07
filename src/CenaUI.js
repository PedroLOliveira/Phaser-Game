
export default class CenaUI extends Phaser.Scene {
    constructor() {
        super({ key: 'CenaUI', active: true });
    }

    preload() {
        
    }

    interactEnemy(scene, bodyA, bodyB, interaction, value) {
        let label = bodyA.label.includes('enemy') ? bodyA.label.replace('Collider','').replace('Sensor','') : bodyB.label.replace('Collider','').replace('Sensor','');
        let enemy = scene.enemies.find(enemy => enemy.label == label);
        try {
            if (interaction == 'agro')
                enemy.agro(value);
            else if (interaction == 'attackable')
                enemy.attackable(value);
            else if (interaction ==  'attack')
                scene.player.doDamage();
            else if (interaction ==  'getHit')
                scene.player.takeDamage(enemy.damage, enemy);
        } catch (e) {
            console.log('Erro: Tentou interagir com elemento excluído');
        }
    }

    interactItem(scene, bodyA, bodyB) {
        let label = bodyA.label.includes('item') ? bodyA.label.replace('Collider','') : bodyB.label.replace('Collider','');
        let item = scene.items.find(item => item.label == label);
        try {
            if (item.file == 'pocao') {
                item.destroy();
                scene.player.heal(1);
            } else if (item.file == 'sword') {
                item.destroy();
                scene.player.increaseDamage(1);
            } else {
                item.setFrame('lever_idle_3');
                scene.doors.map(function(door, i) {
                    door.destroy();
                });
                scene.doors = [];
                console.log('Passagem liberada para o segundo mapa');
            }
        } catch (e) {
            console.log('Erro: Tentou interagir com elemento excluído');
        }
    }

    create() {
        let hp = 3;
        let damage = 1;
        this.hp = hp;
        this.damage = damage;
        this.cenas = [
            this.scene.get('Cena1'),
            this.scene.get('Cena2'),
            this.scene.get('Cena3')
        ];
        console.log(this.cenas.find(Z => Z.key == 'Cena1'));
        let HP = this.add.text(10, 10, 'HP: 3', { font: '16px Arial', fill: '#ffffff' });
        let Damage = this.add.text(10, 30, 'Damage: 1', { font: '16px Arial', fill: '#ffffff' });
        this.cenas.map(function(cena, i) {
            cena.events.on('increaseHP', function () {
                hp = hp == 3 ? hp : hp + 1;
                this.hp = hp;
                HP.setText('HP: ' + hp);
            }, this);

            cena.events.on('decreaseHP', function () {
                hp = hp == 0 ? hp : hp - 1;
                this.hp = hp;
                HP.setText('HP: ' + hp);
            }, this);

            cena.events.on('increaseDamage', function () {
                damage = damage + 1;
                this.damage = damage;
                Damage.setText('Damage: ' + damage);
            }, this);

            cena.events.on('died', function () {
                hp = 3;
                damage = 1;
                this.hp = hp;
                this.damage = damage;
                HP.setText('HP: 3');
                Damage.setText('Damage: 1');
            }, this);
        });
    }

    update() {
        
    }
}