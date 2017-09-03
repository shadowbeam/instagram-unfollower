import {Followers} from "./service/followers.service";
import {Unfollower} from "./service/unfollower.service";
import {LoginService} from "./service/login.service";
import {InstaClient} from "./client/insta-client";

export class Index {

    instaClient: InstaClient;

    constructor() {
        this.instaClient = new InstaClient(this.instaClientInitialized);
    }

    instaClientInitialized = (): void => {
        console.log("Client init");
        let loginService: LoginService = new LoginService(this.instaClient, this.loggedIn);
    }

    loggedIn = (): void => {
        let followers: Followers = new Followers(1000, this.instaClient, this.startUnfollowing);
        followers.fetchFollowers();
    }

    startUnfollowing = (): void => {
        console.log('Beginning to unfollow users from followers.txt');
        let unfollower: Unfollower = new Unfollower(this.instaClient);
        unfollower.unfollow();
    }

}

let index = new Index();
