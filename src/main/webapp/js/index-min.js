var $jscomp={scope:{},inherits:function(a,b){function c(){}c.prototype=b.prototype;a.prototype=new c;a.prototype.constructor=a;for(var d in b)if(Object.defineProperties){var f=Object.getOwnPropertyDescriptor(b,d);f&&Object.defineProperty(a,d,f)}else a[d]=b[d]}},EntityBase=function(){};EntityBase.prototype.list=function(a){a=void 0===a?{}:a;return $.ajax({type:"post",url:"/"+this.base+"/list",dataType:"json",data:a})};
EntityBase.prototype.select=function(a){var b=new FormData;b.append("id",a);return fetch("/"+this.base+"/select",{method:"post",body:b}).then(function(a){return a.json()})};EntityBase.prototype.save=function(a){a=new FormData(a);return $.ajax({type:"post",url:"/"+this.base+"/save",dataType:"json",data:a,processData:!1,contentType:!1})};var ActorEntity=function(){EntityBase.call(this);this.base="actor"};$jscomp.inherits(ActorEntity,EntityBase);
var AudioEntity=function(){EntityBase.call(this);this.base="audio"};$jscomp.inherits(AudioEntity,EntityBase);var Customer=function(){};Customer.prototype.check=function(){return $.ajax({type:"post",url:"/customer/check",dataType:"json",data:{}})};Customer.prototype.signIn=function(a,b){return $.ajax({type:"post",url:"/customer/signIn",dataType:"json",data:{userid:a,passwd:b}})};var ImageEntity=function(){EntityBase.call(this);this.base="image"};$jscomp.inherits(ImageEntity,EntityBase);
var Product=function(){EntityBase.call(this);this.base="product"};$jscomp.inherits(Product,EntityBase);var StageEntity=function(){EntityBase.call(this);this.base="stage"};$jscomp.inherits(StageEntity,EntityBase);var TitleBg=function(){this.x=0;this.width=1200;this.move()};TitleBg.prototype.move=function(a){var b=this;document.querySelector("div[data-role=header]").style.backgroundPosition=-this.x+"px 0";this.x++;this.width<this.x&&(this.x=0);requestAnimationFrame(function(a){return b.move(a)})};
document.addEventListener("DOMContentLoaded",function(){new AppMain;new TitleBg});
var AppMain=function(){var a=this;this.selectedId="";this.product=new Product;this.product.list().then(function(b){a.setResult(b)});this.customer=new Customer;$("#loginForm").submit(function(){var b=$("#loginPanel [name=userid]").val(),c=$("#loginPanel [name=passwd]").val();a.setMessage();a.customer.signIn(b,c).then(function(b){b.ok?($("#loginPanel").panel("close"),a.checkCustomer()):a.setMessage("Incorrect username or password.")});return!1});this.checkCustomer()};
AppMain.prototype.checkCustomer=function(){this.customer.check().then(function(a){if(a.ok){a=document.getElementById("repositoryButton");var b=document.getElementById("editButton");a.classList.remove("ui-state-disabled");b.classList.remove("ui-state-disabled");$("#loginPanel [name=passwd]").hide();$("#loginPanel button").hide()}})};AppMain.prototype.setMessage=function(a){a=void 0===a?null:a;document.querySelector("#loginPanel .message").textContent=a};
AppMain.prototype.setResult=function(a){var b=this,c=document.getElementById("listView");a.forEach(function(a){a=b.createRow(a);c.append(a)});$(c).listview("refresh")};
AppMain.prototype.createRow=function(a){var b=this,c=document.createElement("img"),d=document.createElement("span"),f=document.createElement("p"),g=document.createElement("span"),e=document.createElement("a"),h=document.createElement("li");c.setAttribute("src","img/icon.listview.png");d.textContent=a.name;f.textContent=a.description;g.classList.add("ui-li-count");g.textContent=a.count;e.append(c);e.append(d);e.append(f);e.append(g);e.setAttribute("href","#detailPopup");e.setAttribute("data-rel","popup");
h.append(e);e.addEventListener("click",function(c){c.preventDefault();b.clearDetailInfo();b.product.select(a.id).then(function(a){b.fillDetailInfo(a)});b.selectedId=a.id});return h};AppMain.prototype.clearDetailInfo=function(){this.fillDetailInfo({name:null,description:null,updated:""})};
AppMain.prototype.fillDetailInfo=function(a){var b=a.updated?(new Date(a.updated)).toISOString():"",c=a.id?"/product/play?id="+a.id:"",d=document.getElementById("playButton"),f=a.id?"/product/detail?id="+a.id:"",g=document.getElementById("editButton");document.getElementById("productName").value=a.name;document.getElementById("productDescription").value=a.description;document.getElementById("updated").textContent=b;d.setAttribute("href",c);g.setAttribute("href",f);a.id?d.classList.remove("ui-state-disabled"):
d.classList.add("ui-state-disabled")};
