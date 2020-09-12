const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

/**
 * 鼠标悬停提示
 * 当鼠标停在？，自动显示对应的链接
 */
function provideHover (document, position, token) {
    const fileName = document.fileName;
    const workDir = path.dirname(fileName);
    const word = document.getText(document.getWordRangeAtPosition(position));
    console.log('word ====', word);

    if (/\.(json|js)$/.test(fileName)) {
        // hover内容支持markdown语法
        return new vscode.Hover(`
                * **222名称**：(123}[http://www.baidu.com])\n
                * **版本**：444\n* **许可协议**：555
                `);
        // const json = document.getText();
        // console.log('json ===', json);
        // if (new RegExp(`"(dependencies|devDependencies)":\\s*?\\{[\\s\\S]*?${word.replace(/\//g, '\\/')}[\\s\\S]*?\\}`, 'gm').test(json)) {
        //     let destPath = `${workDir}/node_modules/${word.replace(/"/g, '')}/package.json`;

        //     if (fs.existsSync(destPath)) {
        //         const content = require(destPath);

        //         // hover内容支持markdown语法
        //         return new vscode.Hover(`
        //         * **222名称**：(${content.name}[http://www.baidu.com])\n
        //         * **版本**：${content.version}\n* **许可协议**：${content.license}
        //         `);
        //     }
        // }
    }
}

module.exports = function (context) {
    // 注册鼠标悬停提示
    context.subscriptions.push(vscode.languages.registerHoverProvider(['json', 'javascript'], {
        provideHover
    }));
};