import * as fs from 'fs';
import * as LineByLineReader from 'line-by-line';
import * as colors from 'colors';
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
        let color = this.goodbyes.getColor();

        try {
            let parsed = line.replace(/,$/, "");
            let follower: Following = JSON.parse(parsed);
            console.log(colors[color](`${this.goodbyes.getGoodbyePhrase()}`) + ` ${follower.full_name}`);
        } catch (e) {
            console.error("Could not parse the following line: " + line);
            console.error(e);
        }

        setTimeout(this.wait, 1000); //wait 23 seconds

    }

    wait = (): void => {
        this.rl.resume();
    }
}
