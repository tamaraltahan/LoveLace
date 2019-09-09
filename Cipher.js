const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var shiftAmount;

function break_caesar_cipher(ciphertext, known_word) {
    known_word = known_word.toUpperCase();
    let plaintext = "";
    var wordList = ciphertext.split(" ");//split all words into an array
    var sameCharList = [];

    //put all words with the same amount of characters as the known word in a new array
    for (i = 0; i < wordList.length; i++) {
        if (wordList[i].length == known_word.length) {
            sameCharList += wordList[i];
        }
    }

    var decryptedList = decrypt(wordList,known_word);
    for(i = 0; i < decryptedList.length; i++){
        plaintext += decryptedList[i] + " ";
    }
    plaintext = plaintext.substring(0,  plaintext.length - 1);
    //check which word alligns with the keyword

    return plaintext;
}

/**
 * Helper function
 * @param {list of all words} stringList 
 * @param {given word} keyword
 */
function decrypt(stringList, keyword){ 
    var numList = [];

    //first i numericize all the strings
    //I could just do this sequentially until the correct string is found, but that's more effort
    for(i = 0; i < stringList.length; i++){
        numList[i] = getCharacterValues(stringList[i]);
    }

    //then I test each string to find the shift amount
    for(i = 0; i < list.length; i++){
        setShiftAmount(stringList[i],keyword)
        if(testDistance(stringList[i],known_word)){
            break; //match!
        }
    }

    //now shift each word in the string by the appropriate ammount

    var plaintext = "";
    for(i = 0; i < numList.length; i++){
        plaintext += shiftWord(numList[i]);
    }
    return plaintext;
    
}


function setShiftAmount(encoded_word, known_word){
    shiftAmount = 0;

    var encoded_word_integer_list = getCharacterValues(encoded_word);
    var known_word_integer_list = getCharacterValues(known_word);

    while(encoded_word_integer_list[0] != known_word_integer_list[0]){
        shiftAmount++;
        encoded_word_integer_list[0]++;
        if(encoded_word_integer_list[0] > 25){
            encoded_word_integer_list[0] = 0;
        }
    }
}


/**
 * returns a list of integers representative of which position in the alphabet a character is (a = 1, b = 2, etc...)
 * @param {A string} word 
 */
function getCharacterValues(word){ 
    var list = [];
    
    for(i = 0; i < word.length; i++){
        var charNumber = 0;
        while(word[i] != alphabet[charNumber]){
            charNumber++;
            if(charNumber > 25){
                charNumber = 0
            }
        }
        list += charNumber
    }
    return list
}


function testDistance(encoded_word,known_word){
    var shifted_integer_list = getCharacterValues(encoded_word);

    for(i = 0; i < encoded_word.length; i++){
        shifted_integer_list[i] += shiftAmount;
        if(shifted_integer_list[i] > 25){
            shifted_integer_list[i] = (shifted_integer_list[i] % 25) - 1;
        }
    }

    //bruh

    var decryptedWord = toWord(shifted_integer_list);



    
    if(decryptedWord == known_word){
        return true;
    }
    return false;

}


/**
 * uses shift distance to turn one list of integers into the decrypted version
 * @param {encrypted word} word 
 */
function shiftWord(encrypted_word){
    var charValues = getCharacterValues(encrypted_word); //get list of character positions on alphabet

    for(i = 0; i < charValues.length; i++){ //for every letter
        charValues[i] += rotateDistance; //rotate by n
        if(charValues[i] > 25){ //continue rotation after hitting z
            charValues[i] =  (charValues[i] % 25) - 1;
        }
    }
    return charValues
}

/**
 * turns an array of integers into a string using the indeces of the alphabet
 * @param {Character positions in the alphabet (a is 0, b is 1, etc)} integerList 
 */
function toWord(integerList){
    var decryptedWord = "";
    
    for(i = 0; i < integerList.length; i++){
        decryptedWord += alphabet[integerList]
    }
    return decryptedWord
}


var encodedText = "QEB NRFZH YOLTK CLU GRJMP LSBO QEB IXWV ALD"
var keyword = "fox"

console.log(break_caesar_cipher(encodedText,keyword))