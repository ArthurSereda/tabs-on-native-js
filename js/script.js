window.addEventListener("DOMContentLoaded", () => {
  "use sctrict";
  //TABS
  let tab = document.querySelectorAll(".info-header-tab"),
    info = document.querySelector(".info-header"),
    tabContent = document.querySelectorAll(".info-tabcontent");

  function hideTabContent(a) {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove("show");
      tabContent[i].classList.add("hide");
    }
  }
  hideTabContent(1);

  function showTabContent(b) {
    if (tabContent[b].classList.contains("hide")) {
      tabContent[b].classList.remove("hide");
      tabContent[b].classList.add("show");
    }
  }

  info.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("info-header-tab")) {
      for (let i = 0; i < tab.length; i++) {
        if (e.target == tab[i]) {
          hideTabContent(0);
          showTabContent(i);
          break;
        }
      }
    }
  });

  //Timer
  let deadLine = '2020-12-31';

  function getRemainingTime(endTime) {
    //получаем разницу в милисекундах между "сейчас" и "дедлайном"
    let t = Date.parse(endTime) - Date.parse(new Date()),
        seconds = Math.floor((t/1000) % 60),
        minutes = Math.floor((t/1000/60) % 60),
        hours = Math.floor((t/(1000*60*60)));
        
        return {
          'total' : t,
          'hours' : hours,
          'minutes' : minutes,
          'seconds' : seconds,
        };
  }

  function setClock(id, endTime) {
    let timer = document.getElementById(id),
        hours = timer.querySelector('.hours'),
        minutes = timer.querySelector('.minutes'),
        seconds = timer.querySelector('.seconds'),
        timeInterval = setInterval(updateClock, 1000);
    //ведущий ноль в таймере
    let leadZero = (n) => (n < 10 ? '0' : '') + n;

    function updateClock() {
      let t = getRemainingTime(endTime);
      hours.textContent = leadZero(t.hours);
      minutes.textContent = leadZero(t.minutes);
      seconds.textContent = leadZero(t.seconds);
      //Если тотал меньше 0 то таймер остановиться
      if(t.total <= 0) {
        clearInterval(timeInterval);
        hours.textContent = '00';
        minutes.textContent = '00';
        seconds.textContent = '00';
      }
    }
  }

  setClock('timer', deadLine);

  // Modal
  let more = document.querySelector('.more'),
      overlay = document.querySelector('.overlay'),
      close = document.querySelector('.popup-close');
  
  more.addEventListener('click', () => {
    overlay.style.display = "block";
    document.body.style.overflow = "hidden";
  });

  close.addEventListener('click', () => {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
    more.classList.remove('more-splash');
  });
  // Modal in tabs
  let descrBtn = document.querySelectorAll('.description-btn');

  function showMore() {
    for(let i = 0; i < tabContent.length; i++) {
      descrBtn[i].addEventListener('click', () => {
        overlay.style.display = "block";
        document.body.style.overflow = "hidden";
      })
    }
  }
  showMore();

  // Form
  let message = {
    loading: "Загрузка",
    succes: "Спасибо, скоро мы с вами свяжемся",
    failure: "Что-то пошло не так =("
  };

  let form = document.querySelector('.main-form'),
      formInput = form.getElementsByTagName('input'),
      statusMessage = document.createElement('div');

      statusMessage.classList.add('status');

  form.addEventListener('submit', function(e){
    e.preventDefault();
    form.appendChild(statusMessage);

    let request = new XMLHttpRequest();
    request.open('POST', '/server.php');
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    let formData = new FormData(form);

    request.send(formData);
  })

}); //window end
