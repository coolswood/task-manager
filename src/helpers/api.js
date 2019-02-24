export default (url, data) => {
    return fetch(url,{
        method: "POST",
        headers: new Headers ({
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        }),
        mode: 'no-cors',
        body: JSON.stringify({
            data
        })
    }).then((res) => (res.json()))
}