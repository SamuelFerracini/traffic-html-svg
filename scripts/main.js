import { TrafficLight } from "./entities/trafficLight.js";

import { Map } from "./entities/map.js";

import { Car } from "./entities/car.js";

///// Colmeia/////
// initialize SVG.js

let map = new Map({ width: window.innerWidth, height: window.innerHeight });

map.draw();

let entities = [
  // new TrafficLight({ x: 200, y: 200 }),
  // new Car({ x: 400, y: 200, color: "red" }),
];

map.setEntities(entities);

map.entities.map((e) => {
  e.draw();
  e.turnOn();
});
