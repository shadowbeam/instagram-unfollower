export class Goodbye {

    goodbyes = [
        "be easy",
        "catch you later",
        "cheerio",
        "deuce out the roof",
        "kthanksbye",
        "later gator",
        "peace out",
        "see you in hell",
        "see you later alligator",
        "syonara",
        "ta-ta",
        "toodaloo",
        "toodles",
        "ciao adios",
        "good riddance",
        "nice knowing you",
        "bye bye",
        "I'm away hame",
        "hasta la vista",
        "cheerio the noo",
        "bon voyage"
    ];

    colors = [
        'red',
        'green',
        'yellow',
        'blue',
        'magenta',
        'cyan',
        'white',
        'gray'
    ];


    public getGoodbyePhrase(): string {
        let index = Math.floor((Math.random() * this.goodbyes.length));
        return this.goodbyes[index];
    }

    public getColor(): string {
        let index = Math.floor((Math.random() * this.colors.length));
        return this.colors[index];
    }



}
