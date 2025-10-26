const { createServer } = require("node:http");
const { createDodgeyString } = require("./urlLogic");

const hostname = "localhost";
const port = 3939;

let items = []; // simple in memory array to store data

const savedUrls = {
  'd0wnload-l1nkz-fr3egift-sp3cial-l1nkz-t0ken': 'https://google.co.uk',
}

let savedDodgeyUrls = [];

const server = createServer((req, res) => {
  const { method, url } = req;
  let body = [];
  res.setHeader('Access-Control-Allow-Origin', '*'); // Replace with your frontend URL
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  req
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      body = Buffer.concat(body).toString();

      res.setHeader("Content-Type", "application/json");

      if (url === "/show" && method === "GET") {
        // return all the dodgified urls
        res.writeHead(200);
        res.end(JSON.stringify(savedUrls));

      } else if (url.startsWith("/") && method === "GET") {
        const id = url.split("/")[1];
        console.log(id);
        
        // savedDodgeyUrls.push(dodgeyUrl);
        // items.push();
        
        res.writeHead(301, {
          Location: savedUrls[id]
        }).end();
        // res.end(JSON.stringify({ message: "Item added", item: savedUrls[id] }));

      } else if (url.startsWith("/") && method === "POST") {
        const { originalUrl } = JSON.parse(body);
        res.writeHead(200);
        savedUrls[createDodgeyUrl()] = originalUrl
        res.end(JSON.stringify({ message: "Item updated", originalUrl }));

      } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: "Route not found" }));
      }
    });
});

const createDodgeyUrl = () => {
  let dodgeystring = createDodgeyString();
  while (savedUrls[dodgeystring]) {
    dodgeystring = createDodgeyString();
  }
  console.log(savedDodgeyUrls);
  return dodgeystring
};

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});





// url structures

// GET /show
// return all urls and their dodgified states as an option

// GET /:id
// return a 301 and redirect to the original url

// POST /dodgify
// body url to dodgify






/// user flow

// user visits site
// there's an input box
// user types in the url -- this hits the /dodgify url with a POST 
// user receives back a dodgified url which will redirect to the original URL




// curl --header "Content-Type: application/json" \
//   --request POST \
//   --data '{"originalUrl":"https://google.com"}' \
//   http://localhost:3000/