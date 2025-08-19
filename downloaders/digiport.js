const { BlobWriter, ZipWriter } = await import('https://deno.land/x/zipjs/index.js');

const { group, page_count, publication } = JSON.parse(document.getElementById('root').getAttribute('data-config'));
const zipFileWriter = new BlobWriter();
const zipWriter = new ZipWriter(zipFileWriter);

async function downloadPage(page) {
	const data = await fetch(`https://cdn7.reader.digiport.cz/gluster/${group}/${publication}/high/bg${page.toString(16)}.jpg?v0`, { credentials: 'include' });
	const filename = `bg${`${page}`.padStart(3, '0')}.jpg`;

	if (data.status !== 200) {
		throw new Error(`Failed to fetch page ${page}`);
	}

	console.log(filename);

	await zipWriter.add(filename, data.body);
}

try {
	for (let page = 1; page <= page_count; page++) {
		await downloadPage(page);
	}
	
	await zipWriter.close();
	
	const a = document.createElement('a');
		a.href = window.URL.createObjectURL(await zipFileWriter.getData());
		a.download = `magazine.zip`;
		a.click();
		a.remove();
	
	console.log(`Downloaded ${page_count} pages.`);
} catch (error) {
	console.error(error);
}
