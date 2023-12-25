function reverseString(str) {
    return str.split('').reverse().join('');
}

function atbashCipher(str) {
    const alphabetLower = "abcdefghijklmnopqrstuvwxyz";
    const alphabetUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";

    for (let char of str) {
        if (alphabetUpper.includes(char)) {
            let newIndex = 25 - alphabetUpper.indexOf(char);
            result += alphabetUpper[newIndex];
        } else if (alphabetLower.includes(char)) {
            let newIndex = 25 - alphabetLower.indexOf(char);
            result += alphabetLower[newIndex];
        } else {
            result += char;
        }
    }

    return result;
}

export function decode(str) {
    return reverseString(atbashCipher(str));
}