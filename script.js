const word_original = words[Math.floor(Math.random() * words.length)]
let word_disguised = word_original.replace(/\w/g, "_")
const unique_characters_array = [...new Set(word_original.replace(/[^a-zA-Z]/g, ""))]
const unique_characters_count = unique_characters_array.length

const failures_allowed = 5 + unique_characters_count
let failures_done = 0

console.log(word_original)
document.getElementById("html__word_disguised").innerHTML = word_disguised
document.getElementById("html__error_rate").innerHTML = `${failures_done}/${failures_allowed}`

let userInput = ""
function get_input() {
    userInput = document.getElementById("html__input").value.toLowerCase()
    document.getElementById("html__input").value = ""
    document.getElementById("html__history").innerHTML += userInput

    if (word_original.toLowerCase().includes(userInput)) {
        for (let index = 0; index < word_original.length; index++) {
            if (word_original[index] === userInput) {
                word_disguised = word_disguised.substring(0, index) + userInput + word_disguised.substring(index+1)
            } else if (word_original[index] === userInput.toUpperCase()) {
                word_disguised = word_disguised.substring(0, index) + userInput.toUpperCase() + word_disguised.substring(index+1)
            }
        }
        document.getElementById("html__word_disguised").innerHTML = word_disguised
        if (word_disguised === word_original) {
            document.getElementById("html__body").innerHTML = `<h1 class="success">SUCCESS</h1><p class="success">${word_original}</p>`
        }
    } else {
        document.getElementById("html__error_rate").innerHTML = `${++failures_done}/${failures_allowed}`
    }
    if (failures_done === failures_allowed) {
        let evaluation = ""
        for (let index = 0; index < word_original.length; index++) {
            if (word_disguised[index] === word_original[index]) {
                evaluation += `<span class="success">${word_original[index]}</span>`
            } else {
                evaluation += `<span class="fail">${word_original[index]}</span>`
            }
        }
        document.getElementById("html__body").innerHTML = `<h1 class="fail">FAIL</h1><p>${evaluation}</p></p>`
    }
}
