
export const AnalyseReducer = (state = [], action) => {

    const finnish = []
    CeaserBreaker(action.payload.bullshits).map(e => {
        finnish.push(e)
    })

    return finnish;
}
const CeaserBreaker = (messageArray) => {
    console.log(messageArray)
    let list = []
    messageArray.map((e, index) => {

        const message = e.message.toUpperCase();
        const lines = []
        for (let i = 0; i < 28; i++) {

            let line = ''


            let asc = ''
            for (let y = 0; y < message.length; y++) {
                let x = -999
                asc = message.charCodeAt(y)

                if (asc === 197) {
                    x = 26; //Å
                } else if (asc === 196) {
                    x = 27; //Ä
                } else if (asc === 214) {
                    x = 28; //Ö
                } else if (asc >= 65 && asc <= 90) {

                    x = (asc - 65)

                }
                x -= i;

                if (x < 0) {
                    x += 29;
                }

                if (x === 26) asc = 197;//Å
                if (x === 27) asc = 196;//Ä
                if (x === 28) asc = 214;//Ö
                if (x >= 0 && x <= 24) asc = x + 65;

                line += String.fromCharCode(asc)


            }
            lines.push(line)


        }

        list.push(Analyse(lines, index));
    })


    return list;
}

const Analyse = (lines, index) => {

    let r = ''
    lines.map((line, i) => {
        const p = CalculateProbability(line)
        if (p >= 34 && p <= 64) {
            if (CalculateKonsonants(line)) {
                const wordList = line.slice(0, line.length - 1).split(' ')
                let hit = 0;
                let shit = 0;
                for (const w in wordList) {

                    if (commonWords(wordList[w])) hit++;
                    if (sijapaate(wordList[w])) shit++;

                }
                if (hit >= 1) {


                    r = {
                        line: line,
                        finnish: 'true',
                        index: index
                    }


                } else {

                    if (shit > 3) {
                        r = {
                            line: line,
                            finnish: 'true',
                            index: index
                        }
                    } else {
                        r = {
                            line: line,
                            finnish: 'notSure',
                            index: index
                        }
                    }


                }
            }
        } else {
            if (i === 0) {
                r = {
                    line: line,
                    finnish: 'false',
                    index: index
                }
            }



        }
    })

    return r;
}



const CalculateProbability = (state) => {


    const aitnes = state.match(/[A|I|T|N|E|S]/g)

    if (aitnes === null) {
        return 0
    } else {
        return parseInt((aitnes.length + 1) / state.length * 100)
    }

}

const CalculateKonsonants = (line) => {
    let k = 0; // konsonant
    let v = 0; //vovel
    line = line.toUpperCase();
    let word = '';

    for (let i = 0; i < line.length; i++) {
        const c = line.charAt(i).match(/[A|E|I|O|U|Y|Å|Ä|Ö]/g)
        word += line.charAt(i)


        if (line.charCodeAt(i) === 32 || line.charCodeAt(i) === 46) { // space or dot      
            if (word.match(/[A|E|I|O|U|Y|Å|Ä|Ö]/g) === null || k > 1 || word.slice(0, 3).match(/[A|E|I|O|U|Y|Å|Ä|Ö]/g) === null) return false;
            k = 0;
            v = 0;
            word = '';

        } else if (c === null) {
            k++;

            v = 0;
            if (k > 4) return false;

        } else if (c) {
            k = 0;
            v++;

            if (v > 5) return false;
        }
    }

    return true;
}

const commonWords = (word) => {

    const list = [
        'ja',
        'eli',
        'olla',
        'mennä',
        'menivät',
        'tulivat',
        'enää',
        'on',
        'tai',
        'joka',
        'ei',
        'ole',
        'he',
        'ovat',
        'me',
        'jos',
        'jossa',
        'olivat',
        'sekä',
        'että',
        'mikä',
        'mitä',
        'mutta',
        'jotta',
        'missä',
        'mitkä',
        'tämä',
        'tuo',
        'ne',
        'jotka',
        'joiden',
        'voi',
        'niin',
        'voida',
        'voivat',
    ]

    return list.indexOf(word.toLowerCase()) > -1 ? true : false
}

const sijapaate = (word) => {
    const endOfWord = word.substr(word.length - 3)

    const list = [
        "ksi",
        "ssa",
        "ssä",
        "sta",
        "stä",
        "een",
        "hin",
        "iin",
        "lta",
        "ltä",
        "lle",
        "lle",
        "tta",
        "ttä",
        "llä",
        "lla"
    ]

    if (word.length < 6) return false;

    return list.indexOf(endOfWord.toLowerCase()) > -1 ? true : false
}