
const btns = document.querySelector('.btns'),
      ul = document.querySelector('.streamers'),
      streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

(function () {
  let message;
  streamers.forEach(function (channel) {
    function makeUrl(type, name) {
      return 'https://wind-bow.gomix.me/twitch-api/' + type + '/' + name + '?callback=?';
    }

    $.getJSON(makeUrl('streams', channel), function (data) {
      console.log(data);
      message = '<li ';

      if (data.stream === null) {
        message += 'class="offline"';
        message += '>';
        message += `<a href="https://www.twitch.tv/${channel}">${channel}</a>`;
        message += '<p class="status">Status:offline</p>';
      } else {
        if (data.stream.is_playlist === false) {
          message += 'class="offline"';
          message += '>';
          message += `<a href="https://www.twitch.tv/${channel}">${channel}</a>`;
          message += '<p class="status">Status:offline</p>';
        } else {
          message += 'class="online"';
          message += '>';
          message += `<a href="https://www.twitch.tv/${channel}">${channel}</a>`;
          message += '<p class="status">Status:Online</p>';
          message += `<img src="${data.stream.preview.small}" alt="logo">`;
          message += `<p>Game:${data.stream.game}</p>`;
        }
      }
      message += '</li>';
      ul.innerHTML += message;
    });//End getJSON
  }); //End forEach

  btns.addEventListener('click', function (e) {
    let target = e.target;
    if (target.tagName === 'BUTTON') {
      let button = btns.querySelectorAll('button');
      for (let i = 0; i < button.length; i++) {
        if (button[i].classList.contains('active')) {
          button[i].classList.remove('active');
        }
      }
      target.classList.add('active');

    }
  }); //end event listener toggler class active

  $('.btn-all').click(function () {
    $('.streamers li').fadeIn();
  });

  $('.btn-online').click(function () {
    $('.online').fadeIn();
    $('.offline').fadeOut();
  });

  $('.btn-offline').click(function () {
    $('.online').fadeOut();
    $('.offline').fadeIn();
  });

}()); //End IIFE