<template>
      <div class="demo-progress">
        <div class="items" v-for="i in gauges" :key="i.key">
          <el-progress
            type="dashboard"
            :percentage="i.percent"
            :color="i.color"
            :stroke-width="10"
            :width="130"
          >
            <template #default>
              <span class="items-value" :style="{ color: i.color }">
                {{ i.display }}
              </span>
            </template>
          </el-progress>
          <div class="items-name">{{ i.name }}</div>
          <div class="items-unit">{{ i.unit }}</div>
        </div>
      </div>
</template>


<script setup>
import { computed, onMounted, ref } from 'vue'
import { getEnergyOverview, getProductionStat} from '@/api/modules'

//今年数据  power:耗电量，water:耗水量，carbon:碳排放量
const year=ref({power:0,water:0,carbon:0})
//近三年数据，防止出现无穷大
const threeYear=ref({power:1,water:1,carbon:1})
//仪表盘
const itemList=[
	{key:'power',name:"耗电量",color:'#00eaff'},
	{key:'water',name:"耗水量",color:'#26ff46'},
	{key:'carbon',name:"碳排放量",color:'#ffc053'}
]
//调用函数，算三项的总值
function total(row){
	return{
		power: (row.totalPowerConsume || 0)+(row.totalOfficePowerConsume || 0),
		water: (row.totalWaterConsume || 0)+(row.totalOfficeWaterConsume || 0),
		carbon: (row.totalCarbonEmission || 0)
	}
}
onMounted(() => {
	Promise.all([getProductionStat(),getEnergyOverview()]).then(([cur,all]) => {
		const row = (cur.code === 200 && cur.rows && cur.rows.length) ? cur.rows[0] : {}
		year.value = total(row)
		
		if(all.code === 200 && all.data){
			Object.values(all.data).forEach((yearRow) => {
				const i = total(yearRow)
				if(i.power > threeYear.value.power) threeYear.value.power = i.power
				if(i.water > threeYear.value.water )threeYear.value.water = i.water
				if(i.carbon > threeYear.value.carbon) threeYear.value.carbon = i.carbon
			})
		}
	})
})

const gauges = computed(() => {
	itemList.forEach((item) => {
		const value = year.value[item.key]
		const max = threeYear.value[item.key]
		item.percent = Math.min(100,Math.round((value / max)*100))
		item.display = value
	})
	return itemList
})
</script>

<style lang="scss" scoped>
.demo-progress{
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.items{
	display: flex;
	flex-direction: column;
	align-items: center;
}
.items-value{
	font-size: 18px;
	font-weight: bold;
}
.items-name{
	font-size: 14px;
	color: aqua;
	margin-top: 8px;
}
.items-unit{
	font-size: 11px;
	color:#666eff;
	margin-top: 2px;
}
</style>


