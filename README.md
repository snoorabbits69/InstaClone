# Instaclone

Instaclone is a full-stack MERN (MongoDB, Express.js, React, Node.js) social media application inspired by Instagram. It offers real-time messaging, post interactions, user following, and dynamic account privacy settings. The app also integrates video calling between users and supports Redis caching for optimal performance. Additionally, it features Google authentication, Firebase for image storage, and stories that automatically disappear after 1 hour.

## Features

- **User Authentication**: 
  - Sign up, log in, Google authentication, and manage account settings (private or public accounts).
- **Password Reset**: 
  - Secure password reset functionality.
- **Posts**: 
  - Create, like, dislike, and delete posts.
- **Stories**: 
  - Add and view stories that disappear after 1 hour.
- **Messaging**: 
  - Real-time chat between users with Redis caching for speed.
- **Follow/Unfollow**: 
  - Follow and unfollow users to control your feed.
- **Video Calls**: 
  - Peer-to-peer video calls between users.
- **Image Storage**: 
  - Firebase integration for storing images securely.
- **Redis Caching**: 
  - Messages and posts are cached for faster data retrieval.

## Tech Stack

- **Frontend**: 
  - React (with hooks and Redux for state management)
- **Backend**: 
  - Node.js with Express.js
- **Database**: 
  - MongoDB
- **Real-time Communication**: 
  - Socket.io for messaging and WebRTC for video calls
- **Caching**: 
  - Redis for fast storage and retrieval of messages and posts
- **Image Storage**: 
  - Firebase
- **Authentication**: 
  - JWT and Google OAuth
- **Containerization**: 
  - Docker and Docker Compose

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Log in
- `POST /api/auth/logout`: Log out
- `POST /api/auth/google`: Log in with Google
- `POST /api/auth/forgotpassword`: Request password reset
- `POST /api/auth/update-password`: Update password

### User Management

- `POST /api/user/profile/:id`: Upload or update user profile
- `GET /api/user/getUser/:id`: Get user details
- `GET /api/user/search/:id`: Search for users
- `PUT /api/user/addfollowers/:id`: Add follower
- `PUT /api/user/cancelrequest/:id`: Cancel follow request
- `PUT /api/user/acceptfollowers/:id`: Accept follow request
- `PUT /api/user/removefollowers/:id`: Remove follower
- `GET /api/user/getuserfromid/:id`: Get user by ID
- `PUT /api/user/privateaccount/:id`: Change account privacy setting (private/public)
- `PUT /api/user/updateusername`: Update username
- `PUT /api/user/updatefullname`: Update full name
- `PUT /api/user/updatePassword`: Update password
- `DELETE /api/user/deleteProfilePic/:id`: Remove profile picture

### Posts

- `POST /api/post/create`: Create a new post
- `GET /api/post/getPosts/:id`: Get posts by user ID
- `GET /api/post/getPost/:id`: Get a specific post by ID
- `PUT /api/post/likes/:id`: Like a post
- `PUT /api/post/dislikes/:id`: Dislike a post
- `DELETE /api/post/delete/:id`: Delete a post
- `POST /api/comment/:id`: Add a comment to a post
- `POST /api/reply/:id`: Reply to a comment
- `DELETE /api/deletecomment/:id`: Delete a comment
- `GET /api/comment/get/:id?page={page}`: Get comments for a post with pagination
- `POST /api/post/save`: Save a post
- `POST /api/post/unsave`: Unsave a post
- `GET /api/post/getsavedposts`: Get saved posts

### Stories

- `POST /api/story/upload`: Upload a story
- `GET /api/story/getstories`: Get all stories
- `GET /api/story/getstoriesbyid/:id`: Get stories by ID
- `GET /api/story/getstoriesbyUser/:id`: Get stories by a specific user

### Chat

- `GET /api/chat?page={page}`: Fetch chat messages with pagination
- `POST /api/chat`: Create or access a chat room
- `POST /api/chat/creategroup`: Create a new group chat
- `POST /api/chat/addtogroup`: Add users to a group chat
- `POST /api/message`: Send a message
- `GET /api/message/{chatid}`: Get all messages for a specific chat

### Video Call

- Real-time video calls using WebRTC.

## Installation

### Clone the repository:

```bash
git clone <repo-url>
cd instaclone

for .env
PORT=your_port
MONGO_URL=your_mongo_url
JTOKEN=yourjwttoken
bucket_URL=firebasebucketurl
storageBucket=storagebucket
Updatetoken=jwttokenforupdates
Email=app_email
PASS=app_password

if you want to run the app via docker:
docker-compose up --build

Access the app:

    Frontend: http://localhost:5173
    Backend: http://localhost:3000
Open a pull request.

License

This project is licensed under the MIT License.
