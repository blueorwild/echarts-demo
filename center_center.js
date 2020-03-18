
var color = [
	'rgba(59,185,204,1)',      // 浅蓝 地图边框
	'rgba(135,206,235,0.5)',   // 浅蓝 区块最浅
	'rgba(0,0,139,0.5)',       // 深蓝 区块最深
	'rgba(89,226,238,1)',      // 浅蓝 涟漪点
	'rgba(89,226,238,1)',      // 浅蓝 飞线
	'rgba(255,255,255,0.9)',     // 白 省名
	'rgba(0,0,0,0.6)',           // 黑 省名阴影
	'rgba(243,239,20,1)',       // 金 散点
	'rgba(108, 155, 225, 1)',   //  浅蓝 背景线
	'rgba(47, 126, 224, 0.15)'  //  深蓝 背景幕布
];

// 省 省会 经度 纬度 value
var data = [
	['甘肃', '兰州', 103.73, 36.03, 56],
	['青海', '西宁', 101.74, 36.56, 10],
	['四川', '成都', 104.06, 30.67, 125],
	['河北', '石家庄', 114.48, 38.03, 102],
	['云南', '昆明', 102.73, 25.04, 83],
	['贵州', '贵阳', 106.71, 26.57, 62],
	['湖北', '武汉', 114.31, 30.52, 116],
	['河南', '郑州', 113.65, 34.76, 137],
	['山东', '济南', 117.00, 36.65, 119],
	['江苏', '南京', 118.78, 32.04, 92],
	['安徽', '合肥', 117.27, 31.86, 109],
	['浙江', '杭州', 120.19, 30.26, 114],
	['江西', '南昌', 115.89, 28.68, 91],
	['福建', '福州', 119.30, 26.08, 116],
	['广东', '广州', 113.23, 23.16, 123],
	['湖南', '长沙', 113.00, 28.21, 114],
	['海南', '海口', 110.35, 20.02, 14],
	['辽宁', '沈阳', 123.38, 41.80, 67],
	['吉林', '长春', 125.35, 43.88, 82],
	['黑龙江', '哈尔滨', 126.63, 45.75, 66],
	['山西', '太原', 112.53, 37.87, 81],
	['陕西', '西安', 108.95, 34.27, 80],
	['台湾', '台北', 121.30, 25.03, 29],
	['北京', '北京', 116.46, 39.92, 150],
	['上海', '上海', 121.48, 31.22, 24],
	['重庆', '重庆', 106.54, 29.59, 91],
	['天津', '天津', 117.2, 39.13, 24],
	['内蒙古', '呼和浩特', 111.65, 40.82, 47],
	['广西', '南宁', 108.33, 22.84, 59],
	['西藏', '拉萨', 91.11, 29.97, 9],
	['宁夏', '银川', 106.27, 38.47, 18],
	['新疆', '乌鲁木齐', 87.68, 43.77, 67],
	['香港', '香港', 114.17, 22.28, 66],
	['澳门', '澳门', 113.54, 22.19, 88]
]

// 为了地图不同省颜色不同
function GetData1(){
	var res = [];
	for(var i = data.length - 1; i >= 0; i--)
		res.push({ name: data[i][0], value: data[i][4] });
	return res;
}

// 地图省份的名字（为了和散点不同层级）
function GetData2(){
	var res = [];
	for(var i = data.length - 1; i >= 0; i--)
		res.push([data[i][2], data[i][3], data[i][0]]);
	return res;
}

// 散点
function GetData3(){
	var res = [];
	var i = data.length - 2, j = data.length - 11;   // 来10个点
	for(; i != j; i--) res.push([data[i][2], data[i][3]]);
	return res;
}

// 涟漪点
function GetData4(){
	var res = [];
	var i = 1, j = 11;   // 来10个点
	for(; i != j; i++) res.push([data[i][2], data[i][3]]);
	return res;
}

// 飞线
function GetData5(){
	var res = [];
	var i = 1, j = 6;   // 来5对点
	for(; i != j; i++) res.push([
		[data[i][2], data[i][3]],
		[data[i*2][2], data[i*2][3]]
	]);
	// 再来个到成都的
	i = 3;j = 6
	for(; i != j; i++) res.push([
		[data[i][2], data[i][3]],
		[data[2][2], data[2][3]]
	]);
	// 再来个到新疆的
	res.push([
		[data[2][2], data[2][3]],
		[data[31][2], data[31][3]]
	]);
	return res;
}


// 平面地图
var map = echarts.init(document.getElementById('center_center'));
// 为echarts对象加载数据
map.setOption({
	// 数据映射
	visualMap:{
		type: 'continuous',
		seriesIndex: 0,
        min: 0, max: 150,
        inRange: { color: [color[1], color[2]] },
		show: false
    },
	// geo地理坐标系组件
	geo: {
		map: 'china',
		silent: true,   // 禁止鼠标响应事件
		height: 430, left: 'center', top: 'center',
		itemStyle:{
			color: 'none',   // 背景颜色 透明
			borderColor: color[0],  // 边框颜色
			borderWidth: 1
		},
		zlevel: 0
	},
	// 展示的其它东西
	graphic:{
		zlevel: 0,
		type: 'group',
		width: 770, height:444,
		top: 'center',left: 'center',
		children: [
			{
				type: 'rect',
				shape:{ width: 770, height: 444, r: 0 },
				style:{ fill: color[9] }
			},{
				type: 'rect',
				top: 0,
				shape:{ width: 770, height: 1.5 },
				style:{ fill: color[8] }
			}
		]	
	},
	series: [
		{	// 地图
			type: 'map',
			mapType: 'china',
			roam: false,
			geoIndex: 0, // 指明绘制在geo坐标系上
			data: GetData1(),
			zlevel: 1,
		},{	 // 散点图
			type: 'scatter',
			show: false,
			coordinateSystem: 'geo', // 指明绘制在geo坐标系上
			label:{
				show: true,
				formatter: function(param){ return param.value[2]; },
				color: color[5],
				fontSize: 9,
				textShadowColor: color[6],
				textShadowBlur: 1.5,
				textShadowOffsetY: 3,
			},
			data: GetData2(),
			zlevel: 100
		},{	 // 散点图
			type: 'scatter',
			show: true,
			coordinateSystem: 'geo', // 指明绘制在geo坐标系上
			symbol: 'circle',
			symbolSize: 10,
			symbolOffset: [-5,-10],//[5, 5],
			itemStyle:{ color: color[7]},
			data: GetData3(),
			zlevel: 2

		},{	
			// 涟漪散点图
			type: 'effectScatter',
			coordinateSystem: 'geo',
			symbolSize: function(){ return Math.ceil(Math.random() * 6) + 3;},
			//symbolOffset:[-10, -20],
			showEffectOn: 'render',
            rippleEffect: {  // 涟漪
                brushType: 'fill',  // fill
				scale: 6,
				period: 4
            },

            itemStyle: {
                color: color[3],
                //shadowBlur: 10,
               // shadowColor: color[3]
            },
			data: GetData4(),
			zlevel: 3
		},{ // 动态飞线图
			type: 'lines',
			coordinateSystem: 'geo',
			zlevel: 200,
			effect: {
				show: true,
				symbol: 'arrow',
				period: 2,
				trailLength: 0.3,
				color: color[4],
				symbolSize: 2
			},
			lineStyle: { 
				width: 0,
				curveness: 0.3
			},
			animationDelay: function(){return Math.round(Math.random(2000));},
			animationDelayUpdate: function(){return Math.round(Math.random(2000));},
			data: GetData5()
		}]
});
