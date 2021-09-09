const request = require("supertest");
const express = require("express");
const app = express();

const mockAxios = {
    get: jest.fn(),
    delete: jest.fn(),
    post: jest.fn()
};

const axios = jest.mock("axios", () => {
    return mockAxios;
})

const jobRoleRoutes = require('../routes/job-role-route');
const addNewRoleService = require("../services/add-new-role-service");
const {addNewRole} = require("../services/add-new-role-service");
const {getAllBands} = require("../services/add-new-role-service");
const {getAllLocations} = require("../services/add-new-role-service");


const newRole = {
    title: "Test Engineer",
    description: "Description Here",
    contractType: "full_time",
    locations: ["London"],
    capability: "Engineering",
    responsibilities: "Responsibility here",
    band: "Associate",
    jobFamily: "Engineering",
    sharepointLink: "sharepoint.co.uk"
}

const locations = [{"name":"London"},{"name":"Birmingham"},{"name":"Gdansk"}]

const req = [];


app.use(express.urlencoded({ extended: false }));
app.use("/viewjobroles", jobRoleRoutes);

describe("Test the add job role get route", () => {
    test("Route calls add-new-role", async () => {
    request(app)
        .get("/")
        .expect("add-new-role");
    });
})

describe("Test the add job role post route is calling the correct service function", function() {
    test("Route calls add-new-role correctly", function(done) {
        request(app)
        .post('/addnewrole')
        .send(newRole)
        .set('Accept', 'application/json')
        .expect(404)
        .end(function(err, res) {
        if (err) return done(err);
            return done();
        });
    });
});

describe("Test the add job roles service endpoint - addNewRole", () => {
    test("The results should return status code 200", async () => {
        const expected = {
            statusCode: 200
        }
        mockAxios.post.mockImplementation(() => {
            return Promise.resolve(expected);
        });
        let results = await addNewRole(newRole);
        expect(results).toBe(expected.data);
        expect(mockAxios.post).toHaveBeenCalledWith('http://localhost:8080/create-role', newRole);
    });
  
    test("The results should be undefined", async () => {
        mockAxios.post.mockImplementation(() => {
            return Promise.reject();
        });
        let results = await addNewRole(newRole);
        expect(results).toBe(undefined);
        expect(mockAxios.post).toHaveBeenCalledWith('http://localhost:8080/create-role', newRole);
    });
  });

describe("Test the add job roles service endpoint - getAllBands", () => {
    
    test("The results should return bandrole list", async () => {
        let expected = {
            data: []
        };
        mockAxios.get.mockImplementation(() => {
            return Promise.resolve(expected);
        });
        let results = await getAllBands();
        expect(results).toBe(expected.data);
        expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:8080/bandnames');
    });

    test("The results should return an undefined list", async () => {
        mockAxios.get.mockImplementation(() => {
            return Promise.reject();
        });
        let results = await getAllBands();
        expect(results).toBe(undefined);
        expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:8080/bandnames');
    })

})

describe("Test the add job roles service endpoint - getAllLocations", () => {
    
    test("The results should return location list", async () => {
        let expected = {
            data: []
        };
        mockAxios.get.mockImplementation(() => {
            return Promise.resolve(expected);
        });
        let results = await getAllLocations();
        expect(results).toBe(expected.data);
        expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:8080/locations');
    });

    test("The results should return an undefined list", async () => {
        mockAxios.get.mockImplementation(() => {
            return Promise.reject();
        });
        let results = await getAllLocations();
        expect(results).toBe(undefined);
        expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:8080/locations');
    })

})