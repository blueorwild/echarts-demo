var color = [
	'rgba(59,185,204,1)',      // 浅蓝 数据1
	'rgba(243,239,20,1)',       // 金 数据2 虚线
	'rgba(135,206,235,1)',   // 浅蓝 数据一极
	'rgba(66,88,180,1)',   // 蓝 数据中间值
	'rgba(0,0,139,1)',       // 深蓝 数据另一极
	'rgba(59,185,204,0.2)',      // 浅蓝 柱状图背景
	'rgba(108, 155, 225, 1)',   //  浅蓝 背景线
	'rgba(47, 126, 224, 0.15)',  //  深蓝 背景幕布
	'rgba(255,255,255, 0.9)',    // 白 标题字 发光等
	'rgba(255,255,255, 0.6)'     // 白 普通字 坐标轴
];

var data = [2182.7, 35.3];
var pie_data = [0.66, 0.3];
var bar_data = [92, 150, 232, 201, 154, 190, 43, 66, 196, 280, 360,155];
var bar_data1 = [400,400,400,400,400,400,400,400,400,400,400,400];
var x_data = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];

// 为了渐变
function GetPie(val){
	var res = [];
	if(val > 0.5){
		res.push({
			value: 0.5,
			itemStyle: {
				color:{
					type: 'linear',
					x: 0,y: 0,x2: 0,y2:1,
					colorStops: [{
						offset: 0, color: color[2] // 0% 处的颜色
					}, {
						offset: 1, color: color[3] // 100% 处的颜色
					}],
				}
			}
		});
		res.push({
			value: val - 0.5,
			itemStyle: {
				color:{
					type: 'linear',
					x: 1,y: 0,x2: 0,y2:0,
					colorStops: [{
						offset: 0, color: color[3] // 0% 处的颜色
					}, {
						offset: 1, color: color[4] // 100% 处的颜色
					}],
				}
			}
		});
	}
	else{
		res.push({
			value: val,
			itemStyle: {
				color:{
					type: 'linear',
					x: 0,y: 0,x2: 0,y2:1,
					colorStops: [{
						offset: 0, color: color[2] // 0% 处的颜色
					}, {
						offset: 1, color: color[3] // 100% 处的颜色
					}],
				}
			}
		});
	};
	res.push({
		value: 1 - val,
		itemStyle:{ color: color[5] }
	});
	return res;
}

// 饼图
var pie_bar = echarts.init(document.getElementById('center_left_up'));
// 为echarts对象加载数据
pie_bar.setOption({
	title:[
		{
			text: '数据中心',
			left: 10, top: 20,
			textStyle:{ 
				color: color[8],
				fontSize: 15,
			}
		},{
			text: '2020年数据规模',
			left: 10, top: 60,
			textStyle:{ 
				color: color[9],
				fontSize: 10,
			}
		},{
			text: '同比增长率',
			left: 100, top: 60,
			textStyle:{ 
				color: color[9],
				fontSize: 10,
				opacity: 0.6
			}
		},{
			text: data[0].toString(),
			left: 10, top: 70,
			textStyle:{ 
				color: color[0],
				fontSize: 15,
				fontFamily: 'FanSong',
			}
		},{
			text: 'GB',
			left: 70, top: 75,
			textStyle:{ 
				color: color[9],
				fontSize: 10,
				opacity: 0.6
			}
		},{
			text: data[1].toString(),
			left: 100, top: 70,
			textStyle:{ 
				color: color[1],
				fontSize: 15,
				fontFamily: 'FanSong',
			}
		},{
			text: '%',
			left: 140, top: 75,
			textStyle:{ 
				color: color[9],
				fontSize: 10,
				opacity: 0.6
			}
		},{
			text: '任务完成率',
			left: 20, top: 180,
			textStyle:{ 
				color: color[9],
				fontSize: 10,
				opacity: 0.7
			}
		},{
			text: '利润率',
			left: 110, top: 180,
			textStyle:{ 
				color: color[9],
				fontSize: 10,
				opacity: 0.7
			}
		}
	],
	// 死元素
	graphic:{
		zlevel: 0,
		type: 'group',
		width: 390, height: 219,
		top: 3, left: 'center',
		children: [
			{  // 背景幕布
				type: 'rect',
				shape:{ width: 390, height: 219, r: 0 },
				style:{ fill: color[7] }
			},{
				type: 'rect',
				top: 0,
				shape:{ width: 390, height: 1 },
				style:{ fill: color[6] }
			},{
				type: 'rect',
				top: 50, left: 'center',
				shape:{ width: 380, height: 1.5 },
				style:{ fill: color[9] }
			},{
				type: 'rect',
				top: 122, left: 28,
				rotation: 40,
				shape:{ width: 1.5, height: 42 },
				style:{ fill: color[9], opacity: 0.5}
			},{
				type: 'rect',
				top: 122, left: 108,
				rotation: 40,
				shape:{ width: 1.5, height: 42 },
				style:{ fill: color[9], opacity: 0.5}
			}
		]	
	},
	grid:{
		width: 200, height: 120,
		top: 70, right: 10
	},
	xAxis:{
        type: 'category',
        axisTick: {show: false},
        data: x_data,
		axisLabel:{
			color: color[9],
            fontSize: 8
		},
		axisLine:{
			lineStyle:{
				color: color[9],
				width: 1
			}
		}
    },
    yAxis:{
		type: 'value',
		// 刻度线
        axisTick: {show: false},
		// 分割线
		splitLine:{
			lineStyle:{
				color: color[9],
				width: 0.8,
				type: 'dashed'
			}
		},
		axisLabel:{
			color: color[9],
            fontSize: 8
		},
		// 轴线
		axisLine:{
			lineStyle:{
				color: color[9],
				width: 1,
			}
		}
    },
    series: [
		{
			type: 'pie',
			top: 100,width: 80, height: 80, left: 10,
			hoverAnimation: false,
			startAngle: 90,
			radius: ['55%', '65%'],
			label: {
				position: 'center',
				fontSize: 14,
				color: color[8],
				formatter: pie_data[0]*100 + '%'
			},
			data: GetPie(pie_data[0])
		},{
			type: 'pie',
			top: 100,width: 80, height: 80, left: 90,
			hoverAnimation: false,
			startAngle: 90,
			radius: ['55%', '65%'],
			label: {
				position: 'center',
				fontSize: 14,
				color: color[8],
				formatter: pie_data[1]*100 + '%'
			},
			data: GetPie(pie_data[1])
		},{
			zlevel: 2,
            type: 'bar',
			barWidth: 7,
			barGap: '-100%',
			itemStyle:{
				color: {
					type: 'linear',
					x: 0,y: 0,x2: 0,y2:1,
					colorStops: [
						{ offset: 0, color: color[2] },// 0% 处的颜色
						{ offset: 1, color: color[3] } // 100% 处的颜色	
					],
				}
			},
            data: bar_data
        },{
			zlevel: 1,
            type: 'bar',
			barGap: '-100%',
			barWidth: 7,
			itemStyle:{ color: color[5] },
            data: bar_data1
        },{
			zlevel: 3,
            type: 'line',
            smooth: true,
			lineStyle:{
				type: 'dotted',
				color: color[1],
				width: 1
			},
			data: bar_data
		}
	]
});