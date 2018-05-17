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


	for (let width of pageWidthsToTest) {
		it.only(`should display agency header correctly at ${width}`, async () => {
			await page.setViewport({ width: width, height: 1080 });

			await page.$eval(selectors.agencyProfile.agencyBannerImage, e => e.src = '/assets/images/logos/logo-dark.svg');
			await page.$eval(selectors.agencyProfile.agencyAvatar, e => e.src = 'https://res.cloudinary.com/ratemyagent/image/upload/q_auto:eco,f_auto,w_200,h_200,c_limit/cdn/placeholders/agency.jpg');
			await page.$eval(selectors.agencyProfile.agencyCoverImage, e => {
				e.src = 'https://res.cloudinary.com/ratemyagent/image/upload/q_auto:good,f_auto,w_1500,h_290,c_limit/cdn/cover/2a9d1a7f-4e7a-4766-a2a5-896a3963e9d8.png',
					e.srcset = 'https://res.cloudinary.com/ratemyagent/image/upload/q_auto:good,f_auto,w_1500,h_290,c_limit/cdn/cover/2a9d1a7f-4e7a-4766-a2a5-896a3963e9d8.png'
			});
			await page.$eval(selectors.agencyProfile.agencyName, e => e.innerText = 'RateMyAgent');
			await page.$eval(selectors.agencyProfile.agencyAddress, e => e.innerText = '120 Balmain St. Cremorne VIC 3021');
			await page.$eval(selectors.agencyProfile.agencyOverallStarRating, e => e.innerText = '5');
			await page.$eval(selectors.agencyProfile.agencyReviewsCount, e => e.innerText = '999 Reviews');


			let fileName = `agencyHeader_${width}`;
			const agencyHeader = await page.$(selectors.agencyProfile.agencyHeader);
			await agencyHeader.screenshot({ path: `${actualDir}/${fileName}.png` });
			await visualTestHelpers.compareScreenshotsLS(fileName);
		});
	}
});