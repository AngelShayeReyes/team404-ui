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
            //console.error(error)
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

exports.getAllLocations = async () => {
    let results;
    await axios.get('http://localhost:8080/locations')
        .then(response => {
            results = response.data;
        })
        .catch(error => {
            console.log(error);
        });
    return results;
}

exports.packNewRole = (req, selectedLocations) => {
    if (typeof(req) == "undefined" || typeof(req.body) == "undefined" || typeof(selectedLocations) == "undefined" ) {
        return;
    }

    return {
        title: req.body.title,
        description: req.body.description,
        contractType: req.body.contractType,
        locations: selectedLocations,
        capability: req.body.capability,
        responsibilities: req.body.responsibilities,
        band: req.body.band,
        jobFamily: req.body.jobFamily,
        sharepointLink: req.body.sharepointLink
    }
}

exports.validateInput = (newRole) => {
    if (!(newRole.title && newRole.description && newRole.contractType && newRole.locations.length > 0 
        && newRole.capability && newRole.responsibilities && newRole.band && newRole.jobFamily && newRole.sharePointLink)) {

            return [false, "Empty fields!"]
    } else if (newRole.title.length > 200) {
        return [false, "Title too long! Max 200 characters!"]
    } else if (newRole.responsibilities.length > 200) {
        return [false, "Responsibilities too long! Max 400 characters!"]
    } else if (newRole.sharepointLink.length > 200) {
        return [false, "Sharepoint Link too long! Max 200 characters!"]
    } else {
        return [true, "No error!"]
    }
}