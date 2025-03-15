// import FirecrawlApp from "@mendable/firecrawl-js";

// const firecrawl = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY! });

// async function scrapeData(url: string) {
// 	try {
// 		const crawlResponse = await firecrawl.scrapeUrl(url, {
// 			formats: ["markdown"],
// 			onlyMainContent: true,
// 			headers: {
// 				"X-API-KEY": process.env.SERPER_API_KEY!,
// 				"Content-Type": "application/json",
// 			},
// 			waitFor: 0,
// 			mobile: false,
// 			skipTlsVerification: false,
// 			timeout: 30000,
// 			location: { country: "US", languages: ["en-US"] },
// 			removeBase64Images: true,
// 			blockAds: true,
// 			proxy: "basic",
// 		});

//     // console.log(crawlResponse)
// 		return crawlResponse;
// 	} catch (error) {
// 		console.error("Error fetching data:", error);
// 		return null;
// 	}
// }

// export { scrapeData };

import FirecrawlApp from "@mendable/firecrawl-js";
import { ScrapeResponse, ErrorResponse } from "@mendable/firecrawl-js";

const firecrawl = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY! });

async function scrapeData(
  url: string
): Promise<ScrapeResponse | ErrorResponse | null> {
  try {
    const crawlResponse = await firecrawl.scrapeUrl(url, {
      formats: ["markdown"],
      onlyMainContent: true,
      headers: {
        "X-API-KEY": process.env.SERPER_API_KEY!,
        "Content-Type": "application/json",
      },
      mobile: false,
      skipTlsVerification: false,
      timeout: 30000,
      removeBase64Images: true,
      blockAds: true,
      proxy: "basic",
    });

    return crawlResponse;
  } catch (error: any) {
    console.error(`Error scraping URL ${url}:`, error);
    return null;
  }
}

export { scrapeData };