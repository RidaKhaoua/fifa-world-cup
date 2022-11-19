class Foot {
    constructor() {
        this.url = " http://api.cup2022.ir/api/v1/user";
    }

    async getToke() {
        try {
            let response = await fetch(this.url, {
                method: "POST",
                credentials:"include",
                mode:"no-cors",
                
                headers: {
                    "Content-Type": "application/json"
                },
                body:{
                    "name": "Reda00",
                    "email": "Reda00@gmail.com",
                    "password": "12345",
                    "passwordConfirm": "12345"
                }
            });
            let data = await response.json();
        } catch (error) {
            throw new Error(error);
        }
    } 
}

const foot = new Foot();

foot.getToke();