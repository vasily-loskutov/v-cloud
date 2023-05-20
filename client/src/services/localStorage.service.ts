





function saveState(key: string, state: any) {
    localStorage.setItem(key, JSON.stringify(state))
}


function getElemByKey(key: string) {
    console.log(localStorage.getItem(key))
    return JSON.parse(localStorage.getItem(key) || 'false')
}
function removeElement(key: string) {
    return localStorage.removeItem(key)
}
export const localStorageService = {
    saveState,
    getElemByKey,
    removeElement
}
