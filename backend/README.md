# TOKOPEDIA PLAY CLONE

## Database Structure

I create 4 collections - **Channel**, **Comment**, **Product**, and **Video** - to cover most of the required features for this project

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
