const { group, page_count, publication } = JSON.parse(document.getElementById('root').getAttribute('data-config'));

async function downloadPage(page) {
	const data = await fetch(`https://cdn2.reader.digiport.cz/gluster/${group}/${publication}/high/bg${page.toString(16)}.jpg?v0`, { credentials: 'include' });
	const blob = await data.blob();

	const a = document.createElement('a');
	a.href = window.URL.createObjectURL(blob);
	a.download = `bg${`${page}`.padStart(3, '0')}.jpg`;
	a.click();
	a.remove();
}

for (let page = 1; page <= page_count; page++) {
	await downloadPage(page);
}

console.log(`Downloaded ${page_count} pages.`);
