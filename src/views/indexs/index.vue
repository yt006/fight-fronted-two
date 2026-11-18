<template>
  <div class="contents">
    <div class="contetn_left">
      <!-- <div class="pagetab">
       
      </div> -->
		<ItemWrap class="contetn_lr_item" title="能耗总览">
		  <LeftTop />
		</ItemWrap>

		<ItemWrap class="left_center" title="能耗占比">
		<LeftCenter />
		</ItemWrap>
		
		<ItemWrap class="contetn_lr_item" title="库存预警">
			<LeftBottom />
		</ItemWrap>
		
     
    </div>
    <div class="contetn_center">
		<ItemWrap title="数据总览">
			<CenterTop />
		</ItemWrap>
		
		<ItemWrap title="销售计划完成率">
			<CenterBottom />
		</ItemWrap>
		
    </div>
    <div class="contetn_right">
		<ItemWrap title="销售统计">
			<RightTop />
		</ItemWrap>
		
		<ItemWrap title="销售排名">
			<RightCenter />
		</ItemWrap>
		
		<ItemWrap title="生产统计">
			<RightBottom />
		</ItemWrap>
		
		
		
    </div>
  </div>
</template>

<script setup>
import LeftTop from './left-top.vue'
import LeftCenter from './left-center.vue'
import LeftBottom from './left-bottom.vue'
import CenterTop from './center-top.vue'
import CenterBottom from './center-bottom.vue'
import RightTop from './right-top.vue'
import RightCenter from './right-center.vue'
import RightBottom from './right-bottom.vue'

</script>
<style lang="scss" scoped>
// 内容
.contents {
  .contetn_left,
  .contetn_right {
    width: 540px;
    box-sizing: border-box;
    // padding: 16px 0;
  }

  .contetn_center {
    width: 720px;
  }

  //左右两侧 三个块
  .contetn_lr_item {
    height: 310px;
	box-sizing: border-box;
  }
  .left_center{
	  height: 310px;
	  box-sizing: border-box;
  }

  .contetn_center_top {
    width: 100%;
  }

  // 中间
  .contetn_center {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .contetn_center_bottom {
    height: 315px;
  }

  //左边 右边 结构一样
  .contetn_left,
  .contetn_right {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: relative;
  }
}

@keyframes rotating {
  0% {
    -webkit-transform: rotate(0) scale(1);
    transform: rotate(0) scale(1);
  }
  50% {
    -webkit-transform: rotate(180deg) scale(1.1);
    transform: rotate(180deg) scale(1.1);
  }
  100% {
    -webkit-transform: rotate(360deg) scale(1);
    transform: rotate(360deg) scale(1);
  }
}
</style>
