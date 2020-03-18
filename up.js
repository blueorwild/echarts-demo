
var color = [
	'rgba(108, 155, 225, 1)', // 线
	'rgba(47, 126, 224, 0.15)'  // 背景幕布
];

// 背景幕布的圆角矩形
var rect = {
	type: 'rect',
	shape:{ width: 1270, height: 44, r: 0 }, // 圆角
	style:{ fill: color[1] }
};
// 矩形左边的线
var line = {
	type: 'rect',
	left: 0, top: 'center',
	shape:{ width: 5, height: 44 },
	style:{ fill: color[0] }
};
// 文本
var text = {
	type: 'text',
	left: 40, top: 'center',
	style:{
		text: '好好学习， 天天向上',
		font: '22px Microsoft YaHei',
		fill: 'white',
	}
};

// 文本展示图
var graph =  echarts.init(document.getElementById('up'));
graph.setOption({
    graphic:{
		type: 'group',
		width: 1270, height:44,
		top: 'center',left: 'center',
		children: [rect, line, text]	
	}
});
