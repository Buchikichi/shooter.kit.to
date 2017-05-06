var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.inherits=function(a,b){function d(){}d.prototype=b.prototype;a.superClass_=b.prototype;a.prototype=new d;a.prototype.constructor=a;for(var c in b)if(Object.defineProperties){var e=Object.getOwnPropertyDescriptor(b,c);e&&Object.defineProperty(a,c,e)}else a[c]=b[c]};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,d){a!=Array.prototype&&a!=Object.prototype&&(a[b]=d.value)};
$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.symbolCounter_=0;$jscomp.Symbol=function(a){return $jscomp.SYMBOL_PREFIX+(a||"")+$jscomp.symbolCounter_++};
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.iterator;a||(a=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[a]&&$jscomp.defineProperty(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(a){var b=0;return $jscomp.iteratorPrototype(function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(a){$jscomp.initSymbolIterator();a={next:a};a[$jscomp.global.Symbol.iterator]=function(){return this};return a};$jscomp.iteratorFromArray=function(a,b){$jscomp.initSymbolIterator();a instanceof String&&(a+="");var d=0,c={next:function(){if(d<a.length){var e=d++;return{value:b(e,a[e]),done:!1}}c.next=function(){return{done:!0,value:void 0}};return c.next()}};c[Symbol.iterator]=function(){return c};return c};
$jscomp.polyfill=function(a,b,d,c){if(b){d=$jscomp.global;a=a.split(".");for(c=0;c<a.length-1;c++){var e=a[c];e in d||(d[e]={});d=d[e]}a=a[a.length-1];c=d[a];b=b(c);b!=c&&null!=b&&$jscomp.defineProperty(d,a,{configurable:!0,writable:!0,value:b})}};$jscomp.polyfill("Array.prototype.keys",function(a){return a?a:function(){return $jscomp.iteratorFromArray(this,function(a){return a})}},"es6-impl","es3");var EntityBase=function(a){this.base=a};
EntityBase.prototype.list=function(a){a=void 0===a?{}:a;return $.ajax({type:"post",url:"/"+this.base+"/list",dataType:"json",data:a})};EntityBase.prototype.select=function(a){var b=new FormData;b.append("id",a);return fetch("/"+this.base+"/select",{method:"post",body:b}).then(function(a){return a.json()})};EntityBase.prototype.save=function(a){return $.ajax({type:"post",url:"/"+this.base+"/save",dataType:"json",data:a,processData:!1,contentType:!1})};
var ActorEntity=function(){EntityBase.call(this,"actor")};$jscomp.inherits(ActorEntity,EntityBase);var AudioEntity=function(){EntityBase.call(this,"audio")};$jscomp.inherits(AudioEntity,EntityBase);AudioEntity.Type={OTHER:0,FX:1,BGM:2};var ImageEntity=function(){EntityBase.call(this,"image")};$jscomp.inherits(ImageEntity,EntityBase);ImageEntity.Type={OTHER:0,ACT:1,BACK:2,FORE:3};var ProductEntity=function(){EntityBase.call(this,"product")};$jscomp.inherits(ProductEntity,EntityBase);
var StageEntity=function(){EntityBase.call(this,"stage")};$jscomp.inherits(StageEntity,EntityBase);StageEntity.prototype.saveMap=function(a){return fetch("/"+this.base+"/saveMap",{method:"post",body:a,credentials:"include"}).then(function(a){return a.json()})};
var AccessibleRange=function(a,b){var d=document.createElement("legend");d.textContent="Access:";Object.keys(AccessibleRange.List).forEach(function(c){var d=b+c,f=document.createElement("input"),g=document.createElement("label");f.setAttribute("id",d);f.setAttribute("type","radio");f.setAttribute("name","access");f.setAttribute("value",c);g.setAttribute("for",d);g.textContent=AccessibleRange.List[c];a.append(f);a.append(g)});a.setAttribute("data-role","controlgroup");a.setAttribute("data-type","horizontal");
a.setAttribute("data-mini","true");a.append(d);$(a).parents("form").trigger("create")};AccessibleRange.List={0:"Private",1:"Protected",2:"Public"};
var AudioSelectionButton=function(a,b){b=void 0===b?"OTHER":b;var d=this,c=document.createElement("legend"),e=document.createElement("a"),f=document.createElement("input"),g=document.createElement("div"),h=document.createElement("button"),k=document.createElement("button"),l=document.createElement("button"),m=document.createElement("fieldset"),n=a.toLowerCase();c.textContent=a+":";e.setAttribute("href","#audioChooser");e.setAttribute("data-target",n);e.setAttribute("data-filter",b);e.setAttribute("data-rel",
"popup");e.className="ui-btn ui-mini ui-corner-all ui-shadow ui-btn-icon-left ui-icon-audio";e.textContent="Choose...";f.setAttribute("type","hidden");f.setAttribute("name",n);f.addEventListener("valueChanged",function(){d.resetImage()});h.textContent="W";h.setAttribute("data-icon","audio");h.addEventListener("click",function(a){a.preventDefault();window.open("/audio/webm/?id="+f.value)});k.textContent="A";k.setAttribute("data-icon","audio");k.addEventListener("click",function(a){a.preventDefault();
window.open("/audio/audio/?id="+f.value)});l.textContent="Del";l.setAttribute("data-icon","delete");l.setAttribute("data-theme","b");l.className="ui-btn-icon-notext";l.addEventListener("click",function(a){a.preventDefault();f.value="";d.resetImage()});g.append(h);g.append(k);g.append(l);m.append(c);m.append(e);m.append(f);m.append(g);$(g).controlgroup({type:"horizontal",mini:!0});this.fieldset=m;this.button=e;this.hidden=f;this.controlgroup=g};
AudioSelectionButton.prototype.resetImage=function(){this.hidden.value?($(this.controlgroup).show(),$(this.button).hide()):($(this.controlgroup).hide(),$(this.button).show())};var Customer=function(){};Customer.prototype.check=function(){return $.ajax({type:"post",url:"/customer/check",dataType:"json",data:{}})};Customer.prototype.signIn=function(a,b){return $.ajax({type:"post",url:"/customer/signIn",dataType:"json",data:{userid:a,passwd:b}})};
var ImageSelectionButton=function(a,b){b=void 0===b?"OTHER":b;var d=this,c=document.createElement("legend"),e=document.createElement("a"),f=document.createElement("input"),g=document.createElement("input"),h=document.createElement("fieldset"),k=a.toLowerCase();c.textContent=a+":";e.setAttribute("href","#imageChooser");e.setAttribute("data-target",k);e.setAttribute("data-filter",b);e.setAttribute("data-rel","popup");e.className="ui-btn ui-mini ui-corner-all ui-shadow ui-btn-icon-left ui-icon-heart";
e.textContent="Choose...";f.setAttribute("type","hidden");f.setAttribute("name",k);f.addEventListener("valueChanged",function(){d.resetImage()});g.setAttribute("type","image");g.addEventListener("click",function(a){a.preventDefault();f.value="";d.resetImage()});h.append(c);h.append(e);h.append(f);h.append(g);this.fieldset=h;this.button=e;this.hidden=f;this.img=g};
ImageSelectionButton.prototype.resetImage=function(){var a=this.hidden.value;a?(this.img.setAttribute("src","/image/src?id="+a),$(this.img).show(),$(this.button).hide()):(this.img.removeAttribute("src"),$(this.img).hide(),$(this.button).show())};
var ListviewRow=function(a,b){b=void 0===b?null:b;var d=document.createElement("img"),c=document.createElement("span"),e=document.createElement("p"),f=document.createElement("a"),g=document.createElement("li");null!=b&&d.setAttribute("src",b);c.textContent=a.name;e.textContent=a.description;a.href&&f.setAttribute("href",a.href);f.append(d);f.append(c);f.append(e);a.count&&(b=document.createElement("span"),b.classList.add("ui-li-count"),b.textContent=a.count,f.append(b));g.append(f);this.img=d;this.anchor=
f;this.li=g},ResourceChooser=function(a){this.id="#"+a;this.setupEvents()};ResourceChooser.prototype.setupEvents=function(){var a=this;document.querySelectorAll('[href="'+this.id+'"]').forEach(function(b){var d=$(b).parents("fieldset")[0];b.addEventListener("click",function(){var c=b.getAttribute("data-target"),e=b.getAttribute("data-filter"),c=d.querySelector('[name="'+c+'"]');a.list(c,e)})})};ResourceChooser.prototype.createRow=function(a,b){return new ListviewRow(a,void 0===b?null:b)};
ResourceChooser.prototype.list=function(a,b){var d=this;b={keyword:"",type:b};this.listView=document.querySelector(this.id+" > ul");this.listView.textContent="Loadling...";this.entity.list(b).then(function(b){d.listView.textContent=null;b.forEach(function(b){var c=d.createRow(b);d.listView.append(c.li);c.anchor.addEventListener("click",function(){d.embedId(a,b.id)})});$(d.listView).listview("refresh")})};
ResourceChooser.prototype.embedId=function(a,b){a.value=b;a.dispatchEvent(ResourceChooser.ValueChangedEvent);$(this.id).popup("close")};ResourceChooser.ValueChangedEvent=new Event("valueChanged");var TitleBg=function(){this.x=0;this.width=1200;this.move()};TitleBg.prototype.move=function(a){var b=this;document.querySelector("div[data-role=header]").style.backgroundPosition=-this.x+"px 0";this.x++;this.width<this.x&&(this.x=0);requestAnimationFrame(function(a){return b.move(a)})};
document.addEventListener("DOMContentLoaded",function(){new AppMain;new TitleBg});var AppMain=function(){this.productStageView=document.getElementById("productStageView");this.product=new ProductEntity;this.customer=new Customer;this.stagePanel=new StagePanel;this.editStagePanel=new EditStagePanel(this);this.setupButton();this.checkCustomer();$(this.productStageView).sortable()};
AppMain.prototype.setupButton=function(){var a=this;document.querySelector('[data-role="header"] a').addEventListener("click",function(){a.stagePanel.open(a.addStage)});this.productStageView.querySelectorAll("a").forEach(function(b){b.addEventListener("click",function(){var d=b.getAttribute("data-id"),c=b.getAttribute("data-roll");a.editStagePanel.open({stageId:d,roll:c})})});document.getElementById("saveButton").addEventListener("click",function(){a.saveProduct()})};
AppMain.prototype.addStage=function(a){var b=a.id,d=!1;this.productStageView.querySelectorAll("li").forEach(function(a){a.getAttribute("data-id")==b&&(d=!0)});if(d)return!1;a.href="#editStagePanel";var c=new ListviewRow(a,"/img/icon.listview.png");a=c.li;c=c.anchor;c.setAttribute("data-id",b);c.setAttribute("data-roll",0);this.productStageView.append(a);$(this.productStageView).listview("refresh");return!0};
AppMain.prototype.getLi=function(a){var b=null;this.productStageView.querySelectorAll("li").forEach(function(d){d.querySelector("a").getAttribute("data-id")==a&&(b=d)});return b};AppMain.prototype.updateStage=function(a){var b=this.getLi(a.stageId);null!=b&&b.querySelector("a").setAttribute("data-roll",a.roll)};AppMain.prototype.removeStage=function(a){a=this.getLi(a);this.productStageView.removeChild(a)};
AppMain.prototype.checkCustomer=function(){this.customer.check().then(function(a){a.ok&&($("#footerNav a:eq(1)").removeClass("ui-state-disabled"),$("#footerNav a:eq(2)").removeClass("ui-state-disabled"),$("#footerNav").navbar("refresh"))})};AppMain.prototype.listStages=function(){var a=[];this.productStageView.querySelectorAll("li").forEach(function(b,d){var c=b.querySelector("a");b=c.getAttribute("data-id");c=c.getAttribute("data-roll");a.push({stageId:b,seq:d,roll:c})});return a};
AppMain.prototype.saveProduct=function(){var a=document.getElementById("productForm"),b=new FormData(a);this.listStages().forEach(function(a){var c="detail["+a.seq+"].";b.append(c+"stageId",a.stageId);b.append(c+"seq",a.seq);b.append(c+"roll",a.roll)});$.mobile.loading("show",{text:"Save...",textVisible:!0});this.product.save(b).then(function(a){var b=document.getElementById("messagePopup"),d=b.querySelector("p");console.log(a);$.mobile.loading("hide");d.textContent=a.ok?"Saved.":"Save failed.";$(b).popup("open",
{})})};var StagePanel=function(){this.panel=document.getElementById("stagePanel");this.stageView=document.getElementById("stageView");this.stage=new StageEntity};
StagePanel.prototype.open=function(a){var b=this;this.stageView.textContent="Loading...";this.stage.list("").then(function(d){b.stageView.textContent=null;d.forEach(function(c){var d=(new ListviewRow(c,"/img/icon.listview.png")).li,f=d.querySelector("a");b.stageView.append(d);f.addEventListener("click",function(){a(c)?$(b.stagePanel).panel("close"):console.log("Already exists.")})});$(b.stageView).listview("refresh")})};
var EditStagePanel=function(a){this.appMain=a;this.panel=document.getElementById("editStagePanel");this.roll=this.panel.querySelector("select");this.rec={};this.setupEvent()};EditStagePanel.prototype.setupEvent=function(){var a=this;this.roll.addEventListener("change",function(){a.rec.roll=a.roll.value});this.panel.querySelector(".ui-icon-delete").addEventListener("click",function(){a.appMain.removeStage(a.rec.stageId);$(a.panel).panel("close")});$(this.panel).on("panelclose",function(){a.appMain.updateStage(a.rec)})};
EditStagePanel.prototype.open=function(a){this.rec=a;$(this.roll).val([a.roll]).selectmenu("refresh")};
