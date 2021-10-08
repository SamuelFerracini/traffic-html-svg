export class Game {
  entities = [];
  context = null;
  map = null;
  tickRate = 0;

  windowSize = {
    width: 0,
    height: 0,
  };

  constructor({ windowSize, tickRate = 1 }) {
    this.windowSize = windowSize;
    this.tickRate = tickRate;
  }

  drawWindow() {
    this.context = SVG()
      .addTo("div")
      .size(this.windowSize.width, this.windowSize.height);
  }

  drawAllStuff() {
    this.map.draw();

    this.entities.map((e) => e.draw());
  }

  setEntities(entities) {
    this.entities = entities;
  }

  setMap(map) {
    this.map = map;
  }

  start() {
    var tick = () => {
      this.entities.map((e) => e.update());

      setTimeout(tick, this.tickRate);
    };

    tick();
  }
}
