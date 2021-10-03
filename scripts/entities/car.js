import Character from "./character";

class Car extends Character {
  color = "";

  canvas = null;

  constructor({ x, y, context, color }) {
    super({ x, y, context });

    this.color = color;
  }

  draw() {
    let colors = ["green", "yellow", "red", "white", "pink"];

    if (colors.findIndex(this.color) === -1) {
      throw new Error(`Car color not found ${this.color}`);
    }

    this.canvas = draw
      .image(`./cars/${this.color}.svg`)
      .size(100, 100)
      .move(this.position.x, this.position.y);
  }
}

function generateCar(context, { x, y }) {
  let car = new Car({ x, y, context, color: "red" });

  car.draw();
}
