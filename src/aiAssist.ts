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
            localResourceRoots: [this._extensionUri]
        };

        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
    }

    private _getHtmlForWebview(webview: vscode.Webview): string {
        const styleMainUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'main.css'));

        const htmlPath = path.join(this._extensionUri.fsPath, 'media', '/Users/P3246696/non-ps-projects/capstone/TokenCraft/tokencraft/src/html/aiAssist.html');
        const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

        return "test";
        //return htmlContent;
    }
}