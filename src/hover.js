const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

function provideHover (document, position) {
    const fileName = document.fileName;
    console.log('fileName ===', fileName );
    const workDir = path.dirname(fileName);
    // position是个对象 position: { line:16, character: 6 }
    const word = document.getText(document.getWordRangeAtPosition(position));
    const labelArr = [
        "Button", "Icon", "Typography", "Divider", "Grid", "Layout", "Space", 
        "Affix", "Breadcrumb", "Dropdown", "Menu", "PageHeader", "Pagination", 
        "Steps", "Autocomplete", "Cascader", "Checkbox", "DatePicker", "Form", 
        "Input", "InputNumber", "Mentions", "Radio", "Rate", "Select", "Slider", 
        "Switch", "Timepicker", "Transfer", "TreeSelect", "Upload", "Avatar", 
        "Badge", "Calendar", "Card", "Carousel", "Comment", "Descriptions", "Empty", 
        "Image", "List", "Popover", "Statistic", "Table", "Tabs", "Tag", "Timeline", 
        "Tooltip", "Tree", "Alert", "Drawer", "Message", "Modal", "Notification", 
        "Popconfirm", "Progress", "Result", "Skeleton", "Spin", "Anchor", "Backtop", "Configprovider"
    ];

    if (labelArr.includes(word)) {
        const lowerCaseWord = word.toLowerCase();
        return new vscode.Hover(`
                \n* **组件（4.x）**：[${word}](https://ant.design/components/${lowerCaseWord}-cn/#API)
                \n* **组件（3.x）**：[${word}](https://3x.ant.design/components/${lowerCaseWord}-cn/#API)
            `);
    }
}

module.exports = function (context) {
    // 注册鼠标悬停提示
    context.subscriptions.push(vscode.languages.registerHoverProvider('*', {
        provideHover
    }));
};