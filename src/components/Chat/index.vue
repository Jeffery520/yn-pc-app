<template>
  <div class="chat-bg">
    <div class="chat-content">
      <ul>
        <li class="receive-item">
          <el-avatar
            :size="30"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          ></el-avatar>
          <div class="">
            https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png
          </div>
        </li>
        <li class="send-item">
          <div>
            https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png
          </div>
          <el-avatar
            :size="30"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          ></el-avatar>
        </li>
      </ul>
    </div>
    <div class="chat-action">
      <el-input placeholder="请输入内容">
        <template slot="append"
          ><svg-icon icon-class="chat-send"></svg-icon></template
      ></el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: "index"
};
</script>

<style lang="scss">
.chat-bg {
  ul {
    padding-inline-start: 0px !important;
    list-style: none;
    li {
      display: flex;
      align-items: flex-start;
      margin: 20px;
    }
    .receive-item {
      justify-content: flex-start;
      .el-avatar {
        flex-shrink: 0;
        margin-right: 10px;
      }
    }
    .send-item {
      justify-content: flex-end;
      .el-avatar {
        flex-shrink: 0;
        margin-left: 10px;
      }
    }
    div {
      word-wrap: break-word;
      word-break: break-all;
      text-align: left;
      max-width: 248px;
      background-color: #3aca75;
      color: #fff;
      padding: 10px 15px;
      border-radius: 8px;
      position: relative;
      line-height: 20px;
      &::after {
        content: " ";
        width: 0;
        height: 0;
        border-top: 10px solid green;
        border-right: 10px solid rgba(0, 0, 0, 0);
        border-bottom: 10px solid rgba(0, 0, 0, 0);
        border-left: 10px solid rgba(0, 0, 0, 0);
        position: absolute;
        left: -5px;
        top: 12px;
        transform: rotate(-20deg);
      }
    }
  }
  .chat-action {
    border: 1px solid $baseBorderColor;
    .el-input-group,
    .el-input__inner {
      border: none;
      height: 56px;
      line-height: 56px;
      font-size: 16px;
    }
    .el-input-group__append {
      color: #3aca75;
      font-size: 22px;
      border: none;
      cursor: pointer;
    }
  }
}
</style>
