import express from "express";
import { scrapeLinkedInJobURL } from "./scraper";

// Start express application
const app = express();
const port = 8000;

app.get("/", (_, res) => {
  res.send("LinkedIn Job Page Scraper");
});

// GET endpoint to handle linkedin job scraping requests
app.get("/linkedin/job/:id", (req, res) => {
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

// Start the express server

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
