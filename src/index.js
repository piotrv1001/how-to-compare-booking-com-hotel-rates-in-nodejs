import { ApifyClient } from 'apify-client';
import 'dotenv/config';

// Initialize the ApifyClient with your Apify API token
// Set APIFY_TOKEN in your .env file (copy .env.example to get started)
const client = new ApifyClient({
    token: process.env.APIFY_TOKEN,
});

// Prepare Actor input
const input = {
    hotels: ['The Savoy, London'],
    checkinFrom: '2026-10-01',
    checkinTo: '2026-10-02',
    losNights: ['1'],
    occupancy: ['2'],
    currency: 'GBP',
    includeCompetitors: true,
    maxItems: 2,
    proxyConfiguration: { useApifyProxy: true },
};

// Run the Actor and wait for it to finish
const run = await client.actor('piotrv1001/booking-com-rates-scraper').call(input);

// Fetch and print Actor results from the run's dataset (if any)
console.log('Results from dataset');
console.log(`💾 Check your data here: https://console.apify.com/storage/datasets/${run.defaultDatasetId}`);
const { items } = await client.dataset(run.defaultDatasetId).listItems();
items.forEach((item) => {
    console.dir(item);
});

// 📚 Want to learn more 📖? Go to → https://docs.apify.com/api/client/js/docs
