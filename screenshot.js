import puppeteer from 'puppeteer';

const takeScreenshot = async (url, outputPath) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Resize the viewport to a very small size (1vw x 1vh)
    await page.setViewport({ width: 1280, height: 1024 });

    // Navigate to the URL
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Capture the screenshot
    await page.screenshot({
        path: outputPath,
        fullPage: false, // Don't capture the full page
    });

    await browser.close();
    console.log(`Screenshot saved to ${outputPath}`);
};

// Example Usage
const url = process.argv[2] || 'https://google.com';
const outputPath = 'google.png';

takeScreenshot(url, outputPath);
