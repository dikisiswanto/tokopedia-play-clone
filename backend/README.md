# TOKOPEDIA PLAY CLONE

## Database Structure

I create 4 collections - **Channel**, **Comment**, **Product**, and **Video** - to cover most of the required features for this project
![Database Visualization](https://github.com/dikisiswanto/tokopedia-play-clone/assets/22239074/f794f1a6-048d-42d0-aeb2-fc4e8829904c)

### Channel Collection

| Field         | Type     | Description                                |
|---------------|----------|--------------------------------------------|
| name          | String   | Represents the name of the channel.       |
| username      | String   | Represents the unique username of the channel. |
| avatar        | String   | Represents the URL of the channel's avatar. |
| createdAt     | Date     | Stores the date and time when the channel was created. |
| updatedAt     | Date     | Stores the date and time when the channel was last updated. |

### Comment Collection

| Field         | Type     | Description                                |
|---------------|----------|--------------------------------------------|
| username      | String   | Represents the username of the commenter. |
| fullname      | String   | Represents the full name of the commenter. |
| avatar        | String   | Represents the URL of the commenter's avatar. |
| comment       | String   | Represents the actual comment made by the user. |
| videoId       | ObjectId | References the Video collection for the associated video. |
| createdAt     | Date     | Stores the date and time when the comment was created. |
| updatedAt     | Date     | Stores the date and time when the comment was last updated. |

### Product Collection

| Field         | Type     | Description                                |
|---------------|----------|--------------------------------------------|
| url           | String   | Represents the URL of the product.        |
| photos        | Array    | Contains URLs of the product's photos.    |
| title         | String   | Represents the title of the product.      |
| price         | Number   | Represents the price of the product.      |
| videoId       | ObjectId | References the Video collection for the associated video. |
| createdAt     | Date     | Stores the date and time when the product was created. |
| updatedAt     | Date     | Stores the date and time when the product was last updated. |

### Video Collection

| Field         | Type     | Description                                |
|---------------|----------|--------------------------------------------|
| title         | String   | Represents the title of the video.        |
| description   | String   | Represents the description of the video.  |
| url           | String   | Represents the URL of the video.          |
| views         | Number   | Represents the number of views for the video. |
| likes         | Array    | Contains IP addresses of users who liked the video. |
| thumbnail     | String   | Represents the URL of the video's thumbnail. |
| channelId     | ObjectId | References the Channel collection for the associated channel. |
| createdAt     | Date     | Stores the date and time when the video was created. |
| updatedAt     | Date     | Stores the date and time when the video was last updated. |

## Project Structure

In this project, I use the following design pattern. The structure provides a clear separation of concerns, making it easier to maintain and scale the application.

```
Project Root
|
|-- env.example
|
|-- src
|   |-- controllers
|   |   |-- channel.controller.js
|   |   |-- comment.controller.js
|   |   |-- product.controller.js
|   |   |-- video.controller.js
|   |
|   |-- models
|   |   |-- channel.model.js
|   |   |-- comment.model.js
|   |   |-- product.model.js
|   |   |-- video.model.js
|   |
|   |-- repositories
|   |   |-- channel.repository.js
|   |   |-- comment.repository.js
|   |   |-- product.repository.js
|   |   |-- video.repository.js
|   |
|   |-- routes
|   |   |-- channel.router.js
|   |   |-- comment.router.js
|   |   |-- product.router.js
|   |   |-- video.router.js
|   |
|   |-- services
|   |   |-- avatar.service.js
|   |   |-- channel.service.js
|   |   |-- comment.service.js
|   |   |-- product.service.js
|   |   |-- video.service.js
|   |   |-- websocket.service.js
|   |
|   |-- utilities
|   |   |-- validations
|   |   |   |-- channel.validation.js
|   |   |   |-- comment.validation.js
|   |   |   |-- product.validation.js
|   |   |   |-- video.validation.js
|   |   |-- responseHandler.js
|   |
|   |-- app.js
|   |-- config.js
|   |-- database.js
|
|-- .gitignore
|-- package.json
|-- yarn.lock
```


### Folders:

- `src`: Contains the main source code for the application.
  - `controllers`: Handles API requests and business logic for each entity (Channel, Comment, Product, Video).
  - `models`: Defines data schema for each collection in the database.
  - `repositories`: Handles database interactions (CRUD operations) for each entity.
  - `routes`: Defines API endpoints and links them to corresponding controller methods.
  - `services`: Contains core logic, including data validation and business rules, for each entity.
  - `utilities`: Includes utility files, such as validation functions and response handler.

### Main Files:

- `app.js`: The main entry point of the application, sets up the server and middleware.
- `config.js`: Contains configuration settings for the application.
- `database.js`: Establishes the connection to the MongoDB database.

### Other Files:

- `env.example`: Example file for environment variables.
- `.gitignore`: Excludes certain files and directories from version control.
- `package.json`: Lists project dependencies and metadata.
- `yarn.lock`: Dependency lock file generated by Yarn for deterministic package installation.