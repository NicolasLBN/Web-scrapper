const puppeteer = require('puppeteer');

(async() => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://www.imdb.com/movies-coming-soon/2023-04');
    const movies = await page.evaluate(() => {
        let moviesArray = [];
        let elements = document.querySelectorAll('div.list_item');
        for (element of elements) {
            moviesArray.push({
                img: element.querySelector('img.poster')?.src,
                title: element.querySelector('td.overview-top a')?.text.trim(), 
                description: element.querySelector('div.outline')?.textContent.trim()
            })
        }
        return moviesArray 
    })

    console.log(movies)
    await browser.close()
})();