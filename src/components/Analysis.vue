<template>
  <div>nnnnnnnnnnnnnnn</div>
</template>
<template>
  <el-container>
    <el-aside width="30vw">
      <el-upload
        class="avatar-uploader"
        action="http://120.79.36.58:80/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
      >
        <img
          v-if="imageUrl"
          :src="imageUrl"
          class="avatar"
        >
        <i
          v-else
          class="el-icon-plus avatar-uploader-icon"
        ></i>
      </el-upload>
      <el-button
        type="primary"
        round
        @click="handleClick()"
      >提取特征</el-button>
    </el-aside>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card class="box-card">
            <div
              slot="header"
              class="clearfix"
            >
              <span>颜色特征</span>
            </div>
            <el-form label-width="80px">
              <el-form-item
                v-for="(item,idx) in arrColor"
                :key="idx"
                :label="item.name"
                style="margin-bottom: 0px"
              >
                {{item.val}}
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card">
            <div
              slot="header"
              class="clearfix"
            >
              <span>形状特征</span>
            </div>
            <el-form label-width="80px">
              <el-form-item
                v-for="(item,idx) in arrFutre"
                :key="idx"
                :label="item.name"
                style="margin-bottom: 0px"
              >
                {{item.val}}
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import { preprocessing } from '@/api/user';
export default {
  data() {
    return {
      imageUrl: '',
      fileName: '',
      arrColor: [],
      arrFutre: [],
    };
  },
  methods: {
    handleClick() {
      let params = {
        filename: this.fileName
      }
      let obj = {
        "code": 200,
        "message": [{
          "RMean": "42.845486111111114",
          "Rstd": "60.77507324747472",
          "GMean": "173.88618055555557",
          "Gstd": "71.46822265547266",
          "BMean": "129.09659722222221",
          "Bstd": "71.46822265547266",
          "HMean": "59.273125",
          "Hstd": "34.805368359252626",
          "SMean": "157.19590277777777",
          "Sstd": "96.45778594454613",
          "VMean": "173.88618055555557",
          "Vstd": "88.87475677804294"
        }]
      }
      preprocessing('colorextract', params).then(res => {
        let arr = [];
        try {
          for (const key in res.message[0]) {
            let o = {
              name: key,
              val: res.message[0][key]
            }
            arr.push(o);
          }
        } catch (error) {

        }
        this.arrColor = arr;
      })
      preprocessing('extractfutre', params).then(res => {
        let arr = [];
        try {
          for (const key in res.message[0]) {
            let o = {
              name: key,
              val: res.message[0][key]
            }
            arr.push(o);
          }
        } catch (error) {

        }
        this.arrFutre = arr;
      })
    },
    handleAvatarSuccess(res, file) {
      if (res.code === 200) {
        this.fileName = res.message;
      }
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
  }
}
</script>

<style lang="scss" scoped>
.el-aside {
  color: #333;
  text-align: center;
  line-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.el-container {
  height: 100%;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  // line-height: 160px;
}
.avatar-uploader {
  margin-bottom: 20px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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