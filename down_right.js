
var colorDR = [
	'rgba(59,185,204,1)',      // 浅蓝 数据1
	'rgba(108, 155, 225, 1)',   //  浅蓝 背景线
	'rgba(47, 126, 224, 0.15)',  //  深蓝 背景幕布
	'rgba(255,255,255, 0.9)',    // 白 标题字 发光等
	'rgba(255,255,255, 0.6)',    // 白 普通字 坐标轴	
	'rgba(243,239,20,1)',       // 金 数据2
	'rgba(60,179,113,1)',       // 浅绿 数据3
	'rgba(59,185,204,0.2)'      // 浅蓝 柱状图背景
]

var dataBJDR = [67, 32, 187, 1.2, 22, 9];
var dataGZDR = [89, 24, 165, 2.2, 67, 29];
var dataSHDR = [31, 49, 172, 0.8, 52, 41];
var thresholdDR = [
	{name: 'CO2', max: 100},
    {name: 'H2', max: 50},
    {name: 'O2', max: 200},
    {name: 'N2', max: 3},
    {name: 'NO2', max: 100},
    {name: 'SO2', max: 50}
];

// 按照百分制生成新的数据 并排序 为了条形图显示
var newDataBJDR = [];
var newDataGZDR = [];
var newDataSHDR = [];
function GenerateBarDataDR(){
	for(var i =0; i < 6; i++){  // x , y , other
		newDataBJDR.push([dataBJDR[i]/thresholdDR[i]['max']*100, thresholdDR[i]['name']]);
		newDataGZDR.push([dataGZDR[i]/thresholdDR[i]['max']*100, thresholdDR[i]['name']]);
		newDataSHDR.push([dataSHDR[i]/thresholdDR[i]['max']*100, thresholdDR[i]['name']]);
	}
	newDataBJDR.sort(function(a, b){ return a[0] - b[0] }); 
	newDataGZDR.sort(function(a, b){ return a[0] - b[0] }); 
	newDataSHDR.sort(function(a, b){ return a[0] - b[0] }); 
	for(var i =0; i < 6; i++){  // x , y , other
		newDataBJDR[i].splice(1, 0, i);
		newDataGZDR[i].splice(1, 0, i);
		newDataSHDR[i].splice(1, 0, i);
	}
};
GenerateBarDataDR();

// 定时器
var radarSelectedIndex = 0;
var timer = self.setInterval("RadarSelected()",2000);
function RadarSelected()
{
	radarSelectedIndex = (radarSelectedIndex + 1)%3;
	var radarSelected = {
		'北京': radarSelectedIndex == 0,
		'广州': radarSelectedIndex == 1,
		'上海': radarSelectedIndex == 2
	};
	//radar.setOption({legend:{selected: radarSelected}});
	var option = radar.getOption();
	option.legend[0].selected = radarSelected;
	if(radarSelectedIndex == 1) option.series[3].data = newDataGZDR;
	else if(radarSelectedIndex == 2) option.series[3].data = newDataSHDR;
	else if(radarSelectedIndex == 0) option.series[3].data = newDataBJDR;
	radar.setOption(option);
}

// 雷达图
var radar = echarts.init(document.getElementById('down_right'));
radar.setOption({
	// 图例
    legend: {
		type: 'scroll',
        left: 5, top: 'center',
		orient: 'vertical',
        data: [
			{name: '北京', icon: 'diamond'},
			{name: '广州', icon: 'diamond'},
			{name: '上海', icon: 'diamond'}
		],
        itemGap: 15,
		itemWidth: 12,
		itemHeight: 12,
        textStyle: {
            color: colorDR[4],
            fontSize: 10,
        },
        selectedMode: 'single'
    },
	// 背景
	graphic:{
		zlevel: 0,
		type: 'group',
		width: 490, height:214,
		top: 'center',left: 'center',
		children: [
			{
				type: 'rect',
				shape:{ width: 490, height: 214, r: 0 },
				style:{ fill: colorDR[2] }
			},{
				type: 'rect',
				top: 0,
				shape:{ width: 490, height: 1 },
				style:{ fill: colorDR[1] }
			}
		]	
	},
	// 雷达图坐标系
    radar: {
		radius: '60%',
		center: ['30%', '50%'],
		// 指示器
        indicator: thresholdDR,
		// 指示器文本
		name:{
			fontSize: 10,
			color: colorDR[4],		
		},
        shape: 'circle',
        splitNumber: 5,
		// 分段的环
        splitLine: { 
			lineStyle: { 
				width: 0.5,
				color: colorDR[4]
			} 
		},
        splitArea: { show: false },
		// 坐标轴线
        axisLine: {
            lineStyle: {
				width: 0.8,
                color: colorDR[4],
				shadowColor: colorDR[4],
				shadowBlur: 2,
            }
        }
    },
	// 直角坐标系
	grid:{
		width: 200, height: 150,
		top: 40, right: 30
	},
	xAxis:{
        type: 'value',
        axisTick: { show: false },
		axisLabel: { show: false },
		axisLine: { show: false },
		splitLine: { show: false },
		min:0, max: 100
    },
    yAxis:{
		type: 'category',
        axisTick: { show: false },
		axisLabel: { show: false },
		axisLine: { show: false },
		data: ['', '', '', '' ,'' ,'']
    },
    series: [
        {
			name: '北京',
            type: 'radar',
			// 拐点
            itemStyle: { color: colorDR[0]},
			// 线条
			lineStyle: { 
				color: colorDR[0],
				width: 1
			},
			// 区域
            areaStyle: {
				color: colorDR[0],
                opacity: 0.3
            },
            data: [ dataBJDR ],
            symbol: 'none'	
        },{
			name: '广州',
            type: 'radar',
            data: [ dataGZDR ],
            symbol: 'none',
			// 拐点
            itemStyle: { color: colorDR[5]},
			// 线条
			lineStyle: { 
				color: colorDR[5],
				width: 1
			},
			// 区域
            areaStyle: {
				color: colorDR[5],
                opacity: 0.3
            }
        },{
			name: '上海',
            type: 'radar',
            data: [ dataSHDR ],
            symbol: 'none',
			// 拐点
            itemStyle: { color: colorDR[6]},
			// 线条
			lineStyle: { 
				color: colorDR[6],
				width: 1
			},
			// 区域
            areaStyle: {
				color: colorDR[6],
                opacity: 0.3
            }
        },{
			zlevel: 2,
            type: 'bar',
			barWidth: 4,
			barGap: '-100%',
			itemStyle:{ color: colorDR[0] },
			label:{
				show: true,
				position: 'left',
				align: 'left',
				formatter: '{@[2]}',
				offset: [10, -10],
				lineHeight: 10,
				color: colorDR[5],
				fontSize: 12
			},
            data: newDataBJDR
        },{
			zlevel: 1,
            type: 'bar',
			barGap: '-100%',
			barWidth: 4,
			itemStyle:{ color: colorDR[7] },
            data: [100,100,100,100,100,100]
        }
    ]
});