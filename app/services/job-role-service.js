const axios = require('axios');

exports.getJobRoles = async () => {
    let results;
    await axios.get('http://localhost:8080/job-roles')
        .then(response => {
            results = response.data;
        })
        .catch(error => {
            console.log(error);
        });
    return results;
}

exports.deleteJobRole = async (jobId) => {
    let results;
    await axios.delete('http://localhost:8080/remove-role/' + jobId)
        .then(response => {
            results = response.data;
        })
        .catch(error => {
            console.log(error);
        });
    return results;
}