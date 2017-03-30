var canvas = document.getElementById('tetris');
var ctx = canvas.getContext('2d');

ctx.scale(20, 20);

// in order to collect the rows and take them out, we need to clear the rows. Using a for loop, need to check if any of the rows have a 0 in them which means they aren't full yet. iterate from the bottom up, which is playArea.length - 1. if any of the rows have a 0 we can continue. continue outer iterates the function over the lines as long as there are 0s.
function playAreaSweep() {
  var rowCount = 1;
  outer: for (var y = playArea.length - 1; y > 0; y--) {
    for (var x = 0; x < playArea[y].length; x++) {
      if (playArea[y][x] === 0) {
        continue outer;
      }
    }
    // playArea splice brings out the row(s) that is fully populated and adds a row of 0s. index is y and length of the splice is y, then we fill the index y rows with empty 0s using unshift for the rows and offsetting the y rows.
    var row = playArea.splice(y, 1)[0].fill(0);
    playArea.unshift(row);
    y++;

    player.score += rowCount * 10;
    rowCount *= 2;
    // the rowCount *=2 means that for each additional row you take the point value of the prior row and multiply by 2 and sum all points
  }
}
// if the piece gets to a row that's not part of the playArea it is colliding. we check the player matrix on index y and x, and if not true we continue. if the row doesn't exist we have collided.
function collide(playArea, player) {
  var m = player.matrix;
  var o = player.pos;
  for (var y = 0; y < m.length; y++) {
    for (var x = 0; x < m[y].length; x++) {
      if (m[y][x] !== 0 &&
        (playArea[y + o.y] &&
          playArea[y + o.y][x + o.x]) !== 0) {
        return true;
      }
    }
  }
  return false;
}

function createMatrix(w, h) {
  var matrix = [];
  while (h--) {
    matrix.push(new Array(w).fill(0));
  }
  return matrix;
}

function createPiece(type) {
  if (type === 'I') {
    return [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ];
  } else if (type === 'L') {
    return [
      [0, 2, 0],
      [0, 2, 0],
      [0, 2, 2],
    ];
  } else if (type === 'J') {
    return [
      [0, 3, 0],
      [0, 3, 0],
      [3, 3, 0],
    ];
  } else if (type === 'O') {
    return [
      [4, 4],
      [4, 4],
    ];
  } else if (type === 'Z') {
    return [
      [5, 5, 0],
      [0, 5, 5],
      [0, 0, 0],
    ];
  } else if (type === 'S') {
    return [
      [0, 6, 6],
      [6, 6, 0],
      [0, 0, 0],
    ];
  } else if (type === 'T') {
    return [
      [0, 7, 0],
      [7, 7, 7],
      [0, 0, 0],
    ];
  }
}

function drawMatrix(matrix, offset) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        ctx.fillStyle = colors[value];
        ctx.fillRect(x + offset.x,
          y + offset.y,
          1, 1);
      }
    });
  });
}

var colors = [
  null,
  'red',
  'blue',
  'green',
  'purple',
  'yellow',
  'white',
  'teal',
];

function draw() {
  ctx.fillStyle = 'brown';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // we draw the new pieces from x and y = 0
  drawMatrix(playArea, {
    x: 0,
    y: 0,
  });
  drawMatrix(player.matrix, player.pos);
}

function merge(playArea, player) {
  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        playArea[y + player.pos.y][x + player.pos.x] = value;
      }
    });
  });
}

function rotate(matrix, dir) {
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < y; x++) {
      [
        matrix[x][y],
        matrix[y][x],
      ] = [
        matrix[y][x],
        matrix[x][y],
      ];
    }
  }

  if (dir > 0) {
    matrix.forEach(row => row.reverse());
  } else {
    matrix.reverse();
  }
}
// when a piece touches the bottom it should restart with a piece from the top. using the collide function built earlier.
function playerDrop() {
  player.pos.y++;
  if (collide(playArea, player)) {
    player.pos.y--;
    merge(playArea, player);
    playerReset();
    playAreaSweep();
    updateScore();
  }
  dropCounter = 0;
}
// need to set the boundaries on the right and left side of the playArea so if the piece moves and collides in the arena,
function playerMove(offset) {
  player.pos.x += offset;
  if (collide(playArea, player)) {
    player.pos.x -= offset;
  }
}

// in order to get a random piece every time, we use the reset function, list all the pieces, and then create a new piece. put the player at the top row and the middle of the column (playArea.length / 2 floored). when a new piece comes down we also need to update the score and fill play area with 0s.
function playerReset() {
  var pieces = 'TJLOSZI';
  player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
  player.pos.y = 0;
  player.pos.x = (playArea[0].length / 2 | 0) -
    (player.matrix[0].length / 2 | 0);
  if (collide(playArea, player)) {
    playArea.forEach(row => row.fill(0));
    player.score = 0;
    updateScore();
  }
}
// the player rotate function will run and if there is a collision with the play area as it rotates, the piece will be offset while that continues to happen. If offset is greater than 0, piece will be offset by 1 else -1
function playerRotate(dir) {
  var pos = player.pos.x;
  var offset = 1;
  rotate(player.matrix, dir);
  while (collide(playArea, player)) {
    player.pos.x += offset;
    offset = -(offset + (offset > 0 ? 1 : -1));
    if (offset > player.matrix[0].length) {
      rotate(player.matrix, -dir);
      player.pos.x = pos;
      return;
    }
  }
}

var dropCounter = 0;
var dropInterval = 1000;

var lastTime = 0;

function update(time = 0) {
  var deltaTime = time - lastTime;

  dropCounter += deltaTime;
  if (dropCounter > dropInterval) {
    playerDrop();
  }

  lastTime = time;

  draw();
  requestAnimationFrame(update);
}

function updateScore() {
  document.getElementById('score').innerText = player.score;
  moveFaster();
}

function moveFaster() {
  if (player.score < 100) {
    dropInterval = 1000;
  } else if (player.score <= 200) {
    dropInterval = 900;
  } else if (player.score <= 300) {
    dropInterval = 800;
  } else if (player.score <= 400) {
    dropInterval = 700;
  } else if (player.score <= 500) {
    dropInterval = 600;
  } else if (player.score <= 600) {
    dropInterval = 500;
  } else if (player.score <= 700) {
    dropInterval = 400;
  } else if (player.score <= 800) {
    dropInterval = 300;
  } else if (player.score <= 900) {
    dropInterval = 200;
  } else if (player.score <= 1000) {
    dropInterval = 100;
  } else if (player.score <= 2000) {
    dropInterval = 50;
  }
}

document.addEventListener('keydown', event => {
  if (event.keyCode === 37) {
    playerMove(-1);
  } else if (event.keyCode === 39) {
    playerMove(1);
  } else if (event.keyCode === 40) {
    playerDrop();
  } else if (event.keyCode === 90) {
    playerRotate(-1);
  } else if (event.keyCode === 88) {
    playerRotate(1);
  }
});

var playArea = createMatrix(12, 20);

var player = {
  pos: {
    x: 0,
    y: 0
  },
  matrix: null,
  score: 0,
};

playerReset();
updateScore();
update();
