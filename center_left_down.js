var colorCLD = [
	'rgba(89,226,238,0.4)',      // 浅蓝 表格背景
	'rgba(89,226,238,0.3)',      // 浅蓝 表格背景
	'rgba(89,226,238,0.2)',      // 浅蓝 表格背景
	'rgba(89,226,238,0.1)',      // 浅蓝 表格背景

	'rgba(108, 155, 225, 1)',   //  浅蓝 背景线
	'rgba(47, 126, 224, 0.15)',  //  深蓝 背景幕布

	'rgba(255,255,255, 0.8)',    // 白 普通字	
];

// 最水的文本
var textCLD = ['2020-3-16 8:51:03', '蓝绿厂', '两支老虎\n蜗牛', '192.168.1.1', '测试一下', '12580'];

// 获取文本
function GetTextCLD(){
	return[
		{
			zlevel: 2,
			type: 'text',
			left: 5, top: 'center',
			style:{
				text: textCLD[0],
				font: '11px Microsoft YaHei',
				fill: colorCLD[6]
			}
		},{
			zlevel: 2,
			type: 'text',
			left: 110, top: 'center',
			style:{
				text: textCLD[1],
				font: '11px Microsoft YaHei',
				fill: colorCLD[6]
			}
		},{
			zlevel: 2,
			type: 'text',
			left: 160, top: 'center',
			style:{
				text: textCLD[2],
				font: '11px Microsoft YaHei',
				fill: colorCLD[6]
			}
		},{
			zlevel: 2,
			type: 'text',
			left: 220, top: 'center',
			style:{
				text: textCLD[3],
				font: '11px Microsoft YaHei',
				fill: colorCLD[6]
			}
		},{
			zlevel: 2,
			type: 'text',
			left: 290, top: 'center',
			style:{
				text: textCLD[4],
				font: '11px Microsoft YaHei',
				fill: colorCLD[6]
			}
		},{
			zlevel: 2,
			type: 'text',
			left: 340, top: 'center',
			style:{
				text: textCLD[5],
				font: '11px Microsoft YaHei',
				fill: colorCLD[6]
			}
		}
	];
};

// 获取一个小组件块
function GetGroupCLD(num){
	var text = GetTextCLD();
	return {
		type: 'group',
		top: 10 + num*50, left: 10,
		width: 380, height: 50,
		children:[ text[0], text[1], text[2], text[3], text[4], text[5],
			{  // 背景
				zlevel: 1,
				type: 'rect',
				shape:{ width: 380, height: 50, r: 0 },
				style:{ fill: colorCLD[num] }
			}
		]
	}
};
// 获取所有4个小组件块
function GetAllCLD(){
	var res = [
		{
			zlevel: 0,
			type: 'group',
			width: 390, height:219,
			top: 'center',left: 'center',
			children: [
				{   // 背景幕布
					type: 'rect',
					shape:{ width: 390, height: 219, r: 0 },
					style:{ fill: colorCLD[5] }
				},{ // 背景线
					type: 'rect',
					top: 0,
					shape:{ width: 390, height: 1 },
					style:{ fill: colorCLD[4] }
				}
			]	
		}
	];
	for(var i = 0; i < 4; i++) res.push(GetGroupCLD(i));
	return res;
};

// 文本展示图
var form =  echarts.init(document.getElementById('center_left_down'));
form.setOption({
    graphic: GetAllCLD()
});
