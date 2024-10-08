import {commands, window, workspace} from 'vscode';

let UrlDecodeCommand = commands.registerCommand('extension.b64urldecode', function(){
    var editor = window.activeTextEditor;
    if (!editor) {
        return; // No open text editor
    }

    var selection = editor.selection;
    var text = editor.document.getText(selection);
    
    var decoded = Buffer.from(text, 'base64').toString();
    decoded = decoded.replace(/-/g, '+').replace(/_/g, '/');
    const padding = decoded.length % 4 === 0 ? '' : '='.repeat(4 - (decoded.length % 4));
    decoded = decoded + padding;

    var cfg = workspace.getConfiguration('Base64')
    var showInfo = cfg.get('showInformation')
    var inPlace = cfg.get('inPlace')

    if(showInfo) {
        window.showInformationMessage(decoded);
    }

    if(inPlace) {
        editor.edit(builder => builder.replace(selection, decoded))
    }
});

export default UrlDecodeCommand;