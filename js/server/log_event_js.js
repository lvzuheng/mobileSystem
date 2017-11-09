
//查询功能
function searchLog_event() {
	var dialog_search = dialog({
		title: '消息',
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
	if($("#input_search_start").val() != null) {
		searchstart = $("#input_search_start").val();
	}
	if($("#input_search_end").val() != null){
		searchend = $("#input_search_end").val();
	}
		pullDownEvent();
		$('#cancel_search').css("display", "");
}

function cancel_search() {
	pullDownEvent();
	$('#cancel_search').css("display", "none");
}