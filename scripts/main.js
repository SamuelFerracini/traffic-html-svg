import { TrafficLight } from "./entities/trafficLight.js";

import { Map } from "./entities/map.js";

import { Car } from "./entities/car.js";

let map = new Map({ width: window.innerWidth, height: window.innerHeight });

map.draw();

let car = new Car({
  x: 400,
  y: 200,
  color: "pink",
  size: { height: 50, width: 100 },
});

let entities = [new TrafficLight({ x: 200, y: 200 }), car];

map.setEntities(entities);

map.entities.map((e) => {
  e.draw();
  e.turnOn();
});

var tickRate = 25,
  keyDown = {},
  keyMap = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    87: "w",
    68: "d",
    65: "a",
    83: "s",
  };

addEventListener("keydown", (e) => {
  console.log(e.which);
  keyDown[keyMap[e.which]] = true;
});

addEventListener("keyup", (e) => {
  keyDown[keyMap[e.which]] = false;
});

var tick = function () {
  let keys = { up: false, down: false, left: false, right: false };

  if (keyDown["up"] || keyDown["w"]) {
    keys.up = true;
  }
  if (keyDown["down"] || keyDown["s"]) {
    keys.down = true;
  }
  if (keyDown["left"] || keyDown["a"]) {
    keys.left = true;
  }
  if (keyDown["right"] || keyDown["d"]) {
    keys.right = true;
  }

  car.drive(keys);

  setTimeout(tick, tickRate);
};

tick();
