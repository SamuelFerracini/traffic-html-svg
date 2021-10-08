import { Character } from "./character.js";

export class Car extends Character {
  color = "";
  size = { width: 0, height: 0 };
  isAI = false;

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
    size = { width: 100, height: 50 },
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
      space: false,
    };

    if (this.keyDown["up"] || this.keyDown["w"]) keys.up = true;

    if (this.keyDown["down"] || this.keyDown["s"]) keys.down = true;

    if (this.keyDown["left"] || this.keyDown["a"]) keys.left = true;

    if (this.keyDown["right"] || this.keyDown["d"]) keys.right = true;

    if (this.keyDown["space"]) keys.space = true;

    this.drive(keys);
  }

  update() {
    if (!this.isAI) this.userInput();
  }

  draw() {
    let colors = ["green", "yellow", "red", "white", "pink"];

    if (colors.findIndex((color) => color === this.color) === -1) {
      throw new Error(`Car color not found ${this.color}`);
    }

    this.canvas = this.context
      .image(`./cars/${this.color}.svg`)
      .size(this.size.width, this.size.height)
      .move(this.position.x, this.position.y);
  }

  checkCarPosition() {
    const { x, y } = document
      .getElementsByTagName("image")[0]
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

  drive({ up, down, left, right, space }) {
    this.checkCarPosition();

    const baseVelocity = 0.5;

    // if (space && this.velocity > 3) {
    //   this.velocity = this.velocity - 0.5;

    //   if (left) {
    //     this.canvas.rotate(
    //       -3,
    //       this.position.x + this.size.width,
    //       this.position.y
    //     );
    //   }

    //   if (right)
    //     this.canvas.rotate(
    //       5,
    //       this.position.x + this.size.width / 2,
    //       this.position.y
    //     );
    // }

    if (up) this.velocity.y = this.velocity.y - baseVelocity;

    if (down) this.velocity.y = this.velocity.y + baseVelocity;

    if (left) this.velocity.x = this.velocity.x - baseVelocity;

    if (right) this.velocity.x = this.velocity.x + baseVelocity;

    console.log(this.position);

    this.position.x = this.position.x + this.velocity.x;
    this.position.y = this.position.y + this.velocity.y;

    this.canvas.move(this.position.x, this.position.y);
  }
}
