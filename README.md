## Tmp file uploader

临时文件储存地，10分钟后删除。

### 操作方式

```
git clone https://github.com/demo-platform/resolve-blob.git
cd resolve-blob
open demo/index.html
node app.js
```

然后在打开的 demo 页面中上传图片把，拿到 path 之后，自己拼接下图片地址。

`http://0.0.0.0:3300/tmp/filepath`

### 接口信息

上传文件

```
POST /img
{
  code: 200,
  path: filepath
}
```

下载文件
```
GET /tmp/filepath
```
