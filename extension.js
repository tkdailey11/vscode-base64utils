const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let encodeCommand = vscode.commands.registerCommand('extension.b64encode', function () {
		var editor = vscode.window.activeTextEditor;
		if (!editor) {
			return; // No open text editor
		}

		var selection = editor.selection;
		var text = editor.document.getText(selection);
		var encoded = Buffer.from(text).toString('base64');

		var cfg = vscode.workspace.getConfiguration('Base64')
		var showInfo = cfg.get('showInformation')
		var inPlace = cfg.get('inPlace')

		if(showInfo) {
			vscode.window.showInformationMessage(encoded);
		}

		if(inPlace) {
			editor.edit(builder => builder.replace(selection, encoded))
		}
	});
	context.subscriptions.push(encodeCommand);

	let decodeCommand = vscode.commands.registerCommand('extension.b64decode', function(){
		var editor = vscode.window.activeTextEditor;
		if (!editor) {
			return; // No open text editor
		}

		var selection = editor.selection;
		var text = editor.document.getText(selection);
		
		var decoded = Buffer.from(text, 'base64').toString();
		
		var cfg = vscode.workspace.getConfiguration('Base64')
		var showInfo = cfg.get('showInformation')
		var inPlace = cfg.get('inPlace')

		if(showInfo) {
			vscode.window.showInformationMessage(decoded);
		}

		if(inPlace) {
			editor.edit(builder => builder.replace(selection, decoded))
		}
	});
	context.subscriptions.push(decodeCommand);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
