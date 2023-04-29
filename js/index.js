import { JSXGraph } from "jsxgraph";

const board = JSXGraph.initBoard("box", {
  boundingbox: [-5, 5, 5, -5],
  axis: true,
});

const pointA = board.create("point", [-2, 0], { name: "A", size: 4 });
const pointB = board.create("point", [0, 2], { name: "B", size: 4 });
const pointC = board.create("point", [2, 0], { name: "C", size: 4 });
const pointD = board.create("point", [0, -2], { name: "D", size: 4 });

const pointE = board.create("midpoint", [pointA, pointD], {
  name: "E",
  size: 4,
});
const pointF = board.create("midpoint", [pointD, pointC], {
  name: "F",
  size: 4,
});

const lineAB = board.create("line", [pointA, pointB], {
  straightFirst: false,
  straightLast: false,
  strokeWidth: 2,
});
const lineBC = board.create("line", [pointB, pointC], {
  straightFirst: false,
  straightLast: false,
  strokeWidth: 2,
});
const lineCD = board.create("line", [pointC, pointD], {
  straightFirst: false,
  straightLast: false,
  strokeWidth: 2,
});
const lineDA = board.create("line", [pointD, pointA], {
  straightFirst: false,
  straightLast: false,
  strokeWidth: 2,
});

const lineEB = board.create("line", [pointE, pointB], {
  straightFirst: false,
  straightLast: false,
  strokeWidth: 2,
});
const lineBF = board.create("line", [pointB, pointF], {
  straightFirst: false,
  straightLast: false,
  strokeWidth: 2,
});
const lineFE = board.create("line", [pointF, pointE], {
  straightFirst: false,
  straightLast: false,
  strokeWidth: 2,
});

const triangleEBF = board.create("polygon", [pointE, pointB, pointF], {
  fillColor: "#c0c0c0",
});

const outputElement = document.getElementById("output");
const area = triangleEBF.Area();
outputElement.innerHTML = `Площадь треугольника EBF: ${area.toFixed(2)}`;
