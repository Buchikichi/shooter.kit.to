var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.inherits=function(a,b){function c(){}c.prototype=b.prototype;a.superClass_=b.prototype;a.prototype=new c;a.prototype.constructor=a;for(var d in b)if(Object.defineProperties){var e=Object.getOwnPropertyDescriptor(b,d);e&&Object.defineProperty(a,d,e)}else a[d]=b[d]};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)};$jscomp.SYMBOL_PREFIX="jscomp_symbol_";$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.symbolCounter_=0;$jscomp.Symbol=function(a){return $jscomp.SYMBOL_PREFIX+(a||"")+$jscomp.symbolCounter_++};
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.iterator;a||(a=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[a]&&$jscomp.defineProperty(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(a){var b=0;return $jscomp.iteratorPrototype(function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(a){$jscomp.initSymbolIterator();a={next:a};a[$jscomp.global.Symbol.iterator]=function(){return this};return a};$jscomp.iteratorFromArray=function(a,b){$jscomp.initSymbolIterator();a instanceof String&&(a+="");var c=0,d={next:function(){if(c<a.length){var e=c++;return{value:b(e,a[e]),done:!1}}d.next=function(){return{done:!0,value:void 0}};return d.next()}};d[Symbol.iterator]=function(){return d};return d};
$jscomp.polyfill=function(a,b,c,d){if(b){c=$jscomp.global;a=a.split(".");for(d=0;d<a.length-1;d++){var e=a[d];e in c||(c[e]={});c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&$jscomp.defineProperty(c,a,{configurable:!0,writable:!0,value:b})}};$jscomp.polyfill("Array.prototype.keys",function(a){return a?a:function(){return $jscomp.iteratorFromArray(this,function(a){return a})}},"es6-impl","es3");
$jscomp.findInternal=function(a,b,c){a instanceof String&&(a=String(a));for(var d=a.length,e=0;e<d;e++){var f=a[e];if(b.call(c,f,e,a))return{i:e,v:f}}return{i:-1,v:void 0}};$jscomp.polyfill("Array.prototype.find",function(a){return a?a:function(a,c){return $jscomp.findInternal(this,a,c).v}},"es6-impl","es3");
$jscomp.checkStringArgs=function(a,b,c){if(null==a)throw new TypeError("The 'this' value for String.prototype."+c+" must not be null or undefined");if(b instanceof RegExp)throw new TypeError("First argument to String.prototype."+c+" must not be a regular expression");return a+""};
$jscomp.polyfill("String.prototype.startsWith",function(a){return a?a:function(a,c){var b=$jscomp.checkStringArgs(this,a,"startsWith");a+="";var e=b.length,f=a.length;c=Math.max(0,Math.min(c|0,b.length));for(var g=0;g<f&&c<e;)if(b[c++]!=a[g++])return!1;return g>=f}},"es6-impl","es3");$jscomp.makeIterator=function(a){$jscomp.initSymbolIterator();var b=a[Symbol.iterator];return b?b.call(a):$jscomp.arrayIterator(a)};$jscomp.EXPOSE_ASYNC_EXECUTOR=!0;$jscomp.FORCE_POLYFILL_PROMISE=!1;
$jscomp.polyfill("Promise",function(a){function b(){this.batch_=null}if(a&&!$jscomp.FORCE_POLYFILL_PROMISE)return a;b.prototype.asyncExecute=function(a){null==this.batch_&&(this.batch_=[],this.asyncExecuteBatch_());this.batch_.push(a);return this};b.prototype.asyncExecuteBatch_=function(){var a=this;this.asyncExecuteFunction(function(){a.executeBatch_()})};var c=$jscomp.global.setTimeout;b.prototype.asyncExecuteFunction=function(a){c(a,0)};b.prototype.executeBatch_=function(){for(;this.batch_&&this.batch_.length;){var a=
this.batch_;this.batch_=[];for(var b=0;b<a.length;++b){var d=a[b];delete a[b];try{d()}catch(k){this.asyncThrow_(k)}}}this.batch_=null};b.prototype.asyncThrow_=function(a){this.asyncExecuteFunction(function(){throw a;})};var d=function(a){this.state_=0;this.result_=void 0;this.onSettledCallbacks_=[];var b=this.createResolveAndReject_();try{a(b.resolve,b.reject)}catch(h){b.reject(h)}};d.prototype.createResolveAndReject_=function(){function a(a){return function(c){d||(d=!0,a.call(b,c))}}var b=this,d=
!1;return{resolve:a(this.resolveTo_),reject:a(this.reject_)}};d.prototype.resolveTo_=function(a){if(a===this)this.reject_(new TypeError("A Promise cannot resolve to itself"));else if(a instanceof d)this.settleSameAsPromise_(a);else{a:switch(typeof a){case "object":var b=null!=a;break a;case "function":b=!0;break a;default:b=!1}b?this.resolveToNonPromiseObj_(a):this.fulfill_(a)}};d.prototype.resolveToNonPromiseObj_=function(a){var b=void 0;try{b=a.then}catch(h){this.reject_(h);return}"function"==typeof b?
this.settleSameAsThenable_(b,a):this.fulfill_(a)};d.prototype.reject_=function(a){this.settle_(2,a)};d.prototype.fulfill_=function(a){this.settle_(1,a)};d.prototype.settle_=function(a,b){if(0!=this.state_)throw Error("Cannot settle("+a+", "+b|"): Promise already settled in state"+this.state_);this.state_=a;this.result_=b;this.executeOnSettledCallbacks_()};d.prototype.executeOnSettledCallbacks_=function(){if(null!=this.onSettledCallbacks_){for(var a=this.onSettledCallbacks_,b=0;b<a.length;++b)a[b].call(),
a[b]=null;this.onSettledCallbacks_=null}};var e=new b;d.prototype.settleSameAsPromise_=function(a){var b=this.createResolveAndReject_();a.callWhenSettled_(b.resolve,b.reject)};d.prototype.settleSameAsThenable_=function(a,b){var d=this.createResolveAndReject_();try{a.call(b,d.resolve,d.reject)}catch(k){d.reject(k)}};d.prototype.then=function(a,b){function c(a,b){return"function"==typeof a?function(b){try{e(a(b))}catch(r){f(r)}}:b}var e,f,g=new d(function(a,b){e=a;f=b});this.callWhenSettled_(c(a,e),
c(b,f));return g};d.prototype.catch=function(a){return this.then(void 0,a)};d.prototype.callWhenSettled_=function(a,b){function d(){switch(c.state_){case 1:a(c.result_);break;case 2:b(c.result_);break;default:throw Error("Unexpected state: "+c.state_);}}var c=this;null==this.onSettledCallbacks_?e.asyncExecute(d):this.onSettledCallbacks_.push(function(){e.asyncExecute(d)})};d.resolve=function(a){return a instanceof d?a:new d(function(b,d){b(a)})};d.reject=function(a){return new d(function(b,d){d(a)})};
d.race=function(a){return new d(function(b,c){for(var e=$jscomp.makeIterator(a),f=e.next();!f.done;f=e.next())d.resolve(f.value).callWhenSettled_(b,c)})};d.all=function(a){var b=$jscomp.makeIterator(a),c=b.next();return c.done?d.resolve([]):new d(function(a,e){function f(b){return function(c){g[b]=c;h--;0==h&&a(g)}}var g=[],h=0;do g.push(void 0),h++,d.resolve(c.value).callWhenSettled_(f(g.length-1),e),c=b.next();while(!c.done)})};$jscomp.EXPOSE_ASYNC_EXECUTOR&&(d.$jscomp$new$AsyncExecutor=function(){return new b});
return d},"es6-impl","es3");
var AccessibleRange=function(a,b){var c=document.createElement("legend");c.textContent="Access:";Object.keys(AccessibleRange.List).forEach(function(c){var d=b+c,f=document.createElement("input"),g=document.createElement("label");f.setAttribute("id",d);f.setAttribute("type","radio");f.setAttribute("name","access");f.setAttribute("value",c);g.setAttribute("for",d);g.textContent=AccessibleRange.List[c];a.appendChild(f);a.appendChild(g)});a.setAttribute("data-role","controlgroup");a.setAttribute("data-type",
"horizontal");a.setAttribute("data-mini","true");a.appendChild(c);$(a).parents("form").trigger("create")};AccessibleRange.List={0:"Private",1:"Protected",2:"Public"};
var AudioSelectionButton=function(a,b){b=void 0===b?"OTHER":b;var c=this,d=document.createElement("legend"),e=document.createElement("a"),f=document.createElement("input"),g=document.createElement("div"),h=document.createElement("button"),k=document.createElement("button"),l=document.createElement("button"),m=document.createElement("fieldset"),p=a.toLowerCase();d.textContent=a+":";e.setAttribute("href","#audioChooser");e.setAttribute("data-target",p);e.setAttribute("data-filter",b);e.setAttribute("data-rel",
"popup");e.className="ui-btn ui-mini ui-corner-all ui-shadow ui-btn-icon-left ui-icon-audio";e.textContent="Choose...";f.setAttribute("type","hidden");f.setAttribute("name",p);f.addEventListener("valueChanged",function(){c.resetImage()});h.textContent="W";h.setAttribute("data-icon","audio");h.addEventListener("click",function(a){a.preventDefault();window.open("/audio/webm/?id="+f.value)});k.textContent="A";k.setAttribute("data-icon","audio");k.addEventListener("click",function(a){a.preventDefault();
window.open("/audio/audio/?id="+f.value)});l.textContent="Del";l.setAttribute("data-icon","delete");l.setAttribute("data-theme","b");l.className="ui-btn-icon-notext";l.addEventListener("click",function(a){a.preventDefault();f.value="";c.resetImage()});g.appendChild(h);g.appendChild(k);g.appendChild(l);m.appendChild(d);m.appendChild(e);m.appendChild(f);m.appendChild(g);$(g).controlgroup({type:"horizontal",mini:!0});this.fieldset=m;this.button=e;this.hidden=f;this.controlgroup=g};
AudioSelectionButton.prototype.resetImage=function(){this.hidden.value?($(this.controlgroup).show(),$(this.button).hide()):($(this.controlgroup).hide(),$(this.button).show())};var Customer=function(){};Customer.prototype.check=function(){return $.ajax({type:"post",url:"/customer/check",dataType:"json",data:{}})};Customer.prototype.signIn=function(a,b){return $.ajax({type:"post",url:"/customer/signIn",dataType:"json",data:{userid:a,passwd:b}})};
var ImageSelectionButton=function(a,b){b=void 0===b?"OTHER":b;var c=this,d=document.createElement("legend"),e=document.createElement("a"),f=document.createElement("input"),g=document.createElement("input"),h=document.createElement("fieldset"),k=a.toLowerCase();d.textContent=a+":";e.setAttribute("href","#imageChooser");e.setAttribute("data-target",k);e.setAttribute("data-filter",b);e.setAttribute("data-rel","popup");e.className="ui-btn ui-mini ui-corner-all ui-shadow ui-btn-icon-left ui-icon-heart";
e.textContent="Choose...";f.setAttribute("type","hidden");f.setAttribute("name",k);f.addEventListener("valueChanged",function(){c.resetImage()});g.setAttribute("type","image");g.addEventListener("click",function(a){a.preventDefault();f.value="";c.resetImage()});h.appendChild(d);h.appendChild(e);h.appendChild(f);h.appendChild(g);this.fieldset=h;this.button=e;this.hidden=f;this.img=g};
ImageSelectionButton.prototype.resetImage=function(){var a=this.hidden.value;a?(this.img.setAttribute("src","/image/src/"+a),$(this.img).show(),$(this.button).hide()):(this.img.removeAttribute("src"),$(this.img).hide(),$(this.button).show())};
var ListviewRow=function(a,b){b=void 0===b?null:b;var c=document.createElement("img"),d=document.createElement("span"),e=document.createElement("p"),f=document.createElement("a"),g=document.createElement("li");null!=b&&c.setAttribute("src",b);d.textContent=a.name;e.textContent=a.description;a.href&&f.setAttribute("href",a.href);f.appendChild(c);f.appendChild(d);f.appendChild(e);a.count&&(b=document.createElement("span"),b.classList.add("ui-li-count"),b.textContent=a.count,f.appendChild(b));g.appendChild(f);
this.img=c;this.anchor=f;this.li=g},ResourceChooser=function(a){this.id="#"+a;this.setupEvents()};ResourceChooser.prototype.setupEvents=function(){var a=this;document.querySelectorAll('[href="'+this.id+'"]').forEach(function(b){var c=$(b).parents("fieldset")[0];b.addEventListener("click",function(){var d=b.getAttribute("data-target"),e=b.getAttribute("data-filter"),d=c.querySelector('[name="'+d+'"]');a.list(d,e)})})};
ResourceChooser.prototype.createRow=function(a,b){return new ListviewRow(a,void 0===b?null:b)};
ResourceChooser.prototype.list=function(a,b){var c=this,d=new FormData;d.append("keyword","");d.append("type",b);this.listView=document.querySelector(this.id+" > ul");this.listView.textContent="Loadling...";this.entity.list(d).then(function(b){c.listView.textContent=null;b.forEach(function(b){var d=c.createRow(b);c.listView.appendChild(d.li);d.anchor.addEventListener("click",function(){c.embedId(a,b.id)})});$(c.listView).listview("refresh")})};
ResourceChooser.prototype.embedId=function(a,b){a.value=b;a.dispatchEvent(ResourceChooser.ValueChangedEvent);$(this.id).popup("close")};ResourceChooser.ValueChangedEvent=new Event("valueChanged");var TitleBg=function(){this.x=0;this.width=1200;this.move()};TitleBg.prototype.move=function(a){var b=this;document.querySelector("div[data-role=header]").style.backgroundPosition=-this.x+"px 0";this.x++;this.width<this.x&&(this.x=0);requestAnimationFrame(function(a){return b.move(a)})};
var EntityBase=function(a){this.base=a};EntityBase.prototype.list=function(a){a=void 0===a?{}:a;return AjaxUtils.post("/"+this.base+"/list",a)};EntityBase.prototype.select=function(a){var b=new FormData;b.append("id",a);return AjaxUtils.post("/"+this.base+"/select",b)};EntityBase.prototype.save=function(a){return AjaxUtils.post("/"+this.base+"/save",a)};var ActorEntity=function(){EntityBase.call(this,"actor")};$jscomp.inherits(ActorEntity,EntityBase);
var AudioEntity=function(){EntityBase.call(this,"audio")};$jscomp.inherits(AudioEntity,EntityBase);AudioEntity.Type={OTHER:0,FX:1,BGM:2};var ImageEntity=function(){EntityBase.call(this,"image")};$jscomp.inherits(ImageEntity,EntityBase);ImageEntity.Type={OTHER:0,ACT:1,BACK:2,FORE:3};var ProductEntity=function(){EntityBase.call(this,"product")};$jscomp.inherits(ProductEntity,EntityBase);
ProductEntity.prototype.detail=function(a){var b=new FormData;b.append("id",a);return AjaxUtils.post("/product/selectDetail",b)};ProductEntity.prototype.saveMap=function(a){return AjaxUtils.post("/detail/save",a)};var StageEntity=function(){EntityBase.call(this,"stage")};$jscomp.inherits(StageEntity,EntityBase);StageEntity.prototype.saveMap=function(a){return AjaxUtils.post("/"+this.base+"/saveMap",a)};
var EditStagePanel=function(a){this.appMain=a;this.panel=document.getElementById("editStagePanel");this.roll=this.panel.querySelector("select");this.rec={};this.setupEvent()};
EditStagePanel.prototype.setupEvent=function(){var a=this;this.roll.addEventListener("change",function(){a.rec.roll=a.roll.value});this.panel.querySelector(".ui-icon-edit").addEventListener("click",function(){window.open("/detail/edit/"+a.rec.id)});this.panel.querySelector(".ui-icon-delete").addEventListener("click",function(){a.appMain.removeStage(a.rec.stageId);$(a.panel).panel("close")});$(this.panel).on("panelclose",function(){a.appMain.updateStage(a.rec)})};
EditStagePanel.prototype.open=function(a){this.rec=a;$(this.roll).val([a.roll]).selectmenu("refresh")};var ProductActorChoicePanel=function(a){this.page=a;this.panel=document.getElementById("ProductActorChoicePanel");this.actorType=this.panel.querySelector("select");this.listView=this.panel.querySelector("ul");this.entity=new ActorEntity;this.setupEvent()};
ProductActorChoicePanel.prototype.setupEvent=function(){var a=this;document.querySelector('[href="#ProductActorChoicePanel"]').addEventListener("click",function(){a.listActor()});this.setupActorType()};
ProductActorChoicePanel.prototype.setupActorType=function(){var a=this;Object.keys(Actor.Type).forEach(function(b){var c=Actor.Type[b];if(0!=c&&"Formation"!=b){var d=document.createElement("option");d.setAttribute("value",c);"Enemy"==b&&d.setAttribute("selected","selected");d.textContent=b;a.actorType.appendChild(d)}});this.actorType.addEventListener("change",function(){a.listActor()})};
ProductActorChoicePanel.prototype.createParameter=function(){var a=this.panel.querySelector("input"),b=new FormData;b.append("keyword",a.value);b.append("type",this.actorType.value);return b};
ProductActorChoicePanel.prototype.listActor=function(){var a=this,b=this.createParameter(),c=this.listView;c.textContent="Loading...";this.entity.list(b).then(function(b){c.textContent=null;b.forEach(function(b){var d=(new ListviewRow(b,"/image/src/"+b.imageid)).li,e=d.querySelector("a");c.appendChild(d);e.addEventListener("click",function(){a.page.appendActor(b)})});$(c).listview("refresh")})};
var ProductActorPage=function(){var a=this;this.page=document.getElementById("productActor");this.actorList=$(this.page).find(".actorList");this.actorList.sortable({connectWith:".actorList",items:"li:not(.divider)",stop:function(b,c){a.actorList.each(function(b,c){a.refreshCounter(c)})}});this.productActorChoicePanel=new ProductActorChoicePanel(this);this.productActorPanel=new ProductActorPanel(this);this.setupActorType();this.setupEvent()};
ProductActorPage.prototype.setupActorType=function(){var a=this;this.typeMap={};Array.prototype.forEach.call(this.actorList,function(b){var c=a.getActorType(b.id);0<c&&(a.typeMap[c]=b)})};ProductActorPage.prototype.getActorType=function(a){var b=0;Object.keys(Actor.Type).forEach(function(c){a.startsWith(c)&&(b=Actor.Type[c])});return b};
ProductActorPage.prototype.setupEvent=function(){var a=this;this.actorList.each(function(b,c){b=c.querySelectorAll("li:not(.divider)");Array.prototype.forEach.call(b,function(b){var d=b.querySelector("a"),f=b.querySelector("a.deleteButton");d.addEventListener("click",function(){a.productActorPanel.open(b)});f.addEventListener("click",function(){b.parentNode.removeChild(b);a.refreshCounter(c)})});a.refreshCounter(c)})};
ProductActorPage.prototype.refreshCounter=function(a){var b=a.querySelectorAll("li:not(.divider)");a.querySelector(".ui-li-count").textContent=b.length};ProductActorPage.prototype.createClassName=function(a){a=a.name;for(var b="",c=!0,d=0;d<a.length;d++){var e=a.charAt(d);e.match(/[0-9A-Za-z]/)?(c&&(e=e.toUpperCase(),c=!1),b+=e):c=!0}return b};
ProductActorPage.prototype.appendActor=function(a){var b=this,c=this.typeMap[a.type],d=new ListviewRow(a,"/image/src/"+a.imageid),e=d.li,d=d.anchor,f=document.createElement("a");e.appendChild(f);f.addEventListener("click",function(){e.parentNode.removeChild(e);b.refreshCounter(c)});d.addEventListener("click",function(){b.productActorPanel.open(e)});d.setAttribute("href","#ProductActorPanel");d.setAttribute("data-actor",a.id);d.setAttribute("data-class",this.createClassName(a));c.appendChild(e);$(c).listview("refresh");
this.refreshCounter(c)};ProductActorPage.prototype.listActor=function(){var a=this,b=[];Object.keys(Actor.Type).forEach(function(c){var d=Actor.Type[c];if(c=a.typeMap[d]){c=c.querySelectorAll("li:not(.divider)");var e=d;Array.prototype.forEach.call(c,function(a){var c=a.querySelector("a");a=c.getAttribute("data-actor");c=c.getAttribute("data-class");b[e]={actorId:a,productType:d,className:c};e++})}});return b};
var ProductActorPanel=function(a){this.page=a;this.panel=document.getElementById("ProductActorPanel");this.setupEvent()};ProductActorPanel.prototype.setupEvent=function(){var a=this;this.panel.querySelector("button").addEventListener("click",function(){var b=a.panel.querySelector('[name="className"]');a.li.querySelector("a").setAttribute("data-class",b.value)})};
ProductActorPanel.prototype.setupForm=function(a){var b=a.querySelector("span").textContent;a=a.querySelector("a").getAttribute("data-class");var c=this.panel.querySelector('[name="actorName"]'),d=this.panel.querySelector('[name="className"]');c.value=b;d.value=a;d.focus()};ProductActorPanel.prototype.open=function(a){this.li=a;this.setupForm(a)};var StagePanel=function(){this.panel=document.getElementById("stagePanel");this.stageView=this.panel.querySelector("ul");this.stage=new StageEntity};
StagePanel.prototype.open=function(a){var b=this,c=this.stageView;c.textContent="Loading...";this.stage.list("").then(function(d){c.textContent=null;d.forEach(function(d){var e=(new ListviewRow(d,"/img/icon.listview.png")).li,g=e.querySelector("a");c.appendChild(e);g.addEventListener("click",function(){a(d)?$(b.stagePanel).panel("close"):console.log("Already exists!")})});$(c).listview("refresh")})};var AjaxUtils=function(){};
AjaxUtils.fetch=function(a,b){return"function"===typeof fetch?fetch(a,{method:"post",body:b,credentials:"include"}).then(function(a){return a.json()}):new Promise(function(c,d){var e=new XMLHttpRequest;e.open("post",a);e.withCredentials=!0;e.addEventListener("loadend",function(){200<=e.status&&300>e.status?c(JSON.parse(e.response)):d(e.statusText)});e.send(b)})};AjaxUtils.post=function(a,b){return AjaxUtils.fetch(a,b)};document.addEventListener("DOMContentLoaded",function(){new EditMain});
var EditMain=function(){this.stageId=document.getElementById("stageId").value;this.detailId=document.getElementById("detailId").value;(this.isDetail=0<this.detailId.length)?this.loadDetail():this.loadStage()};EditMain.prototype.loadStage=function(){var a=this;this.stageEntity=new StageEntity;this.stageEntity.select(this.stageId).then(function(b){a.field=new Field(512,224);a.setupStage(b,b.map);a.checkLoading()})};
EditMain.prototype.loadDetail=function(){var a=this;this.productEntity=new ProductEntity;this.productEntity.detail(this.detailId).then(function(b){var c=b.detailList,d=null;a.product=b;c.forEach(function(b){b.id==a.detailId&&(d=b)});b=d.stage;c=d.map?d.map:b.map;a.field=new Field(512,224);a.setupStage(b,c);a.checkLoading()})};
EditMain.prototype.setupStage=function(a,b){var c=this,d=document.getElementById("inputBox"),e=Stage.createViewList(a),f={speed:{min:0,max:1,step:.1},dir:{min:0,max:1,step:.01},blink:{min:0,max:1,step:.01}};this.stage=new Stage(Stage.SCROLL.LOOP,b,e);Stage.VIEWS.forEach(function(b){var e=a[b];if(e&&0!=e.length){var g=document.createElement("fieldset"),e=document.createElement("legend");e.textContent=b.toUpperCase()+":";g.appendChild(e);Object.keys(f).forEach(function(d){var e=f[d],h=b+d,k=document.createElement("input"),
l=a[h].toFixed(2);k.setAttribute("type","number");k.setAttribute("name",h);Object.keys(e).forEach(function(a){k.setAttribute(a,e[a])});k.value=l;k.addEventListener("change",function(){c.stage.getGround(b)[d]=k.value});g.appendChild(k);$(k).textinput()});d.appendChild(g);$(g).controlgroup({mini:!0})}})};
EditMain.prototype.checkLoading=function(){var a=this,b=document.getElementById("loading"),c=[ImageManager.Instance,AudioMixer.INSTANCE,MotionManager.INSTANCE],d=function(){var e=0,f=0,g=!0;c.forEach(function(a){e+=a.loaded;f+=a.max;g&=a.isComplete()});b.innerHTML=e+"/"+f;g?(b.parentNode.removeChild(b),a.start()):setTimeout(d,125)};d()};
EditMain.prototype.start=function(){var a=this,b=FlexibleView.Instance,c=this.field.landform,d=function(){var e=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame,f=a.controller.delta,g=a.controller.move;c.target=null;c.which=!1;g&&(c.target=g);f&&(a.isMove&&(c.selection="0",a.moveLandform(f)),a.isBrick&&(c.which=!0));b.clear();a.field.draw();e(d)};this.controller=new Controller;this.brickPanel=new BrickPanel(this.field);
this.isDetail&&(this.actorPanel=new ActorPanel(this.field),this.actorPanel.setupActors(this.product.actorList),this.setupActors(this.product.actorList),$('[name="behavior"]:eq(2)').checkboxradio("enable").checkboxradio("refresh"));c.isEdit=!0;c.loadStage(this.stage);d();this.setupEvents()};
EditMain.prototype.setupActors=function(a){console.log("#setupActors");Enemy.LIST=[{name:"Waver",type:Waver,img:"enemy/waver.png",h:16},{name:"Battery",type:Battery,img:"enemy/battery.png"},{name:"Bouncer",type:Bouncer,img:"enemy/bouncer.png"},{name:"Hanker",type:Hanker,img:"enemy/hanker.png"},{name:"Jerky",type:Jerky,img:"enemy/jerky.png"},{name:"Juno",type:Juno,img:"enemy/juno.png"},{name:"Crab",type:Crab,img:"enemy/crab.png"},{name:"Hatch",type:Hatch,img:"enemy/hatch.png",h:16},{name:"Charger",
type:Charger,img:"enemy/charger.png",h:16},{name:"Twister",type:Twister,img:"enemy/twister.png",h:16},{name:"Slur",type:Slur,img:"enemy/slur.png",h:16},{name:"Waver",type:Waver,img:"enemy/waver.png",h:16},{name:"Waver",type:Waver,img:"enemy/waver.png",h:16},{name:"Waver",type:Waver,img:"enemy/waver.png",h:16},{name:"Waver",type:Waver,img:"enemy/waver.png",h:16},{name:"Waver",type:Waver,img:"enemy/waver.png",h:16},{name:"Waver",type:Waver,img:"enemy/waver.png",h:16},{name:"Waver",type:Waver,img:"enemy/waver.png",
h:16},{name:"Waver",type:Waver,img:"enemy/waver.png",h:16},{name:"Waver",type:Waver,img:"enemy/waver.png",h:16},{name:"Tentacle",type:Tentacle,img:"enemy/tentacle.png"},{name:"Dragon",type:DragonHead,img:"enemy/dragonHead.png"},{name:"Waver(formation)",type:Waver,img:"enemy/waver.png",h:16,formation:!0},{name:"Molten",type:Molten,img:"boss/molten.png"},{name:"Winding",type:Winding,img:"boss/winding.png"},{name:"Titan",type:Titan,img:"boss/titan.icon.png"},{name:"Cascade",type:Cascade,img:"material/cascade.icon.png"},
{name:"Rewinder",type:Rewinder,img:"material/cascade.icon.png"}];a.forEach(function(a){var b=a.seq;a=a.actor;console.log(b+":"+a.name);Enemy.LIST[b]={name:a.name,type:Waver,h:16}});Enemy.LIST.forEach(function(a){a.instance=new a.type})};
EditMain.prototype.setupEvents=function(){var a=this,b=$("#slider"),c=this.field.landform,d=c.stage.fg.width/Landform.BRICK_WIDTH-1;b.change(function(){var a=b.val()*Landform.BRICK_WIDTH;c.stage.moveH(a)});b.attr("max",d);b.slider("refresh");c.stage.moveH(0);$('[name="behavior"]:eq(1)').click(function(){a.brickPanel.open()});$('[name="behavior"]:eq(2)').click(function(){a.actorPanel.open()});document.getElementById("saveButton").addEventListener("click",function(){a.saveMap()});var e=document.getElementById("mapFile");
e.addEventListener("change",function(){var a=window.URL.createObjectURL(e.files[0]);c.loadMapData(a)});document.getElementById("generateButton").addEventListener("click",function(){c.generateBrick(FlexibleView.Instance.ctx)});this.setupPointingDevice()};
EditMain.prototype.moveLandform=function(a){var b=this.field.landform,c=parseInt(a.x/Landform.BRICK_WIDTH);a=parseInt(a.y/Landform.BRICK_WIDTH);if(0!=c){var d=$("#slider"),e=parseInt(d.attr("min")),f=parseInt(d.attr("max")),g=parseInt(d.val())-c;g<e&&(g=e);f<g&&(g=f);e=g*Landform.BRICK_WIDTH;d.val(g).slider("refresh");b.stage.moveH(e)}0!=a&&b.wheel(a);this.controller.decPoint(c*Landform.BRICK_WIDTH,a*Landform.BRICK_WIDTH)};
EditMain.prototype.setupPointingDevice=function(){document.getElementById("canvas").addEventListener("mousemove",function(a){})};EditMain.prototype.saveMap=function(){var a=this.isDetail?this.saveDetailMap():this.saveStageMap(),b=document.getElementById("messagePopup"),c=b.querySelector("p");$.mobile.loading("show",{text:"Save...",textVisible:!0});a.then(function(a){$.mobile.loading("hide");c.textContent=a.ok?"Stage saved.":"Save failed.";$(b).popup("open",{})})};
EditMain.prototype.saveStageMap=function(){var a=document.getElementById("attrForm"),a=new FormData(a),b=this.field.landform;a.append("id",this.stageId);a.append("map",b.mapImage);return this.stageEntity.saveMap(a)};EditMain.prototype.saveDetailMap=function(){var a=new FormData,b=this.field.landform;a.append("id",this.detailId);a.append("map",b.mapImage);return this.productEntity.saveMap(a)};
$jscomp.global.Object.defineProperties(EditMain.prototype,{isMove:{configurable:!0,enumerable:!0,get:function(){return"m"==$('[name="behavior"]:checked').val()}},isBrick:{configurable:!0,enumerable:!0,get:function(){return"b"==$('[name="behavior"]:checked').val()}}});var BrickPanel=function(a){var b=this;this.field=a;this.panel=document.getElementById("brickPanel");$('[name="brick"]').click(function(){var a=$('[name="brick"]:checked').val();b.field.landform.selection=a})};
BrickPanel.prototype.open=function(){$(this.panel).panel("open")};var ActorPanel=function(a){this.field=a;this.panel=document.getElementById("actorPanel")};
ActorPanel.prototype.setupActors=function(a){var b={};a.forEach(function(a){var c=a.type,d=b[c];d||(d=[],b[c]=d);d.push(a)});var c=this.panel.querySelector('[data-role="controlgroup"] > div');Actor.TypeList.forEach(function(a){var d=b[Actor.Type[a]];if(d){var f=document.createElement("button"),g=[];f.textContent=a;f.setAttribute("disabled","disabled");f.classList.add("ui-btn");f.classList.add("ui-btn-b");f.classList.add("ui-mini");g.push(a);c.appendChild(f);d.forEach(function(b){var d=b.actor,e=document.createElement("div"),
f=document.createElement("label"),h=document.createElement("input"),q=document.createElement("img"),n=d.name;q.setAttribute("src","/image/src/"+d.imageid);h.setAttribute("type","radio");h.setAttribute("name","actor");h.setAttribute("value",b.seq);f.appendChild(q);f.appendChild(document.createTextNode(n));f.appendChild(h);e.classList.add("ui-radio");e.setAttribute("data-filtertext",[a,n].join(" "));e.appendChild(f);c.appendChild(e);g.push(n)});f.setAttribute("data-filtertext",g.join(" "))}});$(c).parent().trigger("create")};
ActorPanel.prototype.open=function(){$(this.panel).panel("open")};
function setupActorList(a){var b=$("#actorList"),c=b.controlgroup("container");Enemy.LIST.forEach(function(b,e){var d="actor"+e;e=$('<input type="radio" name="actor"/>').attr("id",d).val(e+1);var d=$("<label></label>").text(b.name).attr("for",d),g=$("<img/>").attr("src","img/"+b.img);d.css("background-image",'url("./img/'+b.img+'")');b.h&&(g.attr("width",b.h),g.attr("height",b.h));b.instance=new b.type(a);c.appendChild(e);c.appendChild(d.prepend(g))});b.parent().trigger("create");b.find("input").click(function(){a.selection=
this.value})}
function setupMouse(a){var b=$(a.canvas);b.mousedown(function(b){var c=a.magni;a.target={x:b.offsetX/c,y:b.offsetY/c};a.which=b.which});b.mousemove(function(b){var c=a.magni;a.target={x:b.offsetX/c,y:b.offsetY/c}});b.mouseup(function(){a.which=null});b.mouseleave(function(){a.target=null});b.on("onwheel"in document?"wheel":"onmousewheel"in document?"mousewheel":"DOMMouseScroll",function(b){b.preventDefault();a.wheel(b.originalEvent.deltaY?-b.originalEvent.deltaY:b.originalEvent.wheelDelta?b.originalEvent.wheelDelta:
-b.originalEvent.detail)})};
