import EncodeCommand from './commands/encode';
import DecodeCommand from './commands/decode';

import UrlEncodeCommand from './commands/urlEncode';
import UrlDecodeCommand from './commands/urlDecode';
import { ExtensionContext } from 'vscode';

function activate(context: ExtensionContext) {
	context.subscriptions.push(EncodeCommand);
	context.subscriptions.push(DecodeCommand);

	context.subscriptions.push(UrlEncodeCommand);
	context.subscriptions.push(UrlDecodeCommand);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
};