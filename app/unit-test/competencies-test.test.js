const mockAxios = {
    get: jest.fn()
};

const axios = jest.mock("axios", () => {
    return mockAxios;
})

const { getCompetencies } = require("../services/competencies-service");

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
                                {'name' : 'Developing self-awareness', 'name' : '...', 'description' : "..."}, {'description' : "..."}
                            ]
                        }
                    ]
                }
             ]
        };
        mockAxios.get.mockImplementation(() => {
            return Promise.resolve(expected);
        });
        let results = await getCompetencies();
        expect(results).toBe(expected.data.bands);
        expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:8080/competencies');
    });

    test("The results should return an undefined list", async () => {
        mockAxios.get.mockImplementation(() => {
            return Promise.reject();
        });
        let results = await getCompetencies();
        expect(results).toBe(undefined);
        expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:8080/competencies');
    })

})