# LinkedIn Job Scraper

A NodeJS scraper that extracts job post details from a LinkedIn job page.

## Prerequisites

- Node.js
- Docker and Docker Compose

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installation

1. Clone this repository
2. Navigate to the project directory (Eg. `cd linkedin-scraper`)
3. Install the dependencies: `npm i`

### Running the Application

#### Using Docker Compose

Build and run the Docker container: `docker compose up -d`

#### Using npm

1. To run the application in development mode: `npm start`

### API Usage

The scraper exposes one API endpoint:

#### GET `/linkedin/job/:id`

- Description: Fetches job post details from LinkedIn
- Parameters:
  - `id`: The job ID from the LinkedIn job URL (e.g., `https://www.linkedin.com/jobs/view/<JOB_ID>`)

Example request:

```bash
curl -X GET "http://localhost:3000/linkedin/job/<JOB_ID>"
```

### Running Tests

To run the tests, use the following command: `npm run test`

## Technologies Used

- Node.js
- Express.js
- Axios
- Cheerio
- Docker
- Docker Compose
