var version="1.0.0.2";
var uuid="495FC27E-C3BF-42EE-B060-C31E82CF2383";
var isIE=true;
var icafeEditer;

function getDom(id){
	return document.getElementById(id);
}
function initPlug(msg,downloadFun,updateFun,errorFun){
	if($.browser.msie){
		var safeEdit = $("#safeEdit");
		if (safeEdit.length==0){
			return;
		}
		safeEdit.html("<OBJECT name='kedou_pwd_edit'  tabindex='2' id='kedou_pwd_edit' style='width: 174px;height: 23px;border:1px solid #c6d7e0;'"+
						"CLASSID='CLSID:"+uuid+"' CODEBASE='vc_plugin/ICafeSafeEdit.CAB' onclick='checkVc();'></OBJECT>");
		showOrUpdate(updateFun,downloadFun);
	}else{
		isIE=false;
		errorFun=errorFun?errorFun:defaultErrorFun;
		errorFun.call(this,msg);
	}

}
function isNeedUpdate(){
	icafeEditer=getDom("kedou_pwd_edit");
	
	return !icafeEditer.init(version);
}
function showOrUpdate(updateFun,downloadFun){
	try{
		if(isNeedUpdate()){
			updateFun=updateFun?updateFun:defaultUpdateFun;
			updateFun.call();
		}
		showPwdEdit();
	}catch(e){
		setTimeout(function(){
			downloadFun=downloadFun?downloadFun:warnUserDownloadActiveX;
			downloadFun.call();
		}, 500);
	}
}
var defaultErrorFun = function (msg){
	msg = (msg ? msg : "<span class='cat5' style='border:1px solid #FF0000;color:#FF0000 !important;display:block;line-height:22px;margin-left:125px;text-align:center;text-decoration:underline;width:173px;'>请使用IE浏览器</span>");
	getDom("safeEdit").innerHTML = msg;
}
var defaultUpdateFun=function(){
	if(confirm("顺网通行证安全控件有更新，是否升级？")){
		window.open( "vc_plugin/ICafeSafeEdit.exe","_self");
	}
}
function showPwdEdit(){
	try{
		getDom("safeEdit").style.display="";
	}catch(e){}
}
var warnUserDownloadActiveX = function (){
	showPwdEdit();
	getDom("safeEdit").innerHTML = "<a href='vc_plugin/ICafeSafeEdit.exe' style='border:1px solid #FF0000;color:#FF0000 !important;display:block;line-height:22px;text-align:center;text-decoration:underline;width:175px;'>请点此安装控件</a>";
}

function getPassword(){
	return icafeEditer.getPassword();
}