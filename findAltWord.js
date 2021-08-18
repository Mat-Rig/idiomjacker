function handleResponse(response) {
    return response[Math.floor(((Math.random()*response.length)/2)+1)].word
}

async function findAltWord(inputWord) {

    const url = 'https://api.datamuse.com/words?';
    const potentialQuery = ['ml=','sl='];
    const query = potentialQuery[Math.floor(Math.random()*potentialQuery.length)];
    const endPoint = `${url}${query}${inputWord}`
    


    try {
        const response = await fetch(endPoint,{cache: 'no-cache'});
        if (response.ok) {
            const jsonResponse = await response.json()
            return handleResponse(jsonResponse)
        }
    } catch(error) {console.log(error)}
    
}

export {findAltWord, handleResponse}