async function getResponse() {
    const result =  await fetch('http://localhost:8090/app/execute/hello')
    const jsonRes = await result.json()
    alert(JSON.stringify(jsonRes))
}
getResponse()
