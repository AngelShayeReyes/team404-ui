const axios = require('axios');

exports.getCompetencies = async () => {
    let results;
    await axios.get('http://localhost:8080/competencies')
        .then(response => {
            results = response.data.bands;
        })
        .catch(error => {
            console.log(error);
            //res.render('error-page', { error_code: error.response.data} )
        });
    return results;
}
