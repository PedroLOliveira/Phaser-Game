export default class Player extends Phaser.Physics.Matter.Sprite {
    constructor(data) {
        let {scene,x,y,texture,frame} = data;
        super(scene.matter.world,x,y,texture,frame);
        this.scene.add.existing(this);

        const {Body,Bodies} = Phaser.Physics.Matter.Matter;
        var playerCollider = Bodies.circle(this.x,this.y,12,{isSensor:false,label:'playerCollider'});
        var playerSensor = Bodies.circle(this.x,this.y,48,{isSensor:true,label:'playerSensor'});
        const compoundBody = Body.create({
            parts:[playerCollider,playerSensor],
            frictionAir: 0.35
        });
        this.setExistingBody(compoundBody);
    }

    get velocity() {
        return this.body.velocity;
    }

    static preload(scene,file) {
        scene.load.atlas(file,'assets/images/' + file + '.png','assets/images/' + file + '_atlas.json');
        scene.load.animation(file + '_anim','assets/images/' + file + '_anim.json');
    }

    update() {
        const speed = 2.5;
        let playerVelocity = new Phaser.Math.Vector2();
        if (this.inputKeys.left.isDown) {
            playerVelocity.x = -1;
            this.setScale(-1, 1);
        } else if (this.inputKeys.right.isDown) {
            playerVelocity.x = 1;
            this.setScale(1, 1);
        }
        if (this.inputKeys.up.isDown) {
            playerVelocity.y = -1;
        } else if (this.inputKeys.down.isDown) {
            playerVelocity.y = 1;
        }
        this.setFixedRotation();
        playerVelocity.normalize();
        playerVelocity.scale(speed);
        this.setVelocity(playerVelocity.x,playerVelocity.y);
        if (Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1) {
            this.anims.play('walk',true);
        } else {
            this.anims.play('idle',true);
        }
    }
}