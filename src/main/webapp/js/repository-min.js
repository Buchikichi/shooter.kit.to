var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.inherits=function(a,b){function c(){}c.prototype=b.prototype;a.superClass_=b.prototype;a.prototype=new c;a.prototype.constructor=a;for(var d in b)if(Object.defineProperties){var e=Object.getOwnPropertyDescriptor(b,d);e&&Object.defineProperty(a,d,e)}else a[d]=b[d]};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)};$jscomp.SYMBOL_PREFIX="jscomp_symbol_";$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.symbolCounter_=0;$jscomp.Symbol=function(a){return $jscomp.SYMBOL_PREFIX+(a||"")+$jscomp.symbolCounter_++};
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.iterator;a||(a=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[a]&&$jscomp.defineProperty(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(a){var b=0;return $jscomp.iteratorPrototype(function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(a){$jscomp.initSymbolIterator();a={next:a};a[$jscomp.global.Symbol.iterator]=function(){return this};return a};$jscomp.iteratorFromArray=function(a,b){$jscomp.initSymbolIterator();a instanceof String&&(a+="");var c=0,d={next:function(){if(c<a.length){var e=c++;return{value:b(e,a[e]),done:!1}}d.next=function(){return{done:!0,value:void 0}};return d.next()}};d[Symbol.iterator]=function(){return d};return d};
$jscomp.polyfill=function(a,b,c,d){if(b){c=$jscomp.global;a=a.split(".");for(d=0;d<a.length-1;d++){var e=a[d];e in c||(c[e]={});c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&$jscomp.defineProperty(c,a,{configurable:!0,writable:!0,value:b})}};$jscomp.polyfill("Array.prototype.keys",function(a){return a?a:function(){return $jscomp.iteratorFromArray(this,function(a){return a})}},"es6-impl","es3");
$jscomp.findInternal=function(a,b,c){a instanceof String&&(a=String(a));for(var d=a.length,e=0;e<d;e++){var f=a[e];if(b.call(c,f,e,a))return{i:e,v:f}}return{i:-1,v:void 0}};$jscomp.polyfill("Array.prototype.find",function(a){return a?a:function(a,c){return $jscomp.findInternal(this,a,c).v}},"es6-impl","es3");var EntityBase=function(a){this.base=a};EntityBase.prototype.list=function(a){a=void 0===a?{}:a;return $.ajax({type:"post",url:"/"+this.base+"/list",dataType:"json",data:a})};
EntityBase.prototype.select=function(a){var b=new FormData;b.append("id",a);return fetch("/"+this.base+"/select",{method:"post",body:b}).then(function(a){return a.json()})};EntityBase.prototype.save=function(a){return $.ajax({type:"post",url:"/"+this.base+"/save",dataType:"json",data:a,processData:!1,contentType:!1})};var ActorEntity=function(){EntityBase.call(this,"actor")};$jscomp.inherits(ActorEntity,EntityBase);var AudioEntity=function(){EntityBase.call(this,"audio")};
$jscomp.inherits(AudioEntity,EntityBase);AudioEntity.Type={OTHER:0,FX:1,BGM:2};var ImageEntity=function(){EntityBase.call(this,"image")};$jscomp.inherits(ImageEntity,EntityBase);ImageEntity.Type={OTHER:0,ACT:1,BACK:2,FORE:3};var ProductEntity=function(){EntityBase.call(this,"product")};$jscomp.inherits(ProductEntity,EntityBase);var StageEntity=function(){EntityBase.call(this,"stage")};$jscomp.inherits(StageEntity,EntityBase);
var AccessibleRange=function(a,b){var c=document.createElement("legend");c.textContent="Access:";Object.keys(AccessibleRange.List).forEach(function(d){var c=b+d,f=document.createElement("input"),g=document.createElement("label");f.setAttribute("id",c);f.setAttribute("type","radio");f.setAttribute("name","access");f.setAttribute("value",d);g.setAttribute("for",c);g.textContent=AccessibleRange.List[d];a.append(f);a.append(g)});a.setAttribute("data-role","controlgroup");a.setAttribute("data-type","horizontal");
a.setAttribute("data-mini","true");a.append(c);$(a).parents("form").trigger("create")};AccessibleRange.List={0:"Private",1:"Protected",2:"Public"};
var AudioSelectionButton=function(a,b){b=void 0===b?"OTHER":b;var c=this,d=document.createElement("legend"),e=document.createElement("a"),f=document.createElement("input"),g=document.createElement("div"),h=document.createElement("button"),k=document.createElement("button"),l=document.createElement("button"),m=document.createElement("fieldset"),n=a.toLowerCase();d.textContent=a+":";e.setAttribute("href","#audioChooser");e.setAttribute("data-target",n);e.setAttribute("data-filter",b);e.setAttribute("data-rel",
"popup");e.className="ui-btn ui-mini ui-corner-all ui-shadow ui-btn-icon-left ui-icon-audio";e.textContent="Choose...";f.setAttribute("type","hidden");f.setAttribute("name",n);f.addEventListener("valueChanged",function(){c.resetImage()});h.textContent="W";h.setAttribute("data-icon","audio");h.addEventListener("click",function(a){a.preventDefault();window.open("/audio/webm/?id="+f.value)});k.textContent="A";k.setAttribute("data-icon","audio");k.addEventListener("click",function(a){a.preventDefault();
window.open("/audio/audio/?id="+f.value)});l.textContent="Del";l.setAttribute("data-icon","delete");l.setAttribute("data-theme","b");l.className="ui-btn-icon-notext";l.addEventListener("click",function(a){a.preventDefault();f.value="";c.resetImage()});g.append(h);g.append(k);g.append(l);m.append(d);m.append(e);m.append(f);m.append(g);$(g).controlgroup({type:"horizontal",mini:!0});this.fieldset=m;this.button=e;this.hidden=f;this.controlgroup=g};
AudioSelectionButton.prototype.resetImage=function(){this.hidden.value?($(this.controlgroup).show(),$(this.button).hide()):($(this.controlgroup).hide(),$(this.button).show())};var Customer=function(){};Customer.prototype.check=function(){return $.ajax({type:"post",url:"/customer/check",dataType:"json",data:{}})};Customer.prototype.signIn=function(a,b){return $.ajax({type:"post",url:"/customer/signIn",dataType:"json",data:{userid:a,passwd:b}})};
var ImageSelectionButton=function(a,b){b=void 0===b?"OTHER":b;var c=this,d=document.createElement("legend"),e=document.createElement("a"),f=document.createElement("input"),g=document.createElement("input"),h=document.createElement("fieldset"),k=a.toLowerCase();d.textContent=a+":";e.setAttribute("href","#imageChooser");e.setAttribute("data-target",k);e.setAttribute("data-filter",b);e.setAttribute("data-rel","popup");e.className="ui-btn ui-mini ui-corner-all ui-shadow ui-btn-icon-left ui-icon-heart";
e.textContent="Choose...";f.setAttribute("type","hidden");f.setAttribute("name",k);f.addEventListener("valueChanged",function(){c.resetImage()});g.setAttribute("type","image");g.addEventListener("click",function(a){a.preventDefault();f.value="";c.resetImage()});h.append(d);h.append(e);h.append(f);h.append(g);this.fieldset=h;this.button=e;this.hidden=f;this.img=g};
ImageSelectionButton.prototype.resetImage=function(){var a=this.hidden.value;a?(this.img.setAttribute("src","/image/src?id="+a),$(this.img).show(),$(this.button).hide()):(this.img.removeAttribute("src"),$(this.img).hide(),$(this.button).show())};
var ListviewRow=function(a,b){b=void 0===b?null:b;var c=document.createElement("img"),d=document.createElement("span"),e=document.createElement("p"),f=document.createElement("a"),g=document.createElement("li");null!=b&&c.setAttribute("src",b);d.textContent=a.name;e.textContent=a.description;a.href&&f.setAttribute("href",a.href);f.append(c);f.append(d);f.append(e);a.count&&(b=document.createElement("span"),b.classList.add("ui-li-count"),b.textContent=a.count,f.append(b));g.append(f);this.img=c;this.anchor=
f;this.li=g},ResourceChooser=function(a){this.id="#"+a;this.setupEvents()};ResourceChooser.prototype.setupEvents=function(){var a=this;document.querySelectorAll('[href="'+this.id+'"]').forEach(function(b){var c=$(b).parents("fieldset")[0];b.addEventListener("click",function(){var d=b.getAttribute("data-target"),e=b.getAttribute("data-filter"),d=c.querySelector('[name="'+d+'"]');a.list(d,e)})})};ResourceChooser.prototype.createRow=function(a,b){return new ListviewRow(a,void 0===b?null:b)};
ResourceChooser.prototype.list=function(a,b){var c=this;b={keyword:"",type:b};this.listView=document.querySelector(this.id+" > ul");this.listView.textContent="Loadling...";this.entity.list(b).then(function(b){c.listView.textContent=null;b.forEach(function(b){var d=c.createRow(b);c.listView.append(d.li);d.anchor.addEventListener("click",function(){c.embedId(a,b.id)})});$(c.listView).listview("refresh")})};
ResourceChooser.prototype.embedId=function(a,b){a.value=b;a.dispatchEvent(ResourceChooser.ValueChangedEvent);$(this.id).popup("close")};ResourceChooser.ValueChangedEvent=new Event("valueChanged");var TitleBg=function(){this.x=0;this.width=1200;this.move()};TitleBg.prototype.move=function(a){var b=this;document.querySelector("div[data-role=header]").style.backgroundPosition=-this.x+"px 0";this.x++;this.width<this.x&&(this.x=0);requestAnimationFrame(function(a){return b.move(a)})};
document.addEventListener("DOMContentLoaded",function(){new AppMain;new TitleBg});var AppMain=function(){this.customer=new Customer;this.stageManager=new StageManager;this.actorManager=new ActorManager;this.imageManager=new ImageManager;this.audioManager=new AudioManager;this.imageChooser=new ImageChooser;this.audioChooser=new AudioChooser;this.setupPanel();this.checkCustomer();AppMain.Instance=this};
AppMain.prototype.setupPanel=function(){var a=this,b=document.querySelector('[data-role="header"] a'),c=document.querySelector('[data-icon="star"]'),d=document.querySelector('[data-icon="bullets"]'),e=document.querySelector('[data-icon="heart"]'),f=document.querySelector('[data-icon="audio"]');c.addEventListener("click",function(){b.setAttribute("href","#stagePanel");a.manager=a.stageManager;a.manager.list();$("#type-radio").hide();$("#audioType").hide()});d.addEventListener("click",function(){b.setAttribute("href",
"#actorPanel");a.manager=a.actorManager;a.manager.list();$("#type-radio").hide();$("#audioType").hide()});e.addEventListener("click",function(){b.setAttribute("href","#imagePanel");a.manager=a.imageManager;a.manager.list();$("#type-radio").show();$("#audioType").hide()});f.addEventListener("click",function(){b.setAttribute("href","#audioPanel");a.manager=a.audioManager;a.manager.list();$("#type-radio").hide();$("#audioType").show()});b.addEventListener("click",function(){a.manager.resetPanel()});
c.click()};AppMain.prototype.checkCustomer=function(){this.customer.check().then(function(a){})};var RepositoryManager=function(){this.listView=document.getElementById("listView");this.valueChangedevent=new Event("valueChanged")};
RepositoryManager.prototype.setupPanel=function(){var a=this,b=this.form.querySelector(".access");b&&new AccessibleRange(b,this.panelId);this.form.addEventListener("submit",function(b){var d=new FormData(a.form);b.preventDefault();$.mobile.loading("show",{text:"Save...",textVisible:!0});a.entity.save(d).then(function(b){$.mobile.loading("hide");b.ok?($(a.panel).panel("close"),a.list()):$(a.panel).find(".message").text("Saving failed.")});return!1})};RepositoryManager.prototype.select=function(a){return a};
RepositoryManager.prototype.resetPanel=function(a){a=void 0===a?{}:a;var b=this;$("#"+this.panelId+" :input").each(function(d,c){if(d=c.getAttribute("name")){var e=$(c);e.is(":radio")?e.val([a[d]]).checkboxradio("refresh"):e.is("select")?e.val(a[d]).selectmenu("refresh",!1):e.is(":file")?e.val(null):e.val(a[d]);e.is(":hidden")&&c.dispatchEvent(b.valueChangedevent)}});var c=$(this.panel).find('[data-role="collapsible"]');0<Object.keys(a).length?c.collapsible("collapse"):c.collapsible("expand")};
RepositoryManager.prototype.createParameter=function(){return{keyword:"",type:$('#type-radio [name="type"]:checked').val()}};RepositoryManager.prototype.list=function(){var a=this,b=this.createParameter();this.listView.textContent="Loadling...";this.entity.list(b).then(function(b){a.listView.textContent=null;b.forEach(function(b){var c=a.createRow(b);c.querySelector("a").addEventListener("click",function(){a.resetPanel(a.select(b))});a.listView.append(c)});$(a.listView).listview("refresh")})};
RepositoryManager.prototype.createRow=function(a,b){a.href="#"+this.panelId;return(new ListviewRow(a,void 0===b?null:b)).li};$jscomp.global.Object.defineProperties(RepositoryManager.prototype,{panelId:{configurable:!0,enumerable:!0,get:function(){return this.panel.getAttribute("id")}}});var StageManager=function(){RepositoryManager.call(this);this.panel=document.getElementById("stagePanel");this.form=document.getElementById("stageForm");this.entity=new StageEntity;this.setupPanel()};
$jscomp.inherits(StageManager,RepositoryManager);
StageManager.prototype.setupPanel=function(){var a=this;RepositoryManager.prototype.setupPanel.call(this);var b=this.form.querySelector(".imageButtons");"BG1 BG2 BG3 FG1 FG2 FG3".split(" ").forEach(function(a){var c=-1!=a.indexOf("B")?ImageEntity.Type.BACK:ImageEntity.Type.FORE;a=new ImageSelectionButton(a,c);b.append(a.fieldset)});var c=this.form.querySelector(".audioButtons");["theme","boss"].forEach(function(a){a=new AudioSelectionButton(a,AudioEntity.Type.BGM);c.append(a.fieldset)});this.form.querySelector(".ui-icon-edit").addEventListener("click",
function(){var b=a.form.querySelector('[name="id"]').value;window.open("/stage/edit?id="+b)})};StageManager.prototype.getImgsrc=function(a){var b=null;"fg1 fg2 fg3 bg1 bg2 bg3".split(" ").forEach(function(c){c=a[c];null==b&&null!=c&&0<c.length&&(b=c)});return null==b?"/img/icon.listview.png":"/image/src?id="+b};StageManager.prototype.createRow=function(a){return RepositoryManager.prototype.createRow.call(this,a,this.getImgsrc(a))};
var ActorManager=function(){RepositoryManager.call(this);this.panel=document.getElementById("actorPanel");this.form=document.getElementById("actorForm");this.entity=new ActorEntity;this.setupPanel()};$jscomp.inherits(ActorManager,RepositoryManager);ActorManager.prototype.setupPanel=function(){var a=this.form.querySelector(".imageButtons");RepositoryManager.prototype.setupPanel.call(this);["ImageId"].forEach(function(b){b=new ImageSelectionButton(b,ImageEntity.Type.ACT);a.append(b.fieldset)})};
ActorManager.prototype.createRow=function(a){return RepositoryManager.prototype.createRow.call(this,a,"/image/src?id="+a.imageid)};var ImageManager=function(){RepositoryManager.call(this);this.panel=document.getElementById("imagePanel");this.form=document.getElementById("imageForm");this.entity=new ImageEntity;this.setupPanel()};$jscomp.inherits(ImageManager,RepositoryManager);ImageManager.prototype.setupPanel=function(){var a=this;RepositoryManager.prototype.setupPanel.call(this);$('#type-radio [name="type"]').click(function(){a.list()})};
ImageManager.prototype.createRow=function(a){a.count={0:"Other",1:"Act",2:"Back",3:"Fore"}[a.type];return RepositoryManager.prototype.createRow.call(this,a,"/image/src?id="+a.id)};ImageManager.prototype.resetPanel=function(a){a=void 0===a?{}:a;RepositoryManager.prototype.resetPanel.call(this,a);var b=document.getElementById("image.thumbnail");a.id?b.setAttribute("src","/image/src?id="+a.id):b.removeAttribute("src")};
var AudioManager=function(){RepositoryManager.call(this);this.panel=document.getElementById("audioPanel");this.form=document.getElementById("audioForm");this.entity=new AudioEntity;this.setupPanel()};$jscomp.inherits(AudioManager,RepositoryManager);AudioManager.prototype.setupPanel=function(){var a=this;RepositoryManager.prototype.setupPanel.call(this);$('#audioType [name="audioType"]').click(function(){a.list()})};
AudioManager.prototype.select=function(a){var b=this,c=this.form.querySelector('[name="webm"]'),d=document.getElementById("webmAnchor"),e=this.form.querySelector('[name="audio"]'),f=document.getElementById("audioAnchor");$.mobile.loading("show",{textVisible:!0});this.entity.select(a.id).then(function(g){b.resetPanel(g);g.webmlen?($(c).hide(),$(d).show(),d.setAttribute("href","/audio/webm/"+a.id)):($(c).show(),$(d).hide());g.audiolen?($(e).hide(),$(f).show(),f.setAttribute("href","/audio/audio/"+a.id)):
($(e).show(),$(f).hide());$.mobile.loading("hide")});return{}};AudioManager.prototype.createParameter=function(){return{keyword:"",type:$('#audioType [name="audioType"]:checked').val()}};AudioManager.prototype.createRow=function(a){a.count=1==a.type?"FX":"BGM";a=RepositoryManager.prototype.createRow.call(this,a);var b=a.querySelector("a"),c=a.querySelector("img");b.removeChild(c);return a};var ImageChooser=function(){ResourceChooser.call(this,"imageChooser");this.entity=new ImageEntity};
$jscomp.inherits(ImageChooser,ResourceChooser);ImageChooser.ValueChangedEvent=ResourceChooser.ValueChangedEvent;ImageChooser.prototype.createRow=function(a){return ResourceChooser.prototype.createRow.call(this,a,"/image/src?id="+a.id)};var AudioChooser=function(){ResourceChooser.call(this,"audioChooser");this.entity=new AudioEntity};$jscomp.inherits(AudioChooser,ResourceChooser);AudioChooser.ValueChangedEvent=ResourceChooser.ValueChangedEvent;
AudioChooser.prototype.createRow=function(a){a=ResourceChooser.prototype.createRow.call(this,a);a.anchor.removeChild(a.img);return a};
