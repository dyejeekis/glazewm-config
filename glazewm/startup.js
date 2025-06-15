import { WmClient, WmEventType } from 'glazewm';
import { setTimeout } from 'timers/promises';

const processMap = {
	"zen": 1,
	"wezterm-gui": 2,
	"steamwebhelper": 8,
	"spotify": 9,
	"discord": 0,
	"telegram": 0,
};

const client = new WmClient();
client.onConnect(async() => {
	// for some reason this only returns windows that are visible
	const { windows } = await client.queryWindows();

	for (const window of windows) {
		const processName = window.processName.toLowerCase();
		const targetWorkspace = processMap[processName];
		console.log(processName);
		console.log(targetWorkspace);

		if (targetWorkspace !== undefined) {
			console.log(`Moving ${processName} (ID ${window.id}) to workspace ${targetWorkspace}`);
			await client.runCommand(`--id ${window.id} move --workspace ${targetWorkspace}`);
		}
	}


	// await setTimeout(1000);
	// process.exit(0);
});
