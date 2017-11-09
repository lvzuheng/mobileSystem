//添加成员功能
function increaseOperator_event() {

	init_orgList($("#select_org"));
	var dialog_add = dialog({
		title: '添加管理员',
		content: $("#div_add"),
		width: "250px",
		okValue: '添加',
		ok: function() {
			button_add_event();
		},
		cancelValue: '取消',
		cancel: function() {},
		quickClose: true
	});
	dialog_add.show();

}

function button_add_event() {
	
		var loading = load_dialog("添加中");
	loading.show();
	
	if($("#input_add_userName").val() != null && $("#select_org").val() != null && $("#select_role").val() != null) {
		var jsondata = {
			"name": $("#input_add_userName").val(),
			"org": $("#select_org").val(),
			"role": $("#select_role").select().val()
		};
		$.ajax({
			url: uri + "insertOperator",
			type: "get",
			data: { "request": JSON.stringify(jsondata), },
			async: true,
			success: function(result) {
				$('#div_add').hide(200);
				$("#input_editor_opeartor").val("");
				$("#select_parent").val("")
				init_data(0, 50);
						loading.close();
				var info_d = info_dialog("添加成功");
				info_d.show();
				setTimeout(function() {
					info_d.close();
				}, 2000);
			},
			error: function(result) {
					var info_d = info_dialog("添加失败");
				info_d.show();
				setTimeout(function() {
					info_d.close();
				}, 2000);;
			}
		});
	}
}

//查询功能
function searchOperator_event() {

	var dialog_search = dialog({
		title: '查询管理员',
		content: $("#div_search"),
		width: "auto",
		okValue: '查询',
		ok: function() {
			button_search_event();
		},
		cancelValue: '取消',
		cancel: function() {
			value = null;
		},
		quickClose: true
	});
	dialog_search.show();
}

function button_search_event() {
	if($("#input_search_value").val() != null) {
		//		var jsondata = {
		//			"value": $("#input_search_value").val(),
		//		};
		value = $("#input_search_value").val();
		pullDownEvent();
		$("#input_search_value").val("");
		$('#wrapper_table').html("");
		$('#cancel_search').css("display", "");
	}
}

// 编辑功能
function edit_event(tr) {
	var select = $("#select_editor_org");
	select.html("");
	init_orgList(select);
	$("#input_editor_id").val(tr.get(0).innerText)
	$("#input_editor_opeartor").val(tr.get(1).innerText);
	$("#select_editor_org").val(tr.get(2).innerText);
	$("#select_editor_role").value = tr.get(3).innerText;
	var dialog_edit = dialog({
		title: '编辑管理员',
		content: $("#div_editor"),
		width: "250px",
		button: [{
				value: '取消',
				callback: function() {
					value = null;
					refurbish(0, 50);
					dialog_edit.close();
				}
			},
			{
				value: '保存',
				callback: function() {
					edit_save_event();
				}
			},
			{
				value: "删除",
				callback: function() {
					edit_delete_event();
				}
			}
		],
		quickClose: true
	});
	dialog_edit.show();
}

function edit_save_event() {
	if($("#input_editor_id").val() == null || $("#input_editor_opeartor").val() == null || $("#select_editor_org").val()==null || $("#select_editor_role").val()==null)
		return;
		var loading = load_dialog("修改中");
	loading.show();
	var jsondata = {
		"operator": userName,
		"id":$("#input_editor_id").val(),
		"name": $("#input_editor_opeartor").val(),
		"org": $("#select_editor_org").val(),
		"role":$("#select_editor_role").val()
	};
	$.ajax({
		url: uri + "updateOperator",
		type: "get",
		data: { "request": JSON.stringify(jsondata), },
		async: true,
		success: function(result) {
			$('#div_editor').hide(200);
			init_data(0, 50);
					loading.close();
			var info_d = info_dialog("修改成功");
			info_d.show();
			setTimeout(function() {
				info_d.close();
			}, 2000);
		},
		error: function(result) {
			loading.close();
			var info_d = info_dialog("修改失败");
			info_d.show();
			setTimeout(function() {
				info_d.close();
			}, 2000);
		}
	});
}

function edit_delete_event() {
		var loading = load_dialog("删除中");
	loading.show();
	var jsondata = {
		"operator": userName,
		"deleteId": $("#input_editor_id").val()
	};
	$.ajax({
		url: uri + "deleteOperator",
		type: "get",
		data: { "request": JSON.stringify(jsondata), },
		async: true,
		success: function(result) {
				$('#div_editor').hide(200);
				init_data(0, 50);
						loading.close();
			var info_d = info_dialog("删除成功");
			info_d.show();
			setTimeout(function() {
				info_d.close();
			}, 2000);
		},
		error: function(result) {
			loading.close();
			var info_d = info_dialog("删除失败");
			info_d.show();
			setTimeout(function() {
				info_d.close();
			}, 2000);
		}
	});
}
//初始化组织机构下拉框
function init_orgList(select) {
	if(orgList == null) {
		getOrgList();
	}
	for(var i = 0; i < orgList.length; i++) {
		var option = document.createElement("option");
		option.appendChild(document.createTextNode(orgList[i].name));
		select.append(option);
	}
}

function cancel_search() {
	value = null;
	pullDownEvent();
	$('#cancel_search').css("display", "none");
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