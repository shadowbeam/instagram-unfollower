import * as fs from 'fs';
import * as LineByLineReader from 'line-by-line';
import {Following} from "../model/following";
import {Goodbye} from "./goodbye.service";
import {InstaClient} from "../client/insta-client";

export class Unfollower {

    rl;
    goodbyes;
    instaClient;

    constructor(instaClient: InstaClient) {
        this.goodbyes = new Goodbye();
        this.instaClient = instaClient;
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

        let url = `https://www.instagram.com/web/friendships/${following.id}/unfollow/`;
        this.instaClient.call(url, 'POST', this.success, '', true);
    }

    private success(res: any) {
        if (res.status === "ok") {

        } else {
            console.error("Could not unfollow : " + JSON.stringify(res));
        }
    }
}
