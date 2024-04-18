const fetch = require('node-fetch');

const apiKey = 'YOUR_API_KEY_HERE'; // Replace this with your actual API key
const stopId = 'YOUR_STOP_ID_HERE'; // Replace this with the actual stop ID for South Bank 2
const url = `https://gtfsrt.api.translink.com.au/api/realtime/SEQ/TripUpdates?apikey=${apiKey}&stopId=${stopId}`;

async function getNextFerryDeparture() {
  try {
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/x-protobuf' }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.buffer();
    console.log(data); // You might need a Protobuf parser here to decode the data
  } catch (error) {
    console.error('Failed to fetch next ferry departure:', error);
  }
}

getNextFerryDeparture();
