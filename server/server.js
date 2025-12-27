import express from "express";
// import session from "express-session";

const app = express();
const PORT = 8000;

app.use(express.json());

app
  .listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  })
  .on("error", (err) => {
    console.error("Failed to start server:", err);
  });
