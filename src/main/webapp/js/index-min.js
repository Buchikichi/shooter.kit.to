var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.inherits=function(a,b){function d(){}d.prototype=b.prototype;a.superClass_=b.prototype;a.prototype=new d;a.prototype.constructor=a;for(var c in b)if(Object.defineProperties){var e=Object.getOwnPropertyDescriptor(b,c);e&&Object.defineProperty(a,c,e)}else a[c]=b[c]};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,d){a!=Array.prototype&&a!=Object.prototype&&(a[b]=d.value)};
$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.symbolCounter_=0;$jscomp.Symbol=function(a){return $jscomp.SYMBOL_PREFIX+(a||"")+$jscomp.symbolCounter_++};
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.iterator;a||(a=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[a]&&$jscomp.defineProperty(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(a){var b=0;return $jscomp.iteratorPrototype(function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(a){$jscomp.initSymbolIterator();a={next:a};a[$jscomp.global.Symbol.iterator]=function(){return this};return a};$jscomp.iteratorFromArray=function(a,b){$jscomp.initSymbolIterator();a instanceof String&&(a+="");var d=0,c={next:function(){if(d<a.length){var e=d++;return{value:b(e,a[e]),done:!1}}c.next=function(){return{done:!0,value:void 0}};return c.next()}};c[Symbol.iterator]=function(){return c};return c};
$jscomp.polyfill=function(a,b,d,c){if(b){d=$jscomp.global;a=a.split(".");for(c=0;c<a.length-1;c++){var e=a[c];e in d||(d[e]={});d=d[e]}a=a[a.length-1];c=d[a];b=b(c);b!=c&&null!=b&&$jscomp.defineProperty(d,a,{configurable:!0,writable:!0,value:b})}};$jscomp.polyfill("Array.prototype.keys",function(a){return a?a:function(){return $jscomp.iteratorFromArray(this,function(a){return a})}},"es6-impl","es3");
$jscomp.findInternal=function(a,b,d){a instanceof String&&(a=String(a));for(var c=a.length,e=0;e<c;e++){var f=a[e];if(b.call(d,f,e,a))return{i:e,v:f}}return{i:-1,v:void 0}};$jscomp.polyfill("Array.prototype.find",function(a){return a?a:function(a,d){return $jscomp.findInternal(this,a,d).v}},"es6-impl","es3");
$jscomp.checkStringArgs=function(a,b,d){if(null==a)throw new TypeError("The 'this' value for String.prototype."+d+" must not be null or undefined");if(b instanceof RegExp)throw new TypeError("First argument to String.prototype."+d+" must not be a regular expression");return a+""};
$jscomp.polyfill("String.prototype.startsWith",function(a){return a?a:function(a,d){var b=$jscomp.checkStringArgs(this,a,"startsWith");a+="";var e=b.length,f=a.length;d=Math.max(0,Math.min(d|0,b.length));for(var g=0;g<f&&d<e;)if(b[d++]!=a[g++])return!1;return g>=f}},"es6-impl","es3");$jscomp.makeIterator=function(a){$jscomp.initSymbolIterator();var b=a[Symbol.iterator];return b?b.call(a):$jscomp.arrayIterator(a)};$jscomp.EXPOSE_ASYNC_EXECUTOR=!0;$jscomp.FORCE_POLYFILL_PROMISE=!1;
$jscomp.polyfill("Promise",function(a){function b(){this.batch_=null}if(a&&!$jscomp.FORCE_POLYFILL_PROMISE)return a;b.prototype.asyncExecute=function(a){null==this.batch_&&(this.batch_=[],this.asyncExecuteBatch_());this.batch_.push(a);return this};b.prototype.asyncExecuteBatch_=function(){var a=this;this.asyncExecuteFunction(function(){a.executeBatch_()})};var d=$jscomp.global.setTimeout;b.prototype.asyncExecuteFunction=function(a){d(a,0)};b.prototype.executeBatch_=function(){for(;this.batch_&&this.batch_.length;){var a=
this.batch_;this.batch_=[];for(var b=0;b<a.length;++b){var c=a[b];delete a[b];try{c()}catch(k){this.asyncThrow_(k)}}}this.batch_=null};b.prototype.asyncThrow_=function(a){this.asyncExecuteFunction(function(){throw a;})};var c=function(a){this.state_=0;this.result_=void 0;this.onSettledCallbacks_=[];var b=this.createResolveAndReject_();try{a(b.resolve,b.reject)}catch(h){b.reject(h)}};c.prototype.createResolveAndReject_=function(){function a(a){return function(d){c||(c=!0,a.call(b,d))}}var b=this,c=
!1;return{resolve:a(this.resolveTo_),reject:a(this.reject_)}};c.prototype.resolveTo_=function(a){if(a===this)this.reject_(new TypeError("A Promise cannot resolve to itself"));else if(a instanceof c)this.settleSameAsPromise_(a);else{a:switch(typeof a){case "object":var b=null!=a;break a;case "function":b=!0;break a;default:b=!1}b?this.resolveToNonPromiseObj_(a):this.fulfill_(a)}};c.prototype.resolveToNonPromiseObj_=function(a){var b=void 0;try{b=a.then}catch(h){this.reject_(h);return}"function"==typeof b?
this.settleSameAsThenable_(b,a):this.fulfill_(a)};c.prototype.reject_=function(a){this.settle_(2,a)};c.prototype.fulfill_=function(a){this.settle_(1,a)};c.prototype.settle_=function(a,b){if(0!=this.state_)throw Error("Cannot settle("+a+", "+b|"): Promise already settled in state"+this.state_);this.state_=a;this.result_=b;this.executeOnSettledCallbacks_()};c.prototype.executeOnSettledCallbacks_=function(){if(null!=this.onSettledCallbacks_){for(var a=this.onSettledCallbacks_,b=0;b<a.length;++b)a[b].call(),
a[b]=null;this.onSettledCallbacks_=null}};var e=new b;c.prototype.settleSameAsPromise_=function(a){var b=this.createResolveAndReject_();a.callWhenSettled_(b.resolve,b.reject)};c.prototype.settleSameAsThenable_=function(a,b){var c=this.createResolveAndReject_();try{a.call(b,c.resolve,c.reject)}catch(k){c.reject(k)}};c.prototype.then=function(a,b){function d(a,b){return"function"==typeof a?function(b){try{e(a(b))}catch(p){f(p)}}:b}var e,f,g=new c(function(a,b){e=a;f=b});this.callWhenSettled_(d(a,e),
d(b,f));return g};c.prototype.catch=function(a){return this.then(void 0,a)};c.prototype.callWhenSettled_=function(a,b){function c(){switch(d.state_){case 1:a(d.result_);break;case 2:b(d.result_);break;default:throw Error("Unexpected state: "+d.state_);}}var d=this;null==this.onSettledCallbacks_?e.asyncExecute(c):this.onSettledCallbacks_.push(function(){e.asyncExecute(c)})};c.resolve=function(a){return a instanceof c?a:new c(function(b,c){b(a)})};c.reject=function(a){return new c(function(b,c){c(a)})};
c.race=function(a){return new c(function(b,d){for(var e=$jscomp.makeIterator(a),f=e.next();!f.done;f=e.next())c.resolve(f.value).callWhenSettled_(b,d)})};c.all=function(a){var b=$jscomp.makeIterator(a),d=b.next();return d.done?c.resolve([]):new c(function(a,e){function f(b){return function(c){g[b]=c;h--;0==h&&a(g)}}var g=[],h=0;do g.push(void 0),h++,c.resolve(d.value).callWhenSettled_(f(g.length-1),e),d=b.next();while(!d.done)})};$jscomp.EXPOSE_ASYNC_EXECUTOR&&(c.$jscomp$new$AsyncExecutor=function(){return new b});
return c},"es6-impl","es3");
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
EditStagePanel.prototype.open=function(a){this.rec=a;$(this.roll).val([a.roll]).selectmenu("refresh")};var ProductActorPage=function(){var a=this;this.page=document.getElementById("productActor");this.actorList=$(this.page).find(".actorList");this.actorList.sortable({connectWith:".actorList",items:"li:not(.divider)",stop:function(b,d){a.actorList.each(function(b,d){a.refreshCounter(d)})}});this.productActorPanel=new ProductActorPanel(this);this.setupActorType();this.setupEvent()};
ProductActorPage.prototype.setupActorType=function(){var a=this;this.typeMap={};Array.prototype.forEach.call(this.actorList,function(b){var d=a.getActorType(b.id);0<d&&(a.typeMap[d]=b)})};ProductActorPage.prototype.getActorType=function(a){var b=0;Object.keys(Actor.Type).forEach(function(d){a.startsWith(d.toLowerCase())&&(b=Actor.Type[d])});return b};
ProductActorPage.prototype.setupEvent=function(){var a=this;this.actorList.each(function(b,d){b=d.querySelectorAll("li:not(.divider)");Array.prototype.forEach.call(b,function(b){b.querySelector("a.deleteButton").addEventListener("click",function(){b.parentNode.removeChild(b);a.refreshCounter(d)})});a.refreshCounter(d)})};ProductActorPage.prototype.refreshCounter=function(a){var b=a.querySelectorAll("li:not(.divider)");a.querySelector(".ui-li-count").textContent=b.length};
ProductActorPage.prototype.appendActor=function(a){var b=this,d=this.typeMap[a.type],c=new ListviewRow(a,"/image/src/"+a.imageid),e=c.li,c=c.anchor,f=document.createElement("a");e.appendChild(f);f.addEventListener("click",function(){e.parentNode.removeChild(e);b.refreshCounter(d)});c.setAttribute("data-actor",a.id);d.appendChild(e);$(d).listview("refresh");this.refreshCounter(d)};
ProductActorPage.prototype.listActor=function(){var a=this,b=[];Object.keys(Actor.Type).forEach(function(d){var c=Actor.Type[d];if(d=a.typeMap[c]){d=d.querySelectorAll("li:not(.divider)");var e=c;Array.prototype.forEach.call(d,function(a){a=a.querySelector("a").getAttribute("data-actor");b[e]={actorId:a,productType:c};e++})}});return b};
var ProductActorPanel=function(a){this.page=a;this.panel=document.getElementById("ActorPanel");this.actorType=this.panel.querySelector("select");this.listView=this.panel.querySelector("ul");this.entity=new ActorEntity;this.setupEvent()};ProductActorPanel.prototype.setupEvent=function(){var a=this;document.querySelector('[href="#ActorPanel"]').addEventListener("click",function(){a.listActor()});this.setupActorType()};
ProductActorPanel.prototype.setupActorType=function(){var a=this;Object.keys(Actor.Type).forEach(function(b){var d=Actor.Type[b];if(0!=d&&"Formation"!=b){var c=document.createElement("option");c.setAttribute("value",d);"Enemy"==b&&c.setAttribute("selected","selected");c.textContent=b;a.actorType.appendChild(c)}});this.actorType.addEventListener("change",function(){a.listActor()})};
ProductActorPanel.prototype.createParameter=function(){var a=this.panel.querySelector("input"),b=new FormData;b.append("keyword",a.value);b.append("type",this.actorType.value);return b};
ProductActorPanel.prototype.listActor=function(){var a=this,b=this.createParameter(),d=this.listView;d.textContent="Loading...";this.entity.list(b).then(function(b){d.textContent=null;b.forEach(function(b){var c=(new ListviewRow(b,"/image/src/"+b.imageid)).li,e=c.querySelector("a");d.appendChild(c);e.addEventListener("click",function(){a.page.appendActor(b)})});$(d).listview("refresh")})};
var StagePanel=function(){this.panel=document.getElementById("stagePanel");this.stageView=this.panel.querySelector("ul");this.stage=new StageEntity};
StagePanel.prototype.open=function(a){var b=this,d=this.stageView;d.textContent="Loading...";this.stage.list("").then(function(c){d.textContent=null;c.forEach(function(c){var e=(new ListviewRow(c,"/img/icon.listview.png")).li,g=e.querySelector("a");d.appendChild(e);g.addEventListener("click",function(){a(c)?$(b.stagePanel).panel("close"):console.log("Already exists!")})});$(d).listview("refresh")})};var AjaxUtils=function(){};
AjaxUtils.fetch=function(a,b){return"function"===typeof fetch?fetch(a,{method:"post",body:b,credentials:"include"}).then(function(a){return a.json()}):new Promise(function(d,c){var e=new XMLHttpRequest;e.open("post",a);e.withCredentials=!0;e.addEventListener("loadend",function(){200<=e.status&&300>e.status?d(JSON.parse(e.response)):c(e.statusText)});e.send(b)})};AjaxUtils.post=function(a,b){return AjaxUtils.fetch(a,b)};document.addEventListener("DOMContentLoaded",function(){new AppMain;new TitleBg});
var AppMain=function(){var a=this;this.selectedId="";this.product=new ProductEntity;this.product.list().then(function(b){a.setResult(b)});this.customer=new Customer;$("#loginForm").submit(function(){var b=$("#loginPanel [name=userid]").val(),d=$("#loginPanel [name=passwd]").val();a.setMessage();a.customer.signIn(b,d).then(function(b){b.ok?($("#loginPanel").panel("close"),a.checkCustomer()):a.setMessage("Incorrect username or password.")});return!1});this.checkCustomer()};
AppMain.prototype.checkCustomer=function(){this.customer.check().then(function(a){if(a.ok){a=document.getElementById("repositoryButton");var b=document.getElementById("editButton");a.classList.remove("ui-state-disabled");b.classList.remove("ui-state-disabled");$("#loginPanel [name=passwd]").hide();$("#loginPanel button").hide()}})};AppMain.prototype.setMessage=function(a){a=void 0===a?null:a;document.querySelector("#loginPanel .message").textContent=a};
AppMain.prototype.setResult=function(a){var b=this,d=document.getElementById("listView");a.forEach(function(a){a.href="#detailPopup";var c=new ListviewRow(a,"img/icon.listview.png");d.appendChild(c.li);c.anchor.addEventListener("click",function(c){c.preventDefault();b.clearDetailInfo();b.product.select(a.id).then(function(a){b.fillDetailInfo(a)});b.selectedId=a.id})});$(d).listview("refresh")};AppMain.prototype.clearDetailInfo=function(){this.fillDetailInfo({name:null,description:null,updated:""})};
AppMain.prototype.fillDetailInfo=function(a){var b=a.updated?(new Date(a.updated)).toISOString():"",d=a.id?"/product/play/"+a.id:"",c=document.getElementById("playButton"),e=a.id?"/product/detail/"+a.id:"",f=document.getElementById("editButton");document.getElementById("productName").value=a.name;document.getElementById("productDescription").value=a.description;document.getElementById("updated").textContent=b;c.setAttribute("href",d);f.setAttribute("href",e);a.id?c.classList.remove("ui-state-disabled"):
c.classList.add("ui-state-disabled")};
