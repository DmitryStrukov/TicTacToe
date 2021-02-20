class Panel {
  constructor() {
    this.panel = document.createElement('h1');
    this.panel.id = 'panel';
    this.panel.className = 'panel';
    document.body.appendChild(this.panel);
  }

  updateScore(onePlayer, twoPlayer) {
    this.panel.textContent =
      onePlayer.name +
      ' ---     ' +
      onePlayer.score +
      '         ' +
      twoPlayer.name +
      ' ---     ' +
      twoPlayer.score;
  }
}
