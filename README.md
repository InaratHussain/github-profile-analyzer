# GitHub Profile Analyzer API

A simple REST API built with **Node.js**, **Express.js**, **MySQL**, and the **GitHub Public API**. The application fetches a GitHub user's public profile, stores useful insights in a MySQL database, and provides APIs to retrieve analyzed profiles.

---

## Features

* Fetch public GitHub profile data by username
* Store profile insights in MySQL
* Update existing records instead of creating duplicates
* Retrieve all analyzed profiles
* Retrieve a single analyzed profile
* Simple REST API
* Uses GitHub Public API (no authentication required)

---

## Tech Stack

* Node.js
* Express.js
* MySQL
* Axios
* dotenv
* cors

---

## Project Structure

```
github-profile-analyzer/
│
├── config/
│   └── db.js
├── controllers/
│   └── githubController.js
├── routes/
│   └── githubRoutes.js
├── services/
│   └── githubService.js
├── .env
├── schema.sql
├── server.js
├── package.json
└── README.md
```

---

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd github-profile-analyzer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create MySQL database

Run the SQL inside `schema.sql`.

```sql
CREATE DATABASE github_analyzer;
USE github_analyzer;

CREATE TABLE github_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE,
    name VARCHAR(255),
    public_repos INT,
    followers INT,
    following INT,
    public_gists INT,
    account_created DATE,
    profile_url VARCHAR(255),
    avatar_url VARCHAR(255),
    analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Configure environment variables

Create a `.env` file.

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=github_analyzer
```

> **Note:** If your MySQL password contains special characters such as `#`, wrap it in quotes.
>
> Example:
>
> ```
> DB_PASSWORD="MyPassword#"
> ```

### 5. Start the server

```bash
npm start
```

---

# Base URL

```
http://localhost:5000/api
```

---

# API Endpoints

## 1. Analyze GitHub Profile

### Endpoint

```
POST /api/analyze/:username
```

### Example Request

```
POST /api/analyze/octocat
```

---

### Scenario 1: User exists on GitHub and is not yet in the database

The application:

* Fetches data from GitHub
* Stores it in MySQL
* Returns the GitHub profile

Example Response

```json
{
  "message": "Profile analyzed successfully",
  "data": {
    "login": "octocat",
    "name": "The Octocat",
    "public_repos": 8,
    "followers": 18000,
    "following": 9,
    "public_gists": 8,
    "html_url": "https://github.com/octocat"
  }
}
```

---

### Scenario 2: User already exists in the database

The application:

* Fetches the latest profile from GitHub
* Updates the existing database record
* Updates the `analyzed_at` timestamp
* Returns the latest GitHub data

Example Response

```json
{
  "message": "Profile analyzed successfully",
  "data": {
    "login": "octocat",
    "followers": 18500
  }
}
```

---

### Scenario 3: GitHub user does not exist

Example Request

```
POST /api/analyze/random_user_that_does_not_exist
```

Response

```json
{
  "message": "GitHub user not found"
}
```

Status Code

```
404 Not Found
```

---

## 2. Get All Profiles

### Endpoint

```
GET /api/profiles
```

### Example Request

```
GET /api/profiles
```

### Example Response

```json
[
  {
    "id": 1,
    "username": "octocat",
    "public_repos": 8,
    "followers": 18000
  },
  {
    "id": 2,
    "username": "torvalds",
    "public_repos": 7,
    "followers": 250000
  }
]
```

---

### Scenario: No profiles stored

```json
[]
```

---

## 3. Get Single Profile

### Endpoint

```
GET /api/profiles/:username
```

---

### Example Request

```
GET /api/profiles/octocat
```

### Example Response

```json
{
  "id": 1,
  "username": "octocat",
  "followers": 18000,
  "following": 9,
  "public_repos": 8
}
```

---

### Scenario: Username not present in the database

```json
{
  "message": "Not found"
}
```

Status Code

```
404 Not Found
```

---

# Database Fields Stored

The following insights are stored:

| Field           | Description                   |
| --------------- | ----------------------------- |
| username        | GitHub username               |
| name            | GitHub display name           |
| public_repos    | Number of public repositories |
| followers       | Number of followers           |
| following       | Number of users followed      |
| public_gists    | Number of public gists        |
| account_created | GitHub account creation date  |
| profile_url     | GitHub profile URL            |
| avatar_url      | Avatar image URL              |
| analyzed_at     | Timestamp of latest analysis  |

---

# Edge Cases Handled

### GitHub user does not exist

Returns

* HTTP 404
* `"GitHub user not found"`

---

### Duplicate analysis requests

Handled using:

```sql
ON DUPLICATE KEY UPDATE
```

Instead of creating duplicate rows, the existing record is updated with the latest data.

---

### Empty database

`GET /api/profiles`

returns

```json
[]
```

instead of an error.

---

### Username not found in local database

`GET /api/profiles/:username`

returns

```json
{
  "message": "Not found"
}
```

with status code **404**.

---

### Database errors

If MySQL encounters an error, the API responds with:

* HTTP 500 Internal Server Error

---

### GitHub profile updates

If a GitHub user's followers, repositories, or other profile details change, running the analyze endpoint again updates the stored record to keep the database in sync.

---

# Possible Future Improvements

* GitHub Personal Access Token support (to avoid API rate limits)
* Pagination for profile listing
* Search by name
* Delete analyzed profiles
* Docker support
* Unit tests
* Profile statistics (followers-to-following ratio, account age, etc.)

---

# Author

Internship Assignment - GitHub Profile Analyzer API
