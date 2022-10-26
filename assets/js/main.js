// class For user interaction

class Ui {
    constructor() {
        this.barMenu = document.querySelector(".content .bar-menu");
        this.sideBar = document.querySelector(".sidebar");
        this.days = document.querySelector(".content__middle .days > span");
        this.hours = document.querySelector(".content__middle .hours > span");
        this.minuts = document.querySelector(".content__middle .mins > span");
        this.annonce = document.querySelector(".content__middle .annonce");
        this.playersImg = document.querySelector(".content__middle .players img")
    }

    showSideBar() {
        if(window.innerWidth < 767) {
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

            let hours = Math.floor((diffDate % (millseconde * min * hour * dayByHours)) / (millseconde * min * hour));
            
            let minuts = Math.floor((diffDate % (millseconde * min * hour) ) / (millseconde * min));

            let seconds = Math.floor((diffDate % (millseconde * min )) / millseconde);
            
            // call function displayTime

            this.displayTime(days, hours, minuts);

            if(diffDate <= 0) {
                clearInterval(counter);
            }

        }, 1000);
        
    }

    displayTime(days, hours, min) {
            this.days.textContent = days < 10 ? `0${days}` : days;
            this.hours.textContent = hours < 10 ? `0${hours}` : hours;
            this.minuts.textContent = min < 10 ? `0${min}` : min;
    }

    removeClass () {
        if(this.sideBar.classList.contains("show")) {
            this.sideBar.classList.remove("show");
        }
    }

    showAnnonceAndPlayersImg() {
        this.annonce.classList.add("active");
        this.playersImg.classList.add("active");
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