# CareerConnect – Full Stack Job Portal

**CareerConnect** is a full-stack job portal designed to connect job seekers with recruiters. It provides a platform where recruiters can publish and manage job opportunities, while job seekers can explore available jobs and find career opportunities.

The application uses a React frontend and a Java Spring Boot backend with REST APIs, JWT authentication, and MySQL database integration.

## 🚀 Key Features

### 👤 Authentication & Authorization
- User registration and login.
- JWT-based authentication.
- Secure password hashing using BCrypt.
- Role-based access control.
- Separate access for Job Seekers and Recruiters.
- Spring Security integration.

### 💼 Recruiter Features
- Recruiter dashboard.
- Post new job opportunities.
- Manage posted jobs.
- View recruiter-specific job listings.

### 🔍 Job Seeker Features
- Browse available jobs.
- View job details.
- Explore career opportunities.
- Access a personalized dashboard.

### 🔐 Security
- JWT token generation and validation.
- Spring Security filter chain.
- Stateless authentication.
- Protected REST API endpoints.
- CORS configuration.

## 🛠️ Technologies Used

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- Bootstrap
- Axios
- React Router DOM

### Backend
- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- REST APIs
- Maven
- JWT Authentication

### Database
- MySQL

### Development Tools
- IntelliJ IDEA
- Visual Studio Code
- Postman
- MySQL Workbench
- Git & GitHub

## 📁 Project Structure

```text
CareerConnect/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/careerconnect/
│   │       │       ├── config/
│   │       │       ├── controller/
│   │       │       ├── dto/
│   │       │       ├── entity/
│   │       │       ├── exception/
│   │       │       ├── repository/
│   │       │       ├── security/
│   │       │       └── service/
│   │       └── resources/
│   │           └── application.properties
│   ├── pom.xml
│   └── ...
│
└── README.md
```

## ⚙️ Installation & Setup

Follow these steps to run CareerConnect locally.

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/CareerConnect-GitHub.git
```

Navigate into the project:

```bash
cd CareerConnect-GitHub
```

### 2. Backend Setup (Spring Boot)

Navigate to the backend directory:

```bash
cd backend
```

Make sure you have installed:
- Java 21
- Maven
- MySQL Server

Create a MySQL database:

```sql
CREATE DATABASE careerconnect;
```

Configure your environment variables in a `.env` file or your application's environment configuration:

```env
JWT_SECRET=your_generated_secure_secret
```

Configure your database credentials and JWT settings in `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/careerconnect
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}

spring.jpa.hibernate.ddl-auto=update

jwt.secret=${JWT_SECRET}
```

Use the actual property names and environment-loading method configured in your backend.

Run the Spring Boot application:

```bash
mvn spring-boot:run
```

Or, on Windows, if Maven Wrapper is included:

```powershell
.\mvnw.cmd spring-boot:run
```

Backend URL:

```text
http://localhost:8080
```

### 3. Frontend Setup (React)

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

## 🔄 Application Architecture

CareerConnect follows a layered architecture in its Spring Boot backend.

```text
React Frontend
      |
      | HTTP Requests (Axios)
      |
      v
REST API Controllers
      |
      v
Service Layer
      |
      v
Repository Layer
      |
      v
Spring Data JPA / Hibernate
      |
      v
MySQL Database
```

### Authentication Flow

1. User enters login credentials.
2. React sends credentials to the Spring Boot authentication API.
3. Backend validates the credentials.
4. BCrypt is used for password verification.
5. JWT service generates an authentication token.
6. Frontend stores the authentication token.
7. Axios attaches the token to subsequent protected API requests.
8. Spring Security validates the token before granting access.

## 🧪 API Testing

REST APIs can be tested using **Postman**.

Backend API base URL:

```text
http://localhost:8080
```

For protected endpoints, include the JWT token in the request headers:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

## 🔒 Security & Environment Variables

For security reasons:

- Never upload `.env` files to GitHub.
- Never expose JWT secrets or database passwords.
- Use strong randomly generated JWT secrets.
- Keep production credentials outside source code.

Add the following to `.gitignore`:

```gitignore
.env
.env.*
!.env.example

target/
node_modules/
dist/
.idea/
.vscode/
```

You can provide an `.env.example` file containing placeholder values for other developers.

## 🎯 Project Objective

The main objective of CareerConnect is to simplify the job search and recruitment process by providing a centralized platform for recruiters and job seekers.

The project also demonstrates practical implementation of full-stack development concepts, REST API integration, authentication, database management, and secure backend development.

## 👨‍💻 Developer

**Sohail Khan**

Full Stack Developer | Java Backend Development

**Technologies:** Java, Spring Boot, React.js, MySQL, REST APIs, JavaScript

---

⭐ If you find this project interesting, consider giving this repository a star!