class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");
    this.input = createInput("").attribute("placeholder", "Enter pounds donated!");
    this.leadeboardTitle = createElement("h2");
    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");
    this.submitButton = createButton("Go!");
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");

    //C39
    this.resetTitle.html("Reset Food Drive Scoring");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width / 2 + 400, 40);

    this.resetButton.class("resetButton");
    this.resetButton.position(width / 2 + 490, 150);

    this.submitButton.class("customButton");
    this.submitButton.position(width / 2 - 540, height / 2 - 50);

    this.input.class("customInput");
    this.input.position(width / 2 - 578, height / 2 - 100);

    this.leadeboardTitle.html("Leaderboard");
    this.leadeboardTitle.class("leadersText");
    this.leadeboardTitle.position(width/2 - 130, 40);

    this.leader1.class("leadersText");
    this.leader1.position(width/2 - 130, 80);

    this.leader2.class("leadersText");
    this.leader2.position(width/2 - 130, 130);
  }

  play() {
    this.handleElements();
    this.handleResetButton();
    Player.getPlayersInfo();

    if (allPlayers !== undefined) {

      this.showLeaderboard();

      //index of the array
      var index = 0;
      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;

        //use data form the database to display the cars in x and y direction
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        if (index === player.index) {


          // Changing camera position in y direction
        }
      }

      // handling keyboard events
      this.handlePlayerControls();

      drawSprites();
    }
  }

  handleResetButton() {
    this.resetButton.mousePressed(() => {
      database.ref("/").set({
        playerCount: 0,
        gameState: 0,
        players: {}
      });
      window.location.reload();
    });
  }

  showLeaderboard() {
    var leader1, leader2;
    var players = Object.values(allPlayers);
    if (
      (players[0].rank === 0 && players[1].rank === 0) ||
      players[0].rank === 1
    ) {
      // &emsp;    This tag is used for displaying four spaces.
      leader1 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;

      leader2 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;
    }

    if (players[1].rank === 1) {
      leader1 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;

      leader2 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;
    }

  

    this.leader1.html(leader1);
    this.leader2.html(leader2);

    this.submitButton.mousePressed(() => {
      if (player == players[0]) {
      player.index = playerCount - 1;
      } else {
      player.index = playerCount;
      }
      player.score = this.input.value();
      //player.getDistance();
      player.update(score);
      player.update(rank);
      console.log("1 pressed");
    });
  }

  handlePlayerControls() {
    if (keyIsDown(UP_ARROW)) {
      player.positionY += 10;
      player.update();
    }

    if (keyIsDown(LEFT_ARROW) && player.positionX > width / 3 - 50) {
      player.positionX -= 5;
      player.update();
    }

    if (keyIsDown(RIGHT_ARROW) && player.positionX < width / 2 + 300) {
      player.positionX += 5;
      player.update();
    }
  }

 

  
}
