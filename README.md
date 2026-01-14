# n8n Nodes - Google Maps Scraper

This is an n8n community node that integrates Apify's [Google Maps Scraper](https://apify.com/compass/crawler-google-places) with your n8n workflows, enabling you to extract structured data from Google Maps including business listings, reviews, and contact information.

[Apify](https://apify.com) is a platform for developers to build, deploy, and publish web automation tools, while [n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) tool for AI workflow automation that allows you to connect various services.

## Table of contents

- [Installation on self hosted instance](#installation-self-hosted)
- [Installation for development and contributing](#installation-development-and-contributing)
- [Operations](#operations)
- [Credentials](#credentials)
- [Compatibility](#compatibility)
- [Usage](#usage)
- [Resources](#resources)
- [Release](#releasing-a-new-version)
- [Version History](#version-history)
- [Troubleshooting](#troubleshooting)

## Installation (self-hosted)

To install the Google Maps Scraper community node directly from the n8n Editor UI:

1. Open your n8n instance.
2. Go to **Settings > Community Nodes**
3. Select **Install**.
4. Enter the npm package name: `n8n-nodes-crawler-google-places` to install the latest version. To install a specific version (e.g 1.0.0) enter `n8n-nodes-crawler-google-places@1.0.0`.
5. Agree to the [risks](https://docs.n8n.io/integrations/community-nodes/risks/) of using community nodes and select **Install**
6. The node is now available to use in your workflows.

> **Note:** This community node only works on self-hosted n8n instances. It is not available for n8n Cloud.

## Installation (development and contributing)

### ⚙️ Prerequisites

- **Node.js**: 22.x or higher (required)
- **npm**: 10.8.2 or higher (required)

Verify your versions:

```bash
node --version  # Should be v22.x.x or higher
npm --version   # Should be 10.8.2 or higher
```

If you use `nvm`, the project includes a `.nvmrc` file. Simply run:

```bash
nvm use
```

### 1. Clone and install dependencies

Clone the repository and install dependencies:

```bash
git clone https://github.com/apify/n8n-nodes-crawler-google-places.git
cd n8n-nodes-crawler-google-places
npm install --legacy-peer-deps
```

The `--legacy-peer-deps` flag is required due to n8n's complex peer dependency tree.

### 2. Build the node package

```bash
npm run build
```

### 3. Start development server

Start the n8n development server with your node linked:

```bash
npm run dev
```

---

### 🔁 Making changes

If you make any changes to your custom node locally, remember to rebuild and restart:

```bash
npm run build
```

---

## Self-hosted n8n: public webhook URL for triggers

This configuration is required for our service's trigger functionality to work correctly.

By default, when running locally n8n generates webhook URLs using `localhost`, which external services cannot reach. To fix this:

1. **Set your webhook URL**
In the same shell or Docker environment where n8n runs, export the `WEBHOOK_URL` to a publicly-accessible address. For example:
  ```bash
  export WEBHOOK_URL="https://your-tunnel.local"
  ```
2. **Restart n8n**
  ```bash
npm run dev
  ```

## Operations

This node provides three operations:

### Scrape places with advanced options

Extract comprehensive business data from Google Maps with full configuration options.

**What you can extract:**
- **Business information**: name, address, phone number, website, category
- **Location data**: coordinates, plus code, neighborhood, city, state, country
- **Ratings and reviews**: overall rating, number of reviews, review distribution
- **Business details**: opening hours, popular times, services offered
- **Photos**: business photos and images
- **Additional attributes**: price level, wheelchair accessibility, payment options
- **Business lead enrichment**: emails, social media profiles, contact details

**Configuration options:**
- Search by keyword, place name, or coordinates
- Define search area with location and radius
- Filter by category, rating, or price level
- Set maximum number of results
- Configure language and region preferences
- Enable/disable images and photos extraction
- Enable/disable reviews extraction

### Scrape place reviews

Extract customer reviews and ratings for specific places on Google Maps.

**What you can extract:**
- **Review content**: text, rating, date posted
- **Reviewer information**: name, profile details, review count
- **Review metrics**: likes count, response from owner
- **Review photos**: images attached to reviews

**Configuration options:**
- Filter reviews by rating (1-5 stars)
- Sort by newest, highest rating, or most relevant
- Set maximum number of reviews to extract

### Generate company and business leads

Extract contact information and business leads from Google Maps listings.

**What you can extract:**
- **Contact details**: email addresses, phone numbers
- **Business information**: company name, website, category
- **Social media**: Facebook, Instagram, LinkedIn profiles
- **Location data**: full address, coordinates
- **Additional info**: business hours, ratings
- **Employee data** (with business leads enrichment add-on): information about employees working at the business including:
  - Personal details: first name, last name, LinkedIn profile
  - Contact information: business email
  - Professional info: job title, department, headline, seniority level
  - Location: city, state, country
  - Company details: company name, website, size, LinkedIn profile, industry

**Configuration options:**
- Search by keyword and location
- Filter by business category
- Search by place ID or place URL

**AI integration:**
The Google Maps Scraper integrates seamlessly with n8n's AI tools, enabling workflows such as:
- Extract business data and use AI to categorize or analyze market trends
- Scrape reviews and generate sentiment analysis reports
- Build lead lists and use AI to qualify prospects
- Monitor competitor locations and generate strategic insights

## Credentials

This node requires Apify API authentication:

**API key authentication**
- Configure your Apify API key in the n8n credentials section under `apifyApi`
- You can find your API key in your [Apify account settings](https://console.apify.com/account/integrations)

![auth](./docs/auth.png)


## Compatibility

- **n8n**: Version 1.57.0 and higher
- **Node.js**: 22.x or higher
- **npm**: 10.8.2 or higher

## Usage

### Basic setup

1. **Install the node**: Follow the [installation instructions](#installation-self-hosted) above.
2. **Configure credentials**: Add your Apify API key in n8n's credentials section.
3. **Create a workflow**: Add the Google Maps Scraper node to your n8n workflow.
4. **Select an operation**: Choose between scraping places, reviews, or generating leads.
5. **Configure your search**:
   - Enter your search query and location
   - Select data extraction options
   - Configure filters and limits
6. **Execute the workflow**: Run the workflow to scrape Google Maps data.

### Example use cases

**Local business intelligence**
- Extract competitor locations and business information
- Monitor local market presence and density
- Analyze business distribution across different areas
- Track new business openings in specific locations

**Lead generation and sales**
- Build targeted business lead lists by category and location
- Extract contact information for outreach campaigns
- Generate prospect lists with business emails
- Identify potential customers in specific geographic areas

**Reputation management**
- Monitor customer reviews across multiple locations
- Track rating trends and sentiment over time
- Analyze competitor reviews and feedback
- Identify common customer complaints or praise

**Market research**
- Analyze popular times and business hours patterns
- Compare pricing levels across competitors
- Study service offerings and amenities
- Identify market gaps and opportunities

**Real estate and location analysis**
- Assess business activity in specific neighborhoods
- Evaluate commercial viability of locations
- Map business categories and their distribution
- Analyze foot traffic patterns through popular times data

**Customer service and engagement**
- Extract customer feedback for analysis
- Identify businesses needing responses to reviews
- Monitor brand mentions in reviews
- Track customer sentiment across locations

![workflow](./docs/workflow.png)

## Resources

- [Google Maps Scraper on Apify](https://apify.com/compass/crawler-google-places)
- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Apify API Documentation](https://docs.apify.com)

# Releasing a new version

This project uses a GitHub Actions workflow to automate the release process, including publishing to npm. Here's how to trigger a new release.

**Prerequisites (for all methods):**

* Ensure your target branch on GitHub is up-to-date with all changes you want to include in the release.
* Decide on the new version number, following semantic versioning (e.g., `vX.Y.Z`).
* Prepare your release notes detailing the changes.
* If you're using CLI to release, make sure you have the [GitHub CLI (`gh`)](https://cli.github.com/) installed and authenticated (`gh auth login`).

---

## Method: Using the GitHub web UI (recommended for ease of use)

1.  **Navigate to GitHub releases:**
	* Go to your repository's "Releases" tab

2.  **Draft a new release:**
	* Click the **"Draft a new release"** button.

3.  **Create or choose a tag:**
	* In the "Choose a tag" dropdown:
		* **Type your new tag name** (e.g., `v1.2.3`).
		* If the tag doesn't exist, GitHub will prompt you with an option like **"Create new tag: v1.2.3 on publish."** Click this.
		* Ensure the **target branch** selected for creating the new tag is correct. This tag will point to the latest commit on this target branch.

4.  **Set release title and notes:**
	* Set the "Release title" (e.g., `vX.Y.Z` or a more descriptive title).
	* For the release notes in the description field, you have a few options:
		* **Write your prepared release notes.**
		* **Click the "Generate release notes" button:** GitHub will attempt to automatically create release notes based on merged pull requests since the last release. You can then review and edit these auto-generated notes.

5.  **Publish the release:**
	* Click the **"Publish release"** button.

		*Upon publishing, GitHub creates the tag from your specified branch and then creates the release. This "published" release event triggers the automated workflow.*

---

## Post-release: automated workflow & verification

After creating and publishing the GitHub release:

1.  **Automated workflow execution:**
	* The "Release & Publish" GitHub Actions workflow will automatically trigger.
	* It will perform:
		1.  Code checkout.
		2.  Version extraction (`X.Y.Z`) from the release tag.
		3.  Build and test processes.
		4.  Update `package.json` and `package-lock.json` to version `X.Y.Z`.
		5.  Commit these version changes back to the branch the release was targeted from with a message like `chore(release): set version to X.Y.Z [skip ci]`.
		6.  Publish the package `n8n-nodes-crawler-google-places@X.Y.Z` to npm.

2.  **Verify the package on npm:**
		After the workflow successfully completes (check the "Actions" tab in your GitHub repository):
	* Verify the new version on npm:
			```bash
			npm view n8n-nodes-crawler-google-places version
			```
		This should print `X.Y.Z`.

## Version history

Track changes and updates to the node here.

## Troubleshooting

### Common issues

1. **Authentication errors**
	- Verify your API key is correct

2. **Resource Not Found**
	- Verify the resource ID format
	- Check if the resource exists in your Apify account
	- Ensure you have access to the resource

3. **Operation failures**
	- Check the input parameters
	- Verify resource limits (memory, timeout)
	- Review Apify Console for detailed error messages

### Getting help

If you encounter issues:
1. Check the [Google Maps Scraper documentation](https://apify.com/compass/crawler-google-places)
2. Review the [Apify API documentation](https://docs.apify.com)
3. Review the [n8n Community Nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
4. Open an issue in the GitHub repository
