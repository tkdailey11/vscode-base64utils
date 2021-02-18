// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "testext" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.b64encode', function () {
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
	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand('extension.b64decode', function(){
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
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
