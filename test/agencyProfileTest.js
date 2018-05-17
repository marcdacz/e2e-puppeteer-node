describe('👀 -> agency profile', () => {

	let browser, page;

	before(async () => {
		browser = await puppeteer.launch({
			headless: false
		});
		page = await browser.newPage();
	});

	beforeEach(async () => {
		await page.goto(`${baseUrl}/real-estate-agency/fletchers-canterbury-ae794/sales/reviews`);
		await page.waitFor(selectors.agencyProfile.agencyName);
	});

	after(async () => {
		await browser.close();
	});


	let width = 1920;
	it.only(`should display agency header correctly at ${width}`, async () => {
		await page.setViewport({ width: width, height: 1080 });	

		await page.$eval(selectors.agencyProfile.agencyName, e => e.innerText = 'RateMyAgent');		
		await page.$eval(selectors.agencyProfile.agencyAddress, e => e.innerText = '120 Balmain St. Cremorne VIC 3021');		
		await page.$eval(selectors.agencyProfile.agencyOverallStarRating, e => e.innerText = '5');		
		await page.$eval(selectors.agencyProfile.agencyReviewsCount, e => e.innerText = '999 Reviews');		


		let fileName = `agencyHeader_${width}`;
		const agencyHeader = await page.$(selectors.agencyProfile.agencyHeader);		
		await agencyHeader.screenshot({ path: `${actualDir}/${fileName}.png` });
	});
});