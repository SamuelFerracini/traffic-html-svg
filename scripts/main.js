import { TrafficLight, drawTraficLight } from "./entities/trafficLight.js";

///// Colmeia/////
// initialize SVG.js

var draw = SVG().addTo("div").size("1100", "500");
var x, y;

draw.rect(1200, 500).fill({ color: "#5c6b79" });

drawTraficLight(draw, { x: 100, y: 100 });

let lights = [
  new TrafficLight({ x: 200, y: 200, context: draw }),
  new TrafficLight({ x, y, context: draw }),
];

lights.map((l) => {
  l.draw();
  l.turnOn();
});
