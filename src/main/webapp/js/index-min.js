var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.inherits=function(a,b){function c(){}c.prototype=b.prototype;a.superClass_=b.prototype;a.prototype=new c;a.prototype.constructor=a;for(var d in b)if(Object.defineProperties){var e=Object.getOwnPropertyDescriptor(b,d);e&&Object.defineProperty(a,d,e)}else a[d]=b[d]};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)};
$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.symbolCounter_=0;$jscomp.Symbol=function(a){return $jscomp.SYMBOL_PREFIX+(a||"")+$jscomp.symbolCounter_++};
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.iterator;a||(a=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[a]&&$jscomp.defineProperty(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(a){var b=0;return $jscomp.iteratorPrototype(function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(a){$jscomp.initSymbolIterator();a={next:a};a[$jscomp.global.Symbol.iterator]=function(){return this};return a};$jscomp.iteratorFromArray=function(a,b){$jscomp.initSymbolIterator();a instanceof String&&(a+="");var c=0,d={next:function(){if(c<a.length){var e=c++;return{value:b(e,a[e]),done:!1}}d.next=function(){return{done:!0,value:void 0}};return d.next()}};d[Symbol.iterator]=function(){return d};return d};
$jscomp.polyfill=function(a,b,c,d){if(b){c=$jscomp.global;a=a.split(".");for(d=0;d<a.length-1;d++){var e=a[d];e in c||(c[e]={});c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&$jscomp.defineProperty(c,a,{configurable:!0,writable:!0,value:b})}};$jscomp.polyfill("Array.prototype.keys",function(a){return a?a:function(){return $jscomp.iteratorFromArray(this,function(a){return a})}},"es6-impl","es3");var EntityBase=function(a){this.base=a};
EntityBase.prototype.list=function(a){a=void 0===a?{}:a;return $.ajax({type:"post",url:"/"+this.base+"/list",dataType:"json",data:a})};EntityBase.prototype.select=function(a){var b=new FormData;b.append("id",a);return fetch("/"+this.base+"/select",{method:"post",body:b}).then(function(a){return a.json()})};EntityBase.prototype.save=function(a){return $.ajax({type:"post",url:"/"+this.base+"/save",dataType:"json",data:a,processData:!1,contentType:!1})};
var ActorEntity=function(){EntityBase.call(this,"actor")};$jscomp.inherits(ActorEntity,EntityBase);var AudioEntity=function(){EntityBase.call(this,"audio")};$jscomp.inherits(AudioEntity,EntityBase);AudioEntity.Type={OTHER:0,FX:1,BGM:2};var ImageEntity=function(){EntityBase.call(this,"image")};$jscomp.inherits(ImageEntity,EntityBase);ImageEntity.Type={OTHER:0,ACT:1,BACK:2,FORE:3};var ProductEntity=function(){EntityBase.call(this,"product")};$jscomp.inherits(ProductEntity,EntityBase);
var StageEntity=function(){EntityBase.call(this,"stage")};$jscomp.inherits(StageEntity,EntityBase);StageEntity.prototype.saveMap=function(a){return fetch("/"+this.base+"/saveMap",{method:"post",body:a,credentials:"include"}).then(function(a){return a.json()})};
var AccessibleRange=function(a,b){var c=document.createElement("legend");c.textContent="Access:";Object.keys(AccessibleRange.List).forEach(function(d){var c=b+d,f=document.createElement("input"),g=document.createElement("label");f.setAttribute("id",c);f.setAttribute("type","radio");f.setAttribute("name","access");f.setAttribute("value",d);g.setAttribute("for",c);g.textContent=AccessibleRange.List[d];a.append(f);a.append(g)});a.setAttribute("data-role","controlgroup");a.setAttribute("data-type","horizontal");
a.setAttribute("data-mini","true");a.append(c);$(a).parents("form").trigger("create")};AccessibleRange.List={0:"Private",1:"Protected",2:"Public"};
var AudioSelectionButton=function(a,b){b=void 0===b?"OTHER":b;var c=this,d=document.createElement("legend"),e=document.createElement("a"),f=document.createElement("input"),g=document.createElement("div"),h=document.createElement("button"),k=document.createElement("button"),l=document.createElement("button"),m=document.createElement("fieldset"),n=a.toLowerCase();d.textContent=a+":";e.setAttribute("href","#audioChooser");e.setAttribute("data-target",n);e.setAttribute("data-filter",b);e.setAttribute("data-rel",
"popup");e.className="ui-btn ui-mini ui-corner-all ui-shadow ui-btn-icon-left ui-icon-audio";e.textContent="Choose...";f.setAttribute("type","hidden");f.setAttribute("name",n);f.addEventListener("valueChanged",function(){c.resetImage()});h.textContent="W";h.setAttribute("data-icon","audio");h.addEventListener("click",function(a){a.preventDefault();window.open("/audio/webm/?id="+f.value)});k.textContent="A";k.setAttribute("data-icon","audio");k.addEventListener("click",function(a){a.preventDefault();
window.open("/audio/audio/?id="+f.value)});l.textContent="Del";l.setAttribute("data-icon","delete");l.setAttribute("data-theme","b");l.className="ui-btn-icon-notext";l.addEventListener("click",function(a){a.preventDefault();f.value="";c.resetImage()});g.append(h);g.append(k);g.append(l);m.append(d);m.append(e);m.append(f);m.append(g);$(g).controlgroup({type:"horizontal",mini:!0});this.fieldset=m;this.button=e;this.hidden=f;this.controlgroup=g};
AudioSelectionButton.prototype.resetImage=function(){this.hidden.value?($(this.controlgroup).show(),$(this.button).hide()):($(this.controlgroup).hide(),$(this.button).show())};var Customer=function(){};Customer.prototype.check=function(){return $.ajax({type:"post",url:"/customer/check",dataType:"json",data:{}})};Customer.prototype.signIn=function(a,b){return $.ajax({type:"post",url:"/customer/signIn",dataType:"json",data:{userid:a,passwd:b}})};
var ImageSelectionButton=function(a,b){b=void 0===b?"OTHER":b;var c=this,d=document.createElement("legend"),e=document.createElement("a"),f=document.createElement("input"),g=document.createElement("input"),h=document.createElement("fieldset"),k=a.toLowerCase();d.textContent=a+":";e.setAttribute("href","#imageChooser");e.setAttribute("data-target",k);e.setAttribute("data-filter",b);e.setAttribute("data-rel","popup");e.className="ui-btn ui-mini ui-corner-all ui-shadow ui-btn-icon-left ui-icon-heart";
e.textContent="Choose...";f.setAttribute("type","hidden");f.setAttribute("name",k);f.addEventListener("valueChanged",function(){c.resetImage()});g.setAttribute("type","image");g.addEventListener("click",function(a){a.preventDefault();f.value="";c.resetImage()});h.append(d);h.append(e);h.append(f);h.append(g);this.fieldset=h;this.button=e;this.hidden=f;this.img=g};
ImageSelectionButton.prototype.resetImage=function(){var a=this.hidden.value;a?(this.img.setAttribute("src","/image/src/"+a),$(this.img).show(),$(this.button).hide()):(this.img.removeAttribute("src"),$(this.img).hide(),$(this.button).show())};
var ListviewRow=function(a,b){b=void 0===b?null:b;var c=document.createElement("img"),d=document.createElement("span"),e=document.createElement("p"),f=document.createElement("a"),g=document.createElement("li");null!=b&&c.setAttribute("src",b);d.textContent=a.name;e.textContent=a.description;a.href&&f.setAttribute("href",a.href);f.append(c);f.append(d);f.append(e);a.count&&(b=document.createElement("span"),b.classList.add("ui-li-count"),b.textContent=a.count,f.append(b));g.append(f);this.img=c;this.anchor=
f;this.li=g},ResourceChooser=function(a){this.id="#"+a;this.setupEvents()};ResourceChooser.prototype.setupEvents=function(){var a=this;document.querySelectorAll('[href="'+this.id+'"]').forEach(function(b){var c=$(b).parents("fieldset")[0];b.addEventListener("click",function(){var d=b.getAttribute("data-target"),e=b.getAttribute("data-filter"),d=c.querySelector('[name="'+d+'"]');a.list(d,e)})})};ResourceChooser.prototype.createRow=function(a,b){return new ListviewRow(a,void 0===b?null:b)};
ResourceChooser.prototype.list=function(a,b){var c=this;b={keyword:"",type:b};this.listView=document.querySelector(this.id+" > ul");this.listView.textContent="Loadling...";this.entity.list(b).then(function(b){c.listView.textContent=null;b.forEach(function(b){var d=c.createRow(b);c.listView.append(d.li);d.anchor.addEventListener("click",function(){c.embedId(a,b.id)})});$(c.listView).listview("refresh")})};
ResourceChooser.prototype.embedId=function(a,b){a.value=b;a.dispatchEvent(ResourceChooser.ValueChangedEvent);$(this.id).popup("close")};ResourceChooser.ValueChangedEvent=new Event("valueChanged");var TitleBg=function(){this.x=0;this.width=1200;this.move()};TitleBg.prototype.move=function(a){var b=this;document.querySelector("div[data-role=header]").style.backgroundPosition=-this.x+"px 0";this.x++;this.width<this.x&&(this.x=0);requestAnimationFrame(function(a){return b.move(a)})};
document.addEventListener("DOMContentLoaded",function(){new AppMain;new TitleBg});
var AppMain=function(){var a=this;this.selectedId="";this.product=new ProductEntity;this.product.list().then(function(b){a.setResult(b)});this.customer=new Customer;$("#loginForm").submit(function(){var b=$("#loginPanel [name=userid]").val(),c=$("#loginPanel [name=passwd]").val();a.setMessage();a.customer.signIn(b,c).then(function(b){b.ok?($("#loginPanel").panel("close"),a.checkCustomer()):a.setMessage("Incorrect username or password.")});return!1});this.checkCustomer()};
AppMain.prototype.checkCustomer=function(){this.customer.check().then(function(a){if(a.ok){a=document.getElementById("repositoryButton");var b=document.getElementById("editButton");a.classList.remove("ui-state-disabled");b.classList.remove("ui-state-disabled");$("#loginPanel [name=passwd]").hide();$("#loginPanel button").hide()}})};AppMain.prototype.setMessage=function(a){a=void 0===a?null:a;document.querySelector("#loginPanel .message").textContent=a};
AppMain.prototype.setResult=function(a){var b=this,c=document.getElementById("listView");a.forEach(function(a){a.href="#detailPopup";var d=new ListviewRow(a,"img/icon.listview.png");c.append(d.li);d.anchor.addEventListener("click",function(c){c.preventDefault();b.clearDetailInfo();b.product.select(a.id).then(function(a){b.fillDetailInfo(a)});b.selectedId=a.id})});$(c).listview("refresh")};AppMain.prototype.clearDetailInfo=function(){this.fillDetailInfo({name:null,description:null,updated:""})};
AppMain.prototype.fillDetailInfo=function(a){var b=a.updated?(new Date(a.updated)).toISOString():"",c=a.id?"/product/play/"+a.id:"",d=document.getElementById("playButton"),e=a.id?"/product/detail/"+a.id:"",f=document.getElementById("editButton");document.getElementById("productName").value=a.name;document.getElementById("productDescription").value=a.description;document.getElementById("updated").textContent=b;d.setAttribute("href",c);f.setAttribute("href",e);a.id?d.classList.remove("ui-state-disabled"):
d.classList.add("ui-state-disabled")};
