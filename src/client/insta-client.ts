import fetch from "node-fetch";
import * as fs from 'fs';

export class InstaClient {

    userId: string = '';
    DELIMITER: string = " - ";
    loggedIn: boolean = false;
    callback: () => void;
    headers: any;
    csrfToken: string = '';
    sessionId: string = '';

    constructor(callback: () => void) {
        this.callback = callback;
        this.headers = {
            'accept-Encoding': 'gzip, deflate',
            'accept-Language': 'en-US,en;q=0.8',
            'accept': '*/*',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'connection': 'keep-alive',
            'content-Length': '60',
            'host': 'www.instagram.com',
            'origin': 'https://www.instagram.com',
            'referer': 'https://www.instagram.com/',
            'user-Agent': ('Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.103 Safari/537.36'),
            'x-instagram-ajax': '1',
            'x-requested-with': 'XMLHttpRequest',
            'x-csrftoken': '',
            'cookie': ''
        };

        fs.readFile('insta.tokens', this.readInstaTokens);
    }

    readInstaTokens = (err, data): void => {
        if (!err) {
            console.log("Reading in csrfToken and sessionId...");
            let lines = data.toString().split(this.DELIMITER);
            this.userId = lines[0];
            this.csrfToken = lines[1];
            this.sessionId = lines[2];
            console.log(`Found csrfToken: ${this.csrfToken}`);
            console.log(`Found sessionId: ${this.sessionId.substring(0, 32)}...`);

            this.updateTokens();

            this.loggedIn = true;

            this.callback();
        } else {
            this.makeInitialRequest();
        }
    }

    makeInitialRequest(): void {
        console.log("Fetching csrftoken");
        this.call('https://www.instagram.com/', 'GET', this.initialRequestSuccess);
    }

    private updateTokens(): void {
        this.headers['x-csrftoken'] = this.csrfToken;

        if (this.sessionId != '') {
            this.headers.cookie = `csrftoken=${this.csrfToken}; sessionid=${this.sessionId};`;
        } else {
            this.headers.cookie = `csrftoken=${this.csrfToken};`;
        }
    }

    private initialRequestSuccess = (res: any): void => {
        let cookies = res.headers.getAll('set-cookie');
        let cookiesStr = '';

        for (let cookie of cookies) {
            if (cookie.includes("csrftoken")) {
                let regex: any = /csrftoken=(\w*)/;
                this.csrfToken = regex.exec(cookie)[1];
            }
        }

        console.log('Fetched new csrfToken:' + this.csrfToken);
        this.updateTokens();
        this.callback();
    }

    public isLoggedIn(): boolean {
        return this.loggedIn;
    }

    public getUserId(): string {
        return this.userId;
    }

    public saveSessionAndUserIds(sessionId: string, userId: string) {

        this.sessionId = sessionId;
        this.userId = userId;

        fs.writeFile('insta.tokens', this.userId + this.DELIMITER + this.csrfToken + this.DELIMITER + this.sessionId, function(err) {
            if (err) {
                console.log("Could not write to disk. Check folder permissions");
                return console.error(err);
            }
            console.log("Stored tokens");
        });

        this.updateTokens();

    }

    public call = (url: string, httpMethod: string, callback: (res: any) => void, body?: string, unwrap: boolean = false): void => {

        fetch(url, {
            method: httpMethod,
            headers: this.headers,
            body: body
        }).then(function(res) {
            if (res.status == 200) {
                if (unwrap) {
                    return res.json();
                } else {
                    callback(res);
                }
            } else {
                console.log(res.status);
                console.log(res.statusText);
                callback(res);
            }

        }).then(function(json) {
            callback(json);
        })
            .catch(err => {
                console.error("Error occurred " + err)
            });
    }

}
