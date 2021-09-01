const axios = require('axios');

exports.getMatrixRoles = async () => {
    let results;
    await axios.get('http://localhost:8080/API_ENDPOINT')
        .then(response => {
            results = response.data;
        })
        .catch(error => {
            console.log(error);
        });
    return results;
}