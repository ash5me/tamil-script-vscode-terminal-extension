import * as path from 'path';
import { runTests } from '@vscode/test-electron';

async function main() {
    try {
        // Path to extension root (two levels up from out/test/)
        const extensionDevelopmentPath = path.resolve(__dirname, '../../');
        
        // Path to test suite entry point
        const extensionTestsPath = path.resolve(__dirname, './index');

        await runTests({ extensionDevelopmentPath, extensionTestsPath });
    } catch (err) {
        console.error('Failed to run tests:', err);
        process.exit(1);
    }
}

main();
