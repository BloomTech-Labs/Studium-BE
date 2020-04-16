
## Contributors

[<img src="https://avatars3.githubusercontent.com/u/17443353?v=4" width = "100" />](https://github.com/jeremiahtenbrink)
[<img src="https://avatars1.githubusercontent.com/u/19153270?v=4" width = "100" />](https://github.com/ccurry20)
[<img src="https://avatars2.githubusercontent.com/u/20153709?v=4" width = "100" />](https://github.com/gmgower)
[<img src="https://avatars3.githubusercontent.com/u/47146701?v=4" width = "100" />](https://github.com/austinbro5)
[<img src="https://avatars0.githubusercontent.com/u/48000565?v=4" width = "100" />](https://github.com/Brimes7)
[<img src="https://avatars3.githubusercontent.com/u/49910197?v=4" width = "100" />](https://github.com/DKFerebee)
[<img src="https://avatars3.githubusercontent.com/u/49927848?v=4" width = "100" />](https://github.com/christopherc1331)


![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg)
![node](https://img.shields.io/node/v/11)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![Coverage Test](https://github.com/Lambda-School-Labs/pt-synaps-be/workflows/Coverage%20Test/badge.svg)
[![Code Climate maintainability](https://api.codeclimate.com/v1/badges/9ca9673d076f0a3275bb/maintainability)](https://img.shields.io/codeclimate/maintainability-percentage/Lambda-School-Labs/pt-synaps-be)
[![Test Coverage](https://api.codeclimate.com/v1/badges/9ca9673d076f0a3275bb/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/pt-synaps-be/test_coverage)

# API Documentation

####  Backend deployed at [Heroku](production: https://production-lambda-synaps-be.herokuapp.com/) <br>

## Getting started

To get the server running locally:

- Clone this repo
- **npm install** to install all required dependencies
- **npm run start** to start the local server
- **npm test** to start server using testing environment

### Backend framework goes here

Node:  Express, Postgres

- Node.js - We chose this to improve the efficiency and overall developer productivity. This is also excellent use for code sharing and reusability. Even greater benefits are the speed and the performance thanks to Node. With this we use the Express.js to allow us to build the app in the most efficient way.


## 2️⃣ Endpoints

Refer to the link below:

https://staging-lambda-synaps-be.herokuapp.com/#api-Cards-DeleteCard  
#### User Routes

Refer to the link below:

https://staging-lambda-synaps-be.herokuapp.com/#api-Cards-DeleteCard                                                    |

# Data Model

🚫This is just an example. Replace this with your data model

#### 2️⃣ ORGANIZATIONS

---
https://www.notion.so/Architecture-Details-4676c4c78e384f249de3622eb18b3eb5#60ad2a85e90548cba14df59f4eb55090

#### USERS

---

```
{
  id: UUID
  organization_id: UUID foreign key in ORGANIZATIONS table
  first_name: STRING
  last_name: STRING
  role: STRING [ 'owner', 'supervisor', 'employee' ]
  email: STRING
  phone: STRING
  cal_visit: BOOLEAN
  emp_visit: BOOLEAN
  emailpref: BOOLEAN
  phonepref: BOOLEAN
}
```

## 2️⃣ Actions

🚫 This is an example, replace this with the actions that pertain to your backend

`getOrgs()` -> Returns all organizations

`getOrg(orgId)` -> Returns a single organization by ID

`addOrg(org)` -> Returns the created org

`updateOrg(orgId)` -> Update an organization by ID

`deleteOrg(orgId)` -> Delete an organization by ID
<br>
<br>
<br>
`getUsers(orgId)` -> if no param all users

`getUser(userId)` -> Returns a single user by user ID

`addUser(user object)` --> Creates a new user and returns that user. Also creates 7 availabilities defaulted to hours of operation for their organization.

`updateUser(userId, changes object)` -> Updates a single user by ID.

`deleteUser(userId)` -> deletes everything dependent on the user

## 3️⃣ Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

🚫 These are just examples, replace them with the specifics for your app
  
 _ STAGING_DB - optional development db for using functionality not available in SQLite
_ NODE_ENV - set to "development" until ready for "production"
_ JWT_SECRET - you can generate this by using a python shell and running import random''.join([random.SystemRandom().choice('abcdefghijklmnopqrstuvwxyz0123456789!@#\$%^&amp;_(-_=+)') for i in range(50)])
_ SENDGRID_API_KEY - this is generated in your Sendgrid account \* stripe_secret - this is generated in the Stripe dashboard

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](🚫link to your frontend readme here) for details on the fronend of our project.
🚫 Add DS iOS and/or Andriod links here if applicable.
