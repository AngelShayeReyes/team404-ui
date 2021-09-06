const axios = require('axios');

exports.getBands = async () => {
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

exports.getJobFamilies = async () => {
    let results;
    await axios.get('http://localhost:8080/job-family')
        .then(response => {
            results = response.data;
        })
        .catch(error => {
            console.log(error);
        });
    return results;
}