import { Scene } from "phaser";

export class MainScene extends Scene {
    constructor() {
        super("MainScene");
        this.initGameState();
        this.isMobile =
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            );
    }

    initGameState() {}

    create() {
        this.width = this.scale.width;
        this.height = this.scale.height;
        this.setupBackground();
    }

    setupBackground() {
        this.bg = this.add
            .image(this.scale.width / 2, this.scale.height / 2, "gameBg")
            .setDepth(1)
            .setDisplaySize(this.width, this.height);

        this.add
            .image(this.scale.width / 2, this.scale.height / 2, "wheel")
            .setDepth(6)
            .setScale(this.width / 1920);

        this.iconBright = this.add
            .image(this.scale.width / 2, this.scale.height / 2, "iconBright")
            .setAlpha(0.6)
            .setDepth(5)
            .setVisible(true)
            .setDisplaySize(this.width, this.height);

        this.bottomLightDim = this.add
            .image(
                this.scale.width / 2,
                this.scale.height / 2,
                "bottomLightDim"
            )
            .setDepth(8)
            .setDisplaySize(this.width, this.height)
            .setVisible(false);

        this.bottomLightBright = this.add
            .image(
                this.scale.width / 2,
                this.scale.height / 2,
                "bottomLightBright"
            )
            .setDepth(9)
            .setDisplaySize(this.width, this.height)
            .setVisible(false);
        this.circleLight = this.add
            .image(
                this.scale.width / 2,
                this.scale.height / 2.09,
                "circleLight"
            )
            .setScale(this.width / 1920)
            .setDepth(10);

        this.pointer = this.add
            .image(this.scale.width / 2, this.scale.height * 0.47, "pointer")
            .setDepth(10)
            .setScale(this.width / 1920);

        this.front = this.add
            .image(this.scale.width * 0.505, this.scale.height * 0.492, "front")
            .setOrigin(0.5, 0.5)
            .setDisplaySize(this.width, this.height)
            .setDepth(11);

        this.playBgAnimation();
        const particle1 = this.add
            .image(this.pointer.x, this.pointer.y, "paperThrown")
            .setScale(0.6)
            .setAlpha(0.7)
            .setDepth(5)
            .setAngle(Math.random() * 360);
        const particle2 = this.add
            .image(this.pointer.x, this.pointer.y, "leftChips")
            .setScale(0.8)
            .setAlpha(0.7)
            .setDepth(5)
            .setAngle(Math.random() * 360);
        this.tweens.add({
            targets: [particle1, particle2],
            scale: 3,
            alpha: 1,
            duration: 4500,
            ease: "Linear",
            onComplete: () => {
                particle1.destroy();
                particle2.destroy();
            },
        });

        this.spinBtn = this.add
            .image(this.scale.width * 0.15, this.scale.height * 0.8, "start")
            .setDepth(12)
            .setScale((0.8 * this.width) / 1920)
            .setInteractive();

        this.spinBtn.on("pointerdown", () => {
            this.spinBtn.setTexture("startPressed");
            this.bottomLightBright.setVisible(true);
            this.spinPointer();
            // this.playSpinAnimation();
        });
    }
    spinPointer() {
        this.tween = this.tweens.add({
            targets: [this.pointer, this.circleLight],
            angle: Math.floor(360 * (Math.random() * 2 + 4)),
            duration: 15000,
            ease: "Cubic.easeOut",
            callbackScope: this,
            onComplete: function (tween) {
                console.log(this.pointer.angle);
                window.alert(
                    "The angle of the pointer is " +
                        this.pointer.angle +
                        " degree"
                );
                this.spinBtn.setTexture("start");
            },
        });
    }
    playBgAnimation() {
        this.time.addEvent({
            delay: 1000, // every 1 second
            loop: true,
            callback: () => {
                this.circleLight.setAngle((this.circleLight.angle += 5));
                if (this.bottomLightOn) {
                    const particle1 = this.add
                        .image(this.pointer.x, this.pointer.y, "paperThrown")
                        .setScale(0.2)
                        .setAlpha(0.7)
                        .setDepth(5)
                        .setAngle(Math.random() * 360);
                    const particle2 = this.add
                        .image(this.pointer.x, this.pointer.y, "leftChips")
                        .setScale(0.2)
                        .setAlpha(0.7)
                        .setDepth(5)
                        .setAngle(Math.random() * 360);
                    this.tweens.add({
                        targets: [particle1, particle2],
                        scale: 3,
                        alpha: 1,
                        duration: 8000,
                        ease: "Linear",
                        onComplete: () => {
                            particle1.destroy();
                            particle2.destroy();
                        },
                    });
                    this.bottomLightOn = false;
                    this.bottomLightDim.setVisible(true);
                    this.iconBright.setVisible(true);
                    this.front.setAlpha(1.2);
                } else {
                    this.bottomLightOn = true;
                    this.bottomLightDim.setVisible(false);
                    this.iconBright.setVisible(false);
                    this.front.setAlpha(0.9);
                    if (this.iconBrightFlipped) {
                        this.iconBrightFlipped = false;
                        this.iconBright.flipX = false;
                    } else {
                        this.iconBrightFlipped = true;
                        this.iconBright.flipX = true;
                    }
                }
            },
        });
    }

    setupUI() {}

    setupGameElements() {}

    scaleBackgroundToFit() {
        const gameWidth = this.cameras.main.width;
        const gameHeight = this.cameras.main.height;

        // Calculate scale to cover the entire screen while maintaining aspect ratio
        const scaleX = gameWidth / this.background.width;
        const scaleY = gameHeight / this.background.height;
        const scale = Math.max(scaleX, scaleY);

        this.background.setScale(scale);

        // Center the background
        this.background.setPosition(gameWidth / 2, gameHeight / 2);
    }

    update() {}
}
