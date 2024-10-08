import {commands, window} from 'vscode';

const ValidateCommand = commands.registerCommand('extension.b64validate', function(){
    var editor = window.activeTextEditor;
    if (!editor) {
        return; // No open text editor
    }

    var selection = editor.selection;
    var text = editor.document.getText(selection);

    const base64RegExp = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/;
    const isValid = base64RegExp.test(text);

    if (isValid) {
        window.showInformationMessage("Selected string IS a valid Base64 encoded string");
    } else {
        window.showWarningMessage("Selected string is NOT a valid Base64 encoded string");
    }
});

export default ValidateCommand;
