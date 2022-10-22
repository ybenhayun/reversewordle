$(document).ready(function() {
    setLength(5);
    // update();

    $("#word-length").change(function() {
        let length = $(this).val();
        setLength(length);
    });
})

function update() {
    let combos = [];
    let counter = 0;
    let new_list = big_list.filter(a => a.length == 5);

    for (let i = 0; i < new_list.length; i++) {
        if (new_list[i].split('').sort().join('') == 'AERST') console.log(new_list[i]);

        new_list[i] = new_list[i].split('').sort().join('');
        if (!combos[new_list[i]]) {
            combos[new_list[i]] = 1;
            counter++;
        } else {
            combos[new_list[i]]++;
        }
    }

    console.log("Total Words: " + new_list.length);
    console.log("Unique Combos: " + counter);
    console.log(combos);
}

function addLetter () {
    let letter = document.getElementById("letter-entered").value.toUpperCase();
    if (!letter) return;

    document.getElementById("letter-entered").value = "";
    let length = Number(document.getElementById("word-length").value);
    
    let word_list = filterList(letter, length);

    if (!word_list.length) return noWordsLeft();

    let spot = findBestSpot(letter, word_list, length);

    showRemainingList(word_list, letter, spot);
    addToWord(letter, spot);
}

function noWordsLeft() {
    let list = document.getElementsByClassName("words-left")[0];
    let words = document.getElementsByClassName('word-list')[0];
    
    list.classList.remove('on');
    words.innerHTML = "";
    list.innerHTML = "goose egg";
}

function showRemainingList(word_list, letter, spot) {
    word_list = word_list.filter(a => a.charAt(spot) == letter);

    let display_list = document.getElementsByClassName("word-list")[0];
    let remaining = document.getElementsByClassName('words-left')[0];
    remaining.innerHTML =  word_list.length + " words remaining";
    remaining.classList.add('on');

    let list = "";
    for (let i = 0; i < word_list.length; i++) {    
        list += "<li>" + word_list[i] + "</li>";
    }

    display_list.innerHTML = list;
}

function filterList(letter, length) {
    let word_list = big_list.filter((a) => a.length == length);
    word_list = word_list.filter((a) => a.includes(letter));

    let letters = document.getElementsByClassName('letter');
    let empty = [];

    for (let i = 0; i < length; i++) {
        if (letters[i].innerHTML != "") {
            word_list = word_list.filter(a => a.charAt(i) == letters[i].innerHTML);
        } else {
            empty.push(i);
        }
    }

    outer:
    for (let i = 0; i < word_list.length; i++) {
        for (let j = 0; j < empty.length; j++) {
            if (word_list[i].charAt(empty[j]) == letter) continue outer;
        }

        word_list.splice(i, 1);
        i--;
    }

    return word_list;
}

function addToWord(letter, spot) {
    let letters = document.getElementsByClassName('letter');
    letters[spot].innerHTML = letter;
    letters[spot].classList.add("filled");
}

function findBestSpot(letter, word_list, length) {
    let freq = new Array(length).fill(0);
    let letters = document.getElementsByClassName('letter');

    for (let i = 0; i < word_list.length; i++) {
        for (let j = 0; j < length; j++) {
            if (word_list[i].charAt(j) == letter && letters[j].innerHTML == "") {
                freq[j]++;
            }
        }
    }

    let best_spot = freq.indexOf(Math.max(...freq));
    return best_spot;
}

function setLength(length) {
    let word = document.getElementsByClassName("word")[0];
    word.innerHTML = "";

    for (let i = 0; i < length; i++) {
        word.innerHTML += "<div class = 'letter'></div>";
    }
}