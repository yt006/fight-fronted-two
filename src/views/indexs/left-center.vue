<!-- <template>
    
</template> -->
<template>
  <div class="energy-percent">
      <Echart :options="chartOption" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getEnergyPercent } from '@/api/modules'

const chartOption = ref({})

const loadEnergyPercent = async () => {
  const res = await getEnergyPercent()

  if (!res || res.code !== 200) return

  // res.data 是数组，取第一条今年的能耗记录
  const record = (res.data || [])[0] || {}

  const officePower = Number(record.totalOfficePowerConsume) || 0
  const officeWater = Number(record.totalOfficeWaterConsume) || 0
  const productWater = Number(record.totalWaterConsume) || 0
  const productPower = Number(record.totalPowerConsume) || 0

  const total = officePower + officeWater + productWater + productPower

  chartOption.value = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}（{d}%）'
    },

    legend: {
      bottom: 60,
      textStyle: {
        color: '#d3d6dd',
        fontSize: 12
      }
    },
	

    title: {
      text: total,
      subtext: '能耗总数',
      left: 'center',
      top: '30%',
      textStyle: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold'
      },
      subtextStyle: {
        color: '#99a3b7',
        fontSize: 12
      }
    },

    series: [
      {
        type: 'pie',
        center: ['50%', '35%'],   //[水平方向，垂直方向]
        radius: ['40%', '60%'],   //[内半径,外半径]
        avoidLabelOverlap: true,
        label: {
          show: false
        },
        data: [
          {
            name: '办公耗电量',
            value: officePower,
            itemStyle: {
              color: '#00eaff'
            }
          },
          {
            name: '办公用水量',
            value: officeWater,
            itemStyle: {
              color: '#36e08a'
            }
          },
          {
            name: '生产用水量',
            value: productWater,
            itemStyle: {
              color: '#ff9a3d'
            }
          },
          {
            name: '生产耗电量',
            value: productPower,
            itemStyle: {
              color: '#7c8bff'
            }
          }
        ]
      }
    ]
  }
}

onMounted(() => {
  loadEnergyPercent()
})

defineExpose({
  refresh: loadEnergyPercent
})
</script>

<style lang="scss" scoped>
.energy-percent {
  width: 100%;
  height: 310px;
  box-sizing: border-box;

  :deep(.lr_titles) {
    height: 100%;
    box-sizing: border-box;
  }

  :deep(.item_title_content) {
    height: calc(100% - 38px);
  }

  :deep(.chart) {
    width: 100%;
    height: 100%;
  }
}
</style>
