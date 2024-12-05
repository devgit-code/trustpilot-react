import fetch from 'node-fetch';

async function checkUrl(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            console.log(`${url} exists (status: ${response.status})`);
            return true;
        } else {
            console.log(`${url} returned status: ${response.status}`);
            return false;
        }
    } catch (error) {
        console.error(`Error accessing ${url}:`, error.message);
        return false;
    }
}

checkUrl('https://eniyi.com');
