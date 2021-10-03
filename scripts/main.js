import { TrafficLight } from "./entities/trafficLight.js";

import { Map } from "./entities/map.js";

import { Car } from "./entities/car.js";

///// Colmeia/////
// initialize SVG.js

let map = new Map({ width: window.innerWidth, height: window.innerHeight });

map.draw();

let car = new Car({ x: 400, y: 200, color: "red" });

let entities = [new TrafficLight({ x: 200, y: 200 }), car];

map.setEntities(entities);

map.entities.map((e) => {
  e.draw();
  e.turnOn();
});

let keys = { up: false, down: false, left: false, right: false };

addEventListener("keydown", (event) => {
  let direction;

  if (event.key === "a") direction = "left";

  if (event.key === "s") direction = "down";

  if (event.key === "d") direction = "right";

  if (event.key === "w") direction = "up";

  if (direction) keys[direction] = true;

  car.drive(keys);
});

addEventListener("keyup", (event) => {
  let direction;

  if (event.key === "a") direction = "left";

  if (event.key === "s") direction = "down";

  if (event.key === "d") direction = "right";

  if (event.key === "w") direction = "up";

  if (direction) keys[direction] = false;
});
