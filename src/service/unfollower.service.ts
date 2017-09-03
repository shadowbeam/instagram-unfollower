import * as fs from 'fs';
import * as LineByLineReader from 'line-by-line';
import {Following} from "../model/following";
import {Goodbye} from "./goodbye.service";
import {LoginService} from "./login.service";
import fetch from "node-fetch";

export class Unfollower {

    rl;
    goodbyes;
    loginService;

    constructor(loginService: LoginService) {
        this.goodbyes = new Goodbye();
        this.loginService = loginService;
    }

    unfollow(): void {

        this.rl = new LineByLineReader('followers.txt');
        this.rl.on('line', this.readNextLine);
    }

    readNextLine = (line: string): void => {

        if (!/\[|\]/.test(line)) {
            this.rl.pause();
            try {
                let parsed = line.replace(/,$/, "");
                this.unfollowUser(JSON.parse(parsed));
            } catch (e) {
                console.error("Could not parse the following line: " + line);
                console.error(e);
            }

            setTimeout(this.wait, 1000); //wait 23 seconds
        }

    }

    wait = (): void => {
        this.rl.resume();
    }

    private unfollowUser(following: Following): void {
        console.log(`${this.goodbyes.getGoodbyePhrase()} ${following.username}`);

        fetch(`https://www.instagram.com/web/friendships/${following.id}/unfollow/`, {
            method: 'POST',
            headers: {
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'en-US,en;q=0.8',
                'Connection': 'keep-alive',
                'Content-Length': '0',
                'Origin': 'https://www.instagram.com',
                'Referer': 'https://www.instagram.com/',
                'User-Agent': ('Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.103 Safari/537.36'),
                'X-Instagram-AJAX': '1',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRFToken': this.loginService.getCsrfToken(),
                'cookie': `csrftoken=${this.loginService.getCsrfToken()}; sessionid=${this.loginService.getSesionId()}`

            },
        }).then(function(res) {
            return res.json();
        }).then(this.success)
            .catch(err => console.error("Error occurred " + err));
    }

    private success(res: any) {
        if (res.status === "ok") {

        } else {
            console.error("Could not unfollow : " + JSON.stringify(res));
        }
    }
}
