import {Followers} from "./service/followers.service";
import {LoginService} from "./service/login.service";

export class Index {

    loginService: LoginService;
    followers: Followers;

    constructor() {
        this.loginService = new LoginService(this.loggedIn);
        this.followers = new Followers('3407383', 1000, this.loginService);
    }

    loggedIn = (): void => {
        console.log('Calling followers');
        this.followers.fetchFollowers();
    }

}

let index = new Index();
