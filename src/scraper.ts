import axios from "axios";
import * as cheerio from "cheerio";
import { JobPosting } from "./types";

/**
 * Scrapes role, company, and details from a linkedin job url
 * @param url
 * @returns JobPosting
 */
export const scrapeLinkedInJobURL = async (
  url: string
): Promise<JobPosting> => {
  const jobPosting: JobPosting = {
    role: "",
    company: "",
    details: "",
  };

  // Make request to job posting url
  await axios
    .get(url)
    .then(async (response) => {
      try {
        const data = response?.data;
        // Initialize cheerio API with response body (HTML)
        const $ = cheerio.load(data);

        // Find the role and company from the job posting HTML
        const role = $(".top-card-layout__title");
        const company = $(".topcard__org-name-link");

        // Get the job description container to extract details
        const descriptionContainer = $(
          ".description__text .show-more-less-html__markup"
        ).first();

        // Find every list within the job description to retrieve the details/requirements
        let description: string[] = [];
        descriptionContainer.find("ul").each((_, ul) => {
          let descriptionSection = `${$(ul).prev().text().trim()}\n`;
          $(ul)
            .find("li")
            .each((_, li) => {
              descriptionSection += `${$(li).text().trim()}\n`;
            });
          description.push(descriptionSection);
        });

        if (description.length == 0) {
          throw new Error("No job details found");
        }

        // Add the scraped data to our job posting object
        jobPosting.role = role.text().trim();
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
