const request = require("supertest");
const express = require("express");
const app = express();

const mockAxios = {
    get: jest.fn()
};

const axios = jest.mock("axios", () => {
    return mockAxios;
})

const jobRoleRoutes = require('../routes/job-role-route');
const getJobRolesService = require("../services/job-role-service");
const {getJobRoles} = require("../services/job-role-service");

app.use(express.urlencoded({ extended: false }));
app.use("/viewjobroles", jobRoleRoutes);

describe("Test the job role route is calling the correct service function", () => {
  test("Route calls view-job-roles and getJobRoles", async () => {
    request(app)
      .get("/")
      .expect("view-job-roles")
      .expect(getJobRolesService.getJobRoles());
  });
})

app.use(express.urlencoded({ extended: false }));
app.use("/viewjobroles", jobRoleRoutes);

describe("Test the job role route is calling the correct service function", () => {
  test("Route calls view-job-roles and getJobRoles", async () => {
    request(app)
      .get("/")
      .expect("view-job-roles")
      .expect(getJobRoles());
  });
})

describe("Test the job roles service endpoint", () => {
    
    test("The results should return job role list", async () => {
        let expected = {
            data: [
                {
                  id: 1,
                  title: 'Head of test job',
                  description: '<b>What you will be expected to do </b> <br/> Day to day you will be expected to be a test entry in our tables.',
                  contractType: 'full_time',
                  locations: [{"name":"London"},{"name":"Birmingham"},{"name":"Gdansk"}],
                  capability: 'Engineering',
                  band: 'Associate'
                },
                {
                  id: 2,
                  title: 'Head of People Operations',
                  description: 'Some detailed description goes here',
                  contractType: 'full_time',
                  locations: [{"name":"Belfast"}],
                  capability: 'People',
                  band: 'Leadership'
                },
                {
                  id: 3,
                  title: 'Technical Architect',
                  description: 'Some detailed description goes here',
                  contractType: 'full_time',
                  locations: [{"name":"Toronto"}],
                  capability: 'Engineering',
                  band: 'Consultant'
                },
                {
                  id: 4,
                  title: 'Security Engineer',
                  description: 'Some detailed description goes here',
                  contractType: 'full_time',
                  locations: [{"name":"London"},{"name":"Belfast"}],
                  capability: 'Cyber_Security',
                  band: 'Senior_Associate'
                },
                {
                  id: 5,
                  title: 'Product Owner',
                  description: 'Some detailed description goes here',
                  contractType: 'full_time',
                  locations: [{"name":"London"}],
                  capability: 'Business_Development_and_Marketing',
                  band: 'Manager'
                },
                {
                  id: 6,
                  title: 'Senior Software Engineer (Java)',
                  description: 'Some detailed description goes here',
                  contractType: 'full_time',
                  locations: [{"name":"London"},{"name":"Belfast"},{"name":"Birmingham"},{"name":"Gdansk"}],
                  capability: 'Engineering',
                  band: 'Senior_Associate'
                },
                {
                  id: 7,
                  title: 'Test Engineer',
                  description: 'Some detailed description goes here',
                  contractType: 'full_time',
                  locations: [{"name":"London"}],
                  capability: 'Engineering',
                  band: 'Associate'
                }
              ]
        };
        mockAxios.get.mockImplementation(() => {
            return Promise.resolve(expected);
        });
        let results = await getJobRoles();
        expect(results).toBe(expected.data);
        expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:8080/job-roles');
    });

    test("The results should return an undefined list", async () => {
        mockAxios.get.mockImplementation(() => {
            return Promise.reject();
        });
        let results = await getJobRoles();
        expect(results).toBe(undefined);
        expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:8080/job-roles');
    })

})