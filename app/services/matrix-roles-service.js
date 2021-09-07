const axios = require('axios');

exports.getMatrix = async () => {
    let results;
    await axios.get('http://localhost:8080/job-matrix/engineering')
        .then(response => {
            results = response.data;
        })
        .catch(error => {
            console.log(error);
        });
    return results;
}