import fetch from "node-fetch";
import {FollowerRequest} from "../model/follower-request";
import {FollowerResponse, Node} from "../model/follower-response";
import {Following} from "../model/following";
import * as inquirer from 'inquirer';
import {InstaClient} from "../client/insta-client";

import * as fs from 'fs';

export class Followers {

    urlBase: string = 'https://www.instagram.com/graphql/query/';
    queryId: string = '17874545323001329';
    followerRequest: FollowerRequest;
    instaClient: InstaClient
    logger: any;
    following: Following[];
    callback: () => void;

    constructor(batchSize: number, instaClient: InstaClient, callback: () => void) {
        this.instaClient = instaClient;
        this.following = [];
        this.callback = callback;
        this.followerRequest = new FollowerRequest(this.instaClient.getUserId(), batchSize);

    }

    public fetchFollowers(): void {
        fs.exists("followers.txt", this.fileExists);
    }

    fileExists = (exists: boolean): void => {

        if (!exists) {
            this.logger = fs.createWriteStream('followers.txt', {
                flags: 'a'
            })
            this.fetchBatchOfFollowers();
        } else {
            console.log("Found a list of followers");
            inquirer.prompt([
                {
                    type: 'confirm',
                    default: true,
                    name: 'response',
                    message: 'Do you want to unfollow everyone on this list?'
                }
            ]).then(this.promptCallback);

        }
    }


    promptCallback = (confirm: any): void => {

        if (confirm.response) {
            this.callback();
        }
        else {
            console.log("Ok I won't unfollow them");
        }
    }

    fetchBatchOfFollowers = (): void => {
        console.log("fetching followers...");
        let url = `${this.urlBase}?query_id=${this.queryId}&variables=${JSON.stringify(this.followerRequest)}`;
        this.instaClient.call(url, 'GET', this.success, '', true);
    }

    success = (res: any): void => {

        console.log(res);

        let response: FollowerResponse = res.data.user.edge_follow;

        for (let node of response.edges) {
            this.following.push(new Following(node.node.id, node.node.username, node.node.full_name));
        }

        if (response.page_info.has_next_page) {
            console.log(`Found so far ${this.following.length}`);
            this.followerRequest.setAfter(response.page_info.end_cursor);
            this.fetchBatchOfFollowers();
        } else {
            this.analyzeFollowers();
        }
    }

    analyzeFollowers = (): void => {
        console.log(`Found ${this.following.length} followers now writing to disk...`)

        this.logger.write('[\n');

        for (let i = 0; i < this.following.length; i++) {
            let following = this.following[i];
            console.log(`${following.id}\t-\t${following.username}\t-\t${following.full_name}`);
            this.logger.write(JSON.stringify(following));
            if (i != this.following.length - 1) {
                this.logger.write(',\n');
            }
        }
        this.logger.write(']');
        console.log(`${this.following.length} followers written to followers.txt`)
        console.log('\x1b[35m', 'Please remove the lines from followers.txt that you do not want to unfollow before continuing...');

        this.callback();

    }

}
