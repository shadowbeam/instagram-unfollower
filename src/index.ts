import {Followers} from "./service/followers.service";
import {Unfollower} from "./service/unfollower.service";
import {LoginService} from "./service/login.service";
import {InstaClient} from "./client/insta-client";

export class Index {

    loginService: LoginService;
    followers: Followers;
    unfollower: Unfollower;
    instaClient: InstaClient;
    constructor() {

        this.instaClient = new InstaClient(this.instaClientInitialized);
        // this.unfollower = new Unfollower(this.loginService);
    }

    instaClientInitialized = (): void => {
        console.log("Client init");
        this.loginService = new LoginService(this.instaClient, this.loggedIn);
    }

    loggedIn = (): void => {
        console.log('Calling followers');
        this.followers = new Followers(1000, this.instaClient, this.startUnfollowing);
        this.followers.fetchFollowers();
    }

    startUnfollowing = (): void => {
        console.log('Beginning to unfollow users from followers.txt');
        // this.unfollower.unfollow();
    }

}

let index = new Index();
