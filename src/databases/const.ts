export const ADMIN_ROLE = "SUPER_ADMIN"

export const USER_ROLE = "NORMAL_USER"

export const INIT_PERMISSION = [
    {
        "_id": "67d1c87e8fa81a2ebe6ab592",
        "name": "Get user by id",
        "apiPath": "/api/v1/users/:id",
        "method": "GET",
        "module": "USERS",
        "isDeleted": false,
        "createdBy": {
            "_id": "67d44e7c5b6437feb44d92d8",
            "name": "ADMIN"
        },
        "deletedAt": null,
        "createdAt": "2025-03-12T17:46:38.968Z",
        "updatedAt": "2025-03-12T17:50:03.623Z",
        "__v": 0,
        "updatedBy": {
            "_id": "67d44e7c5b6437feb44d92d8",
            "name": "ADMIN"
        }
    },
    {
        "_id": "67d1cbd18fa81a2ebe6ab5a0",
        "name": "create new user ",
        "apiPath": "/api/v1/users",
        "method": "POST",
        "module": "USERS",
        "isDeleted": false,
        "createdBy": {
            "_id": "67d44e7c5b6437feb44d92d8",
            "name": "ADMIN"
        },
        "deletedAt": null,
        "createdAt": "2025-03-12T18:00:49.876Z",
        "updatedAt": "2025-03-12T18:00:49.876Z",
        "__v": 0
    },
    {
        "_id": "67d385666799d07534b2fc58",
        "name": "Update user by id",
        "apiPath": "/api/v1/users/:id",
        "method": "PATCH",
        "module": "USERS",
        "isDeleted": false,
        "createdBy": {
            "_id": "67d44e7c5b6437feb44d92d8",
            "name": "ADMIN"
        },
        "deletedAt": null,
        "createdAt": "2025-03-14T01:24:54.329Z",
        "updatedAt": "2025-03-14T01:24:54.329Z",
        "__v": 0
    },
    {
        "_id": "67d3c3391fa06f6da1124f41",
        "name": "Delete users by id",
        "apiPath": "/api/v1/users/:id",
        "method": "DELETE",
        "module": "USERS",
        "isDeleted": false,
        "createdBy": {
            "_id": "67d44e7c5b6437feb44d92d8",
            "name": "ADMIN"
        },
        "deletedAt": null,
        "createdAt": "2025-03-14T05:48:41.121Z",
        "updatedAt": "2025-03-14T05:48:41.121Z",
        "__v": 0
    },
    {
        "_id": "67d3c4f81fa06f6da1124f55",
        "name": "Get users with pagination",
        "apiPath": "/api/v1/users",
        "method": "GET",
        "module": "USERS",
        "isDeleted": false,
        "createdBy": {
            "_id": "67d44e7c5b6437feb44d92d8",
            "name": "ADMIN"
        },
        "deletedAt": null,
        "createdAt": "2025-03-14T05:56:08.081Z",
        "updatedAt": "2025-03-14T05:56:08.081Z",
        "__v": 0
    },
    {
        "_id": "67d3c3cc1fa06f6da1124f46",
        "name": "Get companies by id",
        "apiPath": "/api/v1/companies/:id",
        "method": "GET",
        "module": "COMPANIES",
        "isDeleted": false,
        "createdBy": {
            "_id": "67d44e7c5b6437feb44d92d8",
            "name": "ADMIN"
        },
        "deletedAt": null,
        "createdAt": "2025-03-14T05:51:08.529Z",
        "updatedAt": "2025-03-14T05:51:08.529Z",
        "__v": 0
    },
    {
        "_id": "67d3c3ea1fa06f6da1124f49",
        "name": "Create a new companies",
        "apiPath": "/api/v1/companies",
        "method": "POST",
        "module": "COMPANIES",
        "isDeleted": false,
        "createdBy": {
            "_id": "67d44e7c5b6437feb44d92d8",
            "name": "ADMIN"
        },
        "deletedAt": null,
        "createdAt": "2025-03-14T05:51:38.665Z",
        "updatedAt": "2025-03-14T05:51:38.665Z",
        "__v": 0
    },
    {
        "_id": "67d3c40f1fa06f6da1124f4c",
        "name": "Update companies by id",
        "apiPath": "/api/v1/companies/:id",
        "method": "PATCH",
        "module": "COMPANIES",
        "isDeleted": false,
        "createdBy": {
            "_id": "67d44e7c5b6437feb44d92d8",
            "name": "ADMIN"
        },
        "deletedAt": null,
        "createdAt": "2025-03-14T05:52:15.306Z",
        "updatedAt": "2025-03-14T05:52:15.306Z",
        "__v": 0
    },
    {
        "_id": "67d3c42f1fa06f6da1124f4f",
        "name": "Delete companies by id",
        "apiPath": "/api/v1/companies/:id",
        "method": "DELETE",
        "module": "COMPANIES",
        "isDeleted": false,
        "createdBy": {
            "_id": "67d44e7c5b6437feb44d92d8",
            "name": "ADMIN"
        },
        "deletedAt": null,
        "createdAt": "2025-03-14T05:52:47.255Z",
        "updatedAt": "2025-03-14T05:52:47.255Z",
        "__v": 0
    },
    {
        "_id": "67d3c4b71fa06f6da1124f52",
        "name": "Get companies with pagination",
        "apiPath": "/api/v1/companies",
        "method": "GET",
        "module": "COMPANIES",
        "isDeleted": false,
        "createdBy": {
            "_id": "67d44e7c5b6437feb44d92d8",
            "name": "ADMIN"
        },
        "deletedAt": null,
        "createdAt": "2025-03-14T05:55:03.276Z",
        "updatedAt": "2025-03-14T05:55:03.276Z",
        "__v": 0
    },
    {
        "_id": "67d3c6001fa06f6da1124f60",
        "name": "Get resumes by id",
        "apiPath": "/api/v1/resumes/:id",
        "method": "GET",
        "module": "RESUMES",
        "isDeleted": false,
        "createdBy": {
            "_id": "67d44e7c5b6437feb44d92d8",
            "name": "ADMIN"
        },
        "deletedAt": null,
        "createdAt": "2025-03-14T06:00:00.000Z",
        "updatedAt": "2025-03-14T06:00:00.000Z",
        "__v": 0
    },
    {
        "_id": "67d3c6101fa06f6da1124f61",
        "name": "Create a new resume",
        "apiPath": "/api/v1/resumes",
        "method": "POST",
        "module": "RESUMES",
        "isDeleted": false,
        "createdBy": {
            "_id": "67d44e7c5b6437feb44d92d8",
            "name": "ADMIN"
        },
        "deletedAt": null,
        "createdAt": "2025-03-14T06:00:30.000Z",
        "updatedAt": "2025-03-14T06:00:30.000Z",
        "__v": 0
    },
    {
        "_id": "67d3c6201fa06f6da1124f62",
        "name": "Update resume by id",
        "apiPath": "/api/v1/resumes/:id",
        "method": "PATCH",
        "module": "RESUMES",
        "isDeleted": false,
        "createdBy": {
            "_id": "67d44e7c5b6437feb44d92d8",
            "name": "ADMIN"
        },
        "deletedAt": null,
        "createdAt": "2025-03-14T06:01:00.000Z",
        "updatedAt": "2025-03-14T06:01:00.000Z",
        "__v": 0
    },
    {
        "_id": "67d3c6301fa06f6da1124f63",
        "name": "Delete resume by id",
        "apiPath": "/api/v1/resumes/:id",
        "method": "DELETE",
        "module": "RESUMES",
        "isDeleted": false,
        "createdBy": {
            "_id": "67d44e7c5b6437feb44d92d8",
            "name": "ADMIN"
        },
        "deletedAt": null,
        "createdAt": "2025-03-14T06:01:30.000Z",
        "updatedAt": "2025-03-14T06:01:30.000Z",
        "__v": 0
    },
    {
        "_id": "67d3c6401fa06f6da1124f64",
        "name": "Get resumes with pagination",
        "apiPath": "/api/v1/resumes",
        "method": "GET",
        "module": "RESUMES",
        "isDeleted": false,
        "createdBy": {
            "_id": "67d44e7c5b6437feb44d92d8",
            "name": "ADMIN"
        },
        "deletedAt": null,
        "createdAt": "2025-03-14T06:02:00.000Z",
        "updatedAt": "2025-03-14T06:02:00.000Z",
        "__v": 0
    },
    {
        "_id": "67d3f1627c1a999bf5e2a6ad",
        "name": "Fetch resume by id",
        "apiPath": "/api/v1/resumes/by-user",
        "method": "POST",
        "module": "RESUMES",
        "isDeleted": false,
        "createdBy": {
            "_id": "67d44e7c5b6437feb44d92d8",
            "name": "ADMIN"
        },
        "deletedAt": null,
        "createdAt": "2025-03-14T06:02:00.000Z",
        "updatedAt": "2025-03-14T06:02:00.000Z",
        "__v": 0
    },
    {
        _id: "67d4a1002fa06f6da1124f70",
        name: "Get permissions by id",
        apiPath: "/api/v1/permissions/:id",
        method: "GET",
        module: "PERMISSIONS",
        isDeleted: false,
        createdBy: {
            _id: "67d44e7c5b6437feb44d92d8",
            name: "ADMIN",
        },
        deletedAt: null,
        createdAt: new Date("2025-03-14T06:00:00.000Z"),
        updatedAt: new Date("2025-03-14T06:00:00.000Z"),
    },
    {
        _id: "67d4a1102fa06f6da1124f71",
        name: "Create a new permissions",
        apiPath: "/api/v1/permissions",
        method: "POST",
        module: "PERMISSIONS",
        isDeleted: false,
        createdBy: {
            _id: "67d44e7c5b6437feb44d92d8",
            name: "ADMIN",
        },
        deletedAt: null,
        createdAt: new Date("2025-03-14T06:00:30.000Z"),
        updatedAt: new Date("2025-03-14T06:00:30.000Z"),
    },
    {
        _id: "67d4a1202fa06f6da1124f72",
        name: "Update permissions by id",
        apiPath: "/api/v1/permissions/:id",
        method: "PATCH",
        module: "PERMISSIONS",
        isDeleted: false,
        createdBy: {
            _id: "67d44e7c5b6437feb44d92d8",
            name: "ADMIN",
        },
        deletedAt: null,
        createdAt: new Date("2025-03-14T06:01:00.000Z"),
        updatedAt: new Date("2025-03-14T06:01:00.000Z"),
    },
    {
        _id: "67d4a1302fa06f6da1124f73",
        name: "Delete permissions by id",
        apiPath: "/api/v1/permissions/:id",
        method: "DELETE",
        module: "PERMISSIONS",
        isDeleted: false,
        createdBy: {
            _id: "67d44e7c5b6437feb44d92d8",
            name: "ADMIN",
        },
        deletedAt: null,
        createdAt: new Date("2025-03-14T06:01:30.000Z"),
        updatedAt: new Date("2025-03-14T06:01:30.000Z"),
    },
    {
        _id: "67d4a1402fa06f6da1124f74",
        name: "Get permissions with pagination",
        apiPath: "/api/v1/permissions",
        method: "GET",
        module: "PERMISSIONS",
        isDeleted: false,
        createdBy: {
            _id: "67d44e7c5b6437feb44d92d8",
            name: "ADMIN",
        },
        deletedAt: null,
        createdAt: new Date("2025-03-14T06:02:00.000Z"),
        updatedAt: new Date("2025-03-14T06:02:00.000Z"),
    },
    {
        "_id": "67d3f4259c4b92cc32fd4a8b",
        "name": "upload files",
        "apiPath": "/api/v1/files/upload",
        "method": "POST",
        "module": "FILES",
        "isDeleted": false,
        "createdBy": {
            "_id": "67d44e7c5b6437feb44d92d8",
            "name": "ADMIN"
        },
        "deletedAt": null,
        "createdAt": "2025-03-14T09:17:25.986Z",
        "updatedAt": "2025-03-14T09:17:25.986Z",
        "__v": 0
    },
    {
        _id: "67d4b1002fa06f6da1124f80",
        name: "Get roles by id",
        apiPath: "/api/v1/roles/:id",
        method: "GET",
        module: "ROLES",
        isDeleted: false,
        createdBy: {
            _id: "67d44e7c5b6437feb44d92d8",
            name: "ADMIN",
        },
        deletedAt: null,
        createdAt: new Date("2025-03-14T06:00:00.000Z"),
        updatedAt: new Date("2025-03-14T06:00:00.000Z"),
    },
    {
        _id: "67d4b1102fa06f6da1124f81",
        name: "Create a new role",
        apiPath: "/api/v1/roles",
        method: "POST",
        module: "ROLES",
        isDeleted: false,
        createdBy: {
            _id: "67d44e7c5b6437feb44d92d8",
            name: "ADMIN",
        },
        deletedAt: null,
        createdAt: new Date("2025-03-14T06:00:30.000Z"),
        updatedAt: new Date("2025-03-14T06:00:30.000Z"),
    },
    {
        _id: "67d4b1202fa06f6da1124f82",
        name: "Update role by id",
        apiPath: "/api/v1/roles/:id",
        method: "PATCH",
        module: "ROLES",
        isDeleted: false,
        createdBy: {
            _id: "67d44e7c5b6437feb44d92d8",
            name: "ADMIN",
        },
        deletedAt: null,
        createdAt: new Date("2025-03-14T06:01:00.000Z"),
        updatedAt: new Date("2025-03-14T06:01:00.000Z"),
    },
    {
        _id: "67d4b1302fa06f6da1124f83",
        name: "Delete role by id",
        apiPath: "/api/v1/roles/:id",
        method: "DELETE",
        module: "ROLES",
        isDeleted: false,
        createdBy: {
            _id: "67d44e7c5b6437feb44d92d8",
            name: "ADMIN",
        },
        deletedAt: null,
        createdAt: new Date("2025-03-14T06:01:30.000Z"),
        updatedAt: new Date("2025-03-14T06:01:30.000Z"),
    },
    {
        _id: "67d4b1402fa06f6da1124f84",
        name: "Get roles with pagination",
        apiPath: "/api/v1/roles",
        method: "GET",
        module: "ROLES",
        isDeleted: false,
        createdBy: {
            _id: "67d44e7c5b6437feb44d92d8",
            name: "ADMIN",
        },
        deletedAt: null,
        createdAt: new Date("2025-03-14T06:02:00.000Z"),
        updatedAt: new Date("2025-03-14T06:02:00.000Z"),
    },
    {
        _id: "67d4c1002fa06f6da1124f90",
        name: "Get jobs by id",
        apiPath: "/api/v1/jobs/:id",
        method: "GET",
        module: "JOBS",
        isDeleted: false,
        createdBy: {
            _id: "67d44e7c5b6437feb44d92d8",
            name: "ADMIN",
        },
        deletedAt: null,
        createdAt: new Date("2025-03-14T06:00:00.000Z"),
        updatedAt: new Date("2025-03-14T06:00:00.000Z"),
    },
    {
        _id: "67d4c1102fa06f6da1124f91",
        name: "Create a new job",
        apiPath: "/api/v1/jobs",
        method: "POST",
        module: "JOBS",
        isDeleted: false,
        createdBy: {
            _id: "67d44e7c5b6437feb44d92d8",
            name: "ADMIN",
        },
        deletedAt: null,
        createdAt: new Date("2025-03-14T06:00:30.000Z"),
        updatedAt: new Date("2025-03-14T06:00:30.000Z"),
    },
    {
        _id: "67d4c1202fa06f6da1124f92",
        name: "Update job by id",
        apiPath: "/api/v1/jobs/:id",
        method: "PATCH",
        module: "JOBS",
        isDeleted: false,
        createdBy: {
            _id: "67d44e7c5b6437feb44d92d8",
            name: "ADMIN",
        },
        deletedAt: null,
        createdAt: new Date("2025-03-14T06:01:00.000Z"),
        updatedAt: new Date("2025-03-14T06:01:00.000Z"),
    },
    {
        _id: "67d4c1302fa06f6da1124f93",
        name: "Delete job by id",
        apiPath: "/api/v1/jobs/:id",
        method: "DELETE",
        module: "JOBS",
        isDeleted: false,
        createdBy: {
            _id: "67d44e7c5b6437feb44d92d8",
            name: "ADMIN",
        },
        deletedAt: null,
        createdAt: new Date("2025-03-14T06:01:30.000Z"),
        updatedAt: new Date("2025-03-14T06:01:30.000Z"),
    },
    {
        _id: "67d4c1402fa06f6da1124f94",
        name: "Get jobs with pagination",
        apiPath: "/api/v1/jobs",
        method: "GET",
        module: "JOBS",
        isDeleted: false,
        createdBy: {
            _id: "67d44e7c5b6437feb44d92d8",
            name: "ADMIN",
        },
        deletedAt: null,
        createdAt: new Date("2025-03-14T06:02:00.000Z"),
        updatedAt: new Date("2025-03-14T06:02:00.000Z"),
    },
];


