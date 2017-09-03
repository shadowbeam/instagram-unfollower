import {LoginRequest} from "../model/login-request";
import * as inquirer from 'inquirer';
import {InstaClient} from "../client/insta-client";

export class LoginService {

    url_login: string = 'https://www.instagram.com/accounts/login/ajax/';
    instaClient: InstaClient;
    callback: () => void;

    constructor(instaClient: InstaClient, callback: () => void) {
        this.callback = callback;
        this.instaClient = instaClient;

        if (instaClient.isLoggedIn()) {
            console.log(`User already logged in - hi ${instaClient.userId}`);
            this.callback();
        } else {
            this.pleaseLogin();
        }

    }

    private pleaseLogin(): void {
        console.log("Please provide your Instagram authentication details:");

        inquirer.prompt([
            {
                type: 'username',
                message: 'Enter a username',
                name: 'username'
            },
            {
                type: 'password',
                message: 'Enter a masked password',
                name: 'password',
                mask: '*'
            }
        ]).then(this.promptCallback);
    }

    promptCallback = (answers): void => {
        this.login(answers.username, answers.password);
    }

    public login(username: string, password: string): void {
        console.log("Logging in...");
        let loginDetails = new LoginRequest(username, password);
        this.instaClient.call(this.url_login, 'POST', this.loginSuccess, loginDetails.getFormString());
    }

    loginSuccess = (res: any): void => {

        if (res.status == "200") {
            console.log("Login succesful");

            let cookies = res.headers.getAll('set-cookie');
            let sessionId;
            let userId;

            for (let cookie of cookies) {
                if (cookie.includes("sessionid")) {
                    let regex: any = /sessionid=([^=]*);/;
                    sessionId = regex.exec(cookie)[1];
                } else if (cookie.includes("ds_user_id")) {
                    let regex: any = /ds_user_id=(\w*)/;
                    userId = regex.exec(cookie)[1];
                }
            }

            console.log("Found new sessionId: " + sessionId);
            console.log("Found new userId: " + userId);

            this.instaClient.saveSessionAndUserIds(sessionId, userId);
            this.callback();
        } else {
            console.log("Unsuccesful login: " + res.status);
            console.log("Unsuccesful login: " + res.statusText);
            console.log("Unsuccesful login: " + res);
        }

    }

}
