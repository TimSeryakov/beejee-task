function saveState<T>(key: string, state: T) {
    const stateAsString = JSON.stringify(state)
    localStorage.setItem(key, stateAsString)
}

function restoreState<T>(key: string, defaultState: T) {
    const stateAsString = localStorage.getItem(key)
    if (stateAsString !== null) defaultState = JSON.parse(stateAsString) as T
    return defaultState
}

export function saveTokenToLocalStorage(token: string) {
    saveState<string>("token", token)
}

export function loadTokenFromLocalStorage() {
    return restoreState<string>("token", "")
}