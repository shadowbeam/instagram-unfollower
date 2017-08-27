import fetch from "node-fetch";
import formData from "form-data";
import {LoginRequest} from "../model/login-request";

export class LoginService {

    url_login: string = 'https://www.instagram.com/accounts/login/ajax/';
    csrfToken: string = '';
    sessionId: string = '';
    userAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.103 Safari/537.36';

    loginDetails: LoginRequest;

    constructor() {
        this.loginDetails = new LoginRequest('allan.watsonn', '');
        this.makeInitialRequest();
    }

    makeInitialRequest(): void {
        console.log("Fetching csrftoken");

        fetch('https://www.instagram.com/', {
            headers: {
                'origin': 'https://www.instagram.com',
                'referer': 'https://www.instagram.com/',
                'user-Agent': this.userAgent
            }
        })
            .then((res: any): void => {
                let cookies = res.headers.getAll('set-cookie');
                let cookiesStr = '';

                for (let cookie of cookies) {
                    if (cookie.includes("csrftoken")) {
                        let regex: any = /csrftoken=(\w*)/;
                        this.csrfToken = regex.exec(cookie)[1];
                    }
                }
                console.log("Fetched new csrfToken: " + this.csrfToken);

                this.login();
            });
    }

    login(): void {
        console.log("Logging in");

        fetch(this.url_login, {
            method: 'POST',
            headers: {
                'accept-encoding': 'gzip, deflate',
                'accept-language': 'en-US,en;q=0.8',
                'accept': '*/*',
                'connection': 'keep-alive',
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'content-Length': '60',
                'host': 'www.instagram.com',
                'origin': 'https://www.instagram.com',
                'referer': 'https://www.instagram.com/',
                'user-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
                'x-instagram-ajax': '1',
                'x-requested-with': 'XMLHttpRequest',
                'x-csrftoken': this.csrfToken,
                'cookie': 'csrftoken=' + this.csrfToken
            },
            body: this.loginDetails.getFormString()
        })
            .then(this.success)
            .catch(err => console.error(err));
    }

    getCsrfToken(): string {
        return this.csrfToken;
    }

    getSesionId(): string {
        return this.sessionId;
    }

    success = (res: any): void => {
        console.log("Login succesful");

        let cookies = res.headers.getAll('set-cookie');

        for (let cookie of cookies) {
            if (cookie.includes("sessionid")) {
                let regex: any = /sessionid=(\w*)/;
                this.sessionId = regex.exec(cookie)[1];
            }
        }

        console.log("Fetched new sessionId: " + this.sessionId);



    }

}
