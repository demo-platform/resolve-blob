## Tmp file uploader

临时文件储存地，10分钟后删除。

### 接口信息

上传文件

```
POST /img
callback({
  code: 200,
  path: filepath
})
```

下载文件
```
GET /tmp/filepath
```