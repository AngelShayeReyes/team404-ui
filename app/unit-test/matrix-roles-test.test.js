const request = require("supertest");
const express = require("express");
const app = express();

const mockAxios = {
    get: jest.fn()
};

const axios = jest.mock("axios", () => {
    return mockAxios;
})

const matrixOfRolesRoutes = require('../routes/matrix-roles-route');
const getMatrixRoles = require("../services/matrix-roles-service");

app.use(express.urlencoded({ extended: false }));
app.use("/viewmatrixofroles", matrixOfRolesRoutes);

describe("Test the route", () => {
  test("Route calls view and service", async () => {
    request(app)
      .get("/")
      .expect("view-matrix-roles")
      .expect(getMatrixRoles.getMatrix());
  });
})

describe("Test the matrix service endpoint", () => {
    test("The results should return the matrix", async () => {
        let expected = {
            data: [
                    {
                        'bandName':'Leadership Community',
                        'jobFamilies':[
                            {
                                'jobFamilyName':'Engineering Strategy and Planing', 
                                'jobTitles': [
                                    'Chief Technology Officer (CTO)',
                                    'Technology Lead'
                                ]
                            }
                        ]
                    },
                ]
        };
        mockAxios.get.mockImplementation(() => {
            return Promise.resolve(expected);
        });
        let results = await getMatrixRoles.getMatrix();
        expect(results).toBe(expected.data);
        expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:8080/job-matrix/engineering');
    });

    test("The results should return an undefined list", async () => {
        mockAxios.get.mockImplementation(() => {
            return Promise.reject();
        });
        let results = await getMatrixRoles.getMatrix();
        expect(results).toBe(undefined);
        expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:8080/job-matrix/engineering');
    })

})