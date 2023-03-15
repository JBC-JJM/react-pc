//组件化

// echart三步走：
// 1、实例化echarts.init，useRef以来get到一个节点
// 挂载到节点上(节点要有宽高)，myChart.setOption加载数据
// 2、使用useEffect调用函数同是传入父组件的可改参数
// 3、可变大小的页面
import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

function echartInit(node, xData, sData, title) {
  const myChart = echarts.init(node)

  let option = {
    title: {
      text: title,
    },
    tooltip: {},
    xAxis: {
      data: xData,
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: sData,
      },
    ],
  }
  myChart.setOption(option)

  window.addEventListener('resize', function () {
    myChart.resize()
  })
}

function Bar({ style, xData, sData, title }) {
  const nodeRef = useRef(null)
  useEffect(() => {
    echartInit(nodeRef.current, xData, sData, title)
  }, [xData, sData, title])

  return <div ref={nodeRef} style={style}></div>
}

export default Bar
