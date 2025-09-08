# HTU-One Frontend (Special Topics in Computer Science 1)

This repository contains the **frontend** for the **HTU-One system**, built with **React (via Vite)** as part of the *Special Topics in Computer Science 1* course.  

---

## 📖 System Description

The HTU-One system is designed for **students** and **supervisors** to manage course preferences for the upcoming semester. It provides a simple and effective way for students to submit preferences and supervisors to review and approve them.  

---

## ✅ User Requirements

- **Authentication**
  - Login and signup based on role (student or supervisor).  

- **Students**
  - View available courses for the next semester.  
  - Submit new course preferences.  
  - Check the status of submissions (pending, needs feedback, or approved).  
  - Delete submissions if they are pending or need feedback (cannot delete once approved).  

- **Supervisors**
  - View their list of assigned students.  
  - See pending course preference requests.  
  - Approve requests or send feedback (update status).  
  - View student information.  

---

## 🛠️ Technologies Used

- **React** – 19.1.1  
- **Vite** – Frontend build tool  
- **Fetch API** – For handling HTTP requests  
- **Local Storage** – For storing session/user data  

---

## 🚀 Getting Started

After cloning the repository, follow these steps to set up and run the project locally:

### 1. Clone the repository
```bash
cd htu-one-frontend
npm install
npm run dev
