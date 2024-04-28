const http = require("http")

const app = require("./app/app");

const server = http.createServer(app);

const PORT = 800;

server.listen(PORT, () => {
    console.log(`Server is listening to ${PORT}`);
})
