let onePlayer = new player();
onePlayer.makeX();
let twoPlayer = new player();
twoPlayer.makeO();
let b = new board(onePlayer, twoPlayer);
b.startGame();
