import { Scene } from "phaser";

export class MenuScene extends Scene {
    constructor() {
        super("MenuScene");
        this.isMobile =
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            );
    }

    init() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);
    }

    create() {
        this.background = this.add.image(
            this.scale.width / 2,
            this.scale.height / 2,
            "background"
        );
        const graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 0.7);
        graphics.fillRect(0, 0, this.scale.width, this.scale.height);

        this.title = this.add
            .text(
                this.scale.width / 2,
                this.scale.height * 0.2,
                "Welcome to Skeet Shoot",
                {
                    fontFamily: "Arial",
                    fontSize: "52px",
                    color: "#f17a33",
                    fontStyle: "bold",
                    align: "center",
                }
            )
            .setOrigin(0.5);
        if (this.isMobile) {
            this.title
                .setText("Welcome\nto Skeet Shoot")
                .setScale(0.8)
                .setY(this.scale.height * 0.15);
        }

        this.play = this.add
            .text(this.scale.width / 2, this.scale.height * 0.75, "Play", {
                fontFamily: "Arial",
                fontSize: "70px",
                fontStyle: "bold",
                color: "#b3926e",
            })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", () => {
                this.cameras.main.fadeOut(1000, 0, 0, 0);
                setTimeout(() => {
                    this.scene.start("MainScene");
                }, 1000);
            });
        if (this.isMobile) {
            this.play.setY(this.scale.height * 0.85);
        }
    }
}
