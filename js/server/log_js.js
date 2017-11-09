var uri = connectUrl + "Log/"
var myScroll;
var fresh = true;
var orgList;
var orgIdList = new Array();
var searchstart = null;
var searchend = null;

function init() {
	myScroll = new IScroll('#wrapper', {
		scrollbars: true,
		mouseWheel: true,
		interactiveScrollbars: true,
		shrinkScrollbars: 'scale',
		fadeScrollbars: true,
		scrollY: true,
		probeType: 2,
		topOffset: 10,
	});
	myScroll.on('scroll', function() {
		if(this.y > 40) {
			pullDownEvent();
		} else if(this.y < this.maxScrollY -40) {
			pullUpEvent();
		}
	});
	var load_dia = load_dialog("加载中");
	load_dia.show();
	init_data(0, 50);
	load_dia.close();
}

function init_data(start, end) {
	jsondata = {
		"userName": $.cookie("userName"),
		"passWord": $.cookie("passWord"),
		"start": start,
		"end": end
	};
	$.ajax({
		url: uri + "searchLogList",
		type: "get",
		data: { "request": JSON.stringify(jsondata) },
		async: true,
		success: function(result) {
			$('#wrapper_table').html("");
			init_LogList(JSON.parse(result));
			$("#div_scroll_pullup")[0].style.display = "none";
			$("#div_scroll_pulldown")[0].style.display = "none";
			myScroll.refresh();
		},
		error: function(result) {
			init_LogList();
			return null;
		}
	});
}

function load() {
	var userName = $.cookie("userName");
	var passWord = $.cookie("passWord");
	var data = $('#wrapper_table').children().children().length;
	jsondata = {
		"userName": $.cookie("userName"),
		"passWord": $.cookie("passWord"),
		"searchstart": searchstart,
		"searchend": searchend,
		"start": data,
		"end": data + 20
	};
	$.ajax({
		url: uri + "searchLogList",
		type: "get",
		data: { "request": JSON.stringify(jsondata) },
		async: true,
		success: function(result) {
			setTimeout(function() {
				if(JSON.parse(result) == "" || JSON.parse(result) == null) {
					$("#div_scroll_pullup")[0].style.display = "none";
					$("#div_scroll_pulldown")[0].style.display = "none";
					myScroll.refresh();
					var info_d = info_dialog("没有更多日志了");
					info_d.show();
					setTimeout(function() {
						info_d.close();
					}, 2000);
				} else {
					init_LogList(JSON.parse(result));
					$("#div_scroll_pullup")[0].style.display = "none";
					$("#div_scroll_pulldown")[0].style.display = "none";
					myScroll.refresh();
				}
			}, 2000);
		},
		error: function(result) {
			init_LogList();
			return null;
		}
	});
}

function refurbish(start, end) {
	var userName = $.cookie("userName");
	var passWord = $.cookie("passWord");
	jsondata = {
		"userName": $.cookie("userName"),
		"passWord": $.cookie("passWord"),
		"searchstart": searchstart,
		"searchend": searchend,
		"start": start,
		"end": end
	};
	$.ajax({
		url: uri + "searchLogList",
		type: "get",
		data: { "request": JSON.stringify(jsondata) },
		async: true,
		success: function(result) {
			setTimeout(function() {
				$('#wrapper_table').html("");
				init_LogList(JSON.parse(result));
				$("#div_scroll_pullup")[0].style.display = "none";
				$("#div_scroll_pulldown")[0].style.display = "none";
				myScroll.refresh();
			}, 2000);

		},
		error: function(result) {
			init_LogList();
			return null;
		}
	});
}

function init_LogList(list) {
	var table = $("#wrapper_table");
	if(table.children().length <= 0) {
		var i_tr = createElemet("tr");
		i_tr.appendChild(createElemet("td", "用户"));
		i_tr.appendChild(createElemet("td", "操作内容"));
		i_tr.appendChild(createElemet("td", "机构"));
		i_tr.appendChild(createElemet("td", "时间"));
		table.append(i_tr);
	}
	if(list == null)
		return;
	for(var i = 0; i < list.length; i++) {
		var tr = createElemet("tr");
		tr.appendChild(createElemet("td", list[i].operator));
		tr.appendChild(createElemet("td", list[i].content));
		tr.appendChild(createElemet("td", list[i].orgName));
		tr.appendChild(createElemet("td", list[i].date));
		table.append(tr);
	}

}

function createElemet(element, value) {
	var em = document.createElement(element);
	if(value != null) {
		em.innerText = value;
	}
	return em;
}

function createInput(type) {
	var input = document.createElement("input");
	input.setAttribute("type", type);
	return input;
}

function load_dialog(contant) {
	var loading = dialog({
		title: contant,
		width: "auto",
		quickClose: true
	});
	return loading;
}

function info_dialog(content) {
	var info = dialog({
		content: content,
		width: "auto",
		quickClose: true
	});
	return info;
}
function pullDownEvent(){
				$("#div_scroll_pulldown")[0].style.display = "block";
			refurbish(0, 50);
			myScroll.refresh();
}

function pullUpEvent(){
			$("#div_scroll_pullup")[0].style.display = "block";
			load();
			myScroll.refresh();
		}