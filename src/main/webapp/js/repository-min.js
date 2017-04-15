var $jscomp={scope:{},inherits:function(a,b){function c(){}c.prototype=b.prototype;a.prototype=new c;a.prototype.constructor=a;for(var d in b)if(Object.defineProperties){var e=Object.getOwnPropertyDescriptor(b,d);e&&Object.defineProperty(a,d,e)}else a[d]=b[d]},getGlobal:function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a}};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.findInternal=function(a,b,c){a instanceof String&&(a=String(a));for(var d=a.length,e=0;e<d;e++){var f=a[e];if(b.call(c,f,e,a))return{i:e,v:f}}return{i:-1,v:void 0}};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(c.get||c.set)throw new TypeError("ES3 does not support getters and setters.");a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)};
$jscomp.polyfill=function(a,b,c,d){if(b){c=$jscomp.global;a=a.split(".");for(d=0;d<a.length-1;d++){var e=a[d];e in c||(c[e]={});c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&$jscomp.defineProperty(c,a,{configurable:!0,writable:!0,value:b})}};$jscomp.polyfill("Array.prototype.find",function(a){return a?a:function(a,c){return $jscomp.findInternal(this,a,c).v}},"es6-impl","es3");var EntityBase=function(){};
EntityBase.prototype.list=function(a){a=void 0===a?{}:a;return $.ajax({type:"post",url:"/"+this.base+"/list",dataType:"json",data:a})};EntityBase.prototype.select=function(a){var b=new FormData;b.append("id",a);return fetch("/"+this.base+"/select",{method:"post",body:b}).then(function(a){return a.json()})};EntityBase.prototype.save=function(a){a=new FormData(a);return $.ajax({type:"post",url:"/"+this.base+"/save",dataType:"json",data:a,processData:!1,contentType:!1})};
var ActorEntity=function(){EntityBase.call(this);this.base="actor"};$jscomp.inherits(ActorEntity,EntityBase);var AudioEntity=function(){EntityBase.call(this);this.base="audio"};$jscomp.inherits(AudioEntity,EntityBase);var Customer=function(){};Customer.prototype.check=function(){return $.ajax({type:"post",url:"/customer/check",dataType:"json",data:{}})};Customer.prototype.signIn=function(a,b){return $.ajax({type:"post",url:"/customer/signIn",dataType:"json",data:{userid:a,passwd:b}})};
var ImageEntity=function(){EntityBase.call(this);this.base="image"};$jscomp.inherits(ImageEntity,EntityBase);var Product=function(){EntityBase.call(this);this.base="product"};$jscomp.inherits(Product,EntityBase);var StageEntity=function(){EntityBase.call(this);this.base="stage"};$jscomp.inherits(StageEntity,EntityBase);var TitleBg=function(){this.x=0;this.width=1200;this.move()};
TitleBg.prototype.move=function(a){var b=this;document.querySelector("div[data-role=header]").style.backgroundPosition=-this.x+"px 0";this.x++;this.width<this.x&&(this.x=0);requestAnimationFrame(function(a){return b.move(a)})};document.addEventListener("DOMContentLoaded",function(){new AppMain;new TitleBg});
var AppMain=function(){this.customer=new Customer;this.stageManager=new StageManager;this.actorManager=new ActorManager;this.imageManager=new ImageManager;this.audioManager=new AudioManager;this.imageChooser=new ImageChooser;this.setupPanel();this.checkCustomer();AppMain.Instance=this};
AppMain.prototype.setupPanel=function(){var a=this;console.log("AppMain::setupPanel");var b=document.querySelector('[data-role="header"] a'),c=document.querySelector('[data-icon="star"]'),d=document.querySelector('[data-icon="bullets"]'),e=document.querySelector('[data-icon="heart"]'),f=document.querySelector('[data-icon="audio"]');c.addEventListener("click",function(){b.setAttribute("href","#stagePanel");a.manager=a.stageManager;a.manager.list()});d.addEventListener("click",function(){b.setAttribute("href",
"#actorPanel");a.manager=a.actorManager;a.manager.list()});e.addEventListener("click",function(){b.setAttribute("href","#imagePanel");a.manager=a.imageManager;a.manager.list()});f.addEventListener("click",function(){b.setAttribute("href","#audioPanel");a.manager=a.audioManager;a.manager.list()});b.addEventListener("click",function(){a.manager.resetPanel()});c.click()};AppMain.prototype.checkCustomer=function(){this.customer.check().then(function(a){})};
var RepositoryManager=function(){this.listView=document.getElementById("listView");this.valueChangedevent=new Event("valueChanged")};RepositoryManager.prototype.setupPanel=function(){var a=this;this.form.addEventListener("submit",function(b){b.preventDefault();a.entity.save(a.form).then(function(c){c.ok?($(a.panel).panel("close"),a.list()):$(a.panel).find(".message").text("Saving failed.")});return!1})};
RepositoryManager.prototype.resetPanel=function(a){a=void 0===a?{}:a;var b=this;$("#"+this.panelId+" :input").each(function(c,d){c=d.getAttribute("name");var e=$(d);if(c){var f="";c in a&&null!=a[c]&&(f=""+a[c]);e.is(":radio")?e.val([f]).checkboxradio("refresh"):e.is("select")?e.val(f).selectmenu("refresh",!1):e.val(f);e.is(":hidden")&&d.dispatchEvent(b.valueChangedevent)}})};
RepositoryManager.prototype.list=function(){var a=this;this.listView.textContent="Loadling...";this.entity.list({keyword:""}).then(function(b){a.listView.textContent=null;b.forEach(function(c){var b=a.createRow(c);b.querySelector("a").addEventListener("click",function(){a.resetPanel(c)});a.listView.append(b)});$(a.listView).listview("refresh")})};
RepositoryManager.prototype.createRow=function(a){var b=document.createElement("img"),c=document.createElement("span"),d=document.createElement("p"),e=document.createElement("a"),f=document.createElement("li");c.textContent=a.name;d.textContent=a.description;e.append(b);e.append(c);e.append(d);e.setAttribute("href","#"+this.panelId);f.append(e);return f};$jscomp.global.Object.defineProperties(RepositoryManager.prototype,{panelId:{configurable:!0,enumerable:!0,get:function(){return this.panel.getAttribute("id")}}});
var StageManager=function(){RepositoryManager.call(this);this.panel=document.getElementById("stagePanel");this.form=document.getElementById("stageForm");this.entity=new StageEntity;this.setupPanel()};$jscomp.inherits(StageManager,RepositoryManager);
StageManager.prototype.setupPanel=function(){var a=this,b=this.form.querySelector(".imageButtons");RepositoryManager.prototype.setupPanel.call(this);this.buttonMap={};"bg1 bg2 bg3 fg1 fg2 fg3".split(" ").forEach(function(c){var d=new ImageButton(c);a.buttonMap[c]=d;b.append(d.fieldset)})};StageManager.prototype.createRow=function(a){a=RepositoryManager.prototype.createRow.call(this,a);a.querySelector("img").setAttribute("src","img/icon.listview.png");return a};
var ActorManager=function(){RepositoryManager.call(this);this.panel=document.getElementById("actorPanel");this.form=document.getElementById("actorForm");this.entity=new ActorEntity;this.setupPanel()};$jscomp.inherits(ActorManager,RepositoryManager);
ActorManager.prototype.createRow=function(a){var b=this,c=document.createElement("img"),d=document.createElement("span"),e=document.createElement("p"),f=document.createElement("a"),g=document.createElement("li");c.setAttribute("src","/image/src?id="+a.imageid);d.textContent=a.name;e.textContent=a.description;f.append(c);f.append(d);f.append(e);f.setAttribute("href","#"+this.panelId);g.append(f);$(f).click(function(){b.resetPanel(a)});return g};
var ImageManager=function(){RepositoryManager.call(this);this.panel=document.getElementById("imagePanel");this.form=document.getElementById("imageForm");this.entity=new ImageEntity;this.setupPanel()};$jscomp.inherits(ImageManager,RepositoryManager);
ImageManager.prototype.createRow=function(a){var b=this,c=document.createElement("img"),d=document.createElement("span"),e=document.createElement("p"),f=document.createElement("a"),g=document.createElement("li");c.setAttribute("src","/image/src?id="+a.id);d.textContent=a.name;e.textContent=a.description;f.append(c);f.append(d);f.append(e);f.setAttribute("href","#"+this.panelId);g.append(f);$(f).click(function(){b.resetPanel(a)});return g};
ImageManager.prototype.resetPanel=function(a){a=void 0===a?{}:a;RepositoryManager.prototype.resetPanel.call(this,a);var b=document.getElementById("image.thumbnail");a.id?b.setAttribute("src","/image/src?id="+a.id):b.removeAttribute("src")};var AudioManager=function(){RepositoryManager.call(this);this.panel=document.getElementById("audioPanel");this.form=document.getElementById("audioForm");this.entity=new AudioEntity;this.setupPanel()};$jscomp.inherits(AudioManager,RepositoryManager);
AudioManager.prototype.createRow=function(a){var b=this,c=document.createElement("img"),d=document.createElement("span"),e=document.createElement("p"),f=document.createElement("a"),g=document.createElement("li");c.setAttribute("src","data:image/png;base64,"+a.image);d.textContent=a.name;e.textContent=a.description;f.append(c);f.append(d);f.append(e);f.setAttribute("href","#"+this.panelId);g.append(f);$(f).click(function(){b.resetPanel(a)});return g};
var ImageButton=function(a){var b=this,c=document.createElement("fieldset"),d=document.createElement("a"),e=document.createElement("input"),f=document.createElement("img"),g=document.createElement("fieldset"),h=-1!=a.indexOf("b")?"back":"fore";c.textContent=a.toUpperCase()+":";d.setAttribute("href","#imageChooser");d.setAttribute("data-target",a);d.setAttribute("data-filter",h);d.setAttribute("data-rel","popup");d.className="ui-btn ui-corner-all ui-shadow ui-icon-heart ui-btn-icon-left ui-btn-a";
d.textContent="Choose...";e.setAttribute("type","hidden");e.setAttribute("name",a);e.addEventListener("valueChanged",function(){b.resetImage()});g.append(c);g.append(d);g.append(e);g.append(f);this.fieldset=g;this.button=d;this.hidden=e;this.img=f};ImageButton.prototype.resetImage=function(){var a=this.hidden.value;a?(this.img.setAttribute("src","/image/src?id="+a),$(this.button).hide()):(this.img.removeAttribute("src"),$(this.button).show())};
var ImageChooser=function(){var a=this;this.listView=document.querySelector("#imageChooser > ul");this.entity=new ImageEntity;var b={act:1,back:2,fore:3,other:0};document.querySelectorAll('[href="#imageChooser"]').forEach(function(c){c.addEventListener("click",function(){var d=c.getAttribute("data-target"),e=c.getAttribute("data-filter");a.list(a.manager.buttonMap[d],b[e])})})};
ImageChooser.prototype.list=function(a,b){var c=this;b={type:b};this.listView.textContent="Loadling...";this.entity.list(b).then(function(b){c.listView.textContent=null;b.forEach(function(b){var d=c.createRow(b),e=d.querySelector("a");c.listView.append(d);e.addEventListener("click",function(){c.embedId(a,b.id)})});$(c.listView).listview("refresh")})};
ImageChooser.prototype.createRow=function(a){var b=document.createElement("img"),c=document.createElement("span"),d=document.createElement("p"),e=document.createElement("a"),f=document.createElement("li");b.setAttribute("src","/image/src?id="+a.id);c.textContent=a.name;d.textContent=a.description;e.append(b);e.append(c);e.append(d);f.append(e);return f};ImageChooser.prototype.embedId=function(a,b){a=a.hidden;a.value=b;a.dispatchEvent(this.manager.valueChangedevent);$("#imageChooser").popup("close")};
$jscomp.global.Object.defineProperties(ImageChooser.prototype,{manager:{configurable:!0,enumerable:!0,get:function(){return AppMain.Instance.manager}}});
