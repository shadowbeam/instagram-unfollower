export default class StatItem {

    icon: string;
    endpoint: string;
    level: string = 1;


    constructor(icon: string, endpoint:string, level:string) {
        this.icon = icon;
        this.endpoint = endpoint;
        this.level = level;
    }

}
