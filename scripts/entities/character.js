import Canvas from "./canvas";

export default class Character extends Canvas {
  position = { x: 0, y: 0 };

  constructor({ x, y, context }) {
    super(context);

    this.position = { x, y };
  }
}
