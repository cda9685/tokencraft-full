import * as vscode from 'vscode';
import { aiAssistViewProvider } from './aiAssist';
import { tokenQueryViewProvider } from './tokenQuery';
import { previewViewProvider } from './preview';


export function activate(context: vscode.ExtensionContext) {
	const aiAssistProvider = new aiAssistViewProvider(context.extensionUri);
	const tokenQueryProvider = new tokenQueryViewProvider(context.extensionUri);
	const previewProvider = new previewViewProvider(context.extensionUri);

	context.subscriptions.push(vscode.window.registerWebviewViewProvider(aiAssistViewProvider.viewType, aiAssistProvider));
	context.subscriptions.push(vscode.window.registerWebviewViewProvider(tokenQueryViewProvider.viewType, tokenQueryProvider));
	context.subscriptions.push(vscode.window.registerWebviewViewProvider(previewViewProvider.viewType, previewProvider));
}

export function deactivate() {}
