const mockAxios = {
    get: jest.fn()
};

const axios = jest.mock("axios", () => {
    return mockAxios;
})

const { getJobSpec } = require("../services/job-specification-serivce");

describe("Test the job specification service endpoint", () => {
    
    test("The results should return job spec with id 2", async () => {
        let expected = {
            data: {
                "id": 3,
                "title": "Technical Architect",
                "description":"Some detailed description goes here",
                "contractType":"full_time",
                "locations":[{"name":"Toronto"}],
                "capability":"Engineering",
                "band":"Consultant"
            }
        };

        mockAxios.get.mockImplementation(() => {
            return Promise.resolve(expected);
        });
        let results = await getJobSpec(3);
        expect(results).toBe(expected.data);
        expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:8080/job-roles/3');
    });

    test("The results should return an undefined list", async () => {
        mockAxios.get.mockImplementation(() => {
            return Promise.reject();
        });
        let results = await getJobSpec();
        expect(results).toBe(undefined);
        expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:8080/job-roles/3');
    })

})