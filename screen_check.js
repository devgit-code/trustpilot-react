import fetch from 'node-fetch';

async function checkUrl(url) {
    try {
        const response = await fetch(`https://${url}`);
        if (response.ok) {
            console.log('true');
            return;
        } else {
            // console.log(`${url} returned status: ${response.status}`);
            console.log('false');
            return;
        }
    } catch (error) {
        console.log('false');
        // console.error(`Error accessing ${url}:`, error.message);
        return;
    }
}

const url = process.argv[2] || 'https://google.com';
checkUrl(url);
//
