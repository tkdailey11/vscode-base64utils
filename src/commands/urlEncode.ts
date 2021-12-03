import {commands, window, workspace} from 'vscode';

let UrlEncodeCommand = commands.registerCommand('extension.b64urlencode', function () {
    var editor = window.activeTextEditor;
    if (!editor) {
        return; // No open text editor
    }

    var selection = editor.selection;
    var text = editor.document.getText(selection);
    var encoded = Buffer.from(text).toString('base64');

    var cfg = workspace.getConfiguration('Base64')
    var showInfo = cfg.get('showInformation')
    var inPlace = cfg.get('inPlace')

    if(showInfo) {
        window.showInformationMessage(encoded);
    }

    if(inPlace) {
        editor.edit(builder => builder.replace(selection, encoded))
    }
});

export default UrlEncodeCommand;