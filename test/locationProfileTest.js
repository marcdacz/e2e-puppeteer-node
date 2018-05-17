describe('👀 -> location profile', () => {

	let browser, page;

	before(async () => {
		browser = await puppeteer.launch({
			headless: false
		});
		page = await browser.newPage();
	});

	after(async () => {
		await browser.close();
	});


	let width = 1920;
	it(`should display review container correctly at ${width}`, async () => {
		await page.setViewport({ width: width, height: 1080 });
		await page.goto(`${baseUrl}/real-estate-profile/sales/victoria/reviews`);
		await page.waitFor('div[class*=AgentHeader---agent]');

		await page.$eval('div[class*=Review---reviewerType]', e => e.innerText = 'VENDOR Review');
		await page.$eval('div[class*=Review---recommended]', e => e.innerText = 'RECOMMENDED');
		await page.$eval('div[class*=Review---propertyPhoto]', e => e.style = 'background-image: url("/assets/images/home/Aus/vic.jpg");');

		await page.$eval('div[class*=AgentHeader---agent] a', e => e.innerText = 'Janna Cruz');
		await page.$eval('div[class*=AgentHeader---agent]:first-of-type + div', e => e.innerText = 'JCBestHomes');
		await page.$eval('div[class*=StarRatingShort---rating]', e => e.innerText = '4');
		await page.$eval('div[class*=AgentHeader---reviewCount]', e => e.innerText = '25 Reviews');
		await page.$eval('span[class*=SaleDateMethod---this]', e => e.innerText = 'Sold 25 Apr 2012');

		const reviewContainer = await page.$('div[class*=Review---this]');

		let fileName = `salesVendorReview - ${width}`;
		await reviewContainer.screenshot({ path: `${actualDir}/${fileName}.png` });
	});
});