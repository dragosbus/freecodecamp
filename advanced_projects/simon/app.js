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
      model.count++;
      console.log(model.randomInputs);
        console.log(model.userInputs);
        console.log(model.count);
      
    },

    userChoise(btns) {
      for (let i = 0; i < btns.length; i++) {

        btns[i].addEventListener('click', function () {

          model.userInputs.push(btns[i]);

          if (controller.check()) {
            console.log('vai');
          } else {
            console.log('loose');
            controller.reset();
            
          }

          if (model.userInputs.length === model.randomInputs.length) {
            model.userInputs = [];

            setTimeout(() => {
              controller.startGame(btns);
              view.render();
            }, 2000);
          }

        });

      }

    },

    check() {
      for (let i = 0; i < model.userInputs.length; i++) {
        if (model.userInputs[i].classList[1] !== model.randomInputs[i].classList[1]) {
          return false;
        }
      }
      return true;
    },

    reset() {
      model.count = 0;
      model.userInputs = [];
      model.randomInputs = [];
      view.render();
    }
  };

  var view = {
    init() {
      const parentBtns = document.querySelector('.choose');
      const btns = document.querySelectorAll('.btn');
      const start = document.querySelector('.start');
      const reset = document.querySelector('.reset');
      const counter = document.querySelector('.steps');

      start.addEventListener('click', function () {
        controller.startGame(btns);
        counter.textContent = model.count;
        controller.userChoise(btns);
        this.disabled = true;
        console.log(model.randomInputs);
        console.log(model.userInputs);
        console.log(model.count);
      });
      view.render();
      reset.addEventListener('click', () => {
        controller.reset();
        start.disabled = false;
        console.log(model.randomInputs);
        console.log(model.userInputs);
        console.log(model.count);
      });
      
      
    },

    addClassSound(id) {
      model.randomInputs[id].classList.add('show');
      model.randomInputs[id].firstElementChild.play();
    },

    render() {
      document.querySelector('.steps').textContent = model.count;
      var count = 0;

      var interv = setInterval(() => {
        view.addClassSound(count);
        setTimeout(() => {
          model.randomInputs[count-1].classList.remove('show');
        }, 1000 / model.velocity);
        var maxim = model.randomInputs.length;
        count++;

        if(count === 4) {
          model.velocity = 1.5;
        } else if(count ===8) {
          model.velocity = 2;
        }

        if (count === maxim) {
          clearInterval(interv);
        }
        
      }, 1600 / model.velocity);
      
    }
  };

  view.init();

}());