import express from "express";
import cors from "cors";
import { scrapeLinkedInJobURL } from "./scraper.js";

// Start express application
const app = express();
const port = process.env.PORT || 8000;

// Start the express server

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

const allowedOrigins = [
  "http://localhost:3000",
  "https://joncaraballo-cover-letter-ai.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.get("/", (_, res) => {
  res.send("LinkedIn Job Page Scraper");
});

// GET endpoint to handle linkedin job scraping requests
app.get("/linkedin/job/:id", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const jobId = req.params.id;
  const url = `https://www.linkedin.com/jobs/view/${jobId}`;
  scrapeLinkedInJobURL(url)
    .then((jobPosting) => {
      res.json(jobPosting);
    })
    .catch((error) => {
      res.json({ error: error?.message });
    });
});

export default app;
