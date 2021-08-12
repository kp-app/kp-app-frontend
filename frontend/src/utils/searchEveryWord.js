export const searchEveryWord = (itemString, query) => {
    const queryWords = query.split(" ")
    
    return queryWords.every(word => itemString.includes(word))
}