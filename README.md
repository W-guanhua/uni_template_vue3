# 构建打包方式
+ yarn 安装依赖
+ yarn serve 编译运行测试环境
+ yarn build 编译运行生产环境

# 环境切换方式及注意点
1. `/src/config`下各文件的配置内容检查是否正确完整；<br/>


# usage
<h2>请求</h2>

定义：统一定义在`src/apis`中，按模块划分<br/>
编写：应用`src/request`中封装好的request方法，编写示例
```
import request from '@/request'
export async function login(data: any): Promise<any> {
    return request({
        url: '/api/test/login',
        method: 'post',
        data,
        _showLoading: true,
    })
}
注意事项
1、不能使用request.get的调用形式，method需写在request的参数中；
2、额外扩展了__showLoading、__retryTimes等的参数
```
使用：<br/>
1. 在页面直接引用暴露出的方法<br/>
2. 结合pinia使用（建议）
---


<h2>弹窗</h2>

定义：统一定义在`src/dialogs`中。<br/>
编写示例：参照`src/dialogs/Example.vue`中编写的内容。
快速生成：snippets(代码模板),关键字：dl-dialog-vue3。定义在.vscode/dialog.code-snippets

使用：<br/>
在需要显示弹窗的页面应用定义的弹窗组件，通过<dialog-弹窗名 />引用，弹窗名为定义的弹窗文件名<br/>
打开、关闭弹窗的方法定义在`store/useDialogStore`中，在引用该store即可。<br/>

注意：<br/>
弹窗的名称使用定义的弹窗文件的名称<br/>
弹窗会由打开的先后顺序进入弹窗队列中控制，先入先展示，不会同时展示。由此会引发问题，当需要在某个顺序中打开的弹窗关闭后需要立刻打开其他弹窗时，需要按以下方式调整<br/>
```javascript
//  某弹窗组件（TestDialog.vue）内，关闭时需执行的方法,关闭函数的第三个参数必须传true，如非必要，第三个参数一定不要传true，会阻止弹窗队列中的任务的继续执行。
    closeDialog(dialogName, payload, true)

// 页面执行
    const methodFunc = async () => {
        const res = await openDialog(dialogName, payload)
        // some code

        // openDialog的三个参数必须传true,方可立刻打开。
        openDialog(dialogName2, payload, true)
    }
```

<h2>全局组件</h2>

定义: 统一定义在`src/components`中，按照组件名/组件名.vue 的规范。<br/>
参照：[easycom组件规范](https://uniapp.dcloud.net.cn/component/#easycom%E7%BB%84%E4%BB%B6%E8%A7%84%E8%8C%83)<br/>
使用: <br/>
1. 在template中直接写入<组件名><br/>
2. 与vue引入组件一致。（建议）

