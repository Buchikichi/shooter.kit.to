var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.inherits=function(a,b){function d(){}d.prototype=b.prototype;a.superClass_=b.prototype;a.prototype=new d;a.prototype.constructor=a;for(var c in b)if(Object.defineProperties){var e=Object.getOwnPropertyDescriptor(b,c);e&&Object.defineProperty(a,c,e)}else a[c]=b[c]};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,d){a!=Array.prototype&&a!=Object.prototype&&(a[b]=d.value)};$jscomp.SYMBOL_PREFIX="jscomp_symbol_";$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.symbolCounter_=0;$jscomp.Symbol=function(a){return $jscomp.SYMBOL_PREFIX+(a||"")+$jscomp.symbolCounter_++};
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.iterator;a||(a=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[a]&&$jscomp.defineProperty(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(a){var b=0;return $jscomp.iteratorPrototype(function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(a){$jscomp.initSymbolIterator();a={next:a};a[$jscomp.global.Symbol.iterator]=function(){return this};return a};$jscomp.iteratorFromArray=function(a,b){$jscomp.initSymbolIterator();a instanceof String&&(a+="");var d=0,c={next:function(){if(d<a.length){var e=d++;return{value:b(e,a[e]),done:!1}}c.next=function(){return{done:!0,value:void 0}};return c.next()}};c[Symbol.iterator]=function(){return c};return c};
$jscomp.polyfill=function(a,b,d,c){if(b){d=$jscomp.global;a=a.split(".");for(c=0;c<a.length-1;c++){var e=a[c];e in d||(d[e]={});d=d[e]}a=a[a.length-1];c=d[a];b=b(c);b!=c&&null!=b&&$jscomp.defineProperty(d,a,{configurable:!0,writable:!0,value:b})}};$jscomp.polyfill("Array.prototype.keys",function(a){return a?a:function(){return $jscomp.iteratorFromArray(this,function(a){return a})}},"es6-impl","es3");
$jscomp.makeIterator=function(a){$jscomp.initSymbolIterator();var b=a[Symbol.iterator];return b?b.call(a):$jscomp.arrayIterator(a)};$jscomp.EXPOSE_ASYNC_EXECUTOR=!0;$jscomp.FORCE_POLYFILL_PROMISE=!1;
$jscomp.polyfill("Promise",function(a){function b(){this.batch_=null}if(a&&!$jscomp.FORCE_POLYFILL_PROMISE)return a;b.prototype.asyncExecute=function(a){null==this.batch_&&(this.batch_=[],this.asyncExecuteBatch_());this.batch_.push(a);return this};b.prototype.asyncExecuteBatch_=function(){var a=this;this.asyncExecuteFunction(function(){a.executeBatch_()})};var d=$jscomp.global.setTimeout;b.prototype.asyncExecuteFunction=function(a){d(a,0)};b.prototype.executeBatch_=function(){for(;this.batch_&&this.batch_.length;){var a=
this.batch_;this.batch_=[];for(var b=0;b<a.length;++b){var c=a[b];delete a[b];try{c()}catch(k){this.asyncThrow_(k)}}}this.batch_=null};b.prototype.asyncThrow_=function(a){this.asyncExecuteFunction(function(){throw a;})};var c=function(a){this.state_=0;this.result_=void 0;this.onSettledCallbacks_=[];var b=this.createResolveAndReject_();try{a(b.resolve,b.reject)}catch(h){b.reject(h)}};c.prototype.createResolveAndReject_=function(){function a(a){return function(f){c||(c=!0,a.call(b,f))}}var b=this,c=
!1;return{resolve:a(this.resolveTo_),reject:a(this.reject_)}};c.prototype.resolveTo_=function(a){if(a===this)this.reject_(new TypeError("A Promise cannot resolve to itself"));else if(a instanceof c)this.settleSameAsPromise_(a);else{a:switch(typeof a){case "object":var b=null!=a;break a;case "function":b=!0;break a;default:b=!1}b?this.resolveToNonPromiseObj_(a):this.fulfill_(a)}};c.prototype.resolveToNonPromiseObj_=function(a){var b=void 0;try{b=a.then}catch(h){this.reject_(h);return}"function"==typeof b?
this.settleSameAsThenable_(b,a):this.fulfill_(a)};c.prototype.reject_=function(a){this.settle_(2,a)};c.prototype.fulfill_=function(a){this.settle_(1,a)};c.prototype.settle_=function(a,b){if(0!=this.state_)throw Error("Cannot settle("+a+", "+b|"): Promise already settled in state"+this.state_);this.state_=a;this.result_=b;this.executeOnSettledCallbacks_()};c.prototype.executeOnSettledCallbacks_=function(){if(null!=this.onSettledCallbacks_){for(var a=this.onSettledCallbacks_,b=0;b<a.length;++b)a[b].call(),
a[b]=null;this.onSettledCallbacks_=null}};var e=new b;c.prototype.settleSameAsPromise_=function(a){var b=this.createResolveAndReject_();a.callWhenSettled_(b.resolve,b.reject)};c.prototype.settleSameAsThenable_=function(a,b){var c=this.createResolveAndReject_();try{a.call(b,c.resolve,c.reject)}catch(k){c.reject(k)}};c.prototype.then=function(a,b){function d(a,b){return"function"==typeof a?function(b){try{e(a(b))}catch(p){f(p)}}:b}var e,f,g=new c(function(a,b){e=a;f=b});this.callWhenSettled_(d(a,e),
d(b,f));return g};c.prototype.catch=function(a){return this.then(void 0,a)};c.prototype.callWhenSettled_=function(a,b){function c(){switch(d.state_){case 1:a(d.result_);break;case 2:b(d.result_);break;default:throw Error("Unexpected state: "+d.state_);}}var d=this;null==this.onSettledCallbacks_?e.asyncExecute(c):this.onSettledCallbacks_.push(function(){e.asyncExecute(c)})};c.resolve=function(a){return a instanceof c?a:new c(function(b,c){b(a)})};c.reject=function(a){return new c(function(b,c){c(a)})};
c.race=function(a){return new c(function(b,d){for(var e=$jscomp.makeIterator(a),f=e.next();!f.done;f=e.next())c.resolve(f.value).callWhenSettled_(b,d)})};c.all=function(a){var b=$jscomp.makeIterator(a),d=b.next();return d.done?c.resolve([]):new c(function(a,e){function f(b){return function(c){g[b]=c;h--;0==h&&a(g)}}var g=[],h=0;do g.push(void 0),h++,c.resolve(d.value).callWhenSettled_(f(g.length-1),e),d=b.next();while(!d.done)})};$jscomp.EXPOSE_ASYNC_EXECUTOR&&(c.$jscomp$new$AsyncExecutor=function(){return new b});
return c},"es6-impl","es3");$jscomp.findInternal=function(a,b,d){a instanceof String&&(a=String(a));for(var c=a.length,e=0;e<c;e++){var f=a[e];if(b.call(d,f,e,a))return{i:e,v:f}}return{i:-1,v:void 0}};$jscomp.polyfill("Array.prototype.find",function(a){return a?a:function(a,d){return $jscomp.findInternal(this,a,d).v}},"es6-impl","es3");
$jscomp.checkStringArgs=function(a,b,d){if(null==a)throw new TypeError("The 'this' value for String.prototype."+d+" must not be null or undefined");if(b instanceof RegExp)throw new TypeError("First argument to String.prototype."+d+" must not be a regular expression");return a+""};
$jscomp.polyfill("String.prototype.startsWith",function(a){return a?a:function(a,d){var b=$jscomp.checkStringArgs(this,a,"startsWith");a+="";var e=b.length,f=a.length;d=Math.max(0,Math.min(d|0,b.length));for(var g=0;g<f&&d<e;)if(b[d++]!=a[g++])return!1;return g>=f}},"es6-impl","es3");
var AccessibleRange=function(a,b){var d=document.createElement("legend");d.textContent="Access:";Object.keys(AccessibleRange.List).forEach(function(c){var d=b+c,f=document.createElement("input"),g=document.createElement("label");f.setAttribute("id",d);f.setAttribute("type","radio");f.setAttribute("name","access");f.setAttribute("value",c);g.setAttribute("for",d);g.textContent=AccessibleRange.List[c];a.appendChild(f);a.appendChild(g)});a.setAttribute("data-role","controlgroup");a.setAttribute("data-type",
"horizontal");a.setAttribute("data-mini","true");a.appendChild(d);$(a).parents("form").trigger("create")};AccessibleRange.List={0:"Private",1:"Protected",2:"Public"};
var AudioSelectionButton=function(a,b){b=void 0===b?"OTHER":b;var d=this,c=document.createElement("legend"),e=document.createElement("a"),f=document.createElement("input"),g=document.createElement("div"),h=document.createElement("button"),k=document.createElement("button"),l=document.createElement("button"),m=document.createElement("fieldset"),n=a.toLowerCase();c.textContent=a+":";e.setAttribute("href","#audioChooser");e.setAttribute("data-target",n);e.setAttribute("data-filter",b);e.setAttribute("data-rel",
"popup");e.className="ui-btn ui-mini ui-corner-all ui-shadow ui-btn-icon-left ui-icon-audio";e.textContent="Choose...";f.setAttribute("type","hidden");f.setAttribute("name",n);f.addEventListener("valueChanged",function(){d.resetImage()});h.textContent="W";h.setAttribute("data-icon","audio");h.addEventListener("click",function(a){a.preventDefault();window.open("/audio/webm/?id="+f.value)});k.textContent="A";k.setAttribute("data-icon","audio");k.addEventListener("click",function(a){a.preventDefault();
window.open("/audio/audio/?id="+f.value)});l.textContent="Del";l.setAttribute("data-icon","delete");l.setAttribute("data-theme","b");l.className="ui-btn-icon-notext";l.addEventListener("click",function(a){a.preventDefault();f.value="";d.resetImage()});g.appendChild(h);g.appendChild(k);g.appendChild(l);m.appendChild(c);m.appendChild(e);m.appendChild(f);m.appendChild(g);$(g).controlgroup({type:"horizontal",mini:!0});this.fieldset=m;this.button=e;this.hidden=f;this.controlgroup=g};
AudioSelectionButton.prototype.resetImage=function(){this.hidden.value?($(this.controlgroup).show(),$(this.button).hide()):($(this.controlgroup).hide(),$(this.button).show())};var Customer=function(){};Customer.prototype.check=function(){return $.ajax({type:"post",url:"/customer/check",dataType:"json",data:{}})};Customer.prototype.signIn=function(a,b){return $.ajax({type:"post",url:"/customer/signIn",dataType:"json",data:{userid:a,passwd:b}})};
var ImageSelectionButton=function(a,b){b=void 0===b?"OTHER":b;var d=this,c=document.createElement("legend"),e=document.createElement("a"),f=document.createElement("input"),g=document.createElement("input"),h=document.createElement("fieldset"),k=a.toLowerCase();c.textContent=a+":";e.setAttribute("href","#imageChooser");e.setAttribute("data-target",k);e.setAttribute("data-filter",b);e.setAttribute("data-rel","popup");e.className="ui-btn ui-mini ui-corner-all ui-shadow ui-btn-icon-left ui-icon-heart";
e.textContent="Choose...";f.setAttribute("type","hidden");f.setAttribute("name",k);f.addEventListener("valueChanged",function(){d.resetImage()});g.setAttribute("type","image");g.addEventListener("click",function(a){a.preventDefault();f.value="";d.resetImage()});h.appendChild(c);h.appendChild(e);h.appendChild(f);h.appendChild(g);this.fieldset=h;this.button=e;this.hidden=f;this.img=g};
ImageSelectionButton.prototype.resetImage=function(){var a=this.hidden.value;a?(this.img.setAttribute("src","/image/src/"+a),$(this.img).show(),$(this.button).hide()):(this.img.removeAttribute("src"),$(this.img).hide(),$(this.button).show())};
var ListviewRow=function(a,b){b=void 0===b?null:b;var d=document.createElement("img"),c=document.createElement("span"),e=document.createElement("p"),f=document.createElement("a"),g=document.createElement("li");null!=b&&d.setAttribute("src",b);c.textContent=a.name;e.textContent=a.description;a.href&&f.setAttribute("href",a.href);f.appendChild(d);f.appendChild(c);f.appendChild(e);a.count&&(b=document.createElement("span"),b.classList.add("ui-li-count"),b.textContent=a.count,f.appendChild(b));g.appendChild(f);
this.img=d;this.anchor=f;this.li=g},ResourceChooser=function(a){this.id="#"+a;this.setupEvents()};ResourceChooser.prototype.setupEvents=function(){var a=this;document.querySelectorAll('[href="'+this.id+'"]').forEach(function(b){var d=$(b).parents("fieldset")[0];b.addEventListener("click",function(){var c=b.getAttribute("data-target"),e=b.getAttribute("data-filter"),c=d.querySelector('[name="'+c+'"]');a.list(c,e)})})};
ResourceChooser.prototype.createRow=function(a,b){return new ListviewRow(a,void 0===b?null:b)};
ResourceChooser.prototype.list=function(a,b){var d=this,c=new FormData;c.append("keyword","");c.append("type",b);this.listView=document.querySelector(this.id+" > ul");this.listView.textContent="Loadling...";this.entity.list(c).then(function(b){d.listView.textContent=null;b.forEach(function(b){var c=d.createRow(b);d.listView.appendChild(c.li);c.anchor.addEventListener("click",function(){d.embedId(a,b.id)})});$(d.listView).listview("refresh")})};
ResourceChooser.prototype.embedId=function(a,b){a.value=b;a.dispatchEvent(ResourceChooser.ValueChangedEvent);$(this.id).popup("close")};ResourceChooser.ValueChangedEvent=new Event("valueChanged");var TitleBg=function(){this.x=0;this.width=1200;this.move()};TitleBg.prototype.move=function(a){var b=this;document.querySelector("div[data-role=header]").style.backgroundPosition=-this.x+"px 0";this.x++;this.width<this.x&&(this.x=0);requestAnimationFrame(function(a){return b.move(a)})};
var EntityBase=function(a){this.base=a};EntityBase.prototype.list=function(a){a=void 0===a?{}:a;return AjaxUtils.post("/"+this.base+"/list",a)};EntityBase.prototype.select=function(a){var b=new FormData;b.append("id",a);return AjaxUtils.post("/"+this.base+"/select",b)};EntityBase.prototype.save=function(a){return AjaxUtils.post("/"+this.base+"/save",a)};var ActorEntity=function(){EntityBase.call(this,"actor")};$jscomp.inherits(ActorEntity,EntityBase);
var AudioEntity=function(){EntityBase.call(this,"audio")};$jscomp.inherits(AudioEntity,EntityBase);AudioEntity.Type={OTHER:0,FX:1,BGM:2};var ImageEntity=function(){EntityBase.call(this,"image")};$jscomp.inherits(ImageEntity,EntityBase);ImageEntity.Type={OTHER:0,ACT:1,BACK:2,FORE:3};var ProductEntity=function(){EntityBase.call(this,"product")};$jscomp.inherits(ProductEntity,EntityBase);
ProductEntity.prototype.detail=function(a){var b=new FormData;b.append("id",a);return AjaxUtils.post("/detail/select",b)};ProductEntity.prototype.saveMap=function(a){return AjaxUtils.post("/detail/save",a)};var StageEntity=function(){EntityBase.call(this,"stage")};$jscomp.inherits(StageEntity,EntityBase);StageEntity.prototype.saveMap=function(a){return AjaxUtils.post("/"+this.base+"/saveMap",a)};
var EditStagePanel=function(a){this.appMain=a;this.panel=document.getElementById("editStagePanel");this.roll=this.panel.querySelector("select");this.rec={};this.setupEvent()};
EditStagePanel.prototype.setupEvent=function(){var a=this;this.roll.addEventListener("change",function(){a.rec.roll=a.roll.value});this.panel.querySelector(".ui-icon-edit").addEventListener("click",function(){window.open("/detail/edit/"+a.rec.id)});this.panel.querySelector(".ui-icon-delete").addEventListener("click",function(){a.appMain.removeStage(a.rec.stageId);$(a.panel).panel("close")});$(this.panel).on("panelclose",function(){a.appMain.updateStage(a.rec)})};
EditStagePanel.prototype.open=function(a){this.rec=a;$(this.roll).val([a.roll]).selectmenu("refresh")};var ProductActorPanel=function(a){this.page=a;this.panel=document.getElementById("ActorPanel");this.actorType=this.panel.querySelector("select");this.listView=this.panel.querySelector("ul");this.entity=new ActorEntity;this.setupEvent()};ProductActorPanel.prototype.setupEvent=function(){var a=this;document.querySelector('[href="#ActorPanel"]').addEventListener("click",function(){a.listActor()});this.setupActorType()};
ProductActorPanel.prototype.setupActorType=function(){var a=this;Object.keys(Actor.Type).forEach(function(b){var d=Actor.Type[b];if(0!=d&&"Formation"!=b){var c=document.createElement("option");c.setAttribute("value",d);"Enemy"==b&&c.setAttribute("selected","selected");c.textContent=b;a.actorType.appendChild(c)}});this.actorType.addEventListener("change",function(){a.listActor()})};
ProductActorPanel.prototype.createParameter=function(){var a=this.panel.querySelector("input"),b=new FormData;b.append("keyword",a.value);b.append("type",this.actorType.value);return b};
ProductActorPanel.prototype.listActor=function(){var a=this,b=this.createParameter(),d=this.listView;d.textContent="Loading...";this.entity.list(b).then(function(b){d.textContent=null;b.forEach(function(b){var c=(new ListviewRow(b,"/image/src/"+b.imageid)).li,e=c.querySelector("a");d.appendChild(c);e.addEventListener("click",function(){a.page.appendActor(b)})});$(d).listview("refresh")})};
var StagePanel=function(){this.panel=document.getElementById("stagePanel");this.stageView=this.panel.querySelector("ul");this.stage=new StageEntity};
StagePanel.prototype.open=function(a){var b=this,d=this.stageView;d.textContent="Loading...";this.stage.list("").then(function(c){d.textContent=null;c.forEach(function(c){var e=(new ListviewRow(c,"/img/icon.listview.png")).li,g=e.querySelector("a");d.appendChild(e);g.addEventListener("click",function(){a(c)?$(b.stagePanel).panel("close"):console.log("Already exists!")})});$(d).listview("refresh")})};var AjaxUtils=function(){};
AjaxUtils.fetch=function(a,b){return"function"===typeof fetch?fetch(a,{method:"post",body:b,credentials:"include"}).then(function(a){return a.json()}):new Promise(function(d,c){var e=new XMLHttpRequest;e.open("post",a);e.withCredentials=!0;e.addEventListener("loadend",function(){200<=e.status&&300>e.status?d(JSON.parse(e.response)):c(e.statusText)});e.send(b)})};AjaxUtils.post=function(a,b){return AjaxUtils.fetch(a,b)};document.addEventListener("DOMContentLoaded",function(){new AppMain;new TitleBg});
var AppMain=function(){this.customer=new Customer;this.stageManager=new StageManager;this.actorManager=new ActorManager;this.imageManager=new ImageManager;this.audioManager=new AudioManager;this.imageChooser=new ImageChooser;this.audioChooser=new AudioChooser;this.setupPanel();this.checkCustomer();AppMain.Instance=this};
AppMain.prototype.setupPanel=function(){var a=this,b=document.querySelector('[data-role="header"] a'),d=document.querySelector('[data-icon="star"]'),c=document.querySelector('[data-icon="bullets"]'),e=document.querySelector('[data-icon="heart"]'),f=document.querySelector('[data-icon="audio"]');d.addEventListener("click",function(){b.setAttribute("href","#stagePanel");a.manager=a.stageManager;a.manager.list();a.hideFilter()});c.addEventListener("click",function(){b.setAttribute("href","#actorPanel");
a.manager=a.actorManager;a.manager.list();a.hideFilter();$("#actorType-select").show()});e.addEventListener("click",function(){b.setAttribute("href","#imagePanel");a.manager=a.imageManager;a.manager.list();a.hideFilter();$("#type-radio").show()});f.addEventListener("click",function(){b.setAttribute("href","#audioPanel");a.manager=a.audioManager;a.manager.list();a.hideFilter();$("#audioType").show()});b.addEventListener("click",function(){a.manager.resetPanel()});d.click()};
AppMain.prototype.hideFilter=function(){$("#actorType-select").hide();$("#type-radio").hide();$("#audioType").hide()};AppMain.prototype.checkCustomer=function(){this.customer.check().then(function(a){})};var RepositoryManager=function(){this.listView=document.getElementById("listView");this.valueChangedevent=new Event("valueChanged")};
RepositoryManager.prototype.setupPanel=function(){var a=this,b=this.form.querySelector(".access");b&&new AccessibleRange(b,this.panelId);this.form.addEventListener("submit",function(b){var c=new FormData(a.form);b.preventDefault();$.mobile.loading("show",{text:"Save...",textVisible:!0});a.entity.save(c).then(function(b){$.mobile.loading("hide");b.ok?($(a.panel).panel("close"),a.list()):$(a.panel).find(".message").text("Saving failed.")});return!1})};RepositoryManager.prototype.select=function(a){return a};
RepositoryManager.prototype.resetPanel=function(a){a=void 0===a?{}:a;var b=this;$("#"+this.panelId+" :input").each(function(c,d){if(c=d.getAttribute("name")){var e=$(d);e.is(":radio")?e.val([a[c]]).checkboxradio("refresh"):e.is("select")?e.val(a[c]).selectmenu("refresh",!1):e.is(":file")?e.val(null):e.val(a[c]);e.is(":hidden")&&d.dispatchEvent(b.valueChangedevent)}});var d=$(this.panel).find('[data-role="collapsible"]');0<Object.keys(a).length?d.collapsible("collapse"):d.collapsible("expand")};
RepositoryManager.prototype.createParameter=function(){var a=$('#type-radio [name="type"]:checked').val(),b=new FormData;b.append("keyword","");b.append("type",a);return b};
RepositoryManager.prototype.list=function(){var a=this,b=this.createParameter();this.listView.textContent="Loadling...";this.entity.list(b).then(function(b){a.listView.textContent=null;b.forEach(function(b){var c=a.createRow(b);c.querySelector("a").addEventListener("click",function(){a.resetPanel(a.select(b))});a.listView.appendChild(c)});$(a.listView).listview("refresh")})};RepositoryManager.prototype.createRow=function(a,b){a.href="#"+this.panelId;return(new ListviewRow(a,void 0===b?null:b)).li};
$jscomp.global.Object.defineProperties(RepositoryManager.prototype,{panelId:{configurable:!0,enumerable:!0,get:function(){return this.panel.getAttribute("id")}}});var StageManager=function(){RepositoryManager.call(this);this.panel=document.getElementById("stagePanel");this.form=document.getElementById("stageForm");this.entity=new StageEntity;this.setupPanel()};$jscomp.inherits(StageManager,RepositoryManager);
StageManager.prototype.setupPanel=function(){var a=this;RepositoryManager.prototype.setupPanel.call(this);var b=this.form.querySelector(".imageButtons");"BG1 BG2 BG3 FG1 FG2 FG3".split(" ").forEach(function(a){var c=-1!=a.indexOf("B")?ImageEntity.Type.BACK:ImageEntity.Type.FORE;a=new ImageSelectionButton(a,c);b.appendChild(a.fieldset)});var d=this.form.querySelector(".audioButtons");["theme","boss"].forEach(function(a){a=new AudioSelectionButton(a,AudioEntity.Type.BGM);d.appendChild(a.fieldset)});
this.form.querySelector(".ui-icon-edit").addEventListener("click",function(){var b=a.form.querySelector('[name="id"]').value;window.open("/stage/edit/"+b)})};StageManager.prototype.getImgsrc=function(a){var b=null;"fg1 fg2 fg3 bg1 bg2 bg3".split(" ").forEach(function(d){d=a[d];null==b&&null!=d&&0<d.length&&(b=d)});return null==b?"/img/icon.listview.png":"/image/src/"+b};StageManager.prototype.createRow=function(a){return RepositoryManager.prototype.createRow.call(this,a,this.getImgsrc(a))};
var ActorManager=function(){RepositoryManager.call(this);this.panel=document.getElementById("actorPanel");this.form=this.panel.querySelector("form");this.entity=new ActorEntity;this.setupPanel()};$jscomp.inherits(ActorManager,RepositoryManager);
ActorManager.prototype.setupActorType=function(){var a=this,b=document.getElementById("actorType-select").querySelector("select"),d=document.getElementById("actorType");Object.keys(Actor.Type).forEach(function(a){var c=Actor.Type[a];if(0!=c&&"Formation"!=a){var f=document.createElement("option");f.setAttribute("value",c);"Enemy"==a&&f.setAttribute("selected","selected");f.textContent=a;b.appendChild(f);f=document.createElement("option");f.setAttribute("value",c);f.textContent=a;d.appendChild(f)}});
b.addEventListener("change",function(){a.list()});$(b).selectmenu("refresh",!0)};ActorManager.prototype.setupPanel=function(){var a=this.form.querySelector(".imageButtons");this.setupActorType();RepositoryManager.prototype.setupPanel.call(this);["ImageId"].forEach(function(b){b=new ImageSelectionButton(b,ImageEntity.Type.ACT);a.appendChild(b.fieldset)})};
ActorManager.prototype.createParameter=function(){var a=$('#actorType-select [name="actorType"]').val(),b=new FormData;b.append("keyword","");b.append("type",a);return b};ActorManager.prototype.createRow=function(a){return RepositoryManager.prototype.createRow.call(this,a,"/image/src/"+a.imageid)};var ImageManager=function(){RepositoryManager.call(this);this.panel=document.getElementById("imagePanel");this.form=document.getElementById("imageForm");this.entity=new ImageEntity;this.setupPanel()};
$jscomp.inherits(ImageManager,RepositoryManager);ImageManager.prototype.setupPanel=function(){var a=this;RepositoryManager.prototype.setupPanel.call(this);$('#type-radio [name="type"]').click(function(){a.list()})};ImageManager.prototype.createRow=function(a){var b=a.contentType.startsWith("image")?"/image/src/"+a.id:"/img/icon.listview.png";a.count={0:"Other",1:"Act",2:"Back",3:"Fore"}[a.type];return RepositoryManager.prototype.createRow.call(this,a,b)};
ImageManager.prototype.resetPanel=function(a){a=void 0===a?{}:a;RepositoryManager.prototype.resetPanel.call(this,a);var b=document.getElementById("image.thumbnail");a.id?b.setAttribute("src","/image/src/"+a.id):b.removeAttribute("src")};var AudioManager=function(){RepositoryManager.call(this);this.panel=document.getElementById("audioPanel");this.form=document.getElementById("audioForm");this.entity=new AudioEntity;this.setupPanel()};$jscomp.inherits(AudioManager,RepositoryManager);
AudioManager.prototype.setupPanel=function(){var a=this;RepositoryManager.prototype.setupPanel.call(this);$('#audioType [name="audioType"]').click(function(){a.list()})};
AudioManager.prototype.select=function(a){var b=this,d=this.form.querySelector('[name="webm"]'),c=document.getElementById("webmAnchor"),e=this.form.querySelector('[name="audio"]'),f=document.getElementById("audioAnchor");$.mobile.loading("show",{textVisible:!0});this.entity.select(a.id).then(function(g){b.resetPanel(g);g.webmlen?($(d).hide(),$(c).show(),c.setAttribute("href","/audio/webm/"+a.id)):($(d).show(),$(c).hide());g.audiolen?($(e).hide(),$(f).show(),f.setAttribute("href","/audio/audio/"+a.id)):
($(e).show(),$(f).hide());$.mobile.loading("hide")});return{}};AudioManager.prototype.createParameter=function(){var a=$('#audioType [name="audioType"]:checked').val(),b=new FormData;b.append("keyword","");b.append("type",a);return b};AudioManager.prototype.createRow=function(a){a.count=1==a.type?"FX":"BGM";a=RepositoryManager.prototype.createRow.call(this,a);var b=a.querySelector("a"),d=a.querySelector("img");b.removeChild(d);return a};
var ImageChooser=function(){ResourceChooser.call(this,"imageChooser");this.entity=new ImageEntity};$jscomp.inherits(ImageChooser,ResourceChooser);ImageChooser.ValueChangedEvent=ResourceChooser.ValueChangedEvent;ImageChooser.prototype.createRow=function(a){return ResourceChooser.prototype.createRow.call(this,a,"/image/src/"+a.id)};var AudioChooser=function(){ResourceChooser.call(this,"audioChooser");this.entity=new AudioEntity};$jscomp.inherits(AudioChooser,ResourceChooser);
AudioChooser.ValueChangedEvent=ResourceChooser.ValueChangedEvent;AudioChooser.prototype.createRow=function(a){a=ResourceChooser.prototype.createRow.call(this,a);a.anchor.removeChild(a.img);return a};
