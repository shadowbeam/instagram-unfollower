import * as fs from 'fs';
import * as LineByLineReader from 'line-by-line';
import {Following} from "../model/following";
import {Goodbye} from "./goodbye.service";
import {InstaClient} from "../client/insta-client";

export class Unfollower {

    rl;
    goodbyes;
    instaClient;
    retryCount: number = 1;
    targetedUser: Following;

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
                this.targetedUser = JSON.parse(parsed);
                this.unfollowUser();
            } catch (e) {
                console.error("Could not parse the following line: " + line);
                console.error(e);
                this.rl.resume();
            }
        }

    }

    wait = (): void => {
        this.rl.resume();
    }

    unfollowUser = (): void => {
        let url = `https://www.instagram.com/web/friendships/${this.targetedUser.id}/unfollow/`;
        this.instaClient.call(url, 'POST', this.success, '', true);
    }

    success = (res: any) => {
        if (res.status === "ok") {
            console.log(`${this.goodbyes.getGoodbyePhrase()} ${this.targetedUser.username}`);
            setTimeout(this.wait, 60000); //wait 60 seconds
            this.retryCount = 1;
        } else {
            console.error(`Could not unfollow ${this.targetedUser.username} - retrying in ${this.retryCount} minutes`);
            setTimeout(this.unfollowUser, (this.retryCount * 60000)); //wait retry time
            this.retryCount = this.retryCount * this.retryCount;

        }
    }
}
