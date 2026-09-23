import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    vscode.window.showInformationMessage('Tamil Terminal: activate() called');

    const provider = new TamilTerminalViewProvider(context.extensionUri);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider('tamilTerminalView', provider, {
            webviewOptions: { retainContextWhenHidden: true }
        })
    );
}

class TamilTerminalViewProvider implements vscode.WebviewViewProvider {
    constructor(private readonly _extensionUri: vscode.Uri) {}

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken,
    ) {
        try {
            vscode.window.showInformationMessage('Tamil Terminal: resolveWebviewView() called');

            webviewView.webview.options = {
                enableScripts: true,
                localResourceRoots: [vscode.Uri.joinPath(this._extensionUri, 'media')]
            };
            webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
        } catch (err) {
            vscode.window.showErrorMessage('Tamil Terminal error: ' + String(err));
        }
    }

    private _getHtmlForWebview(webview: vscode.Webview): string {
        const styleUri = webview.asWebviewUri(
            vscode.Uri.joinPath(this._extensionUri, 'media', 'xterm.css')
        );
        const scriptUri = webview.asWebviewUri(
            vscode.Uri.joinPath(this._extensionUri, 'media', 'main.js')
        );
        const nonce = getNonce();

        return /* html */ `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="Content-Security-Policy" content="
                    default-src 'none';
                    style-src ${webview.cspSource};
                    script-src 'nonce-${nonce}';
                ">
                <title>Tamil Terminal</title>
                <link rel="stylesheet" href="${styleUri}">
                <style>
                    html, body { height: 100%; margin: 0; padding: 0; }
                    #terminal-container { height: 100%; padding: 4px; box-sizing: border-box; }
                </style>
            </head>
            <body>
                <div id="terminal-container"></div>
                <script nonce="${nonce}" src="${scriptUri}"></script>
            </body>
            </html>
        `;
    }
}

function getNonce(): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

export function deactivate() {}