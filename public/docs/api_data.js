define({ "api": [
  {
    "type": "GET",
    "url": "/api/v1/course/:id",
    "title": "Get One",
    "version": "1.0.0",
    "name": "getOne",
    "group": "course",
    "permission": [
      {
        "name": "Every type of user"
      }
    ],
    "description": "<p>Get one course</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>ID of course, on params</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3000/api/v1/course/2",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>the ID of course</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>title of course</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"data\":{\n         \"id\": \"2\",\n         \"title\": \"ReactJs Course\",\n         ...\n     },\n     \"result\": \"ok\",\n     \"message\" \"\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "invalid",
            "description": "<p>input data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\": \"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/courses.route.js",
    "groupTitle": "course",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/course/:id"
      }
    ]
  }
] });
