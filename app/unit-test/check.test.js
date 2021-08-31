const mockApp = {
    get: jest.fn()
}
jest.mock('express', () => jest.fn(() => mockApp))
require('../routes/job-role-route.js')
const { getJobRoles } = require("../services/job-role-service");

describe('route testing', () => {
    test("job-role-route", () => {
        expect(mockApp.get).toHaveBeenCalledWith('/view-job-roles', getJobRoles())
    });
});