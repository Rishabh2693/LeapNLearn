var imagePosMap = [];

function init() {
  var ctl = new Leap.Controller({enableGestures: true});

  var swiper = ctl.gesture('swipe');

  var totalDistance = 0;

  var tolerance = 50;
  var cooloff = 300;

  var x = 2, y = 2;

  var updateHighlight = function() {
    $('.grid div').removeClass('highlight');
    $('.grid #d'+x+"_"+y).addClass('highlight');
  }

  var slider = _.debounce(function(xDir, yDir) {
    x += xDir;
    x = (x + 5) % 5;
    y += yDir;
    y = (y + 5) % 5;
    updateHighlight();
  }, cooloff);

  swiper.update(function(g) {
    if (Math.abs(g.translation()[0]) > tolerance || Math.abs(g.translation()[1]) > tolerance) {
      var xDir = Math.abs(g.translation()[0]) > tolerance ? (g.translation()[0] > 0 ? -1 : 1) : 0;
      var yDir = Math.abs(g.translation()[1]) > tolerance ? (g.translation()[1] < 0 ? -1 : 1) : 0;
      slider(xDir, yDir);
    }
  });

  ctl.connect();
  updateHighlight();

  createImageMap();
  loadAssets();
}

function getWeight(char) {

}

function createImageMap() {
  var char = 'A';
  for(var i=0; i<6; i++) {
    for(var j=0; j<5; j++) {
      imagePosMap.push({x: -20-(j*140), y: -15-(i*115), value: char, weight: getWeight(char)});
      char = String.fromCharCode(char.charCodeAt() + 1);
      if(i==5 && j>=0) {
        break;
      }
    }
  }
  console.log(imagePosMap);
}

function getRandomLetters() {
  //return Math.floor(Math.random() * 26);
  var randomWeight = Math.floor(Math.random() * sumOfWeights) + 1;
  /*for each item in array
  randomWeight = randomWeight - item.Weight 
    if randomWeight <= 0
      break // done, we select this item*/
}

function loadAssets() {
  var num;
  for(var i=0; i<5; i++) {
    for(var j=0; j<5; j++) {
      num = Math.floor(Math.random() * 26);
      var elm = document.getElementById("d"+i+"_"+j);
      elm.style.backgroundImage = "url('../assets/text.jpg')";
      elm.style.backgroundRepeat = "no-repeat";
      elm.style.backgroundPositionX = imagePosMap[num].x + "px";//"-20px";     //-140px to move left
      elm.style.backgroundPositionY = imagePosMap[num].y + "px";//"-14px";     //-115px to move down
      elm.style.backgroundSize = "707%";
      elm.setAttribute("data-value", imagePosMap[num].value);
    }
  }
}