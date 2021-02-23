
var dog;    // dog icon
var cursor = "default";

var dogIsConditioned = false;   // at default, dog is untrained

//var responseType = document.getElementById("response-type");
//var cursorsThatCauseBounce = ["ball", "both"];

var stages = ["Before Conditioning", "Conditioning", "Acquisition"]
var stage = 0;    // default start at Before Conditioning

function dogInit() {
  dog = document.getElementById("dog");
}

// animate dog icon
// dog responds to unconditioned stimulus
function dogRespondToBall() {

  // dogInit();
  //
  // if (!dog.classList.contains("bounce") && cursor === "ball") {
  //   dog.classList.add("bounce");  // make dog jump
  //   //holdBall();   // user's cursor holds ball
  //
  //   //document.getElementsByClassName("tooltiptext fa-dog").style.visibility = "visible";
  //
  // } else {  // if user wants to put ball back
  //   dog.classList.remove("bounce");
  //   //$('.conditioning-lab').css('cursor', 'default');    // put ball back
  // }
  dogBounce();

// change label to display appropriate response type
  handleResponseLabel();

}

// make cursor display ball
function toggleHoldBall() {
  var canvas = document.createElement("canvas");
  canvas.width = 55;
  canvas.height = 55;

  var ctx = canvas.getContext("2d");
  ctx.fillStyle = "#44b38e";
  ctx.font = "55px FontAwesome";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("\uf433", 28, 28);   // insert unicode of ball icon

  var dataURL = canvas.toDataURL('image/png')

  //var currentCursor = $('.conditioning-lab').css('cursor');  // get cursor
  if(cursor !== "ball") {
    $('.conditioning-lab').css('cursor', 'url(' + dataURL + '), auto'); // pick up ball, change cursor
    cursor = "ball";
  } else {
    $('.conditioning-lab').css('cursor', 'default');    // put ball back, restore default cursor
    cursor = "default";
  }

  //$('.conditioning-lab').css('cursor', 'url(' + dataURL + '), auto');   // set cursor
}

// make cursor display bell
function toggleHoldBell() {
    // dogInit();
    // dog.classList.remove("bounce");   // stops bouncing if dog only sees neutral stimulus

  var canvas = document.createElement("canvas");
  canvas.width = 55;
  canvas.height = 55;

  var ctx = canvas.getContext("2d");
  ctx.fillStyle = "#44b38e";
  ctx.font = "55px FontAwesome";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("\uf0f3", 28, 28); // insert unicode of bell icon

  var dataURL = canvas.toDataURL('image/png')

  //var currentCursor = $('.conditioning-lab').css('cursor');  // get cursor

// set cursor
//console.log(currentCursor);
//console.log('url(' + '"' + dataURL + '"' + '), auto');
//console.log(currentCursor === 'url(' + '"' + dataURL + '"' + '), auto');

  // if(currentCursor !== 'url(' + '"' + dataURL + '"' + '), auto') {
  //   $('.conditioning-lab').css('cursor', 'url(' + dataURL + '), auto'); // pick up bell, change cursor
  // } else {
  //   $('.conditioning-lab').css('cursor', 'default');    // put bell back, restore default cursor
  // }
  if(cursor !== "bell") {
    $('.conditioning-lab').css('cursor', 'url(' + dataURL + '), auto'); // pick up bell, change cursor
    cursor = "bell";
  } else {
    $('.conditioning-lab').css('cursor', 'default');    // put bell back, restore default cursor
    cursor = "default";
  }

  dogBounce();  // react to bell
}

