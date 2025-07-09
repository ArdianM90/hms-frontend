Readme PL -> [link](README.pl.md)

# Hotel Booking App – Frontend

**Live demo:** [adrian-mienkowski-booking-app.vercel.app](https://adrian-mienkowski-booking-app.vercel.app)

This is the frontend part of a hotel booking application, built with Angular and TypeScript. It supports user login, displaying a list of hotels, and viewing hotel details. The application communicates with a Spring Boot backend via REST API and uses JWT authentication, with the access token stored in localStorage and the refresh token stored securely in httpOnly cookies.

<p align="center">
  <img src="img/login_page.jpg" width="250"/>
</p>
<p align="center">
  <img src="img/hotels-list.jpg" width="250"/>
  <img src="img/reservation-panel.jpg" width="250"/>
</p>

## Installation and running

**Requirements:**
- Node.js ≥ 18
- npm ≥ 9
- OpenSSL (required to generate SSL certificates)

To make the login functionality work properly, you need:
- the backend service running: [hms-backend](https://github.com/ArdianM90/hms-backend)
- SSL certificate files (`key.pem`, `cert.pem`) placed in the `./ssl` directory.

You can generate the SSL certificates using the following command:
```bash
openssl req -x509 -newkey rsa:4096 -nodes -keyout ssl/key.pem -out ssl/cert.pem -days 365
```

**Build and run the project:**
```bash
npm install
npm run build
npm start
```

By default, the application runs at: [https://localhost:4200](https://localhost:4200)

## Technologies
- [Angular](https://angular.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Angular Material (MUI)](https://material.angular.io/)
- [RxJS](https://rxjs.dev/)
- [Vercel](https://vercel.com/) – hosting
- User authentication using JWT (access token in local storage + refresh token in httpOnly cookie)

### Planned next steps (project is still a Work In Progress):
- user registration,
- hotel booking functionality (user can create a reservation).
