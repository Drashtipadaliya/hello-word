/* eslint-disable no-undef */
const http = require("http");
const fs = require("fs");
const minimist = require("minimist");
/* eslint-enable no-undef */
let homeContent = "";
let projectContent = "";
let registrationContent = "";

// Read HTML files
fs.readFile("home.html", (err, home) => {
  if (err) {
    throw err;
  }
  homeContent = home;
});

fs.readFile("project.html", (err, project) => {
  if (err) {
    throw err;
  }
  projectContent = project;
});

// Read registration.html
fs.readFile("registration.html", (err, registration) => {
  if (err) {
    throw err;
  }
  registrationContent = registration;
});

// Parse command line arguments
// eslint-disable-next-line no-undef
const args = minimist(process.argv.slice(2));
const port = args.port || 3000; // Default to port 3000 if not provided

http
  .createServer((request, response) => {
    let url = request.url;
    response.writeHead(200, { "Content-Type": "text/html" });

    switch (url) {
      case "/project":
        response.write(projectContent);
        response.end();
        break;
      case "/registration":
        response.write(registrationContent);
        response.end();
        break;
      default:
        response.write(homeContent);
        response.end();
        break;
    }
  })
  .listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
