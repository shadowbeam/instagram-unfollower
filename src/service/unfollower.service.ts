import * as fs from 'fs';
import * as LineByLineReader from 'line-by-line';
import {Following} from "../model/following";

export class Unfollower {

    rl;

    unfollow(): void {

        this.rl = new LineByLineReader('followers.txt');

        this.rl.on('line', this.readNextLine);

    }

    readNextLine = (line: string): void => {

        this.rl.pause();

        try {
            let follower = JSON.parse(line.replace(/,$/, ""));

            console.log('Line from file:', follower.id);
        } catch (e) {
            console.error("Could not parse the following line: " + line);
        }

        setTimeout(this.wait, 23000); //wait 23 seconds

    }

    wait = (): void => {
        this.rl.resume();
    }
}
