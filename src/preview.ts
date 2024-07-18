import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export class previewViewProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = 'tokenCraft.preview';

    private _view?: vscode.WebviewView;

    constructor(private readonly _extensionUri: vscode.Uri) {}

    public resolveWebviewView(webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext, _token: vscode.CancellationToken): Thenable<void> | void {
        this._view = webviewView;

        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [
                vscode.Uri.joinPath(this._extensionUri, 'media'),
                vscode.Uri.joinPath(this._extensionUri, 'src/html')
            ]
        };

        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

        vscode.commands.registerCommand('tokenCraft.preview', (message) => {
            webviewView.webview.postMessage(message);
        });
    }

    private _getHtmlForWebview(webview: vscode.Webview): string {
        const htmlPath = path.join(this._extensionUri.fsPath, 'src', 'html', 'preview.html');
        let html = fs.readFileSync(htmlPath, 'utf8');

        const styleMainUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'main.css'));
        html = html.replace('{{styleMainUri}}', styleMainUri.toString());

        return html;
    }
}
