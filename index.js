import fetch from 'node-fetch';
import { writeFile, createReadStream } from 'fs';
import AdmZip from 'adm-zip';
import { parse } from 'csv-parse';

const gtfsUrl = 'https://www.data.qld.gov.au/dataset/general-transit-feed-specification-gtfs-translink/resource/e43b6b9f-fc2b-4630-a7c9-86dd5483552b';

async function downloadAndProcessGTFS() {
  try {
    // Download the GTFS ZIP file
    const response = await fetch(gtfsUrl);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Save buffer to a file to manually verify it's a valid ZIP if needed
    await writeFile('gtfs.zip', buffer);

    // Extract the ZIP file
    const zip = new AdmZip(buffer);
    zip.extractAllTo("./gtfs", true);

    // Process a specific file, e.g., stops.txt
    const parser = parse({ columns: true }, (err, records) => {
      if (err) throw err;
      console.log(records); // Log or process your data here
    });

    createReadStream('./gtfs/stops.txt').pipe(parser);

  } catch (error) {
    console.error('Failed to download or process GTFS data:', error);
  }
}

downloadAndProcessGTFS();
