<template>
  <div>
    <el-header>番茄品质检测系统</el-header>
    <div class="allBox">
      <el-steps
        :active="active"
        finish-status="success"
      >
        <el-step title="图像预处理"></el-step>
        <el-step title="图像特征分析"></el-step>
        <el-step title="品质检测"></el-step>
      </el-steps>
      <div class="contentBox">
        <router-view />
      </div>
    </div>
    <div style="text-align: center;">
      <el-button
        style="margin-top: 12px;"
        @click="next"
      >下一步</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      active: 0,
      step: ['/preprocessing', '/analysis', '/check']
    };
  },

  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
      this.$router.push(this.step[this.active]);
    }
  }
}
</script>


<style lang="scss" scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  font-weight: bold;
  font-size: 1.5em;
}
.allBox {
  padding: 20px;
  box-sizing: border-box;
}
.contentBox {
  height: calc(100vh - 230px);
  overflow: auto;
}
</style>