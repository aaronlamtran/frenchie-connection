# Frenchie Connection

This is a mobile first web application for a client.<br/><br/>
It's hosted live here: [Frenchie Connection](https://www.frenchieconnection.dog) 🙂 <br/><br/>
![screen-gif](./tfc_readme.gif)
# Getting Started

### Prerequisites
Node v14+
Docker
Xcode

In the project directory, you can run:

### `npm install`
To install dependencies

### `npm start`

Runs the application in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `make up`
Builds and runs a devopment image in a container. Mapped to port 3000.

### `make up-prod`
Builds and runs a production build image in a container. Mapped to port 80.

### `npm run build`

Builds the app for production to the `build` folder.\

### Deployment

CI/CD pipeline:
    - GitHub actions/GitLab runners triggered on main branch push/merge to remote alias setup locally
