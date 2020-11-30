<template>
<!-- 这里用slide，后面css样式也就要是slide -->
  <transition name="slide">
    <div class="modal" v-show="showModal">
      <!-- 遮罩层 -->
      <div class="mask"></div>
      <!-- 弹框 -->
      <div class="modal-dialog">
        <!-- 弹框头部小标题 -->
        <div class="modal-header">
          <span>{{title}}</span>
          <a href="javascript:;" class="icon-close" @click="$emit('cancel')"></a>
        </div>
        <!-- 弹框内容区,用插槽可以动态改变 -->
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <!-- 弹框下部按钮区,也用插槽动态改变 -->
        <div class="modal-footer">
          <a href="javascript:;" class="btn" v-if="btnType == 1" @click="$emit('submit')">{{sureText}}</a>
          <a href="javascript:;" class="btn btn-default" v-if="btnType == 2" @click="$emit('cancel')">{{cancelText}}</a>
          <div class="btn-group" v-if="btnType == 3">
            <a href="javascript:;" class="btn" @click="$emit('submit')">{{sureText}}</a>
            <a href="javascript:;" class="btn btn-default" @click="$emit('cancel')">{{cancelText}}</a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "modal",
  props: {
    // 弹框类型：小small、中middle、大large、表单form
    modalType: {
      type: String,
      default: "form",
    },
    // 弹框标题
    title: String,
    // 按钮类型：1、确定按钮 2、取消按钮 3、确定取消
    btnType: String,
    sureText: {
      type: String,
      default: "确定",
    },
    cancelText: {
      type: String,
      default: "取消",
    },
    showModal: Boolean,
  },
};
</script>

<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";
@import "./../assets/scss/modal.scss";
</style>