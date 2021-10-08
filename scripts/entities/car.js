import { Character } from "./character.js";

export class Car extends Character {
  color = "";
  size = { width: 0, height: 0 };
  isAI = false;
  direction = "right";

  velocity = { x: 0, y: 0 };

  maxVelocity = 20;

  canvas = null;

  keyDown = {};

  game = null;

  constructor({
    x,
    y,
    context,
    color,
    size = { width: 150, height: 150 },
    game,
  }) {
    super({ x, y, context });

    this.color = color;
    this.size = size;
    this.game = game;

    const keyMap = {
      39: "right",
      37: "left",
      40: "down",
      32: "space",
      38: "up",
      87: "w",
      68: "d",
      65: "a",
      83: "s",
    };

    addEventListener("keydown", (e) => {
      this.keyDown[keyMap[e.which]] = true;
    });

    addEventListener("keyup", (e) => {
      this.keyDown[keyMap[e.which]] = false;
    });
  }

  userInput() {
    let keys = {
      up: false,
      down: false,
      left: false,
      right: false,
    };

    if (this.keyDown["up"] || this.keyDown["w"]) keys.up = true;

    if (this.keyDown["down"] || this.keyDown["s"]) keys.down = true;

    if (this.keyDown["left"] || this.keyDown["a"]) keys.left = true;

    if (this.keyDown["right"] || this.keyDown["d"]) keys.right = true;

    this.drive(keys);
  }

  update() {
    if (!this.isAI) this.userInput();
  }

  draw() {
    let colors = ["blue"];

    if (colors.findIndex((color) => color === this.color) === -1) {
      throw new Error(`Car color not found ${this.color}`);
    }

    this.canvas = this.context
      .image(`./images/spaceships/${this.color}/${this.direction}.svg`)
      .size(this.size.width, this.size.height)
      .move(this.position.x, this.position.y);
  }

  checkCarPosition() {
    const { x, y } = document
      .getElementsByTagName("image")[1]
      .getBoundingClientRect();

    if (y < -this.size.width) this.position.y = this.game.windowSize.height;

    if (y > this.game.windowSize.height + this.size.width) {
      this.position.y = -this.size.width;
    }

    if (x < -this.size.width) {
      this.position.x = this.game.windowSize.width;
    }

    if (x > this.game.windowSize.width + this.size.width) {
      this.position.x = -this.size.width;
    }
  }

  drive({ up, down, left, right }) {
    this.checkCarPosition();

    const baseVelocity = 0.009;

    console.log(this.direction);

    if (up) {
      this.velocity.y = this.velocity.y - baseVelocity;
      this.direction = "up";
    }

    if (down) {
      this.velocity.y = this.velocity.y + baseVelocity;
      this.direction = "down";
    }

    if (left) {
      this.velocity.x = this.velocity.x - baseVelocity;
      this.direction = "left";
    }

    if (right) {
      this.velocity.x = this.velocity.x + baseVelocity;
      this.direction = "right";
    }

    this.position.x = this.position.x + this.velocity.x;
    this.position.y = this.position.y + this.velocity.y;

    document
      .getElementsByTagName("image")[1]
      .setAttribute(
        "href",
        `./images/spaceships/${this.color}/${this.direction}.svg`
      );

    this.canvas.move(this.position.x, this.position.y);
  }
}
