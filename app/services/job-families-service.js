
const axios = require('axios');

exports.getJobFamilies = async () => {
    let results;
    await axios.get('http://localhost:8080/job-family/engineering')
        .then(response => {
            results = response.data;
        })
        .catch(error => {
            console.log(error);
            //res.render('error-page', { error_code: error.response.data} )
        });
    return results;
}