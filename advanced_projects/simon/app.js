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
      var currentBtn = controller.random(btn.length);
      model.randomInputs.push(btn[currentBtn]);
      console.log(model.randomInputs);
      model.count++;

      view.render();
    },

    userChoise(btns) {
      for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', function () {
          model.userInputs.push(btns[i]);
          console.log(model.userInputs);

          if (model.userInputs.length === model.randomInputs.length) {
            model.userInputs = [];

            console.log(model.count);
            setTimeout(() => {
              controller.startGame(btns);
              view.render();
            }, 2000);
          }

        });
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
        controller.userChoise(btns);
      });
      view.render();
    },

    render() {
      document.querySelector('.steps').textContent = model.count;
      // for (let i = 0; i < model.randomInputs.length; i++) {
      //   setTimeout(() => model.randomInputs[i].style.opacity = '1', 1000);

      // }

      // for (let i = 0; i < model.randomInputs.length; i++) {
      //   setTimeout(() => model.randomInputs[i].style.opacity = '0.7', 2000);
      // }

      var maxim = model.randomInputs.length;
      var current = 0;
      //Resolve here.Color should be shown one a time
      while (current < maxim) {
        setTimeout(() => {
          for(let i=0;i<maxim;i++) {
            model.randomInputs[i].style.opacity = '1';
          }
        }, 1000);
        
        setTimeout(() => {
          for(let i=0;i< maxim;i++) {
            model.randomInputs[i].style.opacity = '0.7';
          }
        }, 2000);

        current++;
        console.log(current);
      }

    }

  };

  view.init();

}());