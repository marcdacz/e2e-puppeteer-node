const actualDir = '../images/actual';
const baselineDir = '../images/baseline';
const diffDir = '../images/diff';

const compareScreenshots = (fileName) => {
	return new Promise((resolve, reject) => {
		const img1 = fs.createReadStream(`${testDir}/${fileName}.png`).pipe(new PNG()).on('parsed', doneReading);
		const img2 = fs.createReadStream(`${goldenDir}/${fileName}.png`).pipe(new PNG()).on('parsed', doneReading);

		let filesRead = 0;
		const doneReading = () => {
			if (++filesRead < 2) return;

			expect(img1.width, 'image widths are the same').equal(img2.width);
			expect(img1.height, 'image heights are the same').equal(img2.height);

			const diff = new PNG({ width: img1.width, height: img2.height });
			const numDiffPixels = pixelmatch(
				img1.data, img2.data, diff.data, img1.width, img1.height,
				{ threshold: 0.1 });

			diff.pack().pipe(fs.createWriteStream('diff.png'));
			expect(numDiffPixels, 'number of different pixels').equal(0);
			resolve();
		}
	});
};

const takeAndCompareScreenshot = async(page, route, filePrefix) => {	
	let fileName = filePrefix + '/' + (route ? route : 'index');
	await page.goto(`${baseUrl}/${route}`);
	await page.screenshot({path: `${actualDir}/${fileName}.png`});
	return compareScreenshots(fileName);
  };