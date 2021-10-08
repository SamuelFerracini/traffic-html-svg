import { TrafficLight } from "./entities/trafficLight.js";

import { Map } from "./entities/map.js";

import { Car } from "./entities/car.js";

import { Game } from "./game.js";

class Main {
  game = null;

  setup() {
    let game = new Game({
      windowSize: { width: window.innerWidth, height: window.innerHeight },
    });

    game.drawWindow();

    let map = new Map({
      width: window.innerWidth,
      height: window.innerHeight,
      context: game.context,
    });

    game.setMap(map);

    let userCar = new Car({
      color: "red",
      x: 100,
      y: 100,
      context: game.context,
      game,
    });

    let entities = [
      new TrafficLight({ x: 200, y: 200, context: game.context }),
      userCar,
    ];

    game.setEntities(entities);

    game.drawAllStuff();

    this.game = game;
  }

  start() {
    this.game.start();
  }
}

let main = new Main();

main.setup();
main.start();
