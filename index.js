const { createServer } = require("node:http");
const { createDodgeyString } = require("./urlLogic");

const hostname = "localhost";
const port = 3000;

let items = []; // simple in memory array to store data

let savedDodgeyUrls = [];

const server = createServer((req, res) => {
  const { method, url } = req;
  let body = [];

  req
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      body = Buffer.concat(body).toString();

      res.setHeader("Content-Type", "application/json");

      if (url === "/shorten" && method === "GET") {
        // return all the dodgified urls
        res.writeHead(200);
        res.end(JSON.stringify(items));
      } else if (url.startsWith("/shorten/") && method === "POST") {
        const item = JSON.parse(body);
        const dodgeyUrl = createDodgeyUrl();
        savedDodgeyUrls.push(dodgeyUrl);
        items.push();
        res.writeHead(201);
        res.end(JSON.stringify({ message: "Item added", item }));
      } else if (url.startsWith("/shorten/items/") && method === "PUT") {
        const id = parseInt(url.split("/")[3]);
        const updatedItem = JSON.parse(body);
        items[id] = updatedItem;
        res.writeHead(200);
        res.end(JSON.stringify({ message: "Item updated", updatedItem }));
      } else if (url.startsWith("/shorten/items/") && method === "DELETE") {
        const id = parseInt(url.split("/")[3]);
        items.splice(id, 1);
        res.writeHead(200);
        res.end(JSON.stringify({ message: "Item deleted" }));
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: "Route not found" }));
      }
    });
});

const createDodgeyUrl = () => {
  let dodgeystring = createDodgeyString();
  while (savedDodgeyUrls.includes(dodgeystring)) {
    dodgeystring = createDodgeyString();
  }
  console.log(savedDodgeyUrls);
};

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
