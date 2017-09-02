import * as fs from 'fs';
import * as LineByLineReader from 'line-by-line';
import {Following} from "../model/following";
import {Goodbye} from "./goodbye.service";

export class Unfollower {

    rl;
    goodbyes;

    constructor() {
        this.goodbyes = new Goodbye();
    }

    unfollow(): void {

        this.rl = new LineByLineReader('followers.txt');

        this.rl.on('line', this.readNextLine);

    }

    readNextLine = (line: string): void => {

        this.rl.pause();

        try {
            let follower: Following = JSON.parse(line.replace(/,$/, ""));

            console.log(this.goodbyes.getGoodbyePhrase() + " " + follower.full_name);
        } catch (e) {
            console.error("Could not parse the following line: " + line);
        }

        setTimeout(this.wait, 1000); //wait 23 seconds

    }

    wait = (): void => {
        this.rl.resume();
    }
}
