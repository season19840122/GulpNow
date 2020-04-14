var vcload = false;
var vcPswd = false;
/**
 * 刷新检验码
 */
function refreshCheckcode(){
	var nowTime = new Date();
	$("#checkCode").attr("src", "checkCode.do?=t"+nowTime.getTime());
}
/**
 * vc控件被触发
 */
function checkCodeSel(e){
	if(e.checked){
		vcPswd = true;
		if(!vcload){
			initPlug();
			vcload = true;
		}
		document.getElementById("inputEdit").style.display="none";
		document.getElementById("safeEdit").style.display="";
	}else{
		vcPswd = false;
		document.getElementById("inputEdit").style.display="";
		document.getElementById("safeEdit").style.display="none";
	}
	document.getElementById("needSafe").value = e.checked;
}
/**
 * login 按钮被点击
 */
function loginDefaultClick(actionUrl){
	var pswd = document.getElementById("password");
	var md5 = document.getElementById("md5")
	var userName = document.getElementById("userName");
	try{
		var result = vcPswd &&  icafeEditer.getPassword();
	}catch(e){
		return false;
	}
	if(vcPswd && icafeEditer){
		icafeEditer.isNeedMD5Encode(false);
		pswd.value = icafeEditer.getPassword();
		md5.value = true;
	}else{
		pswd.value =hex_md5(document.getElementById("passwordInp").value);
        document.getElementById("passwordInp").value="" ;
		md5.value = true;
	}
	
	
	if(userName.value == "" 
		|| userName.value=="用户名/邮箱/手机号" 
		|| pswd.value==""){
		
		showError("请输入用户名和密码");
		return;
	}

	document.getElementById("login_form_").action=actionUrl;
	document.getElementById("login_form_").target="";
	document.forms[0].submit();
}

function loginClick(){
	loginDefaultClick("/login.do");

}function yhloginClick(){
	loginDefaultClick("/yhLogin.do");
}
function f1loginClick(){
	loginDefaultClick("/f1Login.do");
}

function bodyLoad(){
	isIE = $.browser.msie;
	if(isIE){
		document.getElementById("safeDiv").style.display="";
//		document.getElementById("needSafeCheck").checked = needSafe;
//		checkCodeSel(document.getElementById("needSafeCheck"));
	}else{
		document.getElementById("safeDiv").style.display="none";
	}
	if(!$("#errorSpan").html()||$("#errorSpan").html()=='&nbsp;'){
		$("#errorSpan").removeClass("errorSpan");
	}
	else{
		$("#errorSpan").addClass("errorSpan");
	}
}
/**
 * 显示错误
 */
function showError(msg){
	document.getElementById("errorSpan").innerHTML = msg;
	$("#errorSpan").addClass("errorSpan");
}