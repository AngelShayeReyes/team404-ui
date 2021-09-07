const request = require("supertest");
const express = require("express");
const app = express();

const mockAxios = {
    get: jest.fn()
};

const axios = jest.mock("axios", () => {
    return mockAxios;
})

const jobFamiliesRoutes = require('../routes/job-families-route');
const getJobFamiliesService = require("../services/job-families-service");
const { getJobFamilies } = require("../services/job-families-service");

app.use(express.urlencoded({ extended: false }));
app.use("/viewjobfamilies", jobFamiliesRoutes);

describe("Test the job families route is calling the correct service function", () => {
    test("Route calls view-job-family-per-capability and getJobFamilies", async () => {
      request(app)
        .get("/")
        .expect("view-job-family-per-capability")
        .expect(getJobFamiliesService.getJobFamilies());
    });
  })

describe("Test the competency service endpoint", () => {
    test("The results should return jobFamilies list", async () => {
        let expected = {
            data: 
            [
                {
                  "jobFamilyName": "Engineering Strategy and Planning",
                  "competencies": []
                },
                {
                  "jobFamilyName": "...",
                  "competencies": [

                  ]
                },
            ]
        };
        mockAxios.get.mockImplementation(() => {
            return Promise.resolve(expected);
        });
        let results = await getJobFamilies();
        expect(results).toBe(expected.data);
        expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:8080/job-family/engineering');
    });

    test("The results should return an undefined list", async () => {
        mockAxios.get.mockImplementation(() => {
            return Promise.reject();
        });
        let results = await getJobFamilies();
        expect(results).toBe(undefined);
        expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:8080/job-family/engineering');
    })
})