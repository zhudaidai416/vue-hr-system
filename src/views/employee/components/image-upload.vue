<template>
  <el-upload
    class="avatar-uploader"
    action=""
    :show-file-list="false"
    :before-upload="beforeAvatarUpload"
    :http-request="uploadImage"
  >
    <img v-if="value" :src="value" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon" />
  </el-upload>
</template>

<script>
import COS from 'cos-js-sdk-v5'
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    // 检查：判断文件的类型和大小 return true(继续上传)/false(停止上传)
    beforeAvatarUpload(file) {
      const isType = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp'].includes(file.type)
      // file.size的单位是b，要转成 MB
      const isLimit = file.size / 1024 / 1024 < 5

      if (!isType) {
        this.$message.error('上传头像图片只能是 JPG/PNG/GIF/BMP 格式！')
      }
      if (!isLimit) {
        this.$message.error('上传头像图片大小不能超过 5MB！')
      }
      return isType && isLimit
    },
    // 上传
    uploadImage(params) {
      // 初始化COS
      const cos = new COS({
        SecretId: 'AKIDgwERhswwtnY7XpytfLvIXffbUCnW8nOv',
        SecretKey: 'a5VwpmgTKLGG6jFOeoQyWtKtgRFwlYFq'
      })
      // 上传方法
      cos.putObject({
        Bucket: 'vue-hr-system-1323970749', // 存储桶名称
        Region: 'ap-chengdu', // 地域名称
        Key: params.file.name, // 文件名称
        StorageClass: 'STANDARD', // 固定值
        Body: params.file // 文件对象
      }, (err, data) => {
        if (data.statusCode === 200 && data.Location) {
          // 拿到了腾讯云返回的地址
          this.$emit('input', 'http://' + data.Location) // 通过input自定义事件将地址传出
        } else {
          this.$message.error(err.Message) // 上传失败提示消息
        }
      })
    }
  }
}
</script>

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
