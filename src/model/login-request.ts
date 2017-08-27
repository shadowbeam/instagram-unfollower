
export class LoginRequest {

    username: string;
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    public getFormString(): string {
        return `username=${this.username}&password=${this.password}`;
    }

}
