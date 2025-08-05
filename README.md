# Yuvathees Wardrobe  
*Coz U R Worth It*

---

## Overview

Yuvathees Wardrobe is a vibrant brand celebrating India’s rich textile heritage by connecting customers with authentic handwoven garments. This project is a full-stack web application designed to showcase the brand story, provide product information, and enable easy customer interaction — all wrapped in a smooth, user-friendly experience.

The frontend is built using React framework and offers a polished, responsive, single-page application (SPA) where visitors can explore the brand, services, shipping info, and contact options. The backend, powered by Spring Boot, handles admin authentication and supports subscriptions, contact enquiries and shipping data.

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
- Ability to add, update, and delete categories and subcategories  
- Manage shipping rates and customer inquiries from backend APIs  
- Authentication secured by backend checks (no plain password exposure)  

---

## Tech Stack

- **Frontend:** React, React Router, JSX, CSS Flexbox/Grid, Vite (build tool)  
- **Backend:** Java Spring Boot, Spring MVC, Spring Data JPA, Hibernate ORM  
- **Database:** H2 (in-memory for dev) or any SQL database of choice  
- **API:** RESTful endpoints to handle CRUD operations and authentication  
- **Deployment:** TBD

---

## Installation & Setup

### Prerequisites  
- Node.js (v16 or above) for frontend  
- Java JDK 21 for backend  
- Maven(for backend build)  
- MYSQL Database setup for persistent storage 

### Running Frontend  
```bash
# Clone repo and navigate to frontend folder
cd frontend
npm install
npm run dev   # starts development server

