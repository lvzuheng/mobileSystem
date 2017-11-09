var uri = connectUrl + "terminal/";
var myScroll;
var fresh = true;
var orgList;
var orgIdList = new Array();
var value = null;

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
		} else if(this.y < this.maxScrollY - 40) {
			pullUpEvent();
		}
	});
	var load_dia = load_dialog("加载中");
	load_dia.show();
	getOrgList();
	init_data(0, 50);
	load_dia.close();
}

function init_data(start, end) {
	var userName = $.cookie("userName");
	var passWord = $.cookie("passWord");
	jsondata = {
		"orgid": orgIdList,
		"start": start,
		"end": end
	};
	$.ajax({
		url: uri + "terminalList",
		type: "get",
		data: { "request": JSON.stringify(jsondata) },
		async: true,
		success: function(result) {
			$('#wrapper_table').html("");
			init_terminalList(JSON.parse(result));
			$("#div_scroll_pullup")[0].style.display = "none";
			$("#div_scroll_pulldown")[0].style.display = "none";
			myScroll.refresh();
		},
		error: function(result) {
			init_terminalList();
			return null;
		}
	});
}

function load() {
	var userName = $.cookie("userName");
	var passWord = $.cookie("passWord");
	var data = $('#wrapper_table').children().children().length;
	jsondata = {
		"orgid": orgIdList,
		"value": value,
		"start": data,
		"end": data + 20
	};
	$.ajax({
		url: uri + "terminalList",
		type: "get",
		data: { "request": JSON.stringify(jsondata) },
		async: true,
		success: function(result) {
			setTimeout(function() {
				if(JSON.parse(result) == "" || JSON.parse(result) == null) {
					$("#div_scroll_pullup")[0].style.display = "none";
					$("#div_scroll_pulldown")[0].style.display = "none";
					myScroll.refresh();
					var info_d = info_dialog("没有更多设备了");
					info_d.show();
					setTimeout(function() {
						info_d.close();
					}, 2000);
				} else {
					init_terminalList(JSON.parse(result));
					$("#div_scroll_pullup")[0].style.display = "none";
					$("#div_scroll_pulldown")[0].style.display = "none";
					myScroll.refresh();
				}
			}, 2000);
		},
		error: function(result) {
			init_terminalList();
			return null;
		}
	});
}

function refurbish(start, end) {
	var userName = $.cookie("userName");
	var passWord = $.cookie("passWord");
	jsondata = {
		"orgid": orgIdList,
		"value": value,
		"start": start,
		"end": end
	};
	$.ajax({
		url: uri + "terminalList",
		type: "get",
		data: { "request": JSON.stringify(jsondata) },
		async: true,
		success: function(result) {
			setTimeout(function() {
				$('#wrapper_table').html("");
				init_terminalList(JSON.parse(result));
				$("#div_scroll_pullup")[0].style.display = "none";
				$("#div_scroll_pulldown")[0].style.display = "none";
				myScroll.refresh();
			}, 2000);
		},
		error: function(result) {
			init_terminalList();
			return null;
		}
	});
}

function init_terminalList(list) {
	var table = $("#wrapper_table");
	if(table.children().length <= 0) {
		var i_tr = createElemet("tr");
		i_tr.appendChild(createElemet("td", "设备号"));
		i_tr.appendChild(createElemet("td", "用户名"));
		i_tr.appendChild(createElemet("td", "用户号"));
		i_tr.appendChild(createElemet("td", "机构"));
		i_tr.appendChild(createElemet("td", "操作"));
		table.append(i_tr);
	}
	if(list == null)
		return;
	for(var i = 0; i < list.length; i++) {
		var tr = createElemet("tr");
		var controller = createElemet("td", null);
		controller.appendChild(createElemet("button", "编辑"));
		tr.appendChild(createElemet("td", list[i].terminalId));
		tr.appendChild(createElemet("td", list[i].userName));
		tr.appendChild(createElemet("td", list[i].terminalNum));
		tr.appendChild(createElemet("td", list[i].orgName));
		controller.addEventListener('click', function() {
			//			console.log($(this).parent().children().get(0).innerText);
			edit_event($(this).parent().children());
		});
		tr.appendChild(controller);
		table.append(tr);
	}

}

function terminalLoading() {
	var data = $("#wrapper_table").length;
	var jsondata = {

		"start": data,
		"end": data + 20
	};
	$.ajax({
		url: uri + "terminalList",
		type: "get",
		data: { "request": JSON.stringify(jsondata) },
		async: true,
		success: function(result) {
			init_terminalList(JSON.parse(result));
			$("#div_scroll_pullup")[0].style.display = "block";
			myScroll.refresh();
		},
		error: function(result) {
			init_terminalList();
			return null;
		}
	});
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

function getOrgList() {
	jsondata = {
		"userName": $.cookie("userName")
	};
	$.ajax({
		url: uri + "searchOrg",
		type: "get",
		data: { "request": JSON.stringify(jsondata) },
		async: false,
		success: function(result) {
			orgList = JSON.parse(result);
			for(var i = 0; i < orgList.length; i++) {
				orgIdList.push(orgList[i].id);
			}
		},
		error: function(result) {
			return null;
		}
	});
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