// when holding both stimuli, dog will have an Unconditioned stimulus
function holdBothStimuli() {
  // display holding both stimuli
  // make an image, and set cursor to be that image
  var canvas = document.createElement("canvas");
  canvas.width = 110;
  canvas.height = 55;

  var ctx = canvas.getContext("2d");
  ctx.fillStyle = "#44b38e";
  ctx.font = "55px FontAwesome";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("\uf433", 28, 28); // ball
  ctx.fillText("\uf0f3", 80, 28); // bell

  var dataURL = canvas.toDataURL('image/png')

  // var currentCursor = $('.conditioning-lab').css('cursor');  // get cursor
  //
  // if(currentCursor !== 'url(' + '"' + dataURL + '"' + '), auto') {
  //   $('.conditioning-lab').css('cursor', 'url(' + dataURL + '), auto'); // pick up both: change cursor
  // } else {
  //   $('.conditioning-lab').css('cursor', 'default');    // put both back: restore default cursor
  // }
  if(cursor !== "both") {
    $('.conditioning-lab').css('cursor', 'url(' + dataURL + '), auto'); // pick up bell, change cursor
    cursor = "both";
  } else {
    $('.conditioning-lab').css('cursor', 'default');    // put bell back, restore default cursor
    cursor = "default";
  }

  //dog Respond
  // dogInit();
  //
  // if (!dog.classList.contains("bounce") && cursor === "both") {
  //   dog.classList.add("bounce");  // make dog jump
  // }
  // // if it shouldn't be bouncing
  // else {  // if user wants to put stimuli back
  //   dog.classList.remove("bounce");
  // }
  dogBounce();

  // change text of response type label
  //
  //handleResponseLabel();
}

// helper method: decide whether to bounce depending on what the stimulus is
function dogBounce() {
  dogInit();

  // if it's currently not bouncing but should be
  if ((cursor === "both" || cursor === "ball" || (cursor === "bell" && dogIsConditioned === true) )) {
    dog.classList.add("bounce");  // make dog jump
  }
  // if it shouldn't be bouncing
  else {  // if user wants to put stimuli back
    dog.classList.remove("bounce");
  }
}

// when user hovers over dog icon, a text bubble may appear if user is holding a stimulus that will make the dog jump
function handleResponseLabel() {
  var responseType = document.querySelector(".fa-dog .bubble-text");

  // display text bubble if cursor is the right stimulus
  // if it currently says "unconditioned" but should say "conditioned"
  if (responseType.innerHTML === "Unconditioned response" && cursor === "both") {
    //responseType.innerHTML = "Conditioned response";
  }
  // if it should say "unconditioned"
  else if (responseType.innerHTML === "Conditioned response" && cursor === "ball") {
    //responseType.innerHTML = "Unconditioned response";
  }

  }

// changes UI depending on what stage we're on when side arrows are clicked
// takes in boolean parameter of whether or not user clicked next arrow,
// if not, then user clicked prev arrow
function handleStageChange(clickedNext) {
  // change stages
  if (clickedNext) {
    // increment
    stage++;

    // restart from beginning if at end
    if (stage === stages.length) {
      stage = 0;
    }
  } else {  // clicked previous
    // decrement
    stage--;

    if (stage < 0) {
      stage = stages.length - 1;
    }
  }

  // change displayed stage title
  var stageTitle = document.getElementById("stage-title");
  stageTitle.innerHTML = stages[stage];

  // change icons' visibility
  // visibilty of both stimuli icon
  if (stage === 1 || stage === 2) {
    $('.both-stimuli').css('visibility', 'visible');
  } else {
    $('.both-stimuli').css('visibility', 'hidden');
  }

  // change bubble text labels & allow bell to make dog bounce
  //var ball = document.getElementsByClassName("fa-ball");
  var bell = document.querySelector(".fa-bell .bubble-text");
  var dogReponseType = document.querySelector(".fa-dog .bubble-text");
  var bothStimuliBubble = document.querySelector(".both-stimuli .bubble-text");

  if (stage === 2) {
    $('.fa-baseball-ball.stimulus').css('visibility', 'hidden');
    // $('.fa-baseball-ball.stimulus').css('display', 'none');
    // $('.fa-baseball-ball.stimulus').css('width', '0');
    dogIsConditioned = true;

    bell.innerHTML = "conditioned stimulus"; // change bubble text label from neutral to conditioned
    dogReponseType.innerHTML = "Conditioned Response"; // change dog's bubble text from unconditioned to conditioned response
    bothStimuliBubble.innerHTML = "unconditioned & conditioned";
  }
  else {  // restore defaults
    $('.fa-baseball-ball.stimulus').css('visibility', 'unset');
    // $('.fa-baseball-ball.stimulus').css('width', 'auto');
    // $('.fa-baseball-ball.stimulus').css('display', 'initial');  // undo hiding

    dogIsConditioned = false;

    bell.innerHTML = "neutral stimulus"; // change bubble text label from neutral to conditioned
    dogReponseType.innerHTML = "Unconditioned Response"; // change dog's bubble text from unconditioned to conditioned response
    bothStimuliBubble.innerHTML = "unconditioned & neutral";

  }
}
