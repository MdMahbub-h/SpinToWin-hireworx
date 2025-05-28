import { Scene } from "phaser";

export class MainScene extends Scene {
    constructor() {
        super("MainScene");
        this.isMobile =
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            );
    }

    create() {
        this.width = this.scale.width;
        this.height = this.scale.height;
        this.throwSpeed = 1;
        this.spinning = false;
        this.spinSoundSerial = 1;
        this.win = false;

        this.setupBackground();
        this.setupSounds();
    }

    setupBackground() {
        this.bg = this.add
            .image(this.scale.width / 2, this.scale.height / 2, "gameBg")
            .setDepth(1)
            .setDisplaySize(this.width, this.height);

        this.bgVideo = this.add
            .video(this.width / 2, this.height / 2, "bgVideo")
            .setScale(this.width / 1920)
            .setDepth(0);

        // this.bgVideo.setLoop(true);
        this.bgVideo.play();

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
        // this.shineBg = this.add
        //     .image(
        //         this.scale.width * 0.505,
        //         this.scale.height * 0.492,
        //         "shineBg"
        //     )
        //     .setOrigin(0.5, 0.5)
        //     .setDisplaySize(this.width, this.height)
        //     .setDepth(4);
        this.bgAnimationDepth = 5;
        this.playAnimation = true;
        this.playPaper = false;
        this.playBgAnimation();
        // const particle1 = this.add
        //     .image(this.pointer.x, this.pointer.y, "paperThrown")
        //     .setScale(0.6)
        //     .setAlpha(0.7)
        //     .setDepth(5)
        //     .setAngle(Math.random() * 360);
        // const particle2 = this.add
        //     .image(this.pointer.x, this.pointer.y, "leftChips")
        //     .setScale(0.8)
        //     .setAlpha(0.7)
        //     .setDepth(5)
        //     .setAngle(Math.random() * 360);
        // this.tweens.add({
        //     targets: [particle1, particle2],
        //     scale: 3,
        //     alpha: 1,
        //     duration: 4500,
        //     ease: "Linear",
        //     onComplete: () => {
        //         particle1.destroy();
        //         particle2.destroy();
        //     },
        // });

        this.spinBtn = this.add
            .image(this.scale.width * 0.14, this.scale.height * 0.83, "start")
            .setDepth(3)
            .setScale((1.1 * this.width) / 1920)
            .setInteractive();

        this.spinBtn.on("pointerdown", () => {
            if (!this.spinning) {
                this.spinBtn.setTexture("startPressed");
                this.bottomLightBright.setVisible(true);
                this.bgVideo.setDepth(0);
                this.spinBtn.setDepth(12);
                this.playAnimation = true;
                this.playPaper = true;
                this.spinPointer();
            }
        });
    }
    setupSounds() {
        this.spinSound = this.sound.add("spinSound1");
        this.spinSound2 = this.sound.add("spinSound2");
        this.winSound = this.sound.add("congrats");
        this.loseSound = this.sound.add("loseSound");
    }
    playBgAnimation() {
        this.bgAnimationTiemEvent = this.time.addEvent({
            delay: 1000, // every 1 second
            loop: true,
            callback: () => {
                if (this.playAnimation) {
                    this.circleLight.setAngle((this.circleLight.angle += 5));
                    if (this.bottomLightOn) {
                        if (this.playPaper) {
                            const particle1 = this.add
                                .image(
                                    this.pointer.x,
                                    this.pointer.y,
                                    "paperThrown"
                                )
                                .setScale(0.2)
                                .setAlpha(0.7)
                                .setDepth(this.bgAnimationDepth)
                                .setAngle(Math.random() * 360);
                            const particle2 = this.add
                                .image(
                                    this.pointer.x,
                                    this.pointer.y,
                                    "leftChips"
                                )
                                .setScale(0.2)
                                .setAlpha(0.7)
                                .setDepth(this.bgAnimationDepth)
                                .setAngle(Math.random() * 360);
                            this.tweens.add({
                                targets: [particle1, particle2],
                                scale: 3,
                                alpha: 1,
                                duration: 8000 / this.throwSpeed,
                                ease: "Linear",
                                onComplete: () => {
                                    particle1.destroy();
                                    particle2.destroy();
                                },
                            });
                        }
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
                }
            },
        });
    }
    spinPointer() {
        this.throwSpeed = 5;
        this.bgAnimationTiemEvent.delay = 150;
        this.spinning = true;

        this.tween = this.tweens.add({
            targets: [this.pointer, this.circleLight],
            angle: Math.floor(360 * (Math.random() * 2 + 10)),
            duration: 15000,
            ease: "Cubic.easeOut",
            callbackScope: this,
            onComplete: function (tween) {
                this.cameras.main.fadeOut(1000);
                this.cameras.main.fadeIn(500);
                this.showResult();
            },
        });
    }
    checkResult() {
        let angle = this.pointer.angle;
        this.result = "";
        let previousSpinSoundSerial = this.spinSoundSerial;
        if (angle > 13 && angle <= 44) {
            this.result = "FREE\nFLIPFLOPS";
            this.spinSoundSerial = 1;
            this.win = true;
        } else if (angle > 44 && angle <= 69) {
            this.result = "$5 KFC\nVOUCHER";
            this.spinSoundSerial = 2;
            this.win = true;
        } else if (angle > 69 && angle <= 100) {
            this.result = "FREE BEER!";
            this.spinSoundSerial = 3;
            this.win = true;
        } else if (angle > 100 && angle <= 126) {
            this.result = "5% OFF\nANY HIRE";
            this.spinSoundSerial = 4;
            this.win = true;
        } else if (angle > 126 && angle <= 160) {
            this.result = "FREE SINGLET";
            this.spinSoundSerial = 5;
            this.win = true;
        } else if (angle > 160 || angle <= -173) {
            this.result = "DREAMS...\nSHATTRED!";
            this.spinSoundSerial = 6;
            this.win = false;
        } else if (angle > -173 && angle <= -137) {
            this.result = "$20 DISCOUNT";
            this.spinSoundSerial = 7;
            this.win = true;
        } else if (angle > -137 && angle <= -109) {
            this.result = "FREE CAP";
            this.spinSoundSerial = 8;
            this.win = true;
        } else if (angle > -109 && angle <= -74) {
            this.result = "NEXT TIME,\nMATE!";
            this.spinSoundSerial = 9;
            this.win = false;
        } else if (angle > -74 && angle <= -46) {
            this.result = "$50 DISCOUNT";
            this.spinSoundSerial = 10;
            this.win = true;
        } else if (angle > -46 && angle <= -13) {
            this.result = "WHOOPS!";
            this.spinSoundSerial = 11;
            this.win = false;
        } else if (angle > -13 || angle <= 13) {
            this.result = "10% OFF\nNEXT HIRE";
            this.spinSoundSerial = 12;
            this.win = true;
        }
        if (this.spinSoundSerial !== previousSpinSoundSerial) {
            this.spinSound.play();
        }
    }
    showResult() {
        this.bottomLogo = this.add
            .image(
                this.scale.width * 0.505,
                this.scale.height * 0.492,
                "bottomLogo"
            )
            .setOrigin(0.5, 0.5)
            .setAlpha(1.5)
            .setDisplaySize(this.width, this.height)
            .setDepth(18);
        this.shineBg = this.add
            .image(this.scale.width * 0.5, this.scale.height * 0.492, "shineBg")
            .setOrigin(0.5, 0.5)
            .setDisplaySize(this.width, this.height)
            .setDepth(14);
        if (this.win) {
            setTimeout(() => {
                this.bgAnimationDepth = 14;
            }, 1000);
            this.winSound.play();
            let blurRect = this.add
                .rectangle(
                    this.width * 0.5,
                    this.height * 0.5,
                    this.width,
                    this.height,
                    0x000000,
                    0.8
                )
                .setDepth(13);
            let resultBg = this.add
                .image(
                    this.scale.width * 0.5,
                    this.scale.height * 0.5,
                    "resultBg"
                )
                .setDepth(15)
                .setOrigin(0.5, 0.5)
                .setDisplaySize(this.width, this.height);

            let resultText = this.add
                .text(
                    this.width * 0.5,
                    this.height * 0.44,
                    "YOU WIN\n" + this.result,
                    {
                        fontSize: "50px",
                        color: "#fff",
                        fontFamily: "Glory ExtraBold",
                        fontStyle: "bold",
                        align: "center",
                        lineSpacing: 20,
                    }
                )
                .setOrigin(0.5)
                .setScale((1.2 * this.width) / 1920)
                .setDepth(16);

            let coinsEmitter = this.add
                .particles(0, 0, "coins", {
                    x: this.width / 2,
                    y: -150,
                    speed: 300,
                    lifespan: 3000,
                    gravityY: 300,
                    scale: (0.3 * this.width) / 1920,
                    alpha: 0.8,
                })
                .setDepth(14);
            setTimeout(() => {
                coinsEmitter.stop();
            }, 5000);

            let spinAgainBtn = this.add
                .image(
                    this.scale.width * 0.5,
                    this.scale.height * 0.75,
                    "spinAgainBtn"
                )
                .setDepth(15)
                .setOrigin(0.5, 0.5)
                .setScale((0.6 * this.width) / 1920)
                .setInteractive({ useHandCursor: true })
                .on("pointerdown", () => {
                    this.tweens.add({
                        targets: spinAgainBtn,
                        scale: 0.5,
                        duration: 100,
                        ease: "Power1",
                        onComplete: () => {
                            this.tweens.add({
                                targets: spinAgainBtn,
                                scale: 0.6,
                                duration: 100,
                                ease: "Power1",
                                onComplete: () => {
                                    this.cameras.main.fadeOut(500);
                                    setTimeout(() => {
                                        blurRect.destroy();
                                        resultBg.destroy();
                                        resultText.destroy();
                                        spinAgainBtn.destroy();
                                        coinsEmitter.destroy();
                                        this.shineBg.destroy();

                                        this.bgVideo.setDepth(0);
                                        this.spinBtn.setDepth(3);
                                        this.playAnimation = true;
                                        this.playPaper = false;
                                        this.bottomLogo.destroy();

                                        this.bgAnimationDepth = 5;
                                        setTimeout(() => {
                                            this.cameras.main.fadeIn(500);
                                            this.resetAll();
                                        }, 500);
                                    }, 500);
                                },
                            });
                        },
                    });
                });

            this.throwSpeed = 3;
            this.bgAnimationTiemEvent.delay = 400;
        } else {
            this.loseSound.play();
            this.throwSpeed = 1;
            this.bgAnimationTiemEvent.delay = 1000;
            let blurRect = this.add
                .rectangle(
                    this.width * 0.5,
                    this.height * 0.5,
                    this.width,
                    this.height,
                    0x000000,
                    0.8
                )
                .setDepth(13);
            let resultBg = this.add
                .image(
                    this.scale.width * 0.5,
                    this.scale.height * 0.5,
                    "resultBg"
                )
                .setDepth(15)
                .setOrigin(0.5, 0.5)
                .setDisplaySize(this.width, this.height);

            let resultText = this.add
                .text(this.width * 0.5, this.height * 0.44, this.result, {
                    fontSize: "50px",
                    color: "#fff",
                    fontFamily: "Glory ExtraBold",
                    fontStyle: "bold",
                    align: "center",
                    lineSpacing: 20,
                })
                .setOrigin(0.5)
                .setDepth(16)
                .setScale((1.2 * this.width) / 1920);

            let spinAgainBtn = this.add
                .image(
                    this.scale.width * 0.5,
                    this.scale.height * 0.75,
                    "spinAgainBtn"
                )
                .setDepth(15)
                .setOrigin(0.5, 0.5)
                .setScale((0.6 * this.width) / 1920)
                .setInteractive({ useHandCursor: true })
                .on("pointerdown", () => {
                    this.tweens.add({
                        targets: spinAgainBtn,
                        scale: 0.5,
                        duration: 100,
                        ease: "Power1",
                        onComplete: () => {
                            this.tweens.add({
                                targets: spinAgainBtn,
                                scale: 0.6,
                                duration: 100,
                                ease: "Power1",
                                onComplete: () => {
                                    this.cameras.main.fadeOut(500);
                                    setTimeout(() => {
                                        blurRect.destroy();
                                        resultBg.destroy();
                                        resultText.destroy();
                                        spinAgainBtn.destroy();
                                        this.shineBg.destroy();

                                        this.bottomLogo.destroy();

                                        this.bgVideo.setDepth(0);
                                        this.spinBtn.setDepth(3);
                                        this.playAnimation = true;
                                        this.playPaper = false;
                                        this.bgAnimationDepth = 5;

                                        setTimeout(() => {
                                            this.cameras.main.fadeIn(500);
                                            this.resetAll();
                                        }, 500);
                                    }, 500);
                                },
                            });
                        },
                    });
                });

            this.throwSpeed = 1;
            this.bgAnimationTiemEvent.delay = 1000;
        }

        // this.resetAll();
    }

    resetAll() {
        this.spinBtn.setTexture("start");
        this.win = false;
        this.throwSpeed = 1;
        this.spinning = false;
        this.bgAnimationTiemEvent.delay = 1000;
    }

    // scaleBackgroundToFit() {
    //     const gameWidth = this.cameras.main.width;
    //     const gameHeight = this.cameras.main.height;

    //     // Calculate scale to cover the entire screen while maintaining aspect ratio
    //     const scaleX = gameWidth / this.background.width;
    //     const scaleY = gameHeight / this.background.height;
    //     const scale = Math.max(scaleX, scaleY);

    //     this.background.setScale(scale);

    //     // Center the background
    //     this.background.setPosition(gameWidth / 2, gameHeight / 2);
    // }

    update() {
        this.checkResult();
    }
}
