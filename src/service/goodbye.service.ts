import * as colors from 'colors';

export class Goodbye {

    goodbyes = [
        'be easy',
        'catch you later',
        'cheerio',
        'deuce out the roof',
        'kthanksbye',
        'later gator',
        'peace out',
        'see you in hell',
        'see you later alligator',
        'syonara',
        'ta-ta',
        'toodaloo',
        'toodles',
        'ciao adios',
        'good riddance',
        'nice knowing you',
        'bye bye',
        'i\'m away hame',
        'hasta la vista',
        'cheerio the noo',
        'bon voyage',
        'peace out',
        'i\'m out of here',
        'i gotta go',
        'hit the road',
        'thanks for the memories',
        'time to let go',
        'move on',
        'don\'t cry because it\'s over',
        'in a while crocodile',
        'bye bye butterfly',
        'see ya soon raccoon',
        'give a hug lady bug',
        'bye felica',
        'you broke my heart',
        'i\'m over you',
        'you\'re not good enough for me',
        'it\s not me it\s you',
        'you\'re not up to my standards',
        'time to take out the trash',
        'you cray cray',
        'my wife is asking questions',
        '*hand wave*',
        'byyyyyyyyye',
        'hasta luego',
        'ciao bello',
        'RIP',
        'auf wiedersehen pet',
        'aurevoir',
        'dasvedania',
        'to infinity and beyond'

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
        let goodbye = this.pickRandomElement(this.goodbyes);
        let color = this.pickRandomElement(this.colors);

        if (goodbye === 'bye felicia') {
            return colors.rainbow(goodbye);
        }

        return colors[color](goodbye);
    }

    private pickRandomElement(arr: any[]): any {
        let index = Math.floor((Math.random() * arr.length));
        return arr[index];
    }

}
