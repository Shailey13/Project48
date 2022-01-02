class Form {
  constructor() {
    this.input = createInput("").attribute("placeholder", "Enter your group name");
    this.playButton = createButton("Go!");
    this.titleImg = createImg("./assets/header.png", "gameTitle");
    this.greeting = createElement("h2");
  }

  setElementsPosition() {
    this.titleImg.position(160, 50);
    this.input.position(width / 2 - 125, height / 2 - 80);
    this.playButton.position(width / 2 - 85, height / 2 - 20);
    this.greeting.position(width / 2 - 300, height / 2 - 100);
  }

  setElementsStyle() {
    this.titleImg.class("gameTitle");
    this.input.class("customInput");
    this.playButton.class("customButton");
    this.greeting.class("greeting");
  }

  hide() {
    this.greeting.hide();
    this.playButton.hide();
    this.input.hide();
  }

  handleMousePressed() {
    this.playButton.mousePressed(() => {
      this.input.hide();
      this.playButton.hide();
      var message = `
      Hello ${this.input.value()}
      </br>wait for another group to join...`;
      this.greeting.html(message);
      playerCount += 1;
      player.name = this.input.value();
      player.index = playerCount;
      player.addPlayer();
      player.updateCount(playerCount);
      player.getDistance();
    });
  }

  display() {
    this.setElementsPosition();
    this.setElementsStyle();
    this.handleMousePressed();
  }
}
