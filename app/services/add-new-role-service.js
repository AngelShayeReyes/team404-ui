const axios = require('axios');

exports.addNewRole = async (newRole) => { 
    let status;
    await axios.post('http://localhost:8080/create-role', newRole)
        .then(res => {
            status = res.status;
            console.log(`statusCode: ${res.status}`)
            console.log(res)
        })
        .catch(error => {
            status = error;
            console.error(error)
        })
    return status;
}

exports.getAllBands = async () => {
    let results;
    await axios.get('http://localhost:8080/bandnames')
        .then(response => {
            results = response.data;
        })
        .catch(error => {
            console.log(error);
        });
    return results;
}