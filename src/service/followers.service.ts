import fetch from "node-fetch";
import {FollowerRequest} from "../model/follower-request";
import {FollowerResponse, Node} from "../model/follower-response";
import {Following} from "../model/following";
import {LoginService} from "./login.service";
import * as inquirer from 'inquirer';

import * as fs from 'fs';

export class Followers {

    urlBase: string = 'https://www.instagram.com/graphql/query/';
    queryId: string = '17874545323001329';
    followerRequest: FollowerRequest;
    loginService: LoginService
    batchSize: number;

    logger: any;

    following: Following[];

    callback: () => void;

    constructor(batchSize: number, loginService: LoginService, callback: () => void) {
        this.loginService = loginService;
        this.batchSize = batchSize;
        this.following = [];
        this.callback = callback;



    }

    public fetchFollowers(): void {

        fs.exists("followers.txt", this.fileExists);

    }

    fileExists = (exists: boolean): void => {

        if (!exists) {

            fs.truncate('followers.txt', 0, function() {

            });

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
        if (!this.followerRequest) {
            this.followerRequest = new FollowerRequest(this.loginService.getUserId(), this.batchSize);
        }

        fetch(`${this.urlBase}?query_id=${this.queryId}&variables=${JSON.stringify(this.followerRequest)}`, {
            method: 'GET',
            headers: {
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'en-US,en;q=0.8',
                'Connection': 'keep-alive',
                'Content-Length': '0',
                'Host': 'www.instagram.com',
                'Origin': 'https://www.instagram.com',
                'Referer': 'https://www.instagram.com/',
                'User-Agent': ('Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 \
      (KHTML, like Gecko) Chrome/48.0.2564.103 Safari/537.36'),
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



    success = (res: any): void => {
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
