/*定义一个全局变量*/
window.itcast={};/*存储我们将要封装的事件方式*/
/*设置属性 定义一个transitionEnd一个事件绑定方法*/
itcast.transitionEnd=function(dom,callback){
	/*过滤结束事件的绑定
	1、谁需要绑定transitionEnd
	2、需要处理的函数*/
	if(dom && typeof dom === 'object'){
		dom.addEventListener('webkitTransitionEnd',function(){
			/*if (callback){
				callback();
			}*/
			callback && callback();
		});
		dom.addEventListener('transitionEnd',function(){
			callback && callback();
		});
	}
}