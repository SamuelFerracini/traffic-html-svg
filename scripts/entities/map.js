import { Character } from "./character.js";

export class Map extends Character {
  width = 0;
  height = 0;
  context = null;
  backgroundColor = "";
  entities = [];

  constructor({ width, height, backgroundColor = "#5c6b79" }) {
    super({ x: 0, y: 0 });

    this.width = width;
    this.height = height;
    this.backgroundColor = backgroundColor;
  }

  draw() {
    this.context = SVG().addTo("div").size(this.width, this.height);
    this.context.rect(this.width, this.height).fill(this.backgroundColor);
  }

  setEntities(entities = []) {
    this.entities = entities.map((e) => {
      e.context = this.context;
      return e;
    });
  }
}
