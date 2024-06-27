# Contacto - Contact Management App

Contacto is a contact management backend application built using Node.js, Express.js, and MongoDB (Atlas). It provides RESTful APIs for user authentication, contact creation, contact editing, and contact searching.

## Features

- **Login API:** Authenticate and authorize users using JWT.
- **Create Contact API:** Add new contacts to the database.
- **Edit Contact API:** Update contact details.
- **Search Contact API:** Search for contacts by name.

## Tech Stack

- **Node.js:** JavaScript runtime.
- **Express.js:** Web framework for Node.js.
- **MongoDB (Atlas):** Cloud-based NoSQL database.
- **Mongoose:** ODM for MongoDB.
- **JWT:** JSON Web Token for authentication.
- **bcryptjs:** Library for hashing passwords.
- **dotenv:** Environment variable management.
- **crypto-js:** Encryption and decryption.

## Project Structure

Contacto/
├── config/
│ └── db.js
├── controllers/
│ ├── authController.js
│ └── contactController.js
├── middleware/
│ └── authMiddleware.js
├── models/
│ └── contact.js
├── routes/
│ ├── authRoutes.js
│ └── contactRoutes.js
├── utils/
│ └── encryptDecrypt.js
├── .env
├── server.js
├── package.json
└── README.md

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB Atlas account and cluster setup

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/contacto.git
   cd contacto
API Endpoints
Login API
Endpoint: POST /api/auth/login
Request Body:
json
Copy code
{
  "username": "saltman",
  "password": "oai1122"
}
Response:
json
Copy code
{
  "token": "your_jwt_token"
}
Create Contact API
Endpoint: POST /api/contact/create
Headers:
makefile
Copy code
x-access-token: your_jwt_token
Request Body:
json
Copy code
{
  "name": "Billy Butcher",
  "phone": 144888,
  "email": null,
  "linkedin": null,
  "twitter": null
}
Response:
json
Copy code
{
  "message": "Contact created successfully"
}
Edit Contact API
Endpoint: PUT /api/contact/edit
Headers:
makefile
Copy code
x-access-token: your_jwt_token
Request Body:
json
Copy code
{
  "name": "Billy Butcher",
  "twitter": "anti_vought01"
}
Response:
json
Copy code
{
  "message": "Contact updated successfully"
}
Search Contact API
Endpoint: POST /api/contact/search
Headers:
makefile
Copy code
x-access-token: your_jwt_token
Request Body:
json
Copy code
{
  "search_token": "Billy"
}
Response:
json
Copy code
[
  {
    "name": "Billy Butcher",
    "phone": "144888",
    "email": null,
    "linkedin": null,
    "twitter": "anti_vought01"
  }
]
