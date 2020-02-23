define({ "api": [
  {
    "type": "post",
    "url": "/api/decks/user",
    "title": "Gets all the users decks.",
    "version": "1.0.0",
    "name": "GetUsersDecks",
    "group": "Decks",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uid",
            "description": "<p>Users google uid.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Request example:",
        "content": "const request = axios.create({\n    baseURL: 'https://staging-lambda-synaps-be.herokuapp.com/',\n        timeout: 1000,\n});\nrequest.post('/api/users/me', {\n  uid: \"123456080978\"\n});",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "User Data",
          "content": "\n {\n    \"user_id\": 1,\n    \"first_name\": \"Jeremiah\",\n    \"last_name\": \"Tenbrink\",\n    \"uid\": \"12345\",\n    \"username\": \"Jeremiah Tenbrink\",\n    \"created_at\": \"2020-02-18 14:10:08.566262-07\",\n    \"updated_at\": \"2020-02-18 14:10:08.566262-07\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/decks/decks-router.js",
    "groupTitle": "Decks",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/decks/user"
      }
    ],
    "error": {
      "fields": {
        "Error XXX": [
          {
            "group": "Error XXX",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>The status code response.</p>"
          },
          {
            "group": "Error XXX",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error Example:",
          "content": "ERROR XXX\n{\n    \"status\": xxx,\n    \"message\": \"Some Error Message\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/api/users/:id",
    "title": "Delete an existing user.",
    "version": "1.0.0",
    "name": "DeleteUser",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique id number</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Users username.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Request example:",
        "content": "const request = axios.create({\n    baseURL: 'http://localhost:5000/',\n      timeout: 1000,\n});\nrequest.delete('/api/users/:id');",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "User Data",
          "content": "\n{ message: \"The user has been removed\" }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users/users-router.js",
    "groupTitle": "Users",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/users/:id"
      }
    ],
    "error": {
      "fields": {
        "Error XXX": [
          {
            "group": "Error XXX",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>The status code response.</p>"
          },
          {
            "group": "Error XXX",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error Example:",
          "content": "ERROR XXX\n{\n    \"status\": xxx,\n    \"message\": \"Some Error Message\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/api/users/:id",
    "title": "Edits an existing user",
    "version": "1.0.0",
    "name": "EditExistingUser",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>Users unique id number</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uid",
            "description": "<p>Users google number</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Users display name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "created_at",
            "description": "<p>timestamp for first time created</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "updated_at",
            "description": "<p>timestamp for last time updated</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Request example:",
        "content": "\nconst request = axios.create({\nbaseURL: 'https://localhost:5000',\ntimeout: 1000\n});\n\nrequest.put('api/users/1', {\n\"username\": \"newUserName\"\n})",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "User Data",
          "content": "\n{\n \"user_id\": 1,\n \"username\": \"newUserName\",\n\"uid\": \"1859027\",\n\"created_at\": \"2020-02-18 14:10:08.566262-07\",\n\"updated_at\": \"2020-02-20 20:26:08.566262-07\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users/users-router.js",
    "groupTitle": "Users",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/users/:id"
      }
    ],
    "error": {
      "fields": {
        "Error XXX": [
          {
            "group": "Error XXX",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>The status code response.</p>"
          },
          {
            "group": "Error XXX",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error Example:",
          "content": "ERROR XXX\n{\n    \"status\": xxx,\n    \"message\": \"Some Error Message\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/users/all",
    "title": "Gets all users",
    "version": "1.0.0",
    "name": "GetAllUsers",
    "group": "Users",
    "examples": [
      {
        "title": "Request example:",
        "content": "const request = axios.create({\n    baseURL: 'http://localhost:5000/',\n        timeout: 1000,\n});\nrequest.get('/api/users');",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "User Data",
          "content": "\n[  {\n       \"user_id\": 1,\n       \"uid\": \"12345\",\n       \"username\": \"Jeremiah Tenbrink\",\n       \"created_at\": \"2020-02-18 14:10:08.566262-07\",\n       \"updated_at\": \"2020-02-18 14:10:08.566262-07\"\n   },\n{\n       \"user_id\": 5,\n       \"uid\": \"someothersui\",\n       \"username\": \"Jeremiah\",\n       \"created_at\": \"2020-02-18 14:12:47.906184-07\",\n       \"updated_at\": \"2020-02-18 14:12:47.906184-07\"\n   }, ...\n\n]",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users/users-router.js",
    "groupTitle": "Users",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/users/all"
      }
    ],
    "error": {
      "fields": {
        "Error XXX": [
          {
            "group": "Error XXX",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>The status code response.</p>"
          },
          {
            "group": "Error XXX",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error Example:",
          "content": "ERROR XXX\n{\n    \"status\": xxx,\n    \"message\": \"Some Error Message\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/users/me",
    "title": "Gets current user",
    "version": "1.0.0",
    "name": "GetUserByUID",
    "group": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Auth",
            "description": "<p>Users google uid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header Example:",
          "content": "\n{\n \"Auth\": \"321sdf516156s\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Request example:",
        "content": "const request = axios.create({\n    baseURL: 'http://localhost:5000/',\n        timeout: 1000,\n});\nrequest.get('/api/users/me');",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "User Data",
          "content": "\n {\n    \"user_id\": 1,\n    \"uid\": \"12345\",\n    \"username\": \"Jeremiah Tenbrink\",\n    \"created_at\": \"2020-02-18 14:10:08.566262-07\",\n    \"updated_at\": \"2020-02-18 14:10:08.566262-07\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users/users-router.js",
    "groupTitle": "Users",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/users/me"
      }
    ],
    "error": {
      "fields": {
        "Error XXX": [
          {
            "group": "Error XXX",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>The status code response.</p>"
          },
          {
            "group": "Error XXX",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error Example:",
          "content": "ERROR XXX\n{\n    \"status\": xxx,\n    \"message\": \"Some Error Message\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/register",
    "title": "Create a new user.",
    "version": "1.0.0",
    "name": "PostNewUsers",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uid",
            "description": "<p>Users google UID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Users username.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Request example:",
        "content": "const request = axios.create({\n    baseURL: 'http://localhost:5000/',\n        timeout: 1000,\n});\nrequest.post('/api/register', {\n   uid: \"1kdhio39578sil;\",\n   username: \"Jeremiah Tenbrink\"\n});",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "User Data",
          "content": "\n {\n    \"user_id\": 10,\n    \"uid\": \"someothersuisomethingfdafdadfadfsdadfda\",\n    \"username\": \"Jeremiah343223656654\",\n    \"created_at\": \"2020-02-18 14:15:20.463231-07\",\n    \"updated_at\": \"2020-02-18 14:15:20.463231-07\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/auth/registerRouter.js",
    "groupTitle": "Users",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/register"
      }
    ],
    "error": {
      "fields": {
        "Error XXX": [
          {
            "group": "Error XXX",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>The status code response.</p>"
          },
          {
            "group": "Error XXX",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error Example:",
          "content": "ERROR XXX\n{\n    \"status\": xxx,\n    \"message\": \"Some Error Message\"\n}",
          "type": "json"
        }
      ]
    }
  }
] });
