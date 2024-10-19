# Messenger
Welcome to **Messenger** — a modern web application for messaging, developed using cutting-edge frontend technologies. This project was created as part of the frontend developer course at Yandex and demonstrates my skills in building complex web applications from scratch.

## 📌 Project Description
**Messenger** is a single-page application (SPA) that provides full messaging functionality:

 - User registration and secure authentication.
 - Creation and management of chats.
 - Real-time message exchange using WebSocket.
 - Editing user profiles and avatars.
 - A user-friendly and intuitive interface.

## 🚀 Live Demo
Experience the application in action: [Messenger App](https://messenger-r.netlify.app/)

## 🎨 Design and UX
The application's design follows best UX/UI practices and is available for viewing on [Figma](https://www.figma.com/file/xfAVIutsi8BjZiuCPgpHxC/Chat_external_link?type=design&mode=design&t=SRZHPtClDfLOcBxf-1)
. Special attention has been paid to usability and responsive design.

## ✨ Key Features
 - **User Authentication**: Secure registration, login, and logout.
 - **User Profile**:
   - View and edit user information.
   - Change avatar.
 - **Chat Management**:
   - Create new chats.
   - Add and remove users in a chat.
   - Delete chats with action confirmation.
- **Messaging**:
   - Send text messages.
   - Display message statuses.
   - Group messages by date.
- **Form Validation**: Client-side and server-side validation with informative error messages.
- **Responsive Design**: Support for various devices and screen sizes.

## 🛠 Technologies Used
### Frontend
- [**TypeScript**](https://www.typescriptlang.org/): Static typing for code reliability and scalability.
- [**Vite**](https://vitejs.dev/): Fast and efficient project bundling.
- [**SCSS**](https://sass-lang.com/): Use of variables, mixins, and nesting for style management.
- [**Handlebars.js**](https://handlebarsjs.com/): Template engine for creating reusable UI components.
- [**WebSocket API**](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API): Implementation of real-time messaging.
- [**ESLint**](https://eslint.org/): Maintaining consistent and high-quality code.
- [**Husky**](https://typicode.github.io/husky/): Automating code checks before commits.

### Backend
- [**Express.js**](https://expressjs.com/): Lightweight server for serving static files and handling API requests.

### Testing
 - [**Mocha**](https://mochajs.org/): A feature-rich JavaScript test framework for running unit and integration tests.
 - [**Chai**](https://www.chaijs.com/): An assertion library that pairs with Mocha for writing readable and expressive test cases.

## 🏛️ Architecture and Approaches
 - **Component-Based Approach**: Dividing the interface into reusable components.
 - **Modular Structure**: Clear organization of files and modules by functionality.
 - **Design Patterns**: Using MVC and other patterns to simplify maintenance and scalability.

## 🔒 Security
 - **OWASP Top 10**: Implemented measures to protect against the most common web vulnerabilities.
 - **HTTPS and SSL**: Ensuring secure data transmission.

## 🚧 Development and Deployment
 - **CI/CD**: Configured continuous integration and deployment via Netlify.
 - **Nginx**: Set up for serving static files and redirecting HTTP to HTTPS.

## 🔧 Installation and Running
Clone the repository and install dependencies:
```
git clone https://github.com/sjakaev/middle.messenger.praktikum.yandex.git
cd messenger.praktikum.yandex
npm install
```
### Scripts
- `npm run dev` — Launches in development mode with hot reloading.
- `npm run build` — Builds an optimized production version.
- `npm start` — Runs the built application.
- `npm run test` — Runs tests with coverage report generation.
- `npm run lint` — Checks code for compliance with standards.

## 📫 Contact Me
I am open to opportunities and collaboration. Contact me via email: r.sjakaev@gmail.com or through [LinkedIn](https://www.linkedin.com/in/siakaev/).
