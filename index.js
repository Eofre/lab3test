let board;

function drawFigure() {
  const areaText = document.getElementById("area");
  areaText.innerHTML = "";
  const diagonals = document.getElementById("diagonals").value;
  const box = document.getElementById("box");

  if (board) {
    clearBoard();
  }

  if (isNaN(diagonals) || diagonals < 1 || diagonals > 10) {
    box.style.width = "0vw";
    box.style.height = "0vh";
    alert(
      "Ошибка ввода. Попробуй еще раз, мой дорогой и любимый пользователь :)"
    );
  } else {
    box.style.width = "100vw";
    box.style.height = "100vh";
    board = JXG.JSXGraph.initBoard("box", {
      boundingbox: [-diagonals, diagonals, diagonals, -diagonals],
      axis: true,
    });
    drawRhombs(board, diagonals);
    drawTriangle(board);
    drawCircle(board);
    calculateArea(board);
  }
}

function clearBoard() {
  board.suspendUpdate();
  // board.removeObject(board.objects);
  board.fullUpdate();
}

function drawRhombs(board, diagonals) {
  const A = board.create("point", [-diagonals / 2, 0], {
    name: "A",
    size: 4,
    fixed: true,
  });
  const B = board.create("point", [0, diagonals / 2], {
    name: "B",
    size: 4,
    fixed: true,
  });
  const C = board.create("point", [diagonals / 2, 0], {
    name: "C",
    size: 4,
    fixed: true,
  });
  const D = board.create("point", [0, -diagonals / 2], {
    name: "D",
    size: 4,
    fixed: true,
  });

  const AB = board.create("line", [A, B], {
    straightFirst: false,
    straightLast: false,
    strokeWidth: 3,
  });
  const BC = board.create("line", [B, C], {
    straightFirst: false,
    straightLast: false,
    strokeWidth: 3,
  });
  const CD = board.create("line", [C, D], {
    straightFirst: false,
    straightLast: false,
    strokeWidth: 3,
  });
  const DA = board.create("line", [D, A], {
    straightFirst: false,
    straightLast: false,
    strokeWidth: 3,
  });
}

function drawTriangle(board) {
  const A = board.select("A");
  const B = board.select("B");
  const C = board.select("C");
  const D = board.select("D");

  const E = board.create("midpoint", [A, D], { name: "E", size: 4 });
  const F = board.create("midpoint", [D, C], { name: "F", size: 4 });

  const triangle = board.create("polygon", [E, B, F], {
    fillColor: "#c0c0c0",
  });
}

function drawCircle(board) {
  const F = board.select("F");
  const E = board.select("E");
  const B = board.select("B");

  const EB = board.create("line", [E, B], {
    straightFirst: false,
    straightLast: false,
    strokeWidth: 3,
  });

  const BF = board.create("line", [B, F], {
    straightFirst: false,
    straightLast: false,
    strokeWidth: 3,
  });
  const FE = board.create("line", [F, E], {
    straightFirst: false,
    straightLast: false,
    strokeWidth: 3,
  });

  const lengthEF = FE.L();
  const lengthBF = BF.L();

  const radius =
    (lengthEF / 2) *
    Math.sqrt((2 * lengthBF - lengthEF) / (2 * lengthBF + lengthEF));

  const bisectorE = board.create("bisector", [F, E, B], {
    visible: false,
  });
  const bisectorB = board.create("bisector", [F, B, E], {
    visible: false,
  });
  const bisectorF = board.create("bisector", [B, F, E], {
    visible: false,
  });

  const incenter = board.create(
    "intersection",
    [bisectorE, bisectorB, bisectorF],
    { visible: false }
  );

  const circle = board.create("circle", [incenter, radius]);

  const intersection1 = board.create("intersection", [circle, BF, 0]);
  const intersection2 = board.create("intersection", [circle, EB, 0]);
  const intersection3 = board.create("intersection", [circle, FE, 0]);

  const H = board.create("point", [intersection1.X(), intersection1.Y()], {
    name: "H",
    size: 4,
    fixed: true,
  });
  const G = board.create("point", [intersection2.X(), intersection2.Y()], {
    name: "G",
    size: 4,
    fixed: true,
  });
  const J = board.create("point", [intersection3.X(), intersection3.Y()], {
    name: "J",
    size: 4,
    fixed: true,
  });
}

function calculateArea(board) {
  const G = board.select("G");
  const B = board.select("B");
  const H = board.select("H");

  const triangleGBH = board.create("polygon", [G, B, H], {
    visible: false,
  });

  const GB = board.create("line", [G, B], {
    straightFirst: false,
    straightLast: false,
    strokeWidth: 3,
  });
  const BH = board.create("line", [B, H], {
    straightFirst: false,
    straightLast: false,
    strokeWidth: 3,
  });
  const HG = board.create("line", [H, G], {
    straightFirst: false,
    straightLast: false,
    strokeWidth: 3,
    visible: false,
  });

  const lengthGB = GB.L();
  const lengthBH = BH.L();
  const lengthHG = HG.L();

  const areaGBH = 2 * lengthBH + lengthHG;

  const F = board.select("F");
  const E = board.select("E");

  const EB = board.create("line", [E, B], {
    straightFirst: false,
    straightLast: false,
    strokeWidth: 3,
  });

  const BF = board.create("line", [B, F], {
    straightFirst: false,
    straightLast: false,
    strokeWidth: 3,
  });
  const FE = board.create("line", [F, E], {
    straightFirst: false,
    straightLast: false,
    strokeWidth: 3,
  });

  const lengthEF = FE.L();
  const lengthBF = BF.L();

  const radius =
    (lengthEF / 2) *
    Math.sqrt((2 * lengthBF - lengthEF) / (2 * lengthBF + lengthEF));

  const segment =
    (30 / 360) * 3.14 * (radius * radius) - (1 / 2) * Math.sin(30);

  console.log(areaGBH);
  console.log(segment);

  const area = areaGBH - segment;

  const areaText = document.getElementById("area");
  areaText.innerHTML = `Площадь фигуры = ${area.toFixed(2)} см²`;

  board.unsuspendUpdate();

  board.unsuspendUpdate();
}
