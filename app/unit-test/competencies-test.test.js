const request = require("supertest");
const express = require("express");
const app = express();

const mockAxios = {
    get: jest.fn()
};

const axios = jest.mock("axios", () => {
    return mockAxios;
})

const competenciesRoutes = require('../routes/competencies-route');
const getCompetenciesService = require("../services/competencies-service");
const { getCompetencies } = require("../services/competencies-service");

app.use(express.urlencoded({ extended: false }));
app.use("/viewcompetencies", competenciesRoutes);

describe("Test the competency route is calling the correct service function", () => {
  test("Route calls view-competencies-per-band and getCompetencies", async () => {
    request(app)
      .get("/")
      .expect("view-competencies-per-band")
      .expect(getCompetenciesService.getCompetencies());
  });
})

describe("Test the competency service endpoint", () => {
    
    test("The results should return competency list", async () => {
        let expected = {
            data: 
            [
                {
                    'band' : 'Apprentice',
                    'competencies' : [
                        {
                            'name' : 'Personal_Performance',
                            'indicators' :
                            [
                                {'name' : 'Developing self-awareness', 'description' : "..."}, 
                                {'name' : '...', 'description' : "..."}
                            ]
                        }
                    ]
                },
                {
                    'band' : '...',
                    'competencies' : [
                        
                    ]
                },
             ]
        };
        mockAxios.get.mockImplementation(() => {
            return Promise.resolve(expected);
        });
        let results = await getCompetencies();
        expect(results).toBe(expected.data);
        expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:8080/bands-competencies');
    });

    test("The results should return an undefined list", async () => {
        mockAxios.get.mockImplementation(() => {
            return Promise.reject();
        });
        let results = await getCompetencies();
        expect(results).toBe(undefined);
        expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:8080/bands-competencies');
    })

})