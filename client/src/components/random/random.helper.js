function addName(nickname) {
    sessionStorage.setItem("nickname", nickname)
}

function getNickname() {
    // TODO: clean name
    return sessionStorage.getItem("nickname")
}

function cleanString(i) {
    let cleaned = ''
    return cleaned
}

export { cleanString, getNickname }