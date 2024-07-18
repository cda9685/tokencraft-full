import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export class tokenQueryViewProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = 'tokenCraft.tokenQuery';

    constructor(private readonly _extensionUri: vscode.Uri) {}

    public resolveWebviewView(webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext, token: vscode.CancellationToken): Thenable<void> | void {
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri]
        };

        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
    }

    private _getHtmlForWebview(webview: vscode.Webview): string {
        const htmlPath = path.join(this._extensionUri.fsPath, 'src', 'html', 'tokenQuery.html');
        let html = fs.readFileSync(htmlPath, 'utf8');

        const styleMainUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'main.css'));
        html = html.replace('{{styleMainUri}}', styleMainUri.toString());

        return html;
    }
}