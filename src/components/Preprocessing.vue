<template>
  <el-container>
    <el-aside width="50vw">
      <el-row>
        <el-col
          :span="12"
          class='upload'
        >
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
        </el-col>
        <el-col
          :span="12"
          class='upload'
        >
          <img
            v-if="dealImgSrc"
            :src="dealImgSrc"
            alt="处理后的图片"
            class="dealImg"
          >
        </el-col>
      </el-row>
    </el-aside>
    <el-main>
      <el-header>图像预处理方法</el-header>
      <el-row
        class="box1"
        :gutter="20"
      >
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-card class="box-card">
              <div
                slot="header"
                class="clearfix"
              >
                <span>滤波</span>
              </div>
              <div class='btn'>
                <el-button @click="handleClick('mediaimage')">中值滤波</el-button>
              </div>
              <div class='btn'>
                <el-button @click="handleClick('avgimage')">均值滤波</el-button>
              </div>
              <div class='btn'>
                <el-button @click="handleClick('gaussianimage')">高斯滤波</el-button>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-card class="box-card">
              <div
                slot="header"
                class="clearfix"
              >
                <span>直方图</span>
              </div>
              <div class='btn'>
                <el-button @click="handleClick('histequal')">直方图均衡化</el-button>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-card class="box-card">
              <div
                slot="header"
                class="clearfix"
              >
                <span>灰度图</span>
              </div>
              <div class='btn'>
                <el-button @click="handleClick('show_gray_image')">灰度图</el-button>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-card class="box-card">
              <div
                slot="header"
                class="clearfix"
              >
                <span>分量</span>
              </div>
              <div class='btn'>
                <el-button @click="handleClick('show_r_compontent')">R分量</el-button>
              </div>
              <div class='btn'>
                <el-button @click="handleClick('show_g_compontent')">G分量</el-button>
              </div>
              <div class='btn'>
                <el-button @click="handleClick('show_b_compontent')">B分量</el-button>
              </div>
              <div class='btn'>
                <el-button @click="handleClick('show_h_compontent')">H分量</el-button>
              </div>
              <div class='btn'>
                <el-button @click="handleClick('show_s_compontent')">S分量</el-button>
              </div>
              <div class='btn'>
                <el-button @click="handleClick('show_v_compontent')">V分量</el-button>
              </div>
            </el-card>
          </div>
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
      dealImgSrc: '',
    };
  },
  methods: {
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
    handleClick(path) {
      let params = {
        filename: this.fileName
      }
      preprocessing(path, params).then(res => {
        console.warn('xxxxxxxxxxxxre', res);
        if (res.code === 200) {
          this.dealImgSrc = res.message;
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.upload {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.el-aside {
  color: #333;
  text-align: center;
  padding: 10px;
  background-color: #e9eef3;
  margin-right: 10px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader:hover {
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

.el-row {
  height: 100%;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
  cursor: pointer;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.dealImg {
  width: 100%;
}
.btn {
  margin-bottom: 12px;
}
.box1 {
  height: calc(100% - 60px);
  padding: 12px 0;
  box-sizing: border-box;
}
</style>