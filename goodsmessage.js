
	// 开始写商品详情的js代码
	class Message {
		constructor(){
			this.url="http://localhost/xiaomiyouping/data/goods.json";
			this.bigtop=document.querySelector(".bigtop");
			// 首先请求json数据，利用ajax请求
			this.load();
			// this.addEvent();
		}
		load(){
			var that=this;
			ajax({
				url:this.url,
				success:function(res){
					// 将请求来的数据转化为对象
					that.res=JSON.parse(res);
					// 然后开始请求本地存储的数据
					that.getLocal();
					// 放大镜封装为方法
					that.big();
				}
			})
		}
		big(){
			var oboxlittle=document.getElementById("boxlittle");
			var omove=document.getElementById("move");
			var oboxbig=document.getElementById("boxbig");
			var opicture=document.getElementById("picture");
			// 事件绑定，鼠标移入boxlittle触发事件
			oboxlittle.onmousemove=function(eve){
				var e=eve||window.event;
				// 获取距离屏幕的坐标
				var xn=e.clientX;
				var yn=e.clientY;
				// 让小滑块动起来
				var moveleft=xn-oboxlittle.offsetLeft-omove.offsetWidth/2;
				var movetop=yn-oboxlittle.offsetTop-omove.offsetHeight/2;
				// 左边的约束条件
				if(moveleft<0){
					moveleft=0;
				}
				// 右边的约束条件
				if(moveleft>oboxlittle.offsetWidth-omove.offsetWidth){
					moveleft=oboxlittle.offsetWidth-omove.offsetWidth
				}
				if(movetop<0){
					movetop=0;
				}
				if(movetop>oboxlittle.offsetHeight-omove.offsetHeight){
						movetop=oboxlittle.offsetHeight-omove.offsetHeight;
				}
				omove.style.left=moveleft+"px";
				omove.style.top=movetop+"px";
				// 让小滑块显示出来
				omove.style.display="block";
				// 让大盒子显示出来
				oboxbig.style.display='block';
				// oboxbig.style.z-index=999;
				oboxbig.style.left=oboxlittle.offsetLeft+oboxlittle.offsetWidth+'px';
				oboxbig.style.top=oboxlittle.offsetTop+'px';
				var opictureleft=moveleft/(oboxlittle.offsetWidth-omove.offsetWidth)*(oboxbig.offsetWidth-opicture.offsetWidth);
				var opicturetop=movetop/(oboxlittle.offsetHeight-omove.offsetHeight)*(oboxbig.offsetHeight-opicture.offsetHeight);
				opicture.style.left=opictureleft+"px";
				opicture.style.top=opicturetop+"px";
				// 让鼠标滑块消失时放大镜消失
				oboxlittle.onmouseleave=function(){
					oboxbig.style.display="none";
					omove.style.display="none";
				}
			}
		}
		// 本地存储拿到数据,将本地存储的数据转化为对象
		getLocal(){
			this.goods=localStorage.getItem("goods")?JSON.parse(localStorage.getItem("goods")):[];
			// 渲染页面
			this.display()
		}
		display(){
			// 将本地存储的数据拿出来
			var str=" ";
			// 利用双for循环比较数据，如果id相同就把数据拿出来
			// 这里本地存储的数据是goods
			for(var i=0;i<this.res.length;i++){
				for(var j=0;j<this.goods.length;j++){
					if(this.res[i].goodsId==this.goods[j].id){
			   			str=`<div id="boxlittle">
								<img src="${this.res[i].url}" alt="">
								<!-- 小滑块 -->
								<p id="move"></p>
							</div>
							<div id="boxbig">
								<img src="${this.res[i].url}" alt="" id="picture">
							</div>
							<div id="right">
								<p>${this.res[i].name}</p>
								<div>
									<a>售价</a>&nbsp&nbsp<a style="color:red">￥${this.res[i].price}</a>
									<br />
									<br />
									<a href="#">满99包邮&nbsp&nbsp有品配送&nbsp&nbsp有品三方</a>
									<br />
									<br />
									<a href="#">有小米有品提供配送服务&nbsp,舒可士深圳(科技)公司配送(查看商家资质)</a>
								</div>
								购买数量<input type="number"placeholder=1 min=1>
								<span>加入购物车</span>
								<span>立即购买</span>
							</div>`
					}
				}
			}
			console.log(str)
			this.bigtop.innerHTML=str;
			localStorage.removeItem("goods")
		}
		// addEvent(){
		// 	var that=this;
		// 	this.tbody.addEventListener("click",function(eve){
		// 		var e=eve||window.event;
		// 		var target=e.target||e.srcElement;
		// 		if(target.className=="delete"){
		// 			that.id=target.parentNode.getAttribute("index");
		// 			// 删除dom元素
		// 			target.parentNode.remove();
		// 			that.setLocal(function(i){
		// 				that.goods.splice(i,1);
		// 			})
		// 		}
		// 	})
		// 	this.tbody.addEventListener("input",function(eve){
		// 		var e=eve||window.event;
		// 		var target=e.target||e.srcElement;
		// 		if(target.className=="num"){
		// 			that.val=target.value;
		// 			that.id=target.parentNode.parentNode.getAttribute("index");
		// 			that.setLocal(function(i){
		// 				that.goods[i].num=that.val;
		// 			})
		// 		}
		// 	})
		// }
		// setLocal(fn){
		// 	for(var i=0;i<this.goods.length;i++){
		// 		if(this.goods[i].id==this.id){
		// 			fn(i);
		// 		}
		// 	}
		// 	localStorage.setItem("goods",JSON.stringify(this.goods));
		// }
	}
	new Message();
