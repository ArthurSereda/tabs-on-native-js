window.addEventListener("DOMContentLoaded", function() {
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

  info.addEventListener("click", function(e) {
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
  let deadLine = '2020-01-10';

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
    function leadZero(n) {
      return  (n < 10 ? '0' : '') + n;
    }

    function updateClock() {
      let t = getRemainingTime(endTime);
      hours.textContent = leadZero(t.hours);
      minutes.textContent = leadZero(t.minutes);
      seconds.textContent = leadZero(t.seconds);
      //Если тотал меньше 0 то таймер остановиться
      if(t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock('timer', deadLine);

}); //window end
