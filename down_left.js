var colorDL = [
	'rgba(59,185,204,1)',      // 浅蓝 数据1 折线 数据一极（渐变）
	'rgba(108, 155, 225, 1)',   //  浅蓝 背景线
	'rgba(47, 126, 224, 0.15)',  //  深蓝 背景幕布
	'rgba(255,255,255, 0.9)',    // 白 标题字 发光等
	'rgba(255,255,255, 0.6)',    // 白 普通字 坐标轴	
	'rgba(59,185,204,0)',       // 浅蓝 数据一极（渐变）
	'rgba(243,239,20,1)',       // 金 折线的点
];

var dataDL = [2182.7, 1665.2, 3315.7, 6854.1];
var data1DL = [30,50,36,44,66,89,12,70,55,43];
var data2DL = [68,12,36,49,69,39,87,70,12,43];
var data3DL = [44,56,36,22,66,34,35,70,89,92];
var data4DL = [30,12,68,78,26,47,12,95,85,62];
var x_dataDL = [1,2,3,4,5,6,7,8,9,10];

var title = ['百度', 'alibaba', '菊厂', '小企鹅'];
// 获取标题
function GetTitleDL(num){
	return{
		type: 'text',
		left: 5, top: 20,
		style:{
			text: title[num],
			font: '15px Microsoft YaHei',
			fill: colorDL[3]
		}
	};
};
// 获取数据量
function GetDataDL(num){
	return{
		type: 'text',
		left: 5, top: 78,
		style:{
			text: dataDL[num].toString(),
			font: '15px FanSong',
			fill: colorDL[0]
		}
	};
}
// 获取一个组件块
function GetGroupDL(num){
	return {
		type: 'group',
		top: 3,left: 5 + num*195,
		width: 185, height:214,
		children:[ GetDataDL(num),GetTitleDL(num),
			{
				type: 'text',
				left: 5, top: 60,
				style:{
					text: '数据量',
					font: '10px Microsoft YaHei',
					fill: colorDL[4]
				}
			},{
				type: 'text',
				left: 60, top: 83,
				style:{
					text: 'GB',
					font: '10px Microsoft YaHei',
					fill: colorDL[4]
				}
			},{  // 背景幕布
				type: 'rect',
				shape:{ width: 185, height: 214, r: 0 },
				style:{ fill: colorDL[2] }
			},{
				type: 'rect',
				top: 0,
				shape:{ width: 185, height: 1 },
				style:{ fill: colorDL[1] }
			},{
				type: 'rect',
				top: 45, left: 'center',
				shape:{ width: 175, height: 1.5 },
				style:{ fill: colorDL[4] }
			}
		]
	}
}
// 获取所有组件块
function GetAllGroupDL(){
	var res = [];
	for(var i =0; i < 4; i++) res.push(GetGroupDL(i));
	return res;
}

var line = echarts.init(document.getElementById('down_left'));
// 为echarts对象加载数据
line.setOption({
	// 死元素
	graphic:GetAllGroupDL(),
	grid: [
        {width: 185, height: 100, left: 5, bottom: 10},
        {width: 185, height: 100, left: 200, bottom: 10},
        {width: 185, height: 100, left: 395, bottom: 10},
        {width: 185, height: 100, left: 590, bottom: 10}
    ],
    xAxis: [
        {	gridIndex: 0, 
			lineStyle:{color: color[4],width: 1},
			axisTick: {show: false},
			axisLabel:{show:false},
			splitLine:{show: false}, 
			data: x_dataDL
		},{	gridIndex: 1, 
			lineStyle:{color: color[4],width: 1},
			axisTick: {show: false},
			axisLabel:{show:false},
			splitLine:{show: false}, 
			data: x_dataDL
		},{	gridIndex: 2, 
			lineStyle:{color: color[4],width: 1},
			axisTick: {show: false},
			axisLabel:{show:false},
			splitLine:{show: false}, 
			data: x_dataDL
		},{	gridIndex: 3, 
			lineStyle:{color: color[4],width: 1},
			axisTick: {show: false},
			axisLabel:{show:false},
			splitLine:{show: false}, 
			data: x_dataDL
		}
    ],
    yAxis: [
        {	gridIndex: 0, 
			min: 0, max: 100, 
			axisLine: {show: false},
			axisTick: {show: false},
			splitLine:{show: false}, 
			axisLabel: {show: false}
		},{	gridIndex: 1, 
			min: 0, max: 100, 
			axisLine: {show: false},
			axisTick: {show: false},
			splitLine:{show: false}, 
			axisLabel: {show: false}
		},{	gridIndex: 2, 
			min: 0, max: 100, 
			axisLine: {show: false},
			axisTick: {show: false},
			splitLine:{show: false}, 
			axisLabel: {show: false}
		},{	gridIndex: 3, 
			min: 0, max: 100, 
			axisLine: {show: false},
			axisTick: {show: false},
			splitLine:{show: false}, 
			axisLabel: {show: false}
		}
    ],
    series: [
		{
            type: 'line',
			xAxisIndex: 0,
            yAxisIndex: 0,
            smooth: false,
			lineStyle:{
				type: 'solid',
				color: colorDL[1],
				width: 1
			},
			itemStyle:{ borderColor: colorDL[6] },
			areaStyle:{
				color:{
					type: 'linear',
					x: 0,y: 0,x2: 0,y2:1,
					colorStops: [{
						offset: 0, color: colorDL[0] // 0% 处的颜色
					}, {
						offset: 1, color: colorDL[5] // 100% 处的颜色
					}],
				}
			},
			data: data1DL
		},{
            type: 'line',
			xAxisIndex: 1,
            yAxisIndex: 1,
            smooth: false,
			lineStyle:{
				type: 'solid',
				color: colorDL[1],
				width: 1
			},
			itemStyle:{ borderColor: colorDL[6] },
			areaStyle:{
				color:{
					type: 'linear',
					x: 0,y: 0,x2: 0,y2:1,
					colorStops: [{
						offset: 0, color: colorDL[0] // 0% 处的颜色
					}, {
						offset: 1, color: colorDL[5] // 100% 处的颜色
					}],
				}
			},
			data: data2DL
		},{
            type: 'line',
			xAxisIndex: 2,
            yAxisIndex: 2,
            smooth: false,
			lineStyle:{
				type: 'solid',
				color: colorDL[1],
				width: 1
			},
			itemStyle:{ borderColor: colorDL[6] },
			areaStyle:{
				color:{
					type: 'linear',
					x: 0,y: 0,x2: 0,y2:1,
					colorStops: [{
						offset: 0, color: colorDL[0] // 0% 处的颜色
					}, {
						offset: 1, color: colorDL[5] // 100% 处的颜色
					}],
				}
			},
			data: data3DL
		},{
            type: 'line',
			xAxisIndex: 3,
            yAxisIndex: 3,
            smooth: false,
			lineStyle:{
				type: 'solid',
				color: colorDL[1],
				width: 1
			},
			itemStyle:{ borderColor: colorDL[6] },
			areaStyle:{
				color:{
					type: 'linear',
					x: 0,y: 0,x2: 0,y2:1,
					colorStops: [{
						offset: 0, color: colorDL[0] // 0% 处的颜色
					}, {
						offset: 1, color: colorDL[5] // 100% 处的颜色
					}],
				}
			},
			data: data4DL
		}
	]
});