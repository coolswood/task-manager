export default (url, data) => {
    return fetch(url,{
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        mode: "cors",
        body: JSON.stringify(data)
    }).then((res) => (res.json()))}