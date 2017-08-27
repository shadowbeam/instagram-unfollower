import fetch from "node-fetch";
import {FollowerRequest} from "../model/follower-request";
import {FollowerResponse, Node} from "../model/follower-response";
import {LoginService} from "./login.service";

export class Followers {

    urlBase: string = 'https://www.instagram.com/graphql/query/';
    queryId: string = '17874545323001329';
    followerRequest: FollowerRequest;
    loginService: LoginService

    constructor(userId: string, batchSize: number, loginService: LoginService) {
        this.loginService = loginService;
        this.followerRequest = new FollowerRequest(userId, batchSize);
        console.log(`${this.urlBase}?query_id=${this.queryId}&variables=${JSON.stringify(this.followerRequest)}`);
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
                'cookie': 'ig_pr=2; ig_vw=845'
            },
        }).then(function(res) {
            console.log("Response from followers: " + res.status);
            return res.json();
        }).then(this.success)
            .catch(err => console.error("Error occurred " + err));

    }


    success = (res: any): void => {
        let response: FollowerResponse = res.data.user.edge_follow;

        for (let node of response.edges) {
            console.log(`${node.node.id}\t-\t${node.node.username}\t-\t${node.node.full_name}`);
        }

        // if (response.page_info.has_next_page) {
        //     this.followerRequest.setAfter(response.page_info.end_cursor);
        //     this.fetchFollowers();
        // }

    }



}
