(function () {

  var model = {
    count: 0,
    max: 20,
    velocity: 1,
    randomInputs: [],
    userInputs: []
  };

  var controller = {
    random(range) {
      return Math.floor(Math.random() * range);
    },
    startGame(btn) {

      while (model.count <= model.max) {
        var currentBtn = controller.random(btn.length);

        setTimeout(function () {
          model.randomInputs.push(btn[currentBtn]);

          if (model.count === 5) {
            model.velocity = 1.5;
          } else if (model.count === 9) {
            model.velocity = 2;
          }

          console.log(model.randomInputs);
          model.count++;
        }, 2000);
       
      }

    },
    check() {
      for (let i = 0; i < model.randomInputs; i++) {
        if (model.randomInputs[i] === model.userInputs[i]) {
          count++;
        } else {
          return false;
        }
      }
    }
  };

  var view = {
    init() {
      const parentBns = document.querySelector('.choose');
      const btns = document.querySelectorAll('.btn');
      const start = document.querySelector('.start');
      const counter = document.querySelector('.steps');

      start.addEventListener('click', function () {
        controller.startGame(btns);
        counter.textContent = model.count;
      });
    }
  };

  view.init();

}());