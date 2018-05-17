describe('👀 -> homePage', () => {

	let browser, page;

	before(async () => {
		browser = await puppeteer.launch({
			headless: true
		});
		page = await browser.newPage();
	});

	after(async () => {
		await browser.close();
	});

	for (let device of devicesToEmulate) {
		it(`should be displayed correctly on device: ${device}`, async () => {
			await page.emulate(devices[device]);
			await page.goto(baseUrl);
			let fileName = `homePage - ${device}`;
			await page.screenshot({ path: `${actualDir}/${fileName}.png` });
			await visualTestHelpers.compareScreenshotsPM(fileName);
		});
	}
});