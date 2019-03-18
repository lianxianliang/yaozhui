<template>
  <el-container>
    <el-container>
      <el-main>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card class="box-card">
              <div
                slot="header"
                class="clearfix"
              >
                <span>外部品质检测</span>
              </div>
              <el-row>
                <!-- <el-button @click="handleClickTrain()">训练</el-button> -->
                <el-button
                  type="primary"
                  @click="handleClickCheck('svmdetection')"
                >检测</el-button>
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="box-card">
              <div
                slot="header"
                class="clearfix"
              >
                <span>番茄糖度检测</span>
              </div>
              <el-row>
                <!-- <el-button @click="handleClickTrain()">训练</el-button> -->
                <el-button
                  type="primary"
                  @click="handleClickCheck('bpdetection')"
                >检测</el-button>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>

    <el-dialog
      title="训练"
      :visible.sync="TrainDialogVisible"
      width="30%"
      center
    >
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-change="handleChange"
        :file-list="fileList3"
      >
        <el-button
          size="small"
          type="primary"
        >上传训练数据集</el-button>
      </el-upload>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="handleClickStart()"
          v-if="start"
        >开始训练</el-button>
        <el-button
          type="primary"
          @click="TrainDialogVisible = false"
          v-else
        >下载</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="检测"
      :visible.sync="checkDialogVisible"
      width="30%"
      center
    >
      <el-upload
        class="upload-demo"
        action="http://120.79.36.58:80/upload"
        :on-change="handleChange"
        :file-list="fileList3"
        :on-success="handleAvatarSuccess"
      >
        <el-button
          size="small"
          type="primary"
        >上传样本</el-button>
      </el-upload>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="handleClickStart()"
          v-if="start"
        >开始检测</el-button>
        <el-button
          type="primary"
          @click="checkDialogVisible = false"
          v-else
        >下载</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import { preprocessing } from '@/api/user';
export default {
  data() {
    return {
      imageUrl: '',
      fileName: '',
      path: '',
      start: true,
      fileList3: [],
      TrainDialogVisible: false,
      checkDialogVisible: false,
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      if (res.code === 200) {
        this.fileName = res.message;
      }
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleChange(file, fileList) {
      this.fileList3 = fileList.slice(-3);
    },
    handleClickTrain() {
      this.start = true;
      this.TrainDialogVisible = true;
    },
    handleClickCheck(path) {
      // this.start = true;
      this.checkDialogVisible = true;
      this.path = path;
    },
    handleClickStart() {
      // this.start = false;
      this.checkDialogVisible = false;
      this.fileList3 = [];
      let params = {
        filename: this.fileName,
        save_model: '/usr/share/nginx/html/machine/image_deal/static/model/svmModel.h5'
      }
      preprocessing(this.path, params).then(res => {
        console.warn('xxxxxxxxxxxxre', res);
        // if (res.code === 200) {
        //   this.dealImgSrc = res.message;
        // }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}
.el-container {
  height: 100%;
}
.upload-demo {
  text-align: center;
  margin-bottom: 12px;
}
</style>