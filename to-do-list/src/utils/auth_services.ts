
function loadToken() {
    const token = localStorage.getItem('token')
    if (!token) {
        return null
    } else if (isExpired(token)) {
        return null
    } else {
        return token
    }

}

function isExpired(token:any) {
    const payload = extractPayload(token)
    return payload.exp < (Date.now() / 1000)
}

export function getUserFromLocalStorage() {
    const token = loadToken()
    if (token) {
        return extractPayload(token)
    } else {
        return null
    }
}

function extractPayload(token:any) {
    const payload = token.split('.')[1]
    return JSON.parse(window.atob(payload))
}