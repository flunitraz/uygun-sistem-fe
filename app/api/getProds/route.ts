import axios from 'axios';
var cron = require('node-cron');

let lastFetchedData = [{
  islemci: 'fetching',
  ram: 'fetching',
  ekran_karti:'fetching',
  depolama:'fetching',
}];

const fetchDataFromRemote = async () => {
  try {
    const response = await axios.get('https://uygun-sistem-be.onrender.com/scrape/incehesap');
    lastFetchedData = response.data;
    console.log('Data fetched successfully');
  } catch (error) {
    console.error('Error fetching data');
    throw error;
  }
};
cron.schedule('0 * * * *', async () => {
  try {
    await fetchDataFromRemote();
  } catch (error) {
    console.error('Failed to fetch data in cron job');
  }
});

export async function GET() {
  return Response.json(lastFetchedData);
}
