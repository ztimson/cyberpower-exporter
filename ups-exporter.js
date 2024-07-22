import { $ } from 'bun';
import http from 'http';

const port = 1024;

async function scrape() {
	const data = await $`pwrstat -status`.text();
	const r = /^\s*(.+?)\.{3,} (.+)$/gm;

	let found, map = {};
	while(!!(found = r.exec(data)))
		map[found[1]] = found[2];

	if(map["Remaining Runtime"]) {
		const parsed = /(\d+) (.)/gi.exec(map["Remaining Runtime"]);
		const unit = parsed[2].toLowerCase();
		if(unit == 'm') map["Remaining Runtime"] = Number(parsed[1]) * 60;
		if(unit == 'h') map["Remaining Runtime"] = Number(parsed[1]) * 60 * 60;
	}

	return {
		model: map["Model Name"],
		vendor: map["Power Supply by"],
		state: map["State"],
		charge: Number(/\d+/g.exec(map["Battery Capacity"])[0]) / 100,
		battery_time: map["Remaining Runtime"],
		rated_voltage: Number(/\d+/g.exec(map["Rating Voltage"])[0]),
		rated_wattage: Number(/\d+/g.exec(map["Rating Power"])[0]),
		input_voltage: Number(/\d+/g.exec(map["Utility Voltage"])[0]),
		output_voltage: Number(/\d+/g.exec(map["Output Voltage"])[0]),
		load_wattage: Number(/\d+/g.exec(map["Load"])[0]),
		load_percentage: Number(/(\d+) %/g.exec(map["Load"])[1]) / 100,
		// last_test: map["Test Result"],
		// last_outage: map["Last Power Event"],
	};
}

function format(a) {
	let labels = Object.entries(a).filter(([key, value]) => typeof value == 'string')
		.map(([key, value]) => `${key}="${value}"`)
		.join(', ');
	if(labels) labels = `{${labels}}`;

	return Object.entries(a)
		.map(([key, value]) => `ups_${key}${labels} ${typeof value == 'string' ? 1 : value}`)
		.join('\n');
}

http.createServer(async (req, res) => {
	res.end(format(await scrape()));
}).listen(port, () => {
	console.log(`Exporter running on http://localhost:${port}`)
});
