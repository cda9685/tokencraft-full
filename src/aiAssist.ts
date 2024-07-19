import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export class aiAssistViewProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = 'tokenCraft.aiAssist';

    private _view?: vscode.WebviewView;

    constructor(private readonly _extensionUri: vscode.Uri) {}

    public resolveWebviewView(webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext, _token: vscode.CancellationToken): Thenable<void> | void {
        this._view = webviewView;
        
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [vscode.Uri.joinPath(this._extensionUri, 'media')]
        };

        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

        webviewView.webview.onDidReceiveMessage(message => {
            switch (message.command) {
                case 'submitPrompt':
                    vscode.window.showInformationMessage(`Prompt received: ${message.text}`);
                    return;
            }
        });
    }

    private _getHtmlForWebview(webview: vscode.Webview): string {
        const htmlPath = path.join(this._extensionUri.fsPath, 'src', 'html', 'aiAssist.html');
        let html = fs.readFileSync(htmlPath, 'utf8');

        const styleMainUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'main.css'));

        return html;
    }
}