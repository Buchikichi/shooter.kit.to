var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;$jscomp.objectCreate=$jscomp.ASSUME_ES5||"function"==typeof Object.create?Object.create:function(a){var b=function(){};b.prototype=a;return new b};$jscomp.underscoreProtoCanBeSet=function(){var a={a:!0},b={};try{return b.__proto__=a,b.a}catch(c){}return!1};
$jscomp.setPrototypeOf="function"==typeof Object.setPrototypeOf?Object.setPrototypeOf:$jscomp.underscoreProtoCanBeSet()?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null;
$jscomp.inherits=function(a,b){a.prototype=$jscomp.objectCreate(b.prototype);a.prototype.constructor=a;if($jscomp.setPrototypeOf){var c=$jscomp.setPrototypeOf;c(a,b)}else for(c in b)if("prototype"!=c)if(Object.defineProperties){var e=Object.getOwnPropertyDescriptor(b,c);e&&Object.defineProperty(a,c,e)}else a[c]=b[c];a.superClass_=b.prototype};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.arrayIteratorImpl=function(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}};$jscomp.arrayIterator=function(a){return{next:$jscomp.arrayIteratorImpl(a)}};$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)};$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.SymbolClass=function(a,b){this.$jscomp$symbol$id_=a;$jscomp.defineProperty(this,"description",{configurable:!0,writable:!0,value:b})};$jscomp.SymbolClass.prototype.toString=function(){return this.$jscomp$symbol$id_};
$jscomp.Symbol=function(){function a(c){if(this instanceof a)throw new TypeError("Symbol is not a constructor");return new $jscomp.SymbolClass($jscomp.SYMBOL_PREFIX+(c||"")+"_"+b++,c)}var b=0;return a}();
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.iterator;a||(a=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("Symbol.iterator"));"function"!=typeof Array.prototype[a]&&$jscomp.defineProperty(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))}});$jscomp.initSymbolIterator=function(){}};
$jscomp.initSymbolAsyncIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.asyncIterator;a||(a=$jscomp.global.Symbol.asyncIterator=$jscomp.global.Symbol("Symbol.asyncIterator"));$jscomp.initSymbolAsyncIterator=function(){}};$jscomp.iteratorPrototype=function(a){$jscomp.initSymbolIterator();a={next:a};a[$jscomp.global.Symbol.iterator]=function(){return this};return a};
$jscomp.iteratorFromArray=function(a,b){$jscomp.initSymbolIterator();a instanceof String&&(a+="");var c=0,e={next:function(){if(c<a.length){var d=c++;return{value:b(d,a[d]),done:!1}}e.next=function(){return{done:!0,value:void 0}};return e.next()}};e[Symbol.iterator]=function(){return e};return e};
$jscomp.polyfill=function(a,b,c,e){if(b){c=$jscomp.global;a=a.split(".");for(e=0;e<a.length-1;e++){var d=a[e];d in c||(c[d]={});c=c[d]}a=a[a.length-1];e=c[a];b=b(e);b!=e&&null!=b&&$jscomp.defineProperty(c,a,{configurable:!0,writable:!0,value:b})}};$jscomp.polyfill("Array.prototype.keys",function(a){return a?a:function(){return $jscomp.iteratorFromArray(this,function(a){return a})}},"es6","es3");
$jscomp.polyfill("Array.prototype.fill",function(a){return a?a:function(a,c,e){var b=this.length||0;0>c&&(c=Math.max(0,b+c));if(null==e||e>b)e=b;e=Number(e);0>e&&(e=Math.max(0,b+e));for(c=Number(c||0);c<e;c++)this[c]=a;return this}},"es6","es3");$jscomp.findInternal=function(a,b,c){a instanceof String&&(a=String(a));for(var e=a.length,d=0;d<e;d++){var f=a[d];if(b.call(c,f,d,a))return{i:d,v:f}}return{i:-1,v:void 0}};
$jscomp.polyfill("Array.prototype.find",function(a){return a?a:function(a,c){return $jscomp.findInternal(this,a,c).v}},"es6","es3");$jscomp.checkStringArgs=function(a,b,c){if(null==a)throw new TypeError("The 'this' value for String.prototype."+c+" must not be null or undefined");if(b instanceof RegExp)throw new TypeError("First argument to String.prototype."+c+" must not be a regular expression");return a+""};
$jscomp.polyfill("String.prototype.startsWith",function(a){return a?a:function(a,c){var b=$jscomp.checkStringArgs(this,a,"startsWith");a+="";var d=b.length,f=a.length;c=Math.max(0,Math.min(c|0,b.length));for(var g=0;g<f&&c<d;)if(b[c++]!=a[g++])return!1;return g>=f}},"es6","es3");$jscomp.makeIterator=function(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):$jscomp.arrayIterator(a)};$jscomp.FORCE_POLYFILL_PROMISE=!1;
$jscomp.polyfill("Promise",function(a){function b(){this.batch_=null}function c(a){return a instanceof d?a:new d(function(b,c){b(a)})}if(a&&!$jscomp.FORCE_POLYFILL_PROMISE)return a;b.prototype.asyncExecute=function(a){if(null==this.batch_){this.batch_=[];var b=this;this.asyncExecuteFunction(function(){b.executeBatch_()})}this.batch_.push(a)};var e=$jscomp.global.setTimeout;b.prototype.asyncExecuteFunction=function(a){e(a,0)};b.prototype.executeBatch_=function(){for(;this.batch_&&this.batch_.length;){var a=
this.batch_;this.batch_=[];for(var b=0;b<a.length;++b){var c=a[b];a[b]=null;try{c()}catch(l){this.asyncThrow_(l)}}}this.batch_=null};b.prototype.asyncThrow_=function(a){this.asyncExecuteFunction(function(){throw a;})};var d=function(a){this.state_=0;this.result_=void 0;this.onSettledCallbacks_=[];var b=this.createResolveAndReject_();try{a(b.resolve,b.reject)}catch(k){b.reject(k)}};d.prototype.createResolveAndReject_=function(){function a(a){return function(d){c||(c=!0,a.call(b,d))}}var b=this,c=!1;
return{resolve:a(this.resolveTo_),reject:a(this.reject_)}};d.prototype.resolveTo_=function(a){if(a===this)this.reject_(new TypeError("A Promise cannot resolve to itself"));else if(a instanceof d)this.settleSameAsPromise_(a);else{a:switch(typeof a){case "object":var b=null!=a;break a;case "function":b=!0;break a;default:b=!1}b?this.resolveToNonPromiseObj_(a):this.fulfill_(a)}};d.prototype.resolveToNonPromiseObj_=function(a){var b=void 0;try{b=a.then}catch(k){this.reject_(k);return}"function"==typeof b?
this.settleSameAsThenable_(b,a):this.fulfill_(a)};d.prototype.reject_=function(a){this.settle_(2,a)};d.prototype.fulfill_=function(a){this.settle_(1,a)};d.prototype.settle_=function(a,b){if(0!=this.state_)throw Error("Cannot settle("+a+", "+b+"): Promise already settled in state"+this.state_);this.state_=a;this.result_=b;this.executeOnSettledCallbacks_()};d.prototype.executeOnSettledCallbacks_=function(){if(null!=this.onSettledCallbacks_){for(var a=0;a<this.onSettledCallbacks_.length;++a)f.asyncExecute(this.onSettledCallbacks_[a]);
this.onSettledCallbacks_=null}};var f=new b;d.prototype.settleSameAsPromise_=function(a){var b=this.createResolveAndReject_();a.callWhenSettled_(b.resolve,b.reject)};d.prototype.settleSameAsThenable_=function(a,b){var c=this.createResolveAndReject_();try{a.call(b,c.resolve,c.reject)}catch(l){c.reject(l)}};d.prototype.then=function(a,b){function c(a,b){return"function"==typeof a?function(b){try{e(a(b))}catch(p){f(p)}}:b}var e,f,g=new d(function(a,b){e=a;f=b});this.callWhenSettled_(c(a,e),c(b,f));return g};
d.prototype.catch=function(a){return this.then(void 0,a)};d.prototype.callWhenSettled_=function(a,b){function c(){switch(d.state_){case 1:a(d.result_);break;case 2:b(d.result_);break;default:throw Error("Unexpected state: "+d.state_);}}var d=this;null==this.onSettledCallbacks_?f.asyncExecute(c):this.onSettledCallbacks_.push(c)};d.resolve=c;d.reject=function(a){return new d(function(b,c){c(a)})};d.race=function(a){return new d(function(b,d){for(var e=$jscomp.makeIterator(a),f=e.next();!f.done;f=e.next())c(f.value).callWhenSettled_(b,
d)})};d.all=function(a){var b=$jscomp.makeIterator(a),e=b.next();return e.done?c([]):new d(function(a,d){function f(b){return function(c){g[b]=c;h--;0==h&&a(g)}}var g=[],h=0;do g.push(void 0),h++,c(e.value).callWhenSettled_(f(g.length-1),d),e=b.next();while(!e.done)})};return d},"es6","es3");
var AccessibleRange=function(a,b){var c=document.createElement("legend");c.textContent="Access:";Object.keys(AccessibleRange.List).forEach(function(c){var d=b+c,e=document.createElement("input"),g=document.createElement("label");e.setAttribute("id",d);e.setAttribute("type","radio");e.setAttribute("name","access");e.setAttribute("value",c);g.setAttribute("for",d);g.textContent=AccessibleRange.List[c];a.appendChild(e);a.appendChild(g)});a.setAttribute("data-role","controlgroup");a.setAttribute("data-type",
"horizontal");a.setAttribute("data-mini","true");a.appendChild(c);$(a).parents("form").trigger("create")};AccessibleRange.List={0:"Private",1:"Protected",2:"Public"};
var AudioSelectionButton=function(a,b){var c=this;b=void 0===b?"OTHER":b;var e=document.createElement("legend"),d=document.createElement("a"),f=document.createElement("input"),g=document.createElement("div"),h=document.createElement("button"),k=document.createElement("button"),l=document.createElement("button"),m=document.createElement("fieldset"),q=a.toLowerCase();e.textContent=a+":";d.setAttribute("href","#audioChooser");d.setAttribute("data-target",q);d.setAttribute("data-filter",b);d.setAttribute("data-rel",
"popup");d.className="ui-btn ui-mini ui-corner-all ui-shadow ui-btn-icon-left ui-icon-audio";d.textContent="Choose...";f.setAttribute("type","hidden");f.setAttribute("name",q);f.addEventListener("valueChanged",function(){c.resetImage()});h.textContent="W";h.setAttribute("data-icon","audio");h.addEventListener("click",function(a){a.preventDefault();window.open("/audio/webm/?id="+f.value)});k.textContent="A";k.setAttribute("data-icon","audio");k.addEventListener("click",function(a){a.preventDefault();
window.open("/audio/audio/?id="+f.value)});l.textContent="Del";l.setAttribute("data-icon","delete");l.setAttribute("data-theme","b");l.className="ui-btn-icon-notext";l.addEventListener("click",function(a){a.preventDefault();f.value="";c.resetImage()});g.appendChild(h);g.appendChild(k);g.appendChild(l);m.appendChild(e);m.appendChild(d);m.appendChild(f);m.appendChild(g);$(g).controlgroup({type:"horizontal",mini:!0});this.fieldset=m;this.button=d;this.hidden=f;this.controlgroup=g};
AudioSelectionButton.prototype.resetImage=function(){this.hidden.value?($(this.controlgroup).show(),$(this.button).hide()):($(this.controlgroup).hide(),$(this.button).show())};var Customer=function(){};Customer.prototype.check=function(){return $.ajax({type:"post",url:"/customer/check",dataType:"json",data:{}})};Customer.prototype.signIn=function(a,b){return $.ajax({type:"post",url:"/customer/signIn",dataType:"json",data:{userid:a,passwd:b}})};
var FieldEditor=function(a,b){return Field.call(this,a,b)||this};$jscomp.inherits(FieldEditor,Field);FieldEditor.prototype.setupLandform=function(){this.landform=new LandformEditor(this.view.canvas)};
var ImageSelectionButton=function(a,b){var c=this;b=void 0===b?"OTHER":b;var e=document.createElement("legend"),d=document.createElement("a"),f=document.createElement("input"),g=document.createElement("input"),h=document.createElement("fieldset"),k=a.toLowerCase();e.textContent=a+":";d.setAttribute("href","#imageChooser");d.setAttribute("data-target",k);d.setAttribute("data-filter",b);d.setAttribute("data-rel","popup");d.className="ui-btn ui-mini ui-corner-all ui-shadow ui-btn-icon-left ui-icon-heart";
d.textContent="Choose...";f.setAttribute("type","hidden");f.setAttribute("name",k);f.addEventListener("valueChanged",function(){c.resetImage()});g.setAttribute("type","image");g.addEventListener("click",function(a){a.preventDefault();f.value="";c.resetImage()});h.appendChild(e);h.appendChild(d);h.appendChild(f);h.appendChild(g);this.fieldset=h;this.button=d;this.hidden=f;this.img=g};
ImageSelectionButton.prototype.resetImage=function(){var a=this.hidden.value;a?(this.img.setAttribute("src","/image/src/"+a),$(this.img).show(),$(this.button).hide()):(this.img.removeAttribute("src"),$(this.img).hide(),$(this.button).show())};var LandformEditor=function(a){return Landform.call(this,a)||this};$jscomp.inherits(LandformEditor,Landform);
LandformEditor.prototype.drawEnemy=function(a,b,c,e){e=void 0===e?!1:e;var d=this.ctx,f=Enemy.LIST[a];d.save();d.fillStyle="rgba(255, 255, 255, 0.5)";d.beginPath();d.arc(b,c,4,0,Math.PI2,!1);d.fill();d.fillText(a,b,c);d.restore();if(!f||!f.instance)return null;a=this.stage.fg;var g=a.y,h=f.formation?3:1;f=f.instance;b+=f.hW;c+=f.hH;f.x=b-a.x;f.y=c-g;f.checkInverse();f.x=b;for(f.y=c;h--;)f.draw(d),f.x+=2,f.y+=2;e&&(d.save(),d.translate(f.x,f.y),d.drawImage(this.reverse,-8,-4),d.restore());return f};
LandformEditor.prototype.drawBrick=function(){if(this.brick){var a=Field.Instance,b=this.stage.fg,c=b.x,e=b.y;b=this.ctx;var d=255<this.col?this.col-256:0,f=255<this.col?255:this.col%256,g=Landform.BRICK_WIDTH-2,h=Math.round(c/Landform.BRICK_WIDTH)*Landform.BRICK_WIDTH,k=h/Landform.BRICK_WIDTH,l=Math.min(k+512/Landform.BRICK_WIDTH,this.bw),m=Math.round(e/Landform.BRICK_WIDTH)*Landform.BRICK_WIDTH/Landform.BRICK_WIDTH,q=this.brick.data;b.save();b.translate(-c,-e);b.strokeStyle="rgba("+d+", "+f+", 255, .4)";
b.fillStyle=b.strokeStyle;for(e=0;e<this.bh;e++){f=m+e;d=f*Landform.BRICK_WIDTH;f=4*(f%this.bh*this.bw+k);for(var t=k,r=h;t<l;t++,r+=Landform.BRICK_WIDTH,f+=4)if(!(0>t)){var n=q[f],p=q[f+1];p&&this.drawEnemy(p,r,d,n&Landform.ATTR.REVERSE);n=q[f+2];255==n?b.fillRect(r,d,g,g):254==n&&(n=r+Landform.BRICK_HALF-1,p=d+Landform.BRICK_HALF-1,b.beginPath(),b.arc(n,p,g/2,0,Math.PI2,!1),b.stroke(),b.strokeRect(r,d,g,g))}}this.width-a.width<=c&&(a=this.width-Landform.BRICK_WIDTH,b.fillStyle="rgba(255, 0, 0, .4)",
b.fillRect(a,0,Landform.BRICK_WIDTH,this.height));b.restore();this.col+=16*this.colDir;if(0>=this.col||Landform.COL_MAX<=this.col)this.colDir*=-1}};
LandformEditor.prototype.drawTarget=function(){if(this.target){var a=Math.round((this.target.x-Landform.BRICK_HALF)/Landform.BRICK_WIDTH)*Landform.BRICK_WIDTH,b=Math.round((this.target.y-Landform.BRICK_HALF)/Landform.BRICK_WIDTH)*Landform.BRICK_WIDTH,c=this.ctx,e=Landform.BRICK_WIDTH,d=parseInt(this.selection);0<d&&(d=this.drawEnemy(d,a,b))&&(e=d.width);c.save();c.fillStyle="rgba(128, 255, 255, .4)";c.fillRect(a,b,e,e);c.restore();this.touchDown(a,b)}};
LandformEditor.prototype.touchDown=function(a,b){if(!this.which)this.ty=this.tx=-1,this.brickVal=null;else if(this.tx!=a||this.ty!=b){var c=parseInt(this.selection);if(0<c){var e=this.getAttr(this.target),d=this.getActor(this.target),f=e&Landform.ATTR.REVERSE;d==c&&f?this.putActor(this.target,0,0):(e=d==c?e|Landform.ATTR.REVERSE:e&~Landform.ATTR.REVERSE,this.putActor(this.target,c,e))}else e=this.getBrick(this.target),c=this.selection.substr(1),null==this.brickVal&&(this.brickVal=0<e?0:255-c),this.putBrick(this.target,
this.brickVal);this.touch=!0;this.tx=a;this.ty=b}};LandformEditor.prototype.putActor=function(a,b,c){c=void 0===c?null:c;null!=c&&this.putBrick(a,c,Landform.BRICK_LAYER.ATTR);this.putBrick(a,b,Landform.BRICK_LAYER.ACTOR)};LandformEditor.prototype.draw=function(){var a=this.ctx;Landform.prototype.draw.call(this);a.save();this.drawBrick();this.drawTarget();a.restore();this.touch&&this.brick&&(this.updateMap(),this.touch=!1)};
LandformEditor.prototype.updateMap=function(){var a=document.getElementById("mapImage");if(a){var b=document.createElement("canvas"),c=b.getContext("2d");b.width=this.brick.width;b.height=this.brick.height;c.putImageData(this.brick,0,0);a.setAttribute("src",b.toDataURL("image/png"))}};LandformEditor.prototype.getImageData=function(){var a=document.createElement("canvas"),b=a.getContext("2d");a.width=this.width;a.height=this.height;b.drawImage(this.img,0,0);return b.getImageData(0,0,this.width,this.height)};
LandformEditor.prototype.getBrickData=function(a){return null!=this.brick?this.brick:a.createImageData(this.width/Landform.BRICK_WIDTH,this.height/Landform.BRICK_WIDTH)};
LandformEditor.prototype.generateBrick=function(a){if(this.img.src&&this.img.complete){var b=this.getImageData(),c=this.width/Landform.BRICK_WIDTH,e=this.height/Landform.BRICK_WIDTH;a=this.getBrickData(a);var d=a.data,f=this.width*Landform.BRICK_HALF+4*Landform.BRICK_HALF,g=0;console.log(this.width+" x "+this.height+" | "+this.width*this.height*4);console.log(c+" x "+e+" | "+d.length);for(var h=0;h<e;h++){for(var k=0;k<c;k++){for(var l=!1,m=0;4>m;m++)b.data[f+m]&&(l=!0);l=l?255:0;d[g+2]=l;d[g+3]=
l;f+=4*Landform.BRICK_WIDTH;g+=4}f+=this.width*(Landform.BRICK_WIDTH-1)*4}console.log("ix:"+g);console.log("sx:"+f);this.brick=a;this.touch=!0}};LandformEditor.prototype.wheel=function(a){var b=this.stage.fg;0>a?(b.y+=Landform.BRICK_WIDTH,this.height<=b.y&&(b.y=0)):(0==b.y&&(b.y=this.height),b.y-=Landform.BRICK_WIDTH)};
var ListviewRow=function(a,b){b=void 0===b?null:b;var c=document.createElement("img"),e=document.createElement("span"),d=document.createElement("p"),f=document.createElement("a"),g=document.createElement("li");null!=b&&c.setAttribute("src",b);e.textContent=a.name;d.textContent=a.description;a.href&&f.setAttribute("href",a.href);f.appendChild(c);f.appendChild(e);f.appendChild(d);a.count&&(b=document.createElement("span"),b.classList.add("ui-li-count"),b.textContent=a.count,f.appendChild(b));g.appendChild(f);
this.img=c;this.anchor=f;this.li=g},ResourceChooser=function(a){this.id="#"+a;this.setupEvents()};ResourceChooser.prototype.setupEvents=function(){var a=this;document.querySelectorAll('[href="'+this.id+'"]').forEach(function(b){var c=$(b).parents("fieldset")[0];b.addEventListener("click",function(){var e=b.getAttribute("data-target"),d=b.getAttribute("data-filter");e=c.querySelector('[name="'+e+'"]');a.list(e,d)})})};
ResourceChooser.prototype.createRow=function(a,b){return new ListviewRow(a,void 0===b?null:b)};
ResourceChooser.prototype.list=function(a,b){var c=this,e=new FormData;e.append("keyword","");e.append("type",b);this.listView=document.querySelector(this.id+" > ul");this.listView.textContent="Loadling...";this.entity.list(e).then(function(b){c.listView.textContent=null;b.forEach(function(b){var d=c.createRow(b);c.listView.appendChild(d.li);d.anchor.addEventListener("click",function(){c.embedId(a,b.id)})});$(c.listView).listview("refresh")})};
ResourceChooser.prototype.embedId=function(a,b){a.value=b;a.dispatchEvent(ResourceChooser.ValueChangedEvent);$(this.id).popup("close")};ResourceChooser.ValueChangedEvent=new Event("valueChanged");var TitleBg=function(){this.x=0;this.width=1200;this.move()};TitleBg.prototype.move=function(a){var b=this;document.querySelector("div[data-role=header]").style.backgroundPosition=-this.x+"px 0";this.x++;this.width<this.x&&(this.x=0);requestAnimationFrame(function(a){return b.move(a)})};
var EntityBase=function(a){this.base=a};EntityBase.prototype.list=function(a){a=void 0===a?{}:a;return AjaxUtils.post("/"+this.base+"/list",a)};EntityBase.prototype.select=function(a){var b=new FormData;b.append("id",a);return AjaxUtils.post("/"+this.base+"/select",b)};EntityBase.prototype.save=function(a){return AjaxUtils.post("/"+this.base+"/save",a)};var ActorEntity=function(){EntityBase.call(this,"actor")};$jscomp.inherits(ActorEntity,EntityBase);
var AudioEntity=function(){EntityBase.call(this,"audio")};$jscomp.inherits(AudioEntity,EntityBase);AudioEntity.Type={OTHER:0,FX:1,BGM:2};var AudioSetEntity=function(){EntityBase.call(this,"audioSet")};$jscomp.inherits(AudioSetEntity,EntityBase);var ImageEntity=function(){EntityBase.call(this,"image")};$jscomp.inherits(ImageEntity,EntityBase);ImageEntity.Type={OTHER:0,ACT:1,BACK:2,FORE:3};var ProductEntity=function(){EntityBase.call(this,"product")};$jscomp.inherits(ProductEntity,EntityBase);
ProductEntity.prototype.detail=function(a){var b=new FormData;b.append("id",a);return AjaxUtils.post("/product/selectDetail",b)};ProductEntity.prototype.saveMap=function(a){return AjaxUtils.post("/detail/save",a)};ProductEntity.prototype.increase=function(a){var b=new FormData;b.append("id",a);return AjaxUtils.post("/product/increase",b)};var ScoreEntity=function(){EntityBase.call(this,"score")};$jscomp.inherits(ScoreEntity,EntityBase);
ScoreEntity.prototype.register=function(a){return AjaxUtils.post("/score/register",a)};var StageEntity=function(){EntityBase.call(this,"stage")};$jscomp.inherits(StageEntity,EntityBase);StageEntity.prototype.saveMap=function(a){return AjaxUtils.post("/"+this.base+"/saveMap",a)};var EditStagePanel=function(a){this.appMain=a;this.panel=document.getElementById("editStagePanel");this.roll=this.panel.querySelector("select");this.rec={};this.setupEvent()};
EditStagePanel.prototype.setupEvent=function(){var a=this;this.roll.addEventListener("change",function(){a.rec.roll=a.roll.value});this.panel.querySelector(".ui-icon-edit").addEventListener("click",function(){window.open("/detail/edit/"+a.rec.id)});this.panel.querySelector(".ui-icon-delete").addEventListener("click",function(){a.appMain.removeStage(a.rec.stageId);$(a.panel).panel("close")});$(this.panel).on("panelclose",function(){a.appMain.updateStage(a.rec)})};
EditStagePanel.prototype.open=function(a){this.rec=a;$(this.roll).val([a.roll]).selectmenu("refresh")};var ProductActorChoicePanel=function(a){this.page=a;this.panel=document.getElementById("ProductActorChoicePanel");this.actorType=this.panel.querySelector("select");this.listView=this.panel.querySelector("ul");this.entity=new ActorEntity;this.setupEvent()};
ProductActorChoicePanel.prototype.setupEvent=function(){var a=this;document.querySelector('[href="#ProductActorChoicePanel"]').addEventListener("click",function(){a.listActor()});this.setupActorType()};
ProductActorChoicePanel.prototype.setupActorType=function(){var a=this;Object.keys(Actor.Type).forEach(function(b){var c=Actor.Type[b];if(0!=c&&"Formation"!=b){var e=document.createElement("option");e.setAttribute("value",c);"Enemy"==b&&e.setAttribute("selected","selected");e.textContent=b;a.actorType.appendChild(e)}});this.actorType.addEventListener("change",function(){a.listActor()})};
ProductActorChoicePanel.prototype.createParameter=function(){var a=this.panel.querySelector("input"),b=new FormData;b.append("keyword",a.value);b.append("type",this.actorType.value);return b};
ProductActorChoicePanel.prototype.listActor=function(){var a=this,b=this.createParameter(),c=this.listView;c.textContent="Loading...";this.entity.list(b).then(function(b){c.textContent=null;b.forEach(function(b){var d=(new ListviewRow(b,"/image/src/"+b.imageid)).li,e=d.querySelector("a");c.appendChild(d);e.addEventListener("click",function(){a.page.appendActor(b)})});$(c).listview("refresh")})};
var ProductActorPage=function(){var a=this;this.page=document.getElementById("productActor");this.actorList=$(this.page).find(".actorList");this.actorList.sortable({connectWith:".actorList",items:"li:not(.divider)",stop:function(b,c){a.actorList.each(function(b,c){a.refreshCounter(c)})}});this.productActorChoicePanel=new ProductActorChoicePanel(this);this.productActorPanel=new ProductActorPanel(this);this.setupActorType();this.setupEvent()};
ProductActorPage.prototype.setupActorType=function(){var a=this;this.typeMap={};Array.prototype.forEach.call(this.actorList,function(b){var c=a.getActorType(b.id);0<c&&(a.typeMap[c]=b)})};ProductActorPage.prototype.getActorType=function(a){var b=0;Object.keys(Actor.Type).forEach(function(c){a.startsWith(c)&&(b=Actor.Type[c])});return b};
ProductActorPage.prototype.setupEvent=function(){var a=this;this.actorList.each(function(b,c){b=c.querySelectorAll("li:not(.divider)");Array.prototype.forEach.call(b,function(b){var d=b.querySelector("a"),e=b.querySelector("a.deleteButton");d.addEventListener("click",function(){a.productActorPanel.open(b)});e.addEventListener("click",function(){b.parentNode.removeChild(b);a.refreshCounter(c)})});a.refreshCounter(c)})};
ProductActorPage.prototype.refreshCounter=function(a){var b=a.querySelectorAll("li:not(.divider)");a.querySelector(".ui-li-count").textContent=b.length};ProductActorPage.prototype.createClassName=function(a){a=a.name;for(var b="",c=!0,e=0;e<a.length;e++){var d=a.charAt(e);d.match(/[0-9A-Za-z]/)?(c&&(d=d.toUpperCase(),c=!1),b+=d):c=!0}return b};
ProductActorPage.prototype.appendActor=function(a){var b=this,c=this.typeMap[a.type],e=new ListviewRow(a,"/image/src/"+a.imageid),d=e.li;e=e.anchor;var f=document.createElement("a");d.appendChild(f);f.addEventListener("click",function(){d.parentNode.removeChild(d);b.refreshCounter(c)});e.addEventListener("click",function(){b.productActorPanel.open(d)});e.setAttribute("href","#ProductActorPanel");e.setAttribute("data-actor",a.id);e.setAttribute("data-class",this.createClassName(a));c.appendChild(d);
$(c).listview("refresh");this.refreshCounter(c)};ProductActorPage.prototype.listActor=function(){var a=this,b=[];Object.keys(Actor.Type).forEach(function(c){var e=Actor.Type[c];if(c=a.typeMap[e]){c=c.querySelectorAll("li:not(.divider)");var d=e;Array.prototype.forEach.call(c,function(a){var c=a.querySelector("a");a=c.getAttribute("data-actor");c=c.getAttribute("data-class");b[d]={actorId:a,productType:e,className:c};d++})}});return b};
var ProductActorPanel=function(a){this.page=a;this.panel=document.getElementById("ProductActorPanel");this.setupEvent()};ProductActorPanel.prototype.setupEvent=function(){var a=this;this.panel.querySelector("button").addEventListener("click",function(){var b=a.panel.querySelector('[name="className"]');a.li.querySelector("a").setAttribute("data-class",b.value)})};
ProductActorPanel.prototype.setupForm=function(a){var b=a.querySelector("span").textContent;a=a.querySelector("a").getAttribute("data-class");var c=this.panel.querySelector('[name="actorName"]'),e=this.panel.querySelector('[name="className"]');c.value=b;e.value=a;e.focus()};ProductActorPanel.prototype.open=function(a){this.li=a;this.setupForm(a)};var StagePanel=function(){this.panel=document.getElementById("stagePanel");this.stageView=this.panel.querySelector("ul");this.stage=new StageEntity};
StagePanel.prototype.open=function(a){var b=this,c=this.stageView;c.textContent="Loading...";this.stage.list("").then(function(e){c.textContent=null;e.forEach(function(d){var e=(new ListviewRow(d,"/img/icon.listview.png")).li,g=e.querySelector("a");c.appendChild(e);g.addEventListener("click",function(){a(d)?$(b.stagePanel).panel("close"):console.log("Already exists!")})});$(c).listview("refresh")})};var AjaxUtils=function(){};
AjaxUtils.fetch=function(a,b){return"function"===typeof fetch?fetch(a,{method:"post",body:b,credentials:"include"}).then(function(a){return a.json()}):new Promise(function(c,e){var d=new XMLHttpRequest;d.open("post",a);d.withCredentials=!0;d.addEventListener("loadend",function(){200<=d.status&&300>d.status?c(JSON.parse(d.response)):e(d.statusText)});d.send(b)})};AjaxUtils.post=function(a,b){return AjaxUtils.fetch(a,b)};document.addEventListener("DOMContentLoaded",function(){new ShooterMain});
var ShooterMain=function(){this.loadProduct()};ShooterMain.prototype.loadProduct=function(){var a=this;this.productController=new ProductEntity;this.productController.select(this.productId).then(function(b){a.setupField(b);a.setupStage(b);a.setupActors(b);a.checkLoading()})};ShooterMain.prototype.setupField=function(a){this.field=new Field(a.width,a.height);0<a.scoreList.length&&(this.field.hiscore=a.scoreList[0].score)};
ShooterMain.prototype.setupStage=function(a){a.name.substr(-1);var b=[];a.detailList.forEach(function(a){var c=a.stage,d=Stage.createViewList(c);a=(new Stage(a.roll,a.map?a.map:c.map,d)).setBgm(c.theme,c.boss);b.push(a)});Stage.LIST=b};
ShooterMain.prototype.setupActors=function(a){a=a.actorList;Enemy.LIST=[{name:"",type:Waver,img:""},{name:"Waver",type:Waver,img:"enemy/waver.png",h:16},{name:"Battery",type:Battery,img:"enemy/battery.png"},{name:"Bouncer",type:Bouncer,img:"enemy/bouncer.png"},{name:"Hanker",type:Hanker,img:"enemy/hanker.png"},{name:"Jerky",type:Jerky,img:"enemy/jerky.png"},{name:"Juno",type:Juno,img:"enemy/juno.png"},{name:"Crab",type:Crab,img:"enemy/crab.png"},{name:"Hatch",type:Hatch,img:"enemy/hatch.png",h:16},
{name:"Charger",type:Charger,img:"enemy/charger.png",h:16},{name:"Twister",type:Twister,img:"enemy/twister.png",h:16},{name:"Slur",type:Slur,img:"enemy/slur.png",h:16},{name:"Waver",type:Waver,img:"enemy/waver.png",h:16},{name:"Waver",type:Waver,img:"enemy/waver.png",h:16},{name:"Waver",type:Waver,img:"enemy/waver.png",h:16},{name:"Waver",type:Waver,img:"enemy/waver.png",h:16},{name:"Waver",type:Waver,img:"enemy/waver.png",h:16},{name:"Waver",type:Waver,img:"enemy/waver.png",h:16},{name:"Waver",type:Waver,
img:"enemy/waver.png",h:16},{name:"Waver",type:Waver,img:"enemy/waver.png",h:16},{name:"Waver",type:Waver,img:"enemy/waver.png",h:16},{name:"Tentacle",type:Tentacle,img:"enemy/tentacle.png"},{name:"Dragon",type:DragonHead,img:"enemy/dragonHead.png"},{name:"Waver(formation)",type:Waver,img:"enemy/waver.png",h:16,formation:!0},{name:"Molten",type:Molten,img:"boss/molten.png"},{name:"Winding",type:Winding,img:"boss/winding.png"},{name:"Titan",type:Titan,img:"boss/titan.icon.png"},{name:"Cascade",type:Cascade,
img:"material/cascade.icon.png"},{name:"Rewinder",type:Rewinder,img:"material/cascade.icon.png"}];a.forEach(function(a){var b=a.seq,e=a.actor;a=eval(a.className);Enemy.LIST[b]={name:e.name,type:a,h:16,formation:Actor.Type.Formation<=b&&b<Actor.Type.Boss};ImageManager.Instance.reserve(e.name)})};
ShooterMain.prototype.checkLoading=function(){var a=this,b=document.getElementById("loading"),c=[ImageManager.Instance,AudioMixer.INSTANCE,MotionManager.INSTANCE],e=function(){var d=0,f=0,g=!0;c.forEach(function(a){d+=a.loaded;f+=a.max;g&=a.isComplete()});b.innerHTML=d+"/"+f;g?(b.parentNode.removeChild(b),a.start()):setTimeout(e,125)};e()};ShooterMain.prototype.increase=function(){this.productController.increase(this.productId).then(function(a){console.log("increase:"+a.ok)})};
ShooterMain.prototype.registerScore=function(){var a=new ScoreEntity,b=new FormData;b.append("productId",this.productId);b.append("score",this.field.score);b.append("name","");a.register(b).then(function(a){console.log("registerScore:"+a.ok)})};
ShooterMain.prototype.start=function(){var a=this,b=new Controller,c=document.getElementById("gameOver"),e=function(){a.increase();a.field.startGame();c.classList.add("hidden")},d=function(){var b=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame;a.field.move();a.field.draw();a.field.isGameOver&&c.classList.contains("hidden")&&(c.classList.remove("hidden"),a.registerScore());b(d)};c.addEventListener("mousedown",function(a){e()});
window.addEventListener("keydown",function(a){a=!c.classList.contains("hidden");var d=b.keys;a&&(d[" "]||d.k32||d.Enter)&&e()});d()};$jscomp.global.Object.defineProperties(ShooterMain.prototype,{productId:{configurable:!0,enumerable:!0,get:function(){return document.getElementById("productId").value}}});
