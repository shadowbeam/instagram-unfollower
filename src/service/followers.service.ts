import fetch from "node-fetch";
import {FollowerRequest} from "../model/follower-request";
import {FollowerResponse, Node} from "../model/follower-response";
import {Following} from "../model/following";
import {LoginService} from "./login.service";
import * as fs from 'fs';

export class Followers {

    urlBase: string = 'https://www.instagram.com/graphql/query/';
    queryId: string = '17874545323001329';
    followerRequest: FollowerRequest;
    loginService: LoginService

    logger: any;

    following: Following[];

    constructor(userId: string, batchSize: number, loginService: LoginService) {
        this.loginService = loginService;
        this.followerRequest = new FollowerRequest(userId, batchSize);
        this.following = [];

        fs.truncate('followers.txt', 0, function() {

        });
        this.logger = fs.createWriteStream('followers.txt', {
            flags: 'a'
        })
    }

    public fetchFollowers(): void {
        console.log("fetching followers...");
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
            this.fetchFollowers();
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

    }

}
