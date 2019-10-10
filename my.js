;(function(){
	// "use strict"
	// 购物车部分的js代码
	class List  {
		constructor(){
			this.url="http://localhost/xiaomiyouping/data/goods.json";
			this.body=document.querySelector(".body");
			// 请求数据,要开启ajax
			this.load();
			// 利用事件委托将点击加入购物车可以获得商品的id
			this.addEvent();
		}
		// 开启ajax
		load(){
			var that=this;
			ajax({
				url:this.url,
				success:function(res){
					that.res=JSON.parse(res);
					that.display();
					// 拿到数据后开始渲染页面了
				}
			})
		}
		display(){
			var str="";
			for(var i=0;i<this.res.length;i++){
				str+=`<div class="goods" index="${this.res[i].goodsId}">
					<img src="${this.res[i].url}" alt="">
						<a href="./goodsmessage.html" class="btn1">${this.res[i].tips}</a>
						<p>${this.res[i].name}</p>
						<p>${this.res[i].price}</p>
						<span class="btn">加入购物车</span>
				</div>`
			}
			this.body.innerHTML=str;
		}
		addEvent(){
			var that =this;
			this.body.addEventListener("click",function(eve){
				var e=eve||window.event;
				// 兼容
				var target=e.target||e.srcElement;
				if(target.className=="btn"||target.className=="btn1"){
					that.id=target.parentNode.getAttribute("index");
					// 点击已经可以获取到id了
					// 利用localstorage本地存储购物车的商品信息
					that.setLocal();
				}
			})
		}
		// 购物车的记忆部分
		setLocal(){
			// 现将其转化为数组
			this.goods=localStorage.getItem("goods")?JSON.parse(
				localStorage.getItem("goods")):[];
			// 购物车内原来没有商品，第一次存储，所以直接存储即可
			if(this.goods.length<1){
				this.goods.push({
					id:this.id,
					num:1
				})
				// 不是第一次存储
			}else{
				var onoff=true;
				for(var i=0;i<this.goods.length;i++){
					if(this.goods[i].id===this.id){
						this.goods[i].num++;
						onoff=false;
					}
				}
				if(onoff){
					this.goods.push({
						id:this.id,
						num:1
					})
				}
			}
			// 正式将数据本地存储
			localStorage.setItem("goods",JSON.stringify(this.goods));
			// 本地存储时利用键和值进行存储
		}
	}
	   new List();
})();