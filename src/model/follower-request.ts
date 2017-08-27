
export class FollowerRequest {

    id: string;
    first: number;
    after: string;

    constructor(id: string, first: number) {
        this.id = id;
        this.first = first;
    }

    setAfter(after: string): void {
        this.after = after;
    }

}
