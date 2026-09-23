# How to Compare Booking.com Hotel Rates in Node.js

This example calls the [Booking.com Rates Scraper](https://apify.com/piotrv1001/booking-com-rates-scraper) on Apify. It does not implement a scraper from scratch.

## What this example does

- Prices The Savoy for two one-night stays with two adults
- Requests nearby-property rates for those same stays
- Waits for the Actor run to finish
- Fetches the default dataset and prints each rate row

## Prerequisites

- Node.js 18 or newer
- An Apify account and API token

## Installation

```bash
npm install
```

## Environment setup

Copy `.env.example` to `.env`, then set `APIFY_TOKEN` to your token. Do not commit `.env`.

## Usage

The example uses October 1–2, 2026. Update `checkinFrom` and `checkinTo` in `src/index.js` if those dates have passed.

```bash
npm start
```

## Code example

```js
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
```

## Example output

[`sample-output.json`](./sample-output.json) contains abbreviated selected-hotel and nearby-property rows from our run. The run returned two Savoy rate rows and 201 competitor rows. `maxItems` limits selected-property rows, not the extra competitor rows. Keep `checkin`, `checkout`, `nights`, `adults`, `currency`, and booking terms together when comparing prices.

## Use cases

- Compare a property's rate across check-in dates
- Benchmark against a filtered nearby-property set
- Track sold-out dates as availability signals
- Monitor rates by repeating the same input over time

## Try the Actor on Apify

**[Open the Booking.com Rates Scraper on Apify](https://apify.com/piotrv1001/booking-com-rates-scraper)**

## Related resources

- [How to compare Booking.com hotel rates across dates](https://www.falconscrape.com/blog/how-to-compare-booking-com-hotel-rates)

## License

MIT
