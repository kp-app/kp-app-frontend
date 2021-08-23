/* 
    timePeriod in seconds
*/
export const setExpiringItem = (key, value, timePeriod) => {
    localStorage.setItem(key, JSON.stringify({value, expiresIn: timePeriod + Math.floor(Date.now()/1000)}))
}

export const getIfNotExpired = (key) => {
    const myItem = localStorage.getItem(key)
    if (myItem && JSON.parse(myItem).expiresIn < Math.floor(Date.now() / 1000)) {
        return JSON.parse(myItem).value
    } else {
        return null
    }
}