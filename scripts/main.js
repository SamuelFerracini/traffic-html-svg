import { TrafficLight } from "./entities/trafficLight.js";

import { Map } from "./entities/map.js";

import { Car } from "./entities/car.js";

import { Game } from "./game.js";

import { Asteroid } from "./entities/asteroid.js";

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
      color: "blue",
      x: 100,
      y: 100,
      context: game.context,
      game,
    });

    const asteroid = new Asteroid({
      x: 200,
      y: 200,
      context: game.context,
    });

    let entities = [asteroid, userCar];

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
