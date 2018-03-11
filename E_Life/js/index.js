/*页面加载完成之后执行*/
window.onload=function(){
	/*搜索区块的颜色变化*/
	head();
	/*轮播图*/
	banner();
	/*倒计时*/
	downTime();
};

/*搜索区块的颜色变化*/
function head(){
	/*1、颜色随着页面的滚动逐渐加深
	2、当我们超过轮播图的时候，颜色保持不变*/

	/*获取搜索盒子*/
	var searchBox=document.querySelector('.header_box');
	var appnameBox=document.querySelector('.appname');
	/*获取banner盒子*/
	var bannerBox=document.querySelector('.banner');
	/*获取高度*/
	var h=bannerBox.offsetHeight;

	/*监听window的滚动事件*/
	
	window.onscroll=function(){
		/*不断的获取离顶部的距离*/
		var top=document.body.scrollTop;
		var opacity=0;
		var co="#ffffff";
		if(top<h){
			/*1.颜色随着 页面的滚动  逐渐加深*/
			opacity=top/h*0.85;
		}else{
			 /*2.当我们超过轮播图的时候  颜色保持不变*/
			opacity=0.85;
		}

		/*把透明度设置上去*/
		searchBox.style.background="rgba(255,255,255,"+opacity+")";
		searchBox.style.borderBottom="rgba(0,190,175,"+opacity+")";
		appnameBox.style.color="rgba(51,51,51,"+opacity+")";
	}
}

/*轮播图*/
function banner(){
	/*1、自动的滚动起来 （定时器，过渡）
	2、点随之滚动起来  （改变当前点元素的样式）
	3、图片滑动        （touch事件）
	4、当不超过一定的滑动距离的时候，吸附回去 定位回去
	5、当超过了一定的距离的时候 ，滚动到上一张或下一张*/

	/*获取到dom对象*/
	/*banner*/
	var banner=document.querySelector('.banner');
	/*屏幕的宽度*/
	var w=banner.offsetWidth;
	/*图片盒子*/
	var imageBox=banner.querySelector('ul:first-child');
	/*点盒子*/
	var pointBox=banner.querySelector('ul:last-child');
	/*所有的点*/
	var points=pointBox.querySelectorAll('li');

	/*添加过渡*/
	var addTransition=function(){
		imageBox.style.webkitTransition="all .2s";/*兼容*/
		imageBox.style.transition="all .2s";
	}
	/*删除过渡*/
	var removeTransition=function(){
		imageBox.style.webkitTransition="none";/*兼容*/
		imageBox.style.transition="none";
	}
	/*改变位置*/
	var setTranslateX=function(translateX){
		imageBox.style.webkitTransform="translateX("+translateX+"px)";/*兼容*/
		imageBox.style.transform="translateX("+translateX+"px)";
	}

	/*1、自动的滚动起来 （定时器，过渡）*/
	var index=1;
	var timer=setInterval(function(){
		/*箱子滚动*/
		index++;
		/*定位 过渡来做定位的，这样才有动画
		加过渡*/
		addTransition();
		/*改变位置*/
		setTranslateX(-index*w);
	},4000);

	/*绑定一个过渡结束事件*/
	itcast.transitionEnd(imageBox,function(){
		//console.log('transitionEnd');
		if(index>=4){
			index=1;
			/*做定位
			加过渡*/
			removeTransition();
			setTranslateX(-index*w);
		}else if(index<=0){
			index=3;
			/*加过渡*/
			removeTransition();
			/*改变位置*/
			setTranslateX(-index*w);
		}
		/*index 1-3 索引范围*/
		/*point 0-2*/
		setPoint();
	});

	/*2、点随之滚动起来  （改变当前点元素的样式）*/
	var setPoint=function(){
		 /*把所有点的样式清除*/
		for (var i = 0; i < points.length; i++) {
			points[i].className=" ";
		}
		points[index-1].className="now";
	}

	/*3.图片滑动 touch事件）*/
	var startX=0;
	var moveX=0;
	var distanceX=0;
	var isMove=false;

	imageBox.addEventListener('touchstart',function(e){
		/*清除定时器*/
		clearInterval(timer);
		startX=e.touches[0].clientX;
	});
	imageBox.addEventListener('touchmove',function(e){
		isMove=true;
		moveX=e.touches[0].clientX;
		distanceX=moveX-startX;/*distanceX  值  正负*/
		/*算出当前图片盒子需要定位的位置*/
		//console.log(distanceX);
		/*将要去做定位*/
		var currX=-index*w+distanceX;
		/*删除过渡*/
		removeTransition();
		/*改变位子*/
		setTranslateX(currX);
	});
	imageBox.addEventListener('touchend',function(e){
		/*当超过了一定的距离的时候*/
		if(isMove && (Math.abs(distanceX) > w/3)){
			 /*5.当超过了一定的距离的时候  滚动到上一张或下一张 （一定的距离  1/3  屏幕宽度 过渡）*/
			 if(distanceX>0){
			 	index--;/*向右滑，上一张*/
			 }else{
			 	index++;/*向左滑，下一张*/
			 }
			 addTransition();
			 setTranslateX(-index*w);
		}
		 /*当不超过一定的滑动距离的时候*/
		else{
			 /*4.当不超过一定的滑动距离的时候  吸附回去  定位回去     （一定的距离  1/3  屏幕宽度  过渡）*/
			addTransition();
			setTranslateX(-index*w);
		}

		/*重置*/
		startX=0;
		moveX=0;
		distanceX=0;
		isMove=false;

		/*添加定时器*/
		clearInterval(timer);
		timer=setInterval(function(){
			/*箱子滚动*/
			index++;
			/*定位  过渡来做定位的  这样才有动画*/
            /*加过渡*/
            addTransition();
            /*改变位子*/
            setTranslateX(-index*w);
		},4000);
	});

}