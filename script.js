var images = ['https://media.discordapp.net/attachments/1086876486620950589/1086881672647159878/White_Love_Heart-Shaped_Photo_Collage.png?ex=653deb70&is=652b7670&hm=4b2e50b3cfed1cbfe3a505bd432d1366827a9a960e08b72e961338053677d9b9&=&width=528&height=423']




https://images.srkh.in/wp-content/uploads/2023/02/Happy-Propose-Day-Images-333-I-LOVE-YOU.jpg'];

var currentIndex = 0;
var totalClicks = 0;

function randomizeImage() {
  let root = document.documentElement;
  root.style.setProperty('--image', 'url(' + images[currentIndex] + ')');
  currentIndex++;
  if (currentIndex >= images.length) {
    currentIndex = 0;
  }
  var puzzleItems = document.querySelectorAll('#puzz i');
  for (var i = 0; i < puzzleItems.length; i++) {
    puzzleItems[i].style.left = Math.random() * (window.innerWidth - 100) + 'px';
    puzzleItems[i].style.top = Math.random() * (window.innerHeight - 100) + 'px';
  }
}

randomizeImage();

function reloadPuzzle() {
  var doneItems = document.querySelectorAll('.done');
  doneItems.forEach(function (element) {
    element.classList.toggle('done');
  });
  var droppedItems = document.querySelectorAll('.dropped');
  droppedItems.forEach(function (element) {
    element.classList.toggle('dropped');
  });
  var allDoneElement = document.querySelector('.allDone');
  allDoneElement.style = '';
  allDoneElement.classList.toggle('allDone');
}

// mobile functionality
var puzzleItemsMobile = document.querySelectorAll('#puzz i');
puzzleItemsMobile.forEach(function (element) {
  element.addEventListener('mousedown', function () {
    totalClicks++;
    document.querySelector('#clicks').innerHTML = totalClicks;
  });
  element.addEventListener('click', function () {
    if (document.querySelector('.clicked')) {
      document.querySelector('.clicked').classList.toggle('clicked');
      element.classList.toggle('clicked');
    } else {
      element.classList.toggle('clicked');
    }
  });
});

var puzzleItemsDesktop = document.querySelectorAll('#puz i');
puzzleItemsDesktop.forEach(function (element) {
  element.addEventListener('click', function () {
    if (document.querySelector('.clicked')) {
      var clickedElement = document.querySelector('.clicked');
      if (clickedElement.classList.contains(element.classList)) {
        element.classList.add('dropped');
        clickedElement.classList.add('done');
        clickedElement.classList.toggle('clicked');

        if (document.querySelectorAll('.dropped').length == 9) {
          document.querySelector('#puz').classList.add('allDone');
          document.querySelector('#puz').style.border = 'none';
          document.querySelector('#puz').style.animation = 'allDone 1s linear forwards';

          setTimeout(function () {
            reloadPuzzle();
            randomizeImage();
          }, 1500);
        }
      }
    }
  });
});

// desktop drag and drop
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.className);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");

  if (ev.target.className == data) {
    ev.target.classList.add('dropped');
    document.querySelector('.' + data + "[draggable='true']").classList.add('done');

    if (document.querySelectorAll('.dropped').length == 9) {
      document.querySelector('#puz').classList.add('allDone');
      document.querySelector('#puz').style.border = 'none';
      document.querySelector('#puz').style.animation = 'allDone 1s linear forwards';

      setTimeout(function () {
        reloadPuzzle();
        randomizeImage();
      }, 1500);
    }
  }
}