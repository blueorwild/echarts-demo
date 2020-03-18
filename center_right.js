var colorCR = [
	'rgba(59,185,204,1)',      // 浅蓝 风力
	'rgba(108, 155, 225, 0.3)',   //  浅蓝 小幕布
	'rgba(47, 126, 224, 0.15)',  //  深蓝 大幕布
	'rgba(255,255,255, 0.9)',    // 白 标题字 
	'rgba(255,255,255, 0.6)',    // 白 普通字	
	'rgba(243,239,20,1)'      // 金 温度
];


// 温度
var data1CR = [22,18,16,21,20,25,19];
var data2CR = [25,22,23,24,27,30,25];
// 风
var data3CR = ['东南','西南','南','东','东','东','西北'];
var data4CR = ['微风','软风','轻风','强风','劲风','微风','和风'];
// 日期
var data5CR = ['Mon','Tue','Wed','Thu','Fri','Sat', 'Sun'];
// 天气情况
var data6CR = ['sun','cloud','sun','rain','sun','cloud_sun','thunder_rain'];
// 天气情况图标
var data7CR = {
	'sun': 'images/sun.png',
    'cloud': 'images/cloud.png',
    'cloud_sun': 'images/cloud_sun.png',
    'snow': 'images/snow.png',
    'rain': 'images/rain.png',
    'thunder_rain': 'images/thunder_rain.png'
};

// 获取星期几的文本
function GetDate(num){
	return{
		zlevel: 2,
		type: 'text',
		left: 5, top: 4,
		style:{
			text: data5CR[num],
			font: '14px Microsoft YaHei',
			fill: colorCR[4]
		}
	};
};

// 获取温度文本
function GetTemp(num){
	return [
		{
			type: 'text',
			left: 10, top: 25,
			style:{
				text: data1CR[num],
				font: '13px Microsoft YaHei',
				fill: colorCR[5]
			}
		},{
			type: 'text',
			left: 10, top: 42,
			style:{
				text: data2CR[num],
				font: '13px Microsoft YaHei',
				fill: colorCR[5]
			}
		}
	];
};

// 获取风力文本
function GetWind(num){
	return [
		{
			type: 'text',
			left: 50, top: 25,
			style:{
				text: data3CR[num],
				font: '12px Microsoft YaHei',
				fill: colorCR[0]
			}
		},{
			type: 'text',
			left: 50, top: 42,
			style:{
				text: data4CR[num],
				font: '12px Microsoft YaHei',
				fill: colorCR[0]
			}
		}
	];
};

// 获取天气情况图标
function GetImage(num){
	return{
		zlevel: 2,
		type: 'image',
		left: 50, top: 0,
		style:{
			width: 28, height:21,
			image: data7CR[data6CR[num]]
		}
	};
};

// 获取一个小组件块
function GetGroup(num){
	var temp = GetTemp(num);
	var wind = GetWind(num);
	return {
		type: 'group',
		top: 33 + num*60, left: 5,
		width: 90, height: 54,
		children:[ GetDate(num), temp[0], temp[1], wind[0], wind[1], GetImage(num),
			{  // 背景幕布
				zlevel: 0,
				type: 'rect',
				shape:{ width: 90, height: 54, r: 0 },
				style:{ fill: colorCR[2] }
			},{
				zlevel: 1,
				type: 'rect',
				top: 0,
				shape:{ width: 90, height: 21 },
				style:{ fill: colorCR[1] }
			}
		]
	}
};
// 获取所有7个小组件块
function GetAll(){
	var res = [];
	for(var i =0; i < 7; i++) res.push(GetGroup(i));
	return res;
};

// 文本展示图
var text =  echarts.init(document.getElementById('center_right'));
text.setOption({
	title: {
        text: 'XX未来7天天气',
        left: 0, top: 3,
        textStyle:{
			fontSize:12,
			color: colorCR[3],
		}
    },
    graphic: GetAll()
});
