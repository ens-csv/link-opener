const axios = require('axios');
const cheerio = require('cheerio');
const { exec } = require('child_process');

// Function to open links in the terminal
function openLinks(links) {
    links.forEach(link => {
        exec(`start ${link}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error opening link: ${link}`);
                return;
            }
            console.log(`Opened link: ${link}`);
        });
    });
}

// Function to fetch and parse HTML content
async function getLinks(url, selector) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const links = [];
        $(selector).each((index, element) => {
            links.push($(element).attr('href'));
        });
        return links;
    } catch (error) {
        console.error('Error fetching URL:', error.message);
        return [];
    }
}

// Main function to execute the program
async function main() {
    const url = process.argv[2];
    const selector = 'body > div:nth-child(2) > main > div > div:nth-child(4) > div:nth-child(2) > div a';

    if (!url) {
        console.error('Please provide a URL as an argument.');
        return;
    }

    const links = await getLinks(url, selector);
    if (links.length === 0) {
        console.log('No links found matching the selector.');
        return;
    }

    console.log(`Found ${links.length} links matching the selector.`);
    console.log('Opening links...');
    openLinks(links);
}

// Call the main function
main();
