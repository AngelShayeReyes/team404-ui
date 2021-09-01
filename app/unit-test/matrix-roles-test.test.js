const request = require("supertest");
const express = require("express");
const app = express();

const mockAxios = {
    get: jest.fn()
};

const axios = jest.mock("axios", () => {
    return mockAxios;
})

const { getMatrixRoles } = require("../services/matrix-roles-service");

const matrixOfRolesRoutes = require('../routes/matrix-roles-route');
const getJobRolesService = require("../services/matrix-roles-service");
const { getMatrixRoles } = require("../services/matrix-roles-service");

app.use(express.urlencoded({ extended: false }));
app.use("/viewmatrixofroles", matrixOfRolesRoutes);

describe("Test the route", () => {
  test("Route calls view and service", async () => {
    request(app)
      .get("/")
      .expect("view-matrix-roles")
      .expect(getJobRolesService.getMatrixRoles());
  });
})

describe("Test the job roles service endpoint", () => {
    test("The results should return job role list", async () => {
        let expected = {
            data: [
                    { 
                        'job_family': 'Engineering Strategy and Planning',
                        'management_levels': [
                            {'level': 'Leadership Community', 'jobs':  [{'title':'Chief Technology Officer (CTO)', 'title':'Technology Lead'}]},
                            {'level': 'Principal', 'jobs':  [{}]},     
                            {'level': 'Manager', 'jobs':  [{}]},     
                            {'level': 'Consultant', 'jobs':  [{}]},     
                            {'level': 'Senior Associate', 'jobs':  [{}]},     
                            {'level': 'Associate', 'jobs':  [{}]},     
                            {'level': 'Trainee', 'jobs':  [{}]},     
                            {'level': 'Apprentice', 'jobs':  [{}]}     
                        ]
                    },
                    {
                        'job_family': 'Engineering',
                        'management_levels': [
                            {'level': 'Leadership Community', 'jobs':  [{}]},
                            {'level': 'Principal', 'jobs':  [{}]},     
                            {'level': 'Manager', 'jobs':  [{}]},     
                            {'level': 'Consultant', 'jobs':  [{'title':'Lead Software Engineer'}]},
                            {'level': 'Senior Associate', 'jobs':  [{'title':'Senior Software Engineer', 'title':'Senior Front-End Engineer'}]},
                            {'level': 'Associate', 'jobs':  [{'title':'Software Engineer', 'title':'Front-End Engineer'}]},
                            {'level': 'Trainee', 'jobs':  [{'title':'Software Engineer'}]},
                            {'level': 'Apprentice', 'jobs':  [{'title':'Software Engineer'}]},
                        ]
                    }
                ]
        };
        mockAxios.get.mockImplementation(() => {
            return Promise.resolve(expected);
        });
        let results = await getMatrixRoles();
        expect(results).toBe(expected.data);
        expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:8080/'); //Needs to be modified
    });

    test("The results should return an undefined list", async () => {
        mockAxios.get.mockImplementation(() => {
            return Promise.reject();
        });
        let results = await getMatrixRoles();
        expect(results).toBe(undefined);
        expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:8080/'); //Needs to be modified
    })

})