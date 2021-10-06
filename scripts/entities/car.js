import { Character } from "./character.js";

export class Car extends Character {
  color = "";
  size = { width: 0, height: 0 };
  isAI = false;

  velocity = 0;

  maxVelocity = 10;

  canvas = null;

  keyDown = {};

  constructor({ x, y, context, color, size = { width: 100, height: 50 } }) {
    super({ x, y, context });

    this.color = color;
    this.size = size;

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

  drive({ up, down, left, right, space }) {
    if (space && this.velocity > 3) {
      this.velocity = this.velocity - 0.5;

      if (left) {
        this.canvas.rotate(-3, this.position.x + 50, this.position.y);
      }

      if (right) {
        this.canvas.rotate(3, this.position.x + 50, this.position.y);
      }
    }

    if (up && this.velocity < this.maxVelocity)
      this.velocity = this.velocity + 0.5;

    if (down && this.velocity > -this.maxVelocity)
      this.velocity = this.velocity - 0.5;

    if (left) this.canvas.rotate(-3);

    if (right) this.canvas.rotate(3);

    this.position.x += this.velocity;

    this.canvas.move(this.position.x, this.position.y);
  }
}
