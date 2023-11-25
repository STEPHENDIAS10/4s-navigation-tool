// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed


export function activate(context: vscode.ExtensionContext) {
    let disposableGoToDefinition = vscode.commands.registerCommand('4s-navigation-tool.goToDefinition', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const position = editor.selection.active;
            const wordRange = editor.document.getWordRangeAtPosition(position);
            const word = editor.document.getText(wordRange);
            vscode.commands.executeCommand('editor.action.goToDeclaration', position, word);
        }
    });
	let disposableSubwordSearch = vscode.commands.registerCommand('4s-navigation-tool.subwordSearch', () => {
        const searchTerm = vscode.window.activeTextEditor?.selections[0]?.toString();
        if (searchTerm) {
            vscode.commands.executeCommand('workbench.action.findInFiles', {
                query: `\\b${searchTerm}\\b`,
                isRegex: true,
                matchWholeWord: true
            });
        }
    });

    context.subscriptions.push(disposableGoToDefinition, disposableSubwordSearch);
}
// This method is called when your extension is deactivated
export function deactivate() {}
