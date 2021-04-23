function handleResponse(response) {
    return response[Math.floor(((Math.random()*response.length)/2)+1)].word
}

async function findAltWord(inputWord) {

    const url = 'https://api.datamuse.com/words?';
    const potentialQuery = ['ml=','sl=','sp='];
    const query = potentialQuery[Math.floor(Math.random()*potentialQuery.length)];
    const endPoint = `${url}${query}${inputWord}`
    
    console.log(endPoint)


    try {
        const response = await fetch(endPoint,{cache: 'no-cache'});
        console.log(response);
        if (response.ok) {
            const jsonResponse = await response.json()
            console.log(jsonResponse)
            return handleResponse(jsonResponse)
        }
    } catch(error) {console.log(error)}
    
}

export {findAltWord, handleResponse}