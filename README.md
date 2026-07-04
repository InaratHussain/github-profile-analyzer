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

## 🚀 Live Deployment

This project is fully deployed and ready to use.

👉 **Base URL:**

```
https://github-profile-analyzer-tl77.onrender.com/api
```

---

## 📌 How to Access This API (Postman Guide)

You can test all endpoints using **Postman** or any API client.

---

### 🔹 Step 1: Open Postman

Download if needed:
[https://www.postman.com/downloads/](https://www.postman.com/downloads/)

---

### 🔹 Step 2: Set Base URL

Use this base URL for all requests:

```
https://github-profile-analyzer-tl77.onrender.com/api
```

---

# 🔥 API Endpoints Usage

---

## 1. Analyze GitHub Profile

### 👉 Request Type:

```
POST
```

### 👉 URL:

```
https://github-profile-analyzer-tl77.onrender.com/api/analyze/octocat
```

### 👉 How to use in Postman:

* Select **POST**
* Paste URL
* Click **Send**

---

### ✅ Example Response:

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

### ⚠️ If user does not exist:

```json
{
  "message": "GitHub user not found"
}
```

Status:

```
404 Not Found
```

---

## 2. Get All Stored Profiles

### 👉 Request Type:

```
GET
```

### 👉 URL:

```
https://github-profile-analyzer-tl77.onrender.com/api/profiles
```

### 👉 How to use:

* Select **GET**
* Paste URL
* Click **Send**

---

### Example Response:

```json
[
  {
    "id": 1,
    "username": "octocat",
    "public_repos": 8,
    "followers": 18000
  }
]
```

---

## 3. Get Single Profile

### 👉 Request Type:

```
GET
```

### 👉 URL:

```
https://github-profile-analyzer-tl77.onrender.com/api/profiles/octocat
```

---

### Example Response:

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

### ⚠️ If user not in database:

```json
{
  "message": "Not found"
}
```

Status:

```
404 Not Found
```

---

# 🧠 Important Notes

* This API uses the **GitHub Public API**
* Data is stored in a **MySQL database hosted externally (Railway)**
* If a user already exists, their data is **updated instead of duplicated**
* No authentication required to use this API
* Fully hosted — no local setup required

---

# 🎯 How Others Can Test This API

Anyone can test this project using:

### Option 1: Browser (GET only)

```
https://github-profile-analyzer-tl77.onrender.com/api/profiles
```

---

### Option 2: Postman (Recommended)

Steps:

1. Open Postman
2. Choose method (GET or POST)
3. Paste endpoint URL
4. Click **Send**
5. View JSON response

---

### Option 3: CURL (optional)

```bash
curl https://github-profile-analyzer-tl77.onrender.com/api/profiles
```

---

# Database Fields Stored

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

* GitHub user not found → 404 error
* Duplicate analysis → updates existing record
* Empty database → returns empty array `[]`
* Missing user in DB → returns `"Not found"`
* MySQL errors → 500 Internal Server Error

---

# Author

**Inarat Hussain**

---
