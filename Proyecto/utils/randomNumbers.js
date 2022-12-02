const compute = () => {
    let generatedNums = []
    for (let i = 0; i < 10000000; i++) {
        let ranNum = Math.floor(Math.random() * 10000000) + 1
        generatedNums.push(ranNum)
    }
    return generatedNums
}

process.on('message', messageComputeSend => {
    console.log(messageComputeSend)
    process.send(`Sus numeros son : \n ${compute()}`)
})