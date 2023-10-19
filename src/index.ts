import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";

const app = express();
const port = 8000;
app.get("/", (req, res) => {
  res.send("LinkedIn Job Page Scraper");
});
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

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

type JobPosting = {
  role: string;
  company: string;
  details: string;
};

const scrapeLinkedInJobURL = async (url: string): Promise<JobPosting> => {
  const jobPosting: JobPosting = {
    role: "",
    company: "",
    details: "",
  };

  await axios
    .get(url)
    .then(async (response) => {
      try {
        const data = response?.data;
        const $ = cheerio.load(data);

        const title = $(".top-card-layout__title");
        const company = $(".topcard__org-name-link");

        const descriptionContainer = $(
          ".description__text .show-more-less-html__markup"
        ).first();

        let description: string[] = [];
        descriptionContainer.find("ul").each((_, ul) => {
          let descriptionSection = `\n${$(ul).prev().text().trim()}\n`;
          $(ul)
            .find("li")
            .each((_, li) => {
              descriptionSection += `\n${$(li).text().trim()}`;
            });
          description.push(descriptionSection);
        });

        if (description.length == 0) {
          throw new Error("No job details found");
        }

        jobPosting.role = title.text().trim();
        jobPosting.company = company.text().trim();
        jobPosting.details = description.join("\n");
      } catch (error) {
        throw error;
      }
    })
    .catch((error) => {
      throw error;
    });

  return jobPosting;
};
