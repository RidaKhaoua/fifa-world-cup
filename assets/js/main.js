// class For user interaction

class Ui {
  constructor() {
    this.compt = 0;
    this.barMenu = document.querySelector(".content .bar-menu");
    this.sideBar = document.querySelector(".sidebar");
    this.days = document.querySelector(".content__middle .days > span");
    this.hours = document.querySelector(".content__middle .hours > span");
    this.minuts = document.querySelector(".content__middle .mins > span");
    this.annonce = document.querySelector(".content__middle .annonce");
    this.playersImg = document.querySelector(".content__middle .players img");
    this.annonces = [
      ...document.querySelectorAll(
        ".content .content__middle__left .annonces .annonce"
      ),
    ];
    this.btnNext = document.querySelector(
      ".content .content__middle__left .moving .next"
    );
    this.btnPrev = document.querySelector(
      ".content .content__middle__left .moving .prev"
    );
    this.pointNavigationAnnonce = [
      ...document.querySelectorAll(
        ".content .content__middle__left .navigation div"
      ),
    ];
  }

  showSideBar() {
    if (window.innerWidth < 767) {
      this.sideBar.classList.remove("hidden");
      this.sideBar.classList.toggle("show");
    } else {
      this.sideBar.classList.toggle("hidden");
    }
  }

  countDown() {
    let dateFifaCup = new Date("Nov 22, 2022").getTime();

    let counter = setInterval(() => {
      const millseconde = 1000;
      const min = 60;
      const hour = 60;
      const dayByHours = 24;
      // Get Date Now
      let currentDate = new Date().getTime();

      // Find The Date Difference Between Now And CountDown Date
      let diffDate = dateFifaCup - currentDate;

      // Get Time Units
      let days = Math.floor(diffDate / (millseconde * min * hour * dayByHours));

      let hours = Math.floor(
        (diffDate % (millseconde * min * hour * dayByHours)) /
          (millseconde * min * hour)
      );

      let minuts = Math.floor(
        (diffDate % (millseconde * min * hour)) / (millseconde * min)
      );

      let seconds = Math.floor((diffDate % (millseconde * min)) / millseconde);

      // call function displayTime

      this.displayTime(days, hours, minuts);

      if (diffDate <= 0) {
        clearInterval(counter);
      }
    }, 1000);
  }

  displayTime(days, hours, min) {
    this.days.textContent = days < 10 ? `0${days}` : days;
    this.hours.textContent = hours < 10 ? `0${hours}` : hours;
    this.minuts.textContent = min < 10 ? `0${min}` : min;
  }

  removeClass() {
    if (this.sideBar.classList.contains("show")) {
      this.sideBar.classList.remove("show");
    }
  }

  showAnnonceAndPlayersImg() {
    this.annonce.classList.add("active");
    setTimeout(() => {
      this.annonce.classList.add("show");
    }, 300);
    this.playersImg.classList.add("active");
  }

  hideTheCurrentElement() {
    // remove The class Show from The current Element
    this.annonces[this.compt].classList.remove("show");

    // After 700ms Remove class Active  from The current Element
    setTimeout(() => {
      this.annonces[this.compt].classList.remove("active");
    }, 700);
  }

  showTheNextElement() {
    // After 700ms
    setTimeout(() => {
      // increment Compteur
      this.compt += 1;

      // set class active to make The element Takes Property block
      this.annonces[this.compt].classList.add("active");

      // and After 700ms show The element
      setTimeout(() => {
        this.annonces[this.compt].classList.add("show");
      }, 700);

      if (this.compt === this.annonces.length - 1) {
        // change the cursor from Pointer To no-allowed
        ui.changeCursorOfMoving(this.btnNext, "add");
      }
    }, 700);
  }

    movingAnnonceNext() {
    let annoncesLength = this.annonces.length - 1;

    ui.changeCursorOfMoving(ui.btnPrev, "remove");

    if (this.compt < annoncesLength) {
        this.hideTheCurrentElement();
        this.showTheNextElement();
    }
  }

  movingAnnoncePrev() {
    ui.changeCursorOfMoving(this.btnNext, "remove");
    if (this.compt > 0) {
      this.hideTheCurrentElement();
      setTimeout(() => {
        this.compt -= 1;
        this.annonces[this.compt].classList.add("active");

        setTimeout(() => {
          this.annonces[this.compt].classList.add("show");
        }, 700);

        if (this.compt === 0) {
          ui.changeCursorOfMoving(this.btnPrev, "add");
        }
      }, 700);
    }
  }

  removeActiveFromNavigationAnnonce() {
    const elementNavActive = document.querySelector(
      ".content .content__middle__left .navigation div.active"
    );
    elementNavActive.classList.remove("active");
  }

  changeCursorOfMoving(btn, propClassName) {
    switch (propClassName) {
      case "add":
        if (btn.classList.contains("next")) {
          btn.classList.add("active");
        } else if (btn.classList.contains("prev")) {
          btn.classList.add("active");
        }
        break;
      case "remove":
        if (btn.classList.contains("next")) {
          btn.classList.remove("active");
        } else if (btn.classList.contains("prev")) {
          btn.classList.remove("active");
        }
        break;
      default:
        break;
    }
  }
}



const ui = new Ui();


// triggers Function
ui.countDown();

ui.showAnnonceAndPlayersImg();

// Events

document.body.addEventListener("click", function (e) {
    if(e.target.classList.contains("bar-menu")) {
        ui.showSideBar();
    }else if(this.classList.contains("body")) {
        ui.sideBar.classList.remove("show");
    } 
})

ui.btnNext.addEventListener("click", function (params) {
    ui.movingAnnonceNext();
})

ui.btnPrev.addEventListener("click", function name(params) {
    ui.movingAnnoncePrev();
})


ui.pointNavigationAnnonce.forEach((item) =>  {
    item.addEventListener("click", function (params) {
    
        ui.removeActiveFromNavigationAnnonce();
    
        this.classList.add("active");
        
        if (+this.dataset.index === ui.annonces.length - 1) {
            ui.changeCursorOfMoving(ui.btnNext, "add");
        } else {
            ui.changeCursorOfMoving(ui.btnNext, "remove");
        }

        if(+this.dataset.index === 0) {
            ui.changeCursorOfMoving(ui.btnPrev, "add");
        } else {
            ui.changeCursorOfMoving(ui.btnPrev, "remove");
        }
        })
})

/**
 *  
        ui.compt = +this.dataset.index;
        
        ui.annonces.forEach(item => {
            item.classList.remove("show");
            setTimeout(() => {
                item.classList.remove("active");
            }, 700);
        });

        setTimeout(() => {
            ui.annonces[this.dataset.index].classList.add("active");

            setTimeout(() => {
                ui.annonces[this.dataset.index].classList.add("show");
            }, 700);
            
        }, 700);
 */