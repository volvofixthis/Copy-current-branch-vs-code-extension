import * as vscode from 'vscode';
import { GitExtension, API as GitAPI, Repository, Repository as ApiRepository } from './typings/git';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    let disposable = vscode.commands.registerCommand('extension.copyBranchName', () => {
        const gitExtension = vscode.extensions.getExtension<GitExtension>('vscode.git').exports;
        const git = gitExtension.getAPI(1);

        const firstRepository = git.repositories;

        git.repositories.forEach(function (repository) {
            if (repository.ui.selected) {
                let name = (repository.state.HEAD.name || repository.state.HEAD.commit.slice(0, 8));
                vscode.window.showInformationMessage(name);
                vscode.env['clipboard'].writeText(name);
                console.log('Current git branch name has been copied to the system clipboard');
            }
        }); 
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}