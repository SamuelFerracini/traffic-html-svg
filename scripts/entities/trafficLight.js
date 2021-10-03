import { Character } from "./character.js";

export class TrafficLight extends Character {
  lights = [
    { id: "red", value: "#ff0000", canvas: null },
    { id: "yellow", value: "#ffd70099", canvas: null },
    {
      id: "green",
      value: "#00ff0099",
      canvas: null,
    },
  ];

  lightsInverval = 1500;

  currentLight = {};

  constructor({ x, y, context }) {
    super({ x, y, context });
  }

  draw() {
    // TODO - Calcular os espaçamentos automaticamente
    var rectX = 40;
    var rectY = 100;

    var circle = rectX / 2;

    this.context
      .rect(rectX, rectY)
      .move(this.position.x, this.position.y)
      .radius(10);

    var lightSpace = 10;

    this.lights = this.lights.map(({ id, value, canvas }) => {
      canvas = this.context
        .circle(circle)
        .move(circle / 2 + this.position.x, this.position.y + lightSpace)
        .fill(value);

      lightSpace += 30;

      return { id, value, canvas };
    });
  }

  turnOn() {
    var copyLights = [...this.lights];

    function loop(that) {
      setTimeout(() => {
        that.currentLight = copyLights.shift();

        if (copyLights.length === 0) copyLights = [...that.lights];

        let lightIndex = that.lights.findIndex(
          (light) => light.id === that.currentLight.id
        );

        if (lightIndex === -1) throw new Error(`Light ${lightIndex} not found`);

        that.lights.forEach((l) => that.turnLight(l, "off"));

        that.turnLight(that.lights[lightIndex]);

        loop(that);
      }, that.lightsInverval);
    }

    loop(this);
  }

  turnLight({ id }, mode = "on") {
    let lightIndex = this.lights.findIndex((light) => light.id === id);

    if (lightIndex === -1) throw new Error(`Light ${id} not found`);

    if (mode === "on") this._turnLightOn(lightIndex);
    else this._turnLightOff(lightIndex);

    this.lights[lightIndex].canvas.fill(this.lights[lightIndex].value);
  }

  _turnLightOn(lightIndex) {
    if (this.lights[lightIndex].value.length === 9)
      this.lights[lightIndex].value = this.lights[lightIndex].value
        .split("")
        .slice(0, this.lights[lightIndex].value.length - 2)
        .join("");
  }

  _turnLightOff(lightIndex) {
    if (this.lights[lightIndex].value.length === 7)
      this.lights[lightIndex].value = `${this.lights[lightIndex].value}99`;
  }
}
