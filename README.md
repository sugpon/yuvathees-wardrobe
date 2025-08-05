# Yuvathees Wardrobe  
*Coz U R Worth It*

---

## Overview

Yuvathees Wardrobe is a vibrant brand celebrating India’s rich textile heritage by connecting customers with authentic handwoven garments. This project is a full-stack web application designed to showcase the brand story, provide product information, and enable easy customer interaction — all wrapped in a smooth, user-friendly experience.

The frontend is built using React framework and offers a polished, responsive, single-page application (SPA) where visitors can explore the brand, services, shipping info, and contact options. The backend, powered by Spring Boot, handles controllers and repositroes with relevant entitiees. Supports subscriptions, contact enquiries and dynamic shipping data all retrieved from Databses using codefirst approach.

Whether you’re a new visitor wanting to learn about the brand or the admin managing content behind the scenes, this app aims to deliver a seamless experience.

---

## Key Features

### For Customers / Visitors:
- Beautiful landing page with brand logo and tagline  
- Easy navigation across About Us, Services, Shipping, and Contact Us pages  
- Interactive contact form and quick WhatsApp link for real-time support  
- Smooth SPA experience with React Router (no full page reloads)  
- Responsive design that looks great on all devices  

### For Admin / Brand Owner:  
- Simple admin login to manage content securely  
- Manage shipping rates, subscriber and customer inquiries from backend APIs  
- Simple session-based authentication with backend-only credential checks and no plain-text password exposure.  

---

## Tech Stack

- **Frontend:** React, React Router, JSX, CSS Flexbox/Grid, Vite (build tool)  
- **Backend:** Java Spring Boot, Spring MVC, Spring Data JPA, Hibernate ORM  
- **Database:** MySQL database  
- **API:** RESTful endpoints to handle CRUD operations and authentication  
- **Deployment:** TBD

---

## Dev & Deployment Tools:
- Git + GitHub
- IntelliJ IDEA for backend dev using Maven build
- Postman
- MySQL Database
- VS Code for frontend dev

---

## 🚀 Installation Instructions

### Steps to run the app on both frontend & backend

```bash

Step 1: clone the repo
git clone https://github.com/sugpon/yuvathees-wardrobe
cd yuvathees-wardrobe

Step 2: Setup the Backend(Usng IntelliJ)

Create an .env file or configure your environment variables with:
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password

Start the Spring Boot app(Build& Compile)
Backend API: http://localhost:8080

Step 3: Setup the Frontend( Using VS code editor)

cd frontend
npm install
npm run dev

Start React App
development server http://localhost:5173 

```

## 🎨 Wireframes
[View Polished Wireframes](https://drive.google.com/file/d/1hkAnssnbezOOb7-ESHMl2VGqOhJO6YSr/view?usp=drive_link)

---

## 🗃️ ER Diagram
[View ER Diagram](https://drive.google.com/file/d/18YmfK1Z_Zaj-119tYM4G3sP38NC0ObUK/view?usp=drive_link)

---

## 🧩 Unsolved Problems / Future Features

- User authentication and role-based access using Spring Security
- Eloborate UI for Services with Categories and sub Categories
- Unit tests (JUnit for backend, Jest for frontend)
- Deployment using AWS

