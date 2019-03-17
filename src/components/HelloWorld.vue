<template>
  <div class="box">

    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span>番茄品质检测系统</span>
      </div>
      <el-form
        :model="ruleForm2"
        status-icon
        :rules="rules2"
        ref="ruleForm2"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-input v-model.number="ruleForm2.username"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="pass"
        >
          <el-input
            type="password"
            v-model="ruleForm2.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('ruleForm2')"
          >登陆</el-button>
          <el-button @click="handleClickRegister()">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { login } from '@/api/user';

export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入用户名'));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        pass: '',
        username: ''
      },
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        username: [
          { validator: checkAge, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            username: this.ruleForm2.username,
            password: this.ruleForm2.pass
          }
          login(params).then(res => {
            console.warn('xxxxxxxxxxxxre', res);
            if (res.message === '登录成功') {
              this.$router.push({
                path: '/index'
              })
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleClickRegister() {
      console.log('注册');

    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
}
.box-card {
  width: 600px;
}
</style>

