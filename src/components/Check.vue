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
                <el-button>训练</el-button>
                <el-button
                  type="primary"
                  @click="handleClickCheck('svmdetection','/usr/share/nginx/html/machine/image_deal/static/model/svmModel.m')"
                >检测</el-button>
              </el-row>
            </el-card>

            <img
              v-if="objImg.svmdetection"
              :src="objImg.svmdetection"
              class="img"
            >
            <div
              class="text"
              v-if="objText.svmdetection"
            >{{objText.svmdetection}}</div>
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
                <el-button>训练</el-button>
                <el-button
                  type="primary"
                  @click="handleClickCheck('bpdetection','/usr/share/nginx/html/machine/image_deal/static/model/bpModel.h5')"
                >检测</el-button>
              </el-row>
            </el-card>

            <img
              v-if="objImg.bpdetection"
              :src="objImg.bpdetection"
              class="img"
            >
            <div
              class="text"
              v-if="objText.bpdetection"
            >{{objText.bpdetection}}</div>
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
      model: '',
      start: true,
      fileList3: [],
      TrainDialogVisible: false,
      checkDialogVisible: false,
      objImg: {
        svmdetection: 'http://img.zcool.cn/community/016c6359ac1386a8012028a9fa6631.jpg@3000w_1l_2o_100sh.jpg',
        bpdetection: ''
      },
      objText: {
        svmdetection: '',
        bpdetection: ''
      },
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      if (res.code === 200) {
        this.fileName = res.message;
      }
      this.imageUrl = URL.createObjectURL(file.raw);
      this.objImg[this.path] = URL.createObjectURL(file.raw);
    },
    handleChange(file, fileList) {
      this.fileList3 = fileList.slice(-3);
    },
    handleClickTrain() {
      this.start = true;
      this.TrainDialogVisible = true;
    },
    handleClickCheck(path, model) {
      // this.start = true;
      this.checkDialogVisible = true;
      this.path = path;
      this.model = model;
    },
    handleClickStart() {
      // this.start = false;
      let _this = this;
      this.checkDialogVisible = false;
      this.fileList3 = [];
      let params = {
        filename: this.fileName,
        save_model: this.model
      }
      preprocessing(this.path, params).then(res => {
        let text = '';
        try {
          switch (_this.path) {
            case 'svmdetection':
              text = res.message[0].res;
              break;
            case 'bpdetection':
              text = res.message[0].result;
              break;

            default:
              break;
          }
        } catch (error) {

        }
        _this.objText[_this.path] = text;
        console.log(_this.objText);

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
.img {
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 12px;
  width: 512px;
}
.text {
  text-align: center;
  line-height: 28px;
}
</style>