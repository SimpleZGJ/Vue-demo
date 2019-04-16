var Dom=function(){

}
//选择器
Dom.prototype.query=function(ele){
	return document.queryselector(ele);
}
Dom.prototype.queryAll=function(ele){
	return document.queryselectorAll(ele);
}
//创建元素
Dom.prototype.create=function(eleName){
	return document.createElement(eleName);
}