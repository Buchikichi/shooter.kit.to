var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.objectCreate=$jscomp.ASSUME_ES5||"function"==typeof Object.create?Object.create:function(a){var b=function(){};b.prototype=a;return new b};$jscomp.underscoreProtoCanBeSet=function(){var a={a:!0},b={};try{return b.__proto__=a,b.a}catch(c){}return!1};
$jscomp.setPrototypeOf="function"==typeof Object.setPrototypeOf?Object.setPrototypeOf:$jscomp.underscoreProtoCanBeSet()?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null;
$jscomp.inherits=function(a,b){a.prototype=$jscomp.objectCreate(b.prototype);a.prototype.constructor=a;if($jscomp.setPrototypeOf){var c=$jscomp.setPrototypeOf;c(a,b)}else for(c in b)if("prototype"!=c)if(Object.defineProperties){var d=Object.getOwnPropertyDescriptor(b,c);d&&Object.defineProperty(a,c,d)}else a[c]=b[c];a.superClass_=b.prototype};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)};$jscomp.SYMBOL_PREFIX="jscomp_symbol_";$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.Symbol=function(){var a=0;return function(b){return $jscomp.SYMBOL_PREFIX+(b||"")+a++}}();
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.iterator;a||(a=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[a]&&$jscomp.defineProperty(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(a){var b=0;return $jscomp.iteratorPrototype(function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(a){$jscomp.initSymbolIterator();a={next:a};a[$jscomp.global.Symbol.iterator]=function(){return this};return a};$jscomp.iteratorFromArray=function(a,b){$jscomp.initSymbolIterator();a instanceof String&&(a+="");var c=0,d={next:function(){if(c<a.length){var e=c++;return{value:b(e,a[e]),done:!1}}d.next=function(){return{done:!0,value:void 0}};return d.next()}};d[Symbol.iterator]=function(){return d};return d};
$jscomp.polyfill=function(a,b,c,d){if(b){c=$jscomp.global;a=a.split(".");for(d=0;d<a.length-1;d++){var e=a[d];e in c||(c[e]={});c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&$jscomp.defineProperty(c,a,{configurable:!0,writable:!0,value:b})}};$jscomp.polyfill("Array.prototype.keys",function(a){return a?a:function(){return $jscomp.iteratorFromArray(this,function(a){return a})}},"es6","es3");
$jscomp.polyfill("Array.prototype.fill",function(a){return a?a:function(a,c,d){var b=this.length||0;0>c&&(c=Math.max(0,b+c));if(null==d||d>b)d=b;d=Number(d);0>d&&(d=Math.max(0,b+d));for(c=Number(c||0);c<d;c++)this[c]=a;return this}},"es6","es3");$jscomp.findInternal=function(a,b,c){a instanceof String&&(a=String(a));for(var d=a.length,e=0;e<d;e++){var f=a[e];if(b.call(c,f,e,a))return{i:e,v:f}}return{i:-1,v:void 0}};
$jscomp.polyfill("Array.prototype.find",function(a){return a?a:function(a,c){return $jscomp.findInternal(this,a,c).v}},"es6","es3");$jscomp.checkStringArgs=function(a,b,c){if(null==a)throw new TypeError("The 'this' value for String.prototype."+c+" must not be null or undefined");if(b instanceof RegExp)throw new TypeError("First argument to String.prototype."+c+" must not be a regular expression");return a+""};
$jscomp.polyfill("String.prototype.startsWith",function(a){return a?a:function(a,c){var b=$jscomp.checkStringArgs(this,a,"startsWith");a+="";var e=b.length,f=a.length;c=Math.max(0,Math.min(c|0,b.length));for(var g=0;g<f&&c<e;)if(b[c++]!=a[g++])return!1;return g>=f}},"es6","es3");$jscomp.makeIterator=function(a){$jscomp.initSymbolIterator();var b=a[Symbol.iterator];return b?b.call(a):$jscomp.arrayIterator(a)};$jscomp.FORCE_POLYFILL_PROMISE=!1;
$jscomp.polyfill("Promise",function(a){function b(){this.batch_=null}function c(a){return a instanceof e?a:new e(function(b,c){b(a)})}if(a&&!$jscomp.FORCE_POLYFILL_PROMISE)return a;b.prototype.asyncExecute=function(a){null==this.batch_&&(this.batch_=[],this.asyncExecuteBatch_());this.batch_.push(a);return this};b.prototype.asyncExecuteBatch_=function(){var a=this;this.asyncExecuteFunction(function(){a.executeBatch_()})};var d=$jscomp.global.setTimeout;b.prototype.asyncExecuteFunction=function(a){d(a,
0)};b.prototype.executeBatch_=function(){for(;this.batch_&&this.batch_.length;){var a=this.batch_;this.batch_=[];for(var b=0;b<a.length;++b){var c=a[b];delete a[b];try{c()}catch(h){this.asyncThrow_(h)}}}this.batch_=null};b.prototype.asyncThrow_=function(a){this.asyncExecuteFunction(function(){throw a;})};var e=function(a){this.state_=0;this.result_=void 0;this.onSettledCallbacks_=[];var b=this.createResolveAndReject_();try{a(b.resolve,b.reject)}catch(l){b.reject(l)}};e.prototype.createResolveAndReject_=
function(){function a(a){return function(e){c||(c=!0,a.call(b,e))}}var b=this,c=!1;return{resolve:a(this.resolveTo_),reject:a(this.reject_)}};e.prototype.resolveTo_=function(a){if(a===this)this.reject_(new TypeError("A Promise cannot resolve to itself"));else if(a instanceof e)this.settleSameAsPromise_(a);else{a:switch(typeof a){case "object":var b=null!=a;break a;case "function":b=!0;break a;default:b=!1}b?this.resolveToNonPromiseObj_(a):this.fulfill_(a)}};e.prototype.resolveToNonPromiseObj_=function(a){var b=
void 0;try{b=a.then}catch(l){this.reject_(l);return}"function"==typeof b?this.settleSameAsThenable_(b,a):this.fulfill_(a)};e.prototype.reject_=function(a){this.settle_(2,a)};e.prototype.fulfill_=function(a){this.settle_(1,a)};e.prototype.settle_=function(a,b){if(0!=this.state_)throw Error("Cannot settle("+a+", "+b|"): Promise already settled in state"+this.state_);this.state_=a;this.result_=b;this.executeOnSettledCallbacks_()};e.prototype.executeOnSettledCallbacks_=function(){if(null!=this.onSettledCallbacks_){for(var a=
this.onSettledCallbacks_,b=0;b<a.length;++b)a[b].call(),a[b]=null;this.onSettledCallbacks_=null}};var f=new b;e.prototype.settleSameAsPromise_=function(a){var b=this.createResolveAndReject_();a.callWhenSettled_(b.resolve,b.reject)};e.prototype.settleSameAsThenable_=function(a,b){var c=this.createResolveAndReject_();try{a.call(b,c.resolve,c.reject)}catch(h){c.reject(h)}};e.prototype.then=function(a,b){function c(a,b){return"function"==typeof a?function(b){try{d(a(b))}catch(p){f(p)}}:b}var d,f,g=new e(function(a,
b){d=a;f=b});this.callWhenSettled_(c(a,d),c(b,f));return g};e.prototype.catch=function(a){return this.then(void 0,a)};e.prototype.callWhenSettled_=function(a,b){function c(){switch(e.state_){case 1:a(e.result_);break;case 2:b(e.result_);break;default:throw Error("Unexpected state: "+e.state_);}}var e=this;null==this.onSettledCallbacks_?f.asyncExecute(c):this.onSettledCallbacks_.push(function(){f.asyncExecute(c)})};e.resolve=c;e.reject=function(a){return new e(function(b,c){c(a)})};e.race=function(a){return new e(function(b,
e){for(var d=$jscomp.makeIterator(a),f=d.next();!f.done;f=d.next())c(f.value).callWhenSettled_(b,e)})};e.all=function(a){var b=$jscomp.makeIterator(a),d=b.next();return d.done?c([]):new e(function(a,e){function f(b){return function(c){g[b]=c;h--;0==h&&a(g)}}var g=[],h=0;do g.push(void 0),h++,c(d.value).callWhenSettled_(f(g.length-1),e),d=b.next();while(!d.done)})};return e},"es6","es3");
var AccessibleRange=function(a,b){var c=document.createElement("legend");c.textContent="Access:";Object.keys(AccessibleRange.List).forEach(function(c){var e=b+c,d=document.createElement("input"),g=document.createElement("label");d.setAttribute("id",e);d.setAttribute("type","radio");d.setAttribute("name","access");d.setAttribute("value",c);g.setAttribute("for",e);g.textContent=AccessibleRange.List[c];a.appendChild(d);a.appendChild(g)});a.setAttribute("data-role","controlgroup");a.setAttribute("data-type",
"horizontal");a.setAttribute("data-mini","true");a.appendChild(c);$(a).parents("form").trigger("create")};AccessibleRange.List={0:"Private",1:"Protected",2:"Public"};
var AudioSelectionButton=function(a,b){var c=this;b=void 0===b?"OTHER":b;var d=document.createElement("legend"),e=document.createElement("a"),f=document.createElement("input"),g=document.createElement("div"),k=document.createElement("button"),l=document.createElement("button"),h=document.createElement("button"),m=document.createElement("fieldset"),q=a.toLowerCase();d.textContent=a+":";e.setAttribute("href","#audioChooser");e.setAttribute("data-target",q);e.setAttribute("data-filter",b);e.setAttribute("data-rel",
"popup");e.className="ui-btn ui-mini ui-corner-all ui-shadow ui-btn-icon-left ui-icon-audio";e.textContent="Choose...";f.setAttribute("type","hidden");f.setAttribute("name",q);f.addEventListener("valueChanged",function(){c.resetImage()});k.textContent="W";k.setAttribute("data-icon","audio");k.addEventListener("click",function(a){a.preventDefault();window.open("/audio/webm/?id="+f.value)});l.textContent="A";l.setAttribute("data-icon","audio");l.addEventListener("click",function(a){a.preventDefault();
window.open("/audio/audio/?id="+f.value)});h.textContent="Del";h.setAttribute("data-icon","delete");h.setAttribute("data-theme","b");h.className="ui-btn-icon-notext";h.addEventListener("click",function(a){a.preventDefault();f.value="";c.resetImage()});g.appendChild(k);g.appendChild(l);g.appendChild(h);m.appendChild(d);m.appendChild(e);m.appendChild(f);m.appendChild(g);$(g).controlgroup({type:"horizontal",mini:!0});this.fieldset=m;this.button=e;this.hidden=f;this.controlgroup=g};
AudioSelectionButton.prototype.resetImage=function(){this.hidden.value?($(this.controlgroup).show(),$(this.button).hide()):($(this.controlgroup).hide(),$(this.button).show())};var Customer=function(){};Customer.prototype.check=function(){return $.ajax({type:"post",url:"/customer/check",dataType:"json",data:{}})};Customer.prototype.signIn=function(a,b){return $.ajax({type:"post",url:"/customer/signIn",dataType:"json",data:{userid:a,passwd:b}})};
var FieldEditor=function(a,b){return Field.call(this,a,b)||this};$jscomp.inherits(FieldEditor,Field);FieldEditor.prototype.setupLandform=function(){this.landform=new LandformEditor(this.view.canvas)};
var ImageSelectionButton=function(a,b){var c=this;b=void 0===b?"OTHER":b;var d=document.createElement("legend"),e=document.createElement("a"),f=document.createElement("input"),g=document.createElement("input"),k=document.createElement("fieldset"),l=a.toLowerCase();d.textContent=a+":";e.setAttribute("href","#imageChooser");e.setAttribute("data-target",l);e.setAttribute("data-filter",b);e.setAttribute("data-rel","popup");e.className="ui-btn ui-mini ui-corner-all ui-shadow ui-btn-icon-left ui-icon-heart";
e.textContent="Choose...";f.setAttribute("type","hidden");f.setAttribute("name",l);f.addEventListener("valueChanged",function(){c.resetImage()});g.setAttribute("type","image");g.addEventListener("click",function(a){a.preventDefault();f.value="";c.resetImage()});k.appendChild(d);k.appendChild(e);k.appendChild(f);k.appendChild(g);this.fieldset=k;this.button=e;this.hidden=f;this.img=g};
ImageSelectionButton.prototype.resetImage=function(){var a=this.hidden.value;a?(this.img.setAttribute("src","/image/src/"+a),$(this.img).show(),$(this.button).hide()):(this.img.removeAttribute("src"),$(this.img).hide(),$(this.button).show())};var LandformEditor=function(a){return Landform.call(this,a)||this};$jscomp.inherits(LandformEditor,Landform);
LandformEditor.prototype.drawEnemy=function(a,b,c,d){d=void 0===d?!1:d;var e=this.ctx,f=Enemy.LIST[a];e.save();e.fillStyle="rgba(255, 255, 255, 0.5)";e.beginPath();e.arc(b,c,4,0,Math.PI2,!1);e.fill();e.fillText(a,b,c);e.restore();if(!f||!f.instance)return null;a=this.stage.fg;var g=a.y,k=f.formation?3:1;f=f.instance;b+=f.hW;c+=f.hH;f.x=b-a.x;f.y=c-g;f.checkInverse();f.x=b;for(f.y=c;k--;)f.draw(e),f.x+=2,f.y+=2;d&&(e.save(),e.translate(f.x,f.y),e.drawImage(this.reverse,-8,-4),e.restore());return f};
LandformEditor.prototype.drawBrick=function(){if(this.brick){var a=Field.Instance,b=this.stage.fg,c=b.x,d=b.y;b=this.ctx;var e=255<this.col?this.col-256:0,f=255<this.col?255:this.col%256,g=Landform.BRICK_WIDTH-2,k=Math.round(c/Landform.BRICK_WIDTH)*Landform.BRICK_WIDTH,l=k/Landform.BRICK_WIDTH,h=Math.min(l+512/Landform.BRICK_WIDTH,this.bw),m=Math.round(d/Landform.BRICK_WIDTH)*Landform.BRICK_WIDTH/Landform.BRICK_WIDTH,q=this.brick.data;b.save();b.translate(-c,-d);b.strokeStyle="rgba("+e+", "+f+", 255, .4)";
b.fillStyle=b.strokeStyle;for(d=0;d<this.bh;d++){f=m+d;e=f*Landform.BRICK_WIDTH;f=4*(f%this.bh*this.bw+l);for(var t=l,r=k;t<h;t++,r+=Landform.BRICK_WIDTH,f+=4)if(!(0>t)){var n=q[f],p=q[f+1];p&&this.drawEnemy(p,r,e,n&Landform.ATTR.REVERSE);n=q[f+2];255==n?b.fillRect(r,e,g,g):254==n&&(n=r+Landform.BRICK_HALF-1,p=e+Landform.BRICK_HALF-1,b.beginPath(),b.arc(n,p,g/2,0,Math.PI2,!1),b.stroke(),b.strokeRect(r,e,g,g))}}this.width-a.width<=c&&(a=this.width-Landform.BRICK_WIDTH,b.fillStyle="rgba(255, 0, 0, .4)",
b.fillRect(a,0,Landform.BRICK_WIDTH,this.height));b.restore();this.col+=16*this.colDir;if(0>=this.col||Landform.COL_MAX<=this.col)this.colDir*=-1}};
LandformEditor.prototype.drawTarget=function(){if(this.target){var a=Math.round((this.target.x-Landform.BRICK_HALF)/Landform.BRICK_WIDTH)*Landform.BRICK_WIDTH,b=Math.round((this.target.y-Landform.BRICK_HALF)/Landform.BRICK_WIDTH)*Landform.BRICK_WIDTH,c=this.ctx,d=Landform.BRICK_WIDTH,e=parseInt(this.selection);0<e&&(e=this.drawEnemy(e,a,b))&&(d=e.width);c.save();c.fillStyle="rgba(128, 255, 255, .4)";c.fillRect(a,b,d,d);c.restore();this.touchDown(a,b)}};
LandformEditor.prototype.touchDown=function(a,b){if(!this.which)this.ty=this.tx=-1,this.brickVal=null;else if(this.tx!=a||this.ty!=b){var c=parseInt(this.selection);if(0<c){var d=this.getAttr(this.target),e=this.getActor(this.target),f=d&Landform.ATTR.REVERSE;e==c&&f?this.putActor(this.target,0,0):(d=e==c?d|Landform.ATTR.REVERSE:d&~Landform.ATTR.REVERSE,this.putActor(this.target,c,d))}else d=this.getBrick(this.target),c=this.selection.substr(1),null==this.brickVal&&(this.brickVal=0<d?0:255-c),this.putBrick(this.target,
this.brickVal);this.touch=!0;this.tx=a;this.ty=b}};LandformEditor.prototype.putActor=function(a,b,c){c=void 0===c?null:c;null!=c&&this.putBrick(a,c,Landform.BRICK_LAYER.ATTR);this.putBrick(a,b,Landform.BRICK_LAYER.ACTOR)};LandformEditor.prototype.draw=function(){var a=this.ctx;Landform.prototype.draw.call(this);a.save();this.drawBrick();this.drawTarget();a.restore();this.touch&&this.brick&&(this.updateMap(),this.touch=!1)};
LandformEditor.prototype.updateMap=function(){var a=document.getElementById("mapImage");if(a){var b=document.createElement("canvas"),c=b.getContext("2d");b.width=this.brick.width;b.height=this.brick.height;c.putImageData(this.brick,0,0);a.setAttribute("src",b.toDataURL("image/png"))}};LandformEditor.prototype.getImageData=function(){var a=document.createElement("canvas"),b=a.getContext("2d");a.width=this.width;a.height=this.height;b.drawImage(this.img,0,0);return b.getImageData(0,0,this.width,this.height)};
LandformEditor.prototype.getBrickData=function(a){return null!=this.brick?this.brick:a.createImageData(this.width/Landform.BRICK_WIDTH,this.height/Landform.BRICK_WIDTH)};
LandformEditor.prototype.generateBrick=function(a){if(this.img.src&&this.img.complete){var b=this.getImageData(),c=this.width/Landform.BRICK_WIDTH,d=this.height/Landform.BRICK_WIDTH;a=this.getBrickData(a);var e=a.data,f=this.width*Landform.BRICK_HALF+4*Landform.BRICK_HALF,g=0;console.log(this.width+" x "+this.height+" | "+this.width*this.height*4);console.log(c+" x "+d+" | "+e.length);for(var k=0;k<d;k++){for(var l=0;l<c;l++){for(var h=!1,m=0;4>m;m++)b.data[f+m]&&(h=!0);h=h?255:0;e[g+2]=h;e[g+3]=
h;f+=4*Landform.BRICK_WIDTH;g+=4}f+=this.width*(Landform.BRICK_WIDTH-1)*4}console.log("ix:"+g);console.log("sx:"+f);this.brick=a;this.touch=!0}};LandformEditor.prototype.wheel=function(a){var b=this.stage.fg;0>a?(b.y+=Landform.BRICK_WIDTH,this.height<=b.y&&(b.y=0)):(0==b.y&&(b.y=this.height),b.y-=Landform.BRICK_WIDTH)};
var ListviewRow=function(a,b){b=void 0===b?null:b;var c=document.createElement("img"),d=document.createElement("span"),e=document.createElement("p"),f=document.createElement("a"),g=document.createElement("li");null!=b&&c.setAttribute("src",b);d.textContent=a.name;e.textContent=a.description;a.href&&f.setAttribute("href",a.href);f.appendChild(c);f.appendChild(d);f.appendChild(e);a.count&&(b=document.createElement("span"),b.classList.add("ui-li-count"),b.textContent=a.count,f.appendChild(b));g.appendChild(f);
this.img=c;this.anchor=f;this.li=g},ResourceChooser=function(a){this.id="#"+a;this.setupEvents()};ResourceChooser.prototype.setupEvents=function(){var a=this;document.querySelectorAll('[href="'+this.id+'"]').forEach(function(b){var c=$(b).parents("fieldset")[0];b.addEventListener("click",function(){var d=b.getAttribute("data-target"),e=b.getAttribute("data-filter");d=c.querySelector('[name="'+d+'"]');a.list(d,e)})})};
ResourceChooser.prototype.createRow=function(a,b){return new ListviewRow(a,void 0===b?null:b)};
ResourceChooser.prototype.list=function(a,b){var c=this,d=new FormData;d.append("keyword","");d.append("type",b);this.listView=document.querySelector(this.id+" > ul");this.listView.textContent="Loadling...";this.entity.list(d).then(function(b){c.listView.textContent=null;b.forEach(function(b){var d=c.createRow(b);c.listView.appendChild(d.li);d.anchor.addEventListener("click",function(){c.embedId(a,b.id)})});$(c.listView).listview("refresh")})};
ResourceChooser.prototype.embedId=function(a,b){a.value=b;a.dispatchEvent(ResourceChooser.ValueChangedEvent);$(this.id).popup("close")};ResourceChooser.ValueChangedEvent=new Event("valueChanged");var TitleBg=function(){this.x=0;this.width=1200;this.move()};TitleBg.prototype.move=function(a){var b=this;document.querySelector("div[data-role=header]").style.backgroundPosition=-this.x+"px 0";this.x++;this.width<this.x&&(this.x=0);requestAnimationFrame(function(a){return b.move(a)})};
var EntityBase=function(a){this.base=a};EntityBase.prototype.list=function(a){a=void 0===a?{}:a;return AjaxUtils.post("/"+this.base+"/list",a)};EntityBase.prototype.select=function(a){var b=new FormData;b.append("id",a);return AjaxUtils.post("/"+this.base+"/select",b)};EntityBase.prototype.save=function(a){return AjaxUtils.post("/"+this.base+"/save",a)};var ActorEntity=function(){EntityBase.call(this,"actor")};$jscomp.inherits(ActorEntity,EntityBase);
var AudioEntity=function(){EntityBase.call(this,"audio")};$jscomp.inherits(AudioEntity,EntityBase);AudioEntity.Type={OTHER:0,FX:1,BGM:2};var ImageEntity=function(){EntityBase.call(this,"image")};$jscomp.inherits(ImageEntity,EntityBase);ImageEntity.Type={OTHER:0,ACT:1,BACK:2,FORE:3};var ProductEntity=function(){EntityBase.call(this,"product")};$jscomp.inherits(ProductEntity,EntityBase);
ProductEntity.prototype.detail=function(a){var b=new FormData;b.append("id",a);return AjaxUtils.post("/product/selectDetail",b)};ProductEntity.prototype.saveMap=function(a){return AjaxUtils.post("/detail/save",a)};ProductEntity.prototype.increase=function(a){var b=new FormData;b.append("id",a);return AjaxUtils.post("/product/increase",b)};var ScoreEntity=function(){EntityBase.call(this,"score")};$jscomp.inherits(ScoreEntity,EntityBase);
ScoreEntity.prototype.register=function(a){return AjaxUtils.post("/score/register",a)};var StageEntity=function(){EntityBase.call(this,"stage")};$jscomp.inherits(StageEntity,EntityBase);StageEntity.prototype.saveMap=function(a){return AjaxUtils.post("/"+this.base+"/saveMap",a)};var EditStagePanel=function(a){this.appMain=a;this.panel=document.getElementById("editStagePanel");this.roll=this.panel.querySelector("select");this.rec={};this.setupEvent()};
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
ProductActorPage.prototype.appendActor=function(a){var b=this,c=this.typeMap[a.type],d=new ListviewRow(a,"/image/src/"+a.imageid),e=d.li;d=d.anchor;var f=document.createElement("a");e.appendChild(f);f.addEventListener("click",function(){e.parentNode.removeChild(e);b.refreshCounter(c)});d.addEventListener("click",function(){b.productActorPanel.open(e)});d.setAttribute("href","#ProductActorPanel");d.setAttribute("data-actor",a.id);d.setAttribute("data-class",this.createClassName(a));c.appendChild(e);
$(c).listview("refresh");this.refreshCounter(c)};ProductActorPage.prototype.listActor=function(){var a=this,b=[];Object.keys(Actor.Type).forEach(function(c){var d=Actor.Type[c];if(c=a.typeMap[d]){c=c.querySelectorAll("li:not(.divider)");var e=d;Array.prototype.forEach.call(c,function(a){var c=a.querySelector("a");a=c.getAttribute("data-actor");c=c.getAttribute("data-class");b[e]={actorId:a,productType:d,className:c};e++})}});return b};
var ProductActorPanel=function(a){this.page=a;this.panel=document.getElementById("ProductActorPanel");this.setupEvent()};ProductActorPanel.prototype.setupEvent=function(){var a=this;this.panel.querySelector("button").addEventListener("click",function(){var b=a.panel.querySelector('[name="className"]');a.li.querySelector("a").setAttribute("data-class",b.value)})};
ProductActorPanel.prototype.setupForm=function(a){var b=a.querySelector("span").textContent;a=a.querySelector("a").getAttribute("data-class");var c=this.panel.querySelector('[name="actorName"]'),d=this.panel.querySelector('[name="className"]');c.value=b;d.value=a;d.focus()};ProductActorPanel.prototype.open=function(a){this.li=a;this.setupForm(a)};var StagePanel=function(){this.panel=document.getElementById("stagePanel");this.stageView=this.panel.querySelector("ul");this.stage=new StageEntity};
StagePanel.prototype.open=function(a){var b=this,c=this.stageView;c.textContent="Loading...";this.stage.list("").then(function(d){c.textContent=null;d.forEach(function(d){var e=(new ListviewRow(d,"/img/icon.listview.png")).li,g=e.querySelector("a");c.appendChild(e);g.addEventListener("click",function(){a(d)?$(b.stagePanel).panel("close"):console.log("Already exists!")})});$(c).listview("refresh")})};var AjaxUtils=function(){};
AjaxUtils.fetch=function(a,b){return"function"===typeof fetch?fetch(a,{method:"post",body:b,credentials:"include"}).then(function(a){return a.json()}):new Promise(function(c,d){var e=new XMLHttpRequest;e.open("post",a);e.withCredentials=!0;e.addEventListener("loadend",function(){200<=e.status&&300>e.status?c(JSON.parse(e.response)):d(e.statusText)});e.send(b)})};AjaxUtils.post=function(a,b){return AjaxUtils.fetch(a,b)};document.addEventListener("DOMContentLoaded",function(){new AppMain;new TitleBg});
var AppMain=function(){this.customer=new Customer;this.stageManager=new StageManager;this.actorManager=new ActorManager;this.imageManager=new ImageManager;this.audioManager=new AudioManager;this.imageChooser=new ImageChooser;this.audioChooser=new AudioChooser;this.setupPanel();this.checkCustomer();AppMain.Instance=this};
AppMain.prototype.setupPanel=function(){var a=this,b=document.querySelector('[data-role="header"] a'),c=document.querySelector('[data-icon="star"]'),d=document.querySelector('[data-icon="bullets"]'),e=document.querySelector('[data-icon="heart"]'),f=document.querySelector('[data-icon="audio"]');c.addEventListener("click",function(){b.setAttribute("href","#stagePanel");a.manager=a.stageManager;a.manager.list();a.hideFilter()});d.addEventListener("click",function(){b.setAttribute("href","#actorPanel");
a.manager=a.actorManager;a.manager.list();a.hideFilter();$("#actorType-select").show()});e.addEventListener("click",function(){b.setAttribute("href","#imagePanel");a.manager=a.imageManager;a.manager.list();a.hideFilter();$("#type-radio").show()});f.addEventListener("click",function(){b.setAttribute("href","#audioPanel");a.manager=a.audioManager;a.manager.list();a.hideFilter();$("#audioType").show()});b.addEventListener("click",function(){a.manager.resetPanel()});c.click()};
AppMain.prototype.hideFilter=function(){$("#actorType-select").hide();$("#type-radio").hide();$("#audioType").hide()};AppMain.prototype.checkCustomer=function(){this.customer.check().then(function(a){})};var RepositoryManager=function(){this.listView=document.getElementById("listView");this.valueChangedevent=new Event("valueChanged")};
RepositoryManager.prototype.setupPanel=function(){var a=this,b=this.form.querySelector(".access");b&&new AccessibleRange(b,this.panelId);this.form.addEventListener("submit",function(b){var c=new FormData(a.form);b.preventDefault();$.mobile.loading("show",{text:"Save...",textVisible:!0});a.entity.save(c).then(function(b){$.mobile.loading("hide");b.ok?($(a.panel).panel("close"),a.list()):$(a.panel).find(".message").text("Saving failed.")});return!1})};RepositoryManager.prototype.select=function(a){return a};
RepositoryManager.prototype.resetPanel=function(a){var b=this;a=void 0===a?{}:a;$("#"+this.panelId+" :input").each(function(c,e){if(c=e.getAttribute("name")){var d=$(e);d.is(":radio")?d.val([a[c]]).checkboxradio("refresh"):d.is("select")?d.val(a[c]).selectmenu("refresh",!1):d.is(":file")?d.val(null):d.val(a[c]);d.is(":hidden")&&e.dispatchEvent(b.valueChangedevent)}});var c=$(this.panel).find('[data-role="collapsible"]');0<Object.keys(a).length?c.collapsible("collapse"):c.collapsible("expand")};
RepositoryManager.prototype.createParameter=function(){var a=$('#type-radio [name="type"]:checked').val(),b=new FormData;b.append("keyword","");b.append("type",a);return b};
RepositoryManager.prototype.list=function(){var a=this,b=this.createParameter();this.listView.textContent="Loadling...";this.entity.list(b).then(function(b){a.listView.textContent=null;b.forEach(function(b){var c=a.createRow(b);c.querySelector("a").addEventListener("click",function(){a.resetPanel(a.select(b))});a.listView.appendChild(c)});$(a.listView).listview("refresh")})};RepositoryManager.prototype.createRow=function(a,b){a.href="#"+this.panelId;return(new ListviewRow(a,void 0===b?null:b)).li};
$jscomp.global.Object.defineProperties(RepositoryManager.prototype,{panelId:{configurable:!0,enumerable:!0,get:function(){return this.panel.getAttribute("id")}}});var StageManager=function(){RepositoryManager.call(this);this.panel=document.getElementById("stagePanel");this.form=document.getElementById("stageForm");this.entity=new StageEntity;this.setupPanel()};$jscomp.inherits(StageManager,RepositoryManager);
StageManager.prototype.setupPanel=function(){var a=this;RepositoryManager.prototype.setupPanel.call(this);var b=this.form.querySelector(".imageButtons");"BG1 BG2 BG3 FG1 FG2 FG3".split(" ").forEach(function(a){var c=-1!=a.indexOf("B")?ImageEntity.Type.BACK:ImageEntity.Type.FORE;a=new ImageSelectionButton(a,c);b.appendChild(a.fieldset)});var c=this.form.querySelector(".audioButtons");["theme","boss"].forEach(function(a){a=new AudioSelectionButton(a,AudioEntity.Type.BGM);c.appendChild(a.fieldset)});
this.form.querySelector(".ui-icon-edit").addEventListener("click",function(){var b=a.form.querySelector('[name="id"]').value;window.open("/stage/edit/"+b)})};StageManager.prototype.getImgsrc=function(a){var b=null;"fg1 fg2 fg3 bg1 bg2 bg3".split(" ").forEach(function(c){c=a[c];null==b&&null!=c&&0<c.length&&(b=c)});return null==b?"/img/icon.listview.png":"/image/src/"+b};StageManager.prototype.createRow=function(a){return RepositoryManager.prototype.createRow.call(this,a,this.getImgsrc(a))};
var ActorManager=function(){RepositoryManager.call(this);this.panel=document.getElementById("actorPanel");this.form=this.panel.querySelector("form");this.entity=new ActorEntity;this.setupPanel()};$jscomp.inherits(ActorManager,RepositoryManager);
ActorManager.prototype.setupActorType=function(){var a=this,b=document.getElementById("actorType-select").querySelector("select"),c=document.getElementById("actorType");Object.keys(Actor.Type).forEach(function(a){var e=Actor.Type[a];if(0!=e&&"Formation"!=a){var d=document.createElement("option");d.setAttribute("value",e);"Enemy"==a&&d.setAttribute("selected","selected");d.textContent=a;b.appendChild(d);d=document.createElement("option");d.setAttribute("value",e);d.textContent=a;c.appendChild(d)}});
b.addEventListener("change",function(){a.list()});$(b).selectmenu("refresh",!0)};ActorManager.prototype.setupPanel=function(){var a=this.form.querySelector(".imageButtons");this.setupActorType();RepositoryManager.prototype.setupPanel.call(this);["ImageId","ImageId","ImageId"].forEach(function(b){b=new ImageSelectionButton(b,ImageEntity.Type.ACT);a.appendChild(b.fieldset)})};
ActorManager.prototype.createParameter=function(){var a=$('#actorType-select [name="actorType"]').val(),b=new FormData;b.append("keyword","");b.append("type",a);return b};ActorManager.prototype.createRow=function(a){return RepositoryManager.prototype.createRow.call(this,a,"/image/src/"+a.imageid)};var ImageManager=function(){RepositoryManager.call(this);this.panel=document.getElementById("imagePanel");this.form=document.getElementById("imageForm");this.entity=new ImageEntity;this.setupPanel()};
$jscomp.inherits(ImageManager,RepositoryManager);ImageManager.prototype.setupPanel=function(){var a=this;RepositoryManager.prototype.setupPanel.call(this);$('#type-radio [name="type"]').click(function(){a.list()})};ImageManager.prototype.createRow=function(a){var b=a.contentType.startsWith("image")?"/image/src/"+a.id:"/img/icon.listview.png";a.count={0:"Other",1:"Act",2:"Back",3:"Fore"}[a.type];return RepositoryManager.prototype.createRow.call(this,a,b)};
ImageManager.prototype.resetPanel=function(a){a=void 0===a?{}:a;RepositoryManager.prototype.resetPanel.call(this,a);var b=document.getElementById("image.thumbnail");a.id?b.setAttribute("src","/image/src/"+a.id):b.removeAttribute("src")};var AudioManager=function(){RepositoryManager.call(this);this.panel=document.getElementById("audioPanel");this.form=document.getElementById("audioForm");this.entity=new AudioEntity;this.setupPanel()};$jscomp.inherits(AudioManager,RepositoryManager);
AudioManager.prototype.setupPanel=function(){var a=this;RepositoryManager.prototype.setupPanel.call(this);$('#audioType [name="audioType"]').click(function(){a.list()})};
AudioManager.prototype.select=function(a){var b=this,c=this.form.querySelector('[name="webm"]'),d=document.getElementById("webmAnchor"),e=this.form.querySelector('[name="audio"]'),f=document.getElementById("audioAnchor");$.mobile.loading("show",{textVisible:!0});this.entity.select(a.id).then(function(g){b.resetPanel(g);g.webmlen?($(c).hide(),$(d).show(),d.setAttribute("href","/audio/webm/"+a.id)):($(c).show(),$(d).hide());g.audiolen?($(e).hide(),$(f).show(),f.setAttribute("href","/audio/audio/"+a.id)):
($(e).show(),$(f).hide());$.mobile.loading("hide")});return{}};AudioManager.prototype.createParameter=function(){var a=$('#audioType [name="audioType"]:checked').val(),b=new FormData;b.append("keyword","");b.append("type",a);return b};AudioManager.prototype.createRow=function(a){a.count=1==a.type?"FX":"BGM";a=RepositoryManager.prototype.createRow.call(this,a);var b=a.querySelector("a"),c=a.querySelector("img");b.removeChild(c);return a};
var ImageChooser=function(){ResourceChooser.call(this,"imageChooser");this.entity=new ImageEntity};$jscomp.inherits(ImageChooser,ResourceChooser);ImageChooser.ValueChangedEvent=ResourceChooser.ValueChangedEvent;ImageChooser.prototype.createRow=function(a){return ResourceChooser.prototype.createRow.call(this,a,"/image/src/"+a.id)};var AudioChooser=function(){ResourceChooser.call(this,"audioChooser");this.entity=new AudioEntity};$jscomp.inherits(AudioChooser,ResourceChooser);
AudioChooser.ValueChangedEvent=ResourceChooser.ValueChangedEvent;AudioChooser.prototype.createRow=function(a){a=ResourceChooser.prototype.createRow.call(this,a);a.anchor.removeChild(a.img);return a};
