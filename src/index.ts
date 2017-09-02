import {Followers} from "./service/followers.service";
import {Unfollower} from "./service/unfollower.service";
import {LoginService} from "./service/login.service";

export class Index {

    loginService: LoginService;
    followers: Followers;
    unfollower: Unfollower;

    constructor() {
        this.loginService = new LoginService(this.loggedIn);
        this.followers = new Followers(1000, this.loginService, this.startUnfollowing);
        this.unfollower = new Unfollower();
    }

    loggedIn = (): void => {
        console.log('Calling followers');
        this.followers.fetchFollowers();
    }

    startUnfollowing = (): void => {
        console.log('Beginning to unfollow users from followers.txt');
        this.unfollower.unfollow();
    }

}

let index = new Index();
