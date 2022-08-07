# Social Media API with MongoDB
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  ## Description
  In this project, we create a social media backend via MongoDB and Expess.
  [Video of project in action](https://youtu.be/Exx2hcvm_LU)
  ## Table of Contents
  * [Installation](#Installation)
  * [Usage](#Usage)
  * [License](#License)
  * [Contributing](#Contributing)
  * [API routes](#Tests)
  * [Questions](#Questions)

  ## Installation <a name='Installation'></a>
  To install necessary dependencies, run the following command:
  ```
    npm i
  ```
  to run project, please use this command:
  ```
    npm start dev
  ```
  
  ## Usage <a name='Usage'></a>
  This project is a backbone API, which doesn't handle the Auth or Security for your app. Please read through the files before implementing this project to yours.
  
  ## License <a name='License'></a>
  The project is under [MIT](https://opensource.org/licenses/MIT) license.

  ## Contributing <a name='Contributing'></a>
  Contact me via info below if you want to contribute to this project.

  ## The API routes <a name='Tests'></a>
**`/api/users`**

* `GET` all users

* `GET` a single user by its `_id` and populated thought and friend data

* `POST` a new user:

```json
// example data
{
  "username": "lernantino",
  "email": "lernantino@gmail.com"
}
```

* `PUT` to update a user by its `_id`

* `DELETE` to remove user by its `_id`

---

**`/api/users/:userId/friends/:friendId`**

* `POST` to add a new friend to a user's friend list

* `DELETE` to remove a friend from a user's friend list

---

**`/api/thoughts`**

* `GET` to get all thoughts

* `GET` to get a single thought by its `_id`

* `POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)

```json
// example data
{
  "thoughtText": "Here's a cool thought...",
  "username": "lernantino",
  "userId": "5edff358a0fcb779aa7b118b"
}
```

* `PUT` to update a thought by its `_id`

* `DELETE` to remove a thought by its `_id`

---

**`/api/thoughts/:thoughtId/reactions`**

* `POST` to create a reaction stored in a single thought's `reactions` array field

* `DELETE` to pull and remove a reaction by the reaction's `reactionId` value


  ## Questions <a name='Questions'></a>
  If you have any questions about the repo, open an issue or contact me directly at caubenondo@gmail.com.
  You can find more of my work at [caubenondo](https://github.com/caubenondo)
