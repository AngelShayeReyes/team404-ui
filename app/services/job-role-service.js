const axios = require('axios');

exports.getJobRoles = async () => {
    let results;
    await axios.get('http://localhost:8080/job-roles')
        .then(response => {
            results = response.data;
        })
        .catch(error => {
            console.log(error);
            //res.render('error-page', { error_code: error.response.data} )
        });
    return results;
}

exports.deleteJobRole = async (jobRoleID) => {
    let results;
    await axios.delete('http://localhost:8080/remove-role/:id'+encodeURIComponent(jobRoleID))
        .then(response => {
            results = response.data;
        })
        .catch(error => {
            console.log(error);
            //res.render('error-page', { error_code: error.response.data} )
        });
    return results;
}