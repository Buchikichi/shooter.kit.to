var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;$jscomp.objectCreate=$jscomp.ASSUME_ES5||"function"==typeof Object.create?Object.create:function(a){var b=function(){};b.prototype=a;return new b};$jscomp.underscoreProtoCanBeSet=function(){var a={a:!0},b={};try{return b.__proto__=a,b.a}catch(c){}return!1};
$jscomp.setPrototypeOf="function"==typeof Object.setPrototypeOf?Object.setPrototypeOf:$jscomp.underscoreProtoCanBeSet()?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null;
$jscomp.inherits=function(a,b){a.prototype=$jscomp.objectCreate(b.prototype);a.prototype.constructor=a;if($jscomp.setPrototypeOf){var c=$jscomp.setPrototypeOf;c(a,b)}else for(c in b)if("prototype"!=c)if(Object.defineProperties){var d=Object.getOwnPropertyDescriptor(b,c);d&&Object.defineProperty(a,c,d)}else a[c]=b[c];a.superClass_=b.prototype};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.arrayIteratorImpl=function(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}};$jscomp.arrayIterator=function(a){return{next:$jscomp.arrayIteratorImpl(a)}};$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)};$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.SymbolClass=function(a,b){this.$jscomp$symbol$id_=a;$jscomp.defineProperty(this,"description",{configurable:!0,writable:!0,value:b})};$jscomp.SymbolClass.prototype.toString=function(){return this.$jscomp$symbol$id_};
$jscomp.Symbol=function(){function a(c){if(this instanceof a)throw new TypeError("Symbol is not a constructor");return new $jscomp.SymbolClass($jscomp.SYMBOL_PREFIX+(c||"")+"_"+b++,c)}var b=0;return a}();
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.iterator;a||(a=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("Symbol.iterator"));"function"!=typeof Array.prototype[a]&&$jscomp.defineProperty(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))}});$jscomp.initSymbolIterator=function(){}};
$jscomp.initSymbolAsyncIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.asyncIterator;a||(a=$jscomp.global.Symbol.asyncIterator=$jscomp.global.Symbol("Symbol.asyncIterator"));$jscomp.initSymbolAsyncIterator=function(){}};$jscomp.iteratorPrototype=function(a){$jscomp.initSymbolIterator();a={next:a};a[$jscomp.global.Symbol.iterator]=function(){return this};return a};
$jscomp.iteratorFromArray=function(a,b){$jscomp.initSymbolIterator();a instanceof String&&(a+="");var c=0,d={next:function(){if(c<a.length){var e=c++;return{value:b(e,a[e]),done:!1}}d.next=function(){return{done:!0,value:void 0}};return d.next()}};d[Symbol.iterator]=function(){return d};return d};
$jscomp.polyfill=function(a,b,c,d){if(b){c=$jscomp.global;a=a.split(".");for(d=0;d<a.length-1;d++){var e=a[d];e in c||(c[e]={});c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&$jscomp.defineProperty(c,a,{configurable:!0,writable:!0,value:b})}};$jscomp.polyfill("Array.prototype.keys",function(a){return a?a:function(){return $jscomp.iteratorFromArray(this,function(a){return a})}},"es6","es3");
$jscomp.polyfill("Array.prototype.fill",function(a){return a?a:function(a,c,d){var b=this.length||0;0>c&&(c=Math.max(0,b+c));if(null==d||d>b)d=b;d=Number(d);0>d&&(d=Math.max(0,b+d));for(c=Number(c||0);c<d;c++)this[c]=a;return this}},"es6","es3");$jscomp.findInternal=function(a,b,c){a instanceof String&&(a=String(a));for(var d=a.length,e=0;e<d;e++){var f=a[e];if(b.call(c,f,e,a))return{i:e,v:f}}return{i:-1,v:void 0}};
$jscomp.polyfill("Array.prototype.find",function(a){return a?a:function(a,c){return $jscomp.findInternal(this,a,c).v}},"es6","es3");$jscomp.checkStringArgs=function(a,b,c){if(null==a)throw new TypeError("The 'this' value for String.prototype."+c+" must not be null or undefined");if(b instanceof RegExp)throw new TypeError("First argument to String.prototype."+c+" must not be a regular expression");return a+""};
$jscomp.polyfill("String.prototype.startsWith",function(a){return a?a:function(a,c){var b=$jscomp.checkStringArgs(this,a,"startsWith");a+="";var e=b.length,f=a.length;c=Math.max(0,Math.min(c|0,b.length));for(var g=0;g<f&&c<e;)if(b[c++]!=a[g++])return!1;return g>=f}},"es6","es3");$jscomp.makeIterator=function(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):$jscomp.arrayIterator(a)};$jscomp.FORCE_POLYFILL_PROMISE=!1;
$jscomp.polyfill("Promise",function(a){function b(){this.batch_=null}function c(a){return a instanceof e?a:new e(function(b,c){b(a)})}if(a&&!$jscomp.FORCE_POLYFILL_PROMISE)return a;b.prototype.asyncExecute=function(a){if(null==this.batch_){this.batch_=[];var b=this;this.asyncExecuteFunction(function(){b.executeBatch_()})}this.batch_.push(a)};var d=$jscomp.global.setTimeout;b.prototype.asyncExecuteFunction=function(a){d(a,0)};b.prototype.executeBatch_=function(){for(;this.batch_&&this.batch_.length;){var a=
this.batch_;this.batch_=[];for(var b=0;b<a.length;++b){var c=a[b];a[b]=null;try{c()}catch(k){this.asyncThrow_(k)}}}this.batch_=null};b.prototype.asyncThrow_=function(a){this.asyncExecuteFunction(function(){throw a;})};var e=function(a){this.state_=0;this.result_=void 0;this.onSettledCallbacks_=[];var b=this.createResolveAndReject_();try{a(b.resolve,b.reject)}catch(l){b.reject(l)}};e.prototype.createResolveAndReject_=function(){function a(a){return function(e){c||(c=!0,a.call(b,e))}}var b=this,c=!1;
return{resolve:a(this.resolveTo_),reject:a(this.reject_)}};e.prototype.resolveTo_=function(a){if(a===this)this.reject_(new TypeError("A Promise cannot resolve to itself"));else if(a instanceof e)this.settleSameAsPromise_(a);else{a:switch(typeof a){case "object":var b=null!=a;break a;case "function":b=!0;break a;default:b=!1}b?this.resolveToNonPromiseObj_(a):this.fulfill_(a)}};e.prototype.resolveToNonPromiseObj_=function(a){var b=void 0;try{b=a.then}catch(l){this.reject_(l);return}"function"==typeof b?
this.settleSameAsThenable_(b,a):this.fulfill_(a)};e.prototype.reject_=function(a){this.settle_(2,a)};e.prototype.fulfill_=function(a){this.settle_(1,a)};e.prototype.settle_=function(a,b){if(0!=this.state_)throw Error("Cannot settle("+a+", "+b+"): Promise already settled in state"+this.state_);this.state_=a;this.result_=b;this.executeOnSettledCallbacks_()};e.prototype.executeOnSettledCallbacks_=function(){if(null!=this.onSettledCallbacks_){for(var a=0;a<this.onSettledCallbacks_.length;++a)f.asyncExecute(this.onSettledCallbacks_[a]);
this.onSettledCallbacks_=null}};var f=new b;e.prototype.settleSameAsPromise_=function(a){var b=this.createResolveAndReject_();a.callWhenSettled_(b.resolve,b.reject)};e.prototype.settleSameAsThenable_=function(a,b){var c=this.createResolveAndReject_();try{a.call(b,c.resolve,c.reject)}catch(k){c.reject(k)}};e.prototype.then=function(a,b){function c(a,b){return"function"==typeof a?function(b){try{d(a(b))}catch(r){f(r)}}:b}var d,f,g=new e(function(a,b){d=a;f=b});this.callWhenSettled_(c(a,d),c(b,f));return g};
e.prototype.catch=function(a){return this.then(void 0,a)};e.prototype.callWhenSettled_=function(a,b){function c(){switch(e.state_){case 1:a(e.result_);break;case 2:b(e.result_);break;default:throw Error("Unexpected state: "+e.state_);}}var e=this;null==this.onSettledCallbacks_?f.asyncExecute(c):this.onSettledCallbacks_.push(c)};e.resolve=c;e.reject=function(a){return new e(function(b,c){c(a)})};e.race=function(a){return new e(function(b,e){for(var d=$jscomp.makeIterator(a),f=d.next();!f.done;f=d.next())c(f.value).callWhenSettled_(b,
e)})};e.all=function(a){var b=$jscomp.makeIterator(a),d=b.next();return d.done?c([]):new e(function(a,e){function f(b){return function(c){g[b]=c;h--;0==h&&a(g)}}var g=[],h=0;do g.push(void 0),h++,c(d.value).callWhenSettled_(f(g.length-1),e),d=b.next();while(!d.done)})};return e},"es6","es3");
var AccessibleRange=function(a,b){var c=document.createElement("legend");c.textContent="Access:";Object.keys(AccessibleRange.List).forEach(function(c){var e=b+c,d=document.createElement("input"),g=document.createElement("label");d.setAttribute("id",e);d.setAttribute("type","radio");d.setAttribute("name","access");d.setAttribute("value",c);g.setAttribute("for",e);g.textContent=AccessibleRange.List[c];a.appendChild(d);a.appendChild(g)});a.setAttribute("data-role","controlgroup");a.setAttribute("data-type",
"horizontal");a.setAttribute("data-mini","true");a.appendChild(c);$(a).parents("form").trigger("create")};AccessibleRange.List={0:"Private",1:"Protected",2:"Public"};
var AudioSelectionButton=function(a,b){var c=this;b=void 0===b?"OTHER":b;var d=document.createElement("legend"),e=document.createElement("a"),f=document.createElement("input"),g=document.createElement("div"),h=document.createElement("button"),l=document.createElement("button"),k=document.createElement("button"),m=document.createElement("fieldset"),t=a.toLowerCase();d.textContent=a+":";e.setAttribute("href","#audioChooser");e.setAttribute("data-target",t);e.setAttribute("data-filter",b);e.setAttribute("data-rel",
"popup");e.className="ui-btn ui-mini ui-corner-all ui-shadow ui-btn-icon-left ui-icon-audio";e.textContent="Choose...";f.setAttribute("type","hidden");f.setAttribute("name",t);f.addEventListener("valueChanged",function(){c.resetImage()});h.textContent="W";h.setAttribute("data-icon","audio");h.addEventListener("click",function(a){a.preventDefault();window.open("/audio/webm/?id="+f.value)});l.textContent="A";l.setAttribute("data-icon","audio");l.addEventListener("click",function(a){a.preventDefault();
window.open("/audio/audio/?id="+f.value)});k.textContent="Del";k.setAttribute("data-icon","delete");k.setAttribute("data-theme","b");k.className="ui-btn-icon-notext";k.addEventListener("click",function(a){a.preventDefault();f.value="";c.resetImage()});g.appendChild(h);g.appendChild(l);g.appendChild(k);m.appendChild(d);m.appendChild(e);m.appendChild(f);m.appendChild(g);$(g).controlgroup({type:"horizontal",mini:!0});this.fieldset=m;this.button=e;this.hidden=f;this.controlgroup=g};
AudioSelectionButton.prototype.resetImage=function(){this.hidden.value?($(this.controlgroup).show(),$(this.button).hide()):($(this.controlgroup).hide(),$(this.button).show())};var Customer=function(){};Customer.prototype.check=function(){return $.ajax({type:"post",url:"/customer/check",dataType:"json",data:{}})};Customer.prototype.signIn=function(a,b){return $.ajax({type:"post",url:"/customer/signIn",dataType:"json",data:{userid:a,passwd:b}})};
var FieldEditor=function(a,b){return Field.call(this,a,b)||this};$jscomp.inherits(FieldEditor,Field);FieldEditor.prototype.setupLandform=function(){this.landform=new LandformEditor(this.view.canvas)};
var ImageSelectionButton=function(a,b){var c=this;b=void 0===b?"OTHER":b;var d=document.createElement("legend"),e=document.createElement("a"),f=document.createElement("input"),g=document.createElement("input"),h=document.createElement("fieldset"),l=a.toLowerCase();d.textContent=a+":";e.setAttribute("href","#imageChooser");e.setAttribute("data-target",l);e.setAttribute("data-filter",b);e.setAttribute("data-rel","popup");e.className="ui-btn ui-mini ui-corner-all ui-shadow ui-btn-icon-left ui-icon-heart";
e.textContent="Choose...";f.setAttribute("type","hidden");f.setAttribute("name",l);f.addEventListener("valueChanged",function(){c.resetImage()});g.setAttribute("type","image");g.addEventListener("click",function(a){a.preventDefault();f.value="";c.resetImage()});h.appendChild(d);h.appendChild(e);h.appendChild(f);h.appendChild(g);this.fieldset=h;this.button=e;this.hidden=f;this.img=g};
ImageSelectionButton.prototype.resetImage=function(){var a=this.hidden.value;a?(this.img.setAttribute("src","/visual/src/"+a),$(this.img).show(),$(this.button).hide()):(this.img.removeAttribute("src"),$(this.img).hide(),$(this.button).show())};var LandformEditor=function(a){return Landform.call(this,a)||this};$jscomp.inherits(LandformEditor,Landform);
LandformEditor.prototype.drawEnemy=function(a,b,c,d){d=void 0===d?!1:d;var e=this.ctx,f=Enemy.LIST[a];e.save();e.fillStyle="rgba(255, 255, 255, 0.5)";e.beginPath();e.arc(b,c,4,0,Math.PI2,!1);e.fill();e.fillText(a,b,c);e.restore();if(!f||!f.instance)return null;a=this.stage.fg;var g=a.y,h=f.formation?3:1;f=f.instance;b+=f.hW;c+=f.hH;f.x=b-a.x;f.y=c-g;f.checkInverse();f.x=b;for(f.y=c;h--;)f.draw(e),f.x+=2,f.y+=2;d&&(e.save(),e.translate(f.x,f.y),e.drawImage(this.reverse,-8,-4),e.restore());return f};
LandformEditor.prototype.drawBrick=function(){if(this.brick){var a=Field.Instance,b=this.stage.fg,c=b.x,d=b.y;b=this.ctx;var e=255<this.col?this.col-256:0,f=255<this.col?255:this.col%256,g=Landform.BRICK_WIDTH-2,h=Math.round(c/Landform.BRICK_WIDTH)*Landform.BRICK_WIDTH,l=h/Landform.BRICK_WIDTH,k=Math.min(l+512/Landform.BRICK_WIDTH,this.bw),m=Math.round(d/Landform.BRICK_WIDTH)*Landform.BRICK_WIDTH/Landform.BRICK_WIDTH,t=this.brick.data;b.save();b.translate(-c,-d);b.strokeStyle="rgba("+e+", "+f+", 255, .4)";
b.fillStyle=b.strokeStyle;for(d=0;d<this.bh;d++){f=m+d;e=f*Landform.BRICK_WIDTH;f=4*(f%this.bh*this.bw+l);for(var p=l,n=h;p<k;p++,n+=Landform.BRICK_WIDTH,f+=4)if(!(0>p)){var q=t[f],r=t[f+1];r&&this.drawEnemy(r,n,e,q&Landform.ATTR.REVERSE);q=t[f+2];255==q?b.fillRect(n,e,g,g):254==q&&(q=n+Landform.BRICK_HALF-1,r=e+Landform.BRICK_HALF-1,b.beginPath(),b.arc(q,r,g/2,0,Math.PI2,!1),b.stroke(),b.strokeRect(n,e,g,g))}}this.width-a.width<=c&&(a=this.width-Landform.BRICK_WIDTH,b.fillStyle="rgba(255, 0, 0, .4)",
b.fillRect(a,0,Landform.BRICK_WIDTH,this.height));b.restore();this.col+=16*this.colDir;if(0>=this.col||Landform.COL_MAX<=this.col)this.colDir*=-1}};
LandformEditor.prototype.drawTarget=function(){if(this.target){var a=Math.round((this.target.x-Landform.BRICK_HALF)/Landform.BRICK_WIDTH)*Landform.BRICK_WIDTH,b=Math.round((this.target.y-Landform.BRICK_HALF)/Landform.BRICK_WIDTH)*Landform.BRICK_WIDTH,c=this.ctx,d=Landform.BRICK_WIDTH,e=parseInt(this.selection);0<e&&(e=this.drawEnemy(e,a,b))&&(d=e.width);c.save();c.fillStyle="rgba(128, 255, 255, .4)";c.fillRect(a,b,d,d);c.restore();this.touchDown(a,b)}};
LandformEditor.prototype.touchDown=function(a,b){if(!this.which)this.ty=this.tx=-1,this.brickVal=null;else if(this.tx!=a||this.ty!=b){var c=parseInt(this.selection);if(0<c){var d=this.getAttr(this.target),e=this.getActor(this.target),f=d&Landform.ATTR.REVERSE;e==c&&f?this.putActor(this.target,0,0):(d=e==c?d|Landform.ATTR.REVERSE:d&~Landform.ATTR.REVERSE,this.putActor(this.target,c,d))}else d=this.getBrick(this.target),c=this.selection.substr(1),null==this.brickVal&&(this.brickVal=0<d?0:255-c),this.putBrick(this.target,
this.brickVal);this.touch=!0;this.tx=a;this.ty=b}};LandformEditor.prototype.putActor=function(a,b,c){c=void 0===c?null:c;null!=c&&this.putBrick(a,c,Landform.BRICK_LAYER.ATTR);this.putBrick(a,b,Landform.BRICK_LAYER.ACTOR)};LandformEditor.prototype.draw=function(){var a=this.ctx;Landform.prototype.draw.call(this);a.save();this.drawBrick();this.drawTarget();a.restore();this.touch&&this.brick&&(this.updateMap(),this.touch=!1)};
LandformEditor.prototype.updateMap=function(){var a=document.getElementById("mapImage");if(a){var b=document.createElement("canvas"),c=b.getContext("2d");b.width=this.brick.width;b.height=this.brick.height;c.putImageData(this.brick,0,0);a.setAttribute("src",b.toDataURL("image/png"))}};LandformEditor.prototype.getImageData=function(){var a=document.createElement("canvas"),b=a.getContext("2d");a.width=this.width;a.height=this.height;b.drawImage(this.img,0,0);return b.getImageData(0,0,this.width,this.height)};
LandformEditor.prototype.getBrickData=function(a){return null!=this.brick?this.brick:a.createImageData(this.width/Landform.BRICK_WIDTH,this.height/Landform.BRICK_WIDTH)};
LandformEditor.prototype.generateBrick=function(a){if(this.img.src&&this.img.complete){var b=this.getImageData(),c=this.width/Landform.BRICK_WIDTH,d=this.height/Landform.BRICK_WIDTH;a=this.getBrickData(a);var e=a.data,f=this.width*Landform.BRICK_HALF+4*Landform.BRICK_HALF,g=0;console.log(this.width+" x "+this.height+" | "+this.width*this.height*4);console.log(c+" x "+d+" | "+e.length);for(var h=0;h<d;h++){for(var l=0;l<c;l++){for(var k=!1,m=0;4>m;m++)b.data[f+m]&&(k=!0);k=k?255:0;e[g+2]=k;e[g+3]=
k;f+=4*Landform.BRICK_WIDTH;g+=4}f+=this.width*(Landform.BRICK_WIDTH-1)*4}console.log("ix:"+g);console.log("sx:"+f);this.brick=a;this.touch=!0}};LandformEditor.prototype.wheel=function(a){var b=this.stage.fg;0>a?(b.y+=Landform.BRICK_WIDTH,this.height<=b.y&&(b.y=0)):(0==b.y&&(b.y=this.height),b.y-=Landform.BRICK_WIDTH)};
var ListviewRow=function(a,b){b=void 0===b?null:b;var c=document.createElement("img"),d=document.createElement("span"),e=document.createElement("p"),f=document.createElement("a"),g=document.createElement("li");d.textContent=a.name;e.textContent=a.description;a.href&&f.setAttribute("href",a.href);null!=b&&(c.setAttribute("src",b),f.appendChild(c));f.appendChild(d);f.appendChild(e);a.count&&(b=document.createElement("span"),b.classList.add("ui-li-count"),b.textContent=a.count,f.appendChild(b));a.aside&&
(b=document.createElement("p"),b.classList.add("ui-li-aside"),b.textContent=a.aside,f.appendChild(b));g.appendChild(f);this.img=c;this.anchor=f;this.li=g},ResourceChooser=function(a){this.id="#"+a;this.setupEvents()};
ResourceChooser.prototype.setupEvents=function(){var a=this;document.querySelectorAll('[href="'+this.id+'"]').forEach(function(b){var c=$(b).parents("fieldset")[0];b.addEventListener("click",function(){var d=b.getAttribute("data-target"),e=b.getAttribute("data-filter");d=c.querySelector('[name="'+d+'"]');a.list(d,e)})})};ResourceChooser.prototype.createRow=function(a,b){return new ListviewRow(a,void 0===b?null:b)};
ResourceChooser.prototype.list=function(a,b){var c=this,d=new FormData;d.append("keyword","");d.append("type",b);this.listView=document.querySelector(this.id+" > ul");this.listView.textContent="Loadling...";this.entity.list(d).then(function(b){c.listView.textContent=null;b.forEach(function(b){var d=c.createRow(b);c.listView.appendChild(d.li);d.anchor.addEventListener("click",function(){c.embedId(a,b.id)})});$(c.listView).listview("refresh")})};
ResourceChooser.prototype.embedId=function(a,b){a.value=b;a.dispatchEvent(ResourceChooser.ValueChangedEvent);$(this.id).popup("close")};ResourceChooser.ValueChangedEvent=new Event("valueChanged");var TitleBg=function(){this.x=0;this.width=1200;this.move()};TitleBg.prototype.move=function(a){var b=this;document.querySelector("div[data-role=header]").style.backgroundPosition=-this.x+"px 0";this.x++;this.width<this.x&&(this.x=0);requestAnimationFrame(function(a){return b.move(a)})};
var EntityBase=function(a){this.base=a};EntityBase.prototype.list=function(a){a=void 0===a?{}:a;return AjaxUtils.post("/"+this.base+"/list",a)};EntityBase.prototype.select=function(a){var b=new FormData;b.append("id",a);return AjaxUtils.post("/"+this.base+"/select",b)};EntityBase.prototype.save=function(a){return AjaxUtils.post("/"+this.base+"/save",a)};var ActorEntity=function(){EntityBase.call(this,"actor")};$jscomp.inherits(ActorEntity,EntityBase);
var AudioEntity=function(){EntityBase.call(this,"audio")};$jscomp.inherits(AudioEntity,EntityBase);AudioEntity.Type={OTHER:0,FX:1,BGM:2};var AudioSetEntity=function(){EntityBase.call(this,"audioSet")};$jscomp.inherits(AudioSetEntity,EntityBase);var MapEntity=function(){EntityBase.call(this,"map")};$jscomp.inherits(MapEntity,EntityBase);MapEntity.prototype.saveMap=function(a){return AjaxUtils.post("/"+this.base+"/saveMap",a)};var ProductEntity=function(){EntityBase.call(this,"product")};
$jscomp.inherits(ProductEntity,EntityBase);ProductEntity.prototype.detail=function(a){var b=new FormData;b.append("id",a);return AjaxUtils.post("/product/selectDetail",b)};ProductEntity.prototype.saveMap=function(a){return AjaxUtils.post("/detail/save",a)};ProductEntity.prototype.increase=function(a){var b=new FormData;b.append("id",a);return AjaxUtils.post("/product/increase",b)};var ScoreEntity=function(){EntityBase.call(this,"score")};$jscomp.inherits(ScoreEntity,EntityBase);
ScoreEntity.prototype.register=function(a){return AjaxUtils.post("/score/register",a)};var VisualEntity=function(){EntityBase.call(this,"visual")};$jscomp.inherits(VisualEntity,EntityBase);VisualEntity.Type={OTHER:0,ACT:1,BACK:2,FORE:3};var EditStagePanel=function(a){this.appMain=a;this.panel=document.getElementById("editStagePanel");this.roll=this.panel.querySelector("select");this.rec={};this.setupEvent()};
EditStagePanel.prototype.setupEvent=function(){var a=this;this.roll.addEventListener("change",function(){a.rec.roll=a.roll.value});this.panel.querySelector(".ui-icon-edit").addEventListener("click",function(){window.open("/detail/edit/"+a.rec.id)});this.panel.querySelector(".ui-icon-delete").addEventListener("click",function(){a.appMain.removeStage(a.rec.stageId);$(a.panel).panel("close")});$(this.panel).on("panelclose",function(){a.appMain.updateStage(a.rec)})};
EditStagePanel.prototype.open=function(a){this.rec=a;$(this.roll).val([a.roll]).selectmenu("refresh")};var ProductActorChoicePanel=function(a){this.page=a;this.panel=document.getElementById("ProductActorChoicePanel");this.actorType=this.panel.querySelector("select");this.listView=this.panel.querySelector("ul");this.entity=new ActorEntity;this.setupEvent()};
ProductActorChoicePanel.prototype.setupEvent=function(){var a=this;document.querySelector('[href="#ProductActorChoicePanel"]').addEventListener("click",function(){a.listActor()});this.setupActorType()};
ProductActorChoicePanel.prototype.setupActorType=function(){var a=this;Object.keys(Actor.Type).forEach(function(b){var c=Actor.Type[b];if(0!=c&&"Formation"!=b){var d=document.createElement("option");d.setAttribute("value",c);"Enemy"==b&&d.setAttribute("selected","selected");d.textContent=b;a.actorType.appendChild(d)}});this.actorType.addEventListener("change",function(){a.listActor()})};
ProductActorChoicePanel.prototype.createParameter=function(){var a=this.panel.querySelector("input"),b=new FormData;b.append("keyword",a.value);b.append("type",this.actorType.value);return b};
ProductActorChoicePanel.prototype.listActor=function(){var a=this,b=this.createParameter(),c=this.listView;c.textContent="Loading...";this.entity.list(b).then(function(b){c.textContent=null;b.forEach(function(b){var d=(new ListviewRow(b,"/visual/src/"+b.imageid)).li,e=d.querySelector("a");c.appendChild(d);e.addEventListener("click",function(){a.page.appendActor(b)})});$(c).listview("refresh")})};
var ProductActorPage=function(){var a=this;this.page=document.getElementById("productActor");this.actorList=$(this.page).find(".actorList");this.actorList.sortable({connectWith:".actorList",items:"li:not(.divider)",stop:function(b,c){a.actorList.each(function(b,c){a.refreshCounter(c)})}});this.productActorChoicePanel=new ProductActorChoicePanel(this);this.productActorPanel=new ProductActorPanel(this);this.setupActorType();this.setupEvent()};
ProductActorPage.prototype.setupActorType=function(){var a=this;this.typeMap={};Array.prototype.forEach.call(this.actorList,function(b){var c=a.getActorType(b.id);0<c&&(a.typeMap[c]=b)})};ProductActorPage.prototype.getActorType=function(a){var b=0;Object.keys(Actor.Type).forEach(function(c){a.startsWith(c)&&(b=Actor.Type[c])});return b};
ProductActorPage.prototype.setupEvent=function(){var a=this;this.actorList.each(function(b,c){b=c.querySelectorAll("li:not(.divider)");Array.prototype.forEach.call(b,function(b){var d=b.querySelector("a"),f=b.querySelector("a.deleteButton");d.addEventListener("click",function(){a.productActorPanel.open(b)});f.addEventListener("click",function(){b.parentNode.removeChild(b);a.refreshCounter(c)})});a.refreshCounter(c)})};
ProductActorPage.prototype.refreshCounter=function(a){var b=a.querySelectorAll("li:not(.divider)");a.previousElementSibling.querySelector(".ui-li-count").textContent=b.length};ProductActorPage.prototype.createClassName=function(a){a=a.name;for(var b="",c=!0,d=0;d<a.length;d++){var e=a.charAt(d);e.match(/[0-9A-Za-z]/)?(c&&(e=e.toUpperCase(),c=!1),b+=e):c=!0}return b};
ProductActorPage.prototype.appendActor=function(a){var b=this,c=this.typeMap[a.type],d=new ListviewRow(a,"/visual/src/"+a.imageid),e=d.li;d=d.anchor;var f=document.createElement("a");e.appendChild(f);f.addEventListener("click",function(){e.parentNode.removeChild(e);b.refreshCounter(c)});d.addEventListener("click",function(){b.productActorPanel.open(e)});d.setAttribute("href","#ProductActorPanel");d.setAttribute("data-actor",a.id);d.setAttribute("data-class",this.createClassName(a));c.appendChild(e);
$(c).listview("refresh");this.refreshCounter(c)};ProductActorPage.prototype.listActor=function(){var a=this,b=[];Object.keys(Actor.Type).forEach(function(c){var d=Actor.Type[c];if(c=a.typeMap[d]){c=c.querySelectorAll("li:not(.divider)");var e=d;Array.prototype.forEach.call(c,function(a){var c=a.querySelector("a");a=c.getAttribute("data-actor");c=c.getAttribute("data-class");b[e]={actorId:a,productType:d,className:c};e++})}});return b};
var ProductActorPanel=function(a){this.page=a;this.panel=document.getElementById("ProductActorPanel");this.setupEvent()};ProductActorPanel.prototype.setupEvent=function(){var a=this;this.panel.querySelector("button").addEventListener("click",function(){var b=a.panel.querySelector('[name="className"]');a.li.querySelector("a").setAttribute("data-class",b.value)})};
ProductActorPanel.prototype.setupForm=function(a){var b=a.querySelector("span").textContent;a=a.querySelector("a").getAttribute("data-class");var c=this.panel.querySelector('[name="actorName"]'),d=this.panel.querySelector('[name="className"]');c.value=b;d.value=a;d.focus()};ProductActorPanel.prototype.open=function(a){this.li=a;this.setupForm(a)};var StagePanel=function(){this.panel=document.getElementById("stagePanel");this.stageView=this.panel.querySelector("ul");this.map=new MapEntity};
StagePanel.prototype.open=function(a){var b=this,c=this.stageView;c.textContent="Loading...";this.map.list("").then(function(d){c.textContent=null;d.result.forEach(function(d){var e=(new ListviewRow(d,"/img/icon.listview.png")).li,g=e.querySelector("a");c.appendChild(e);g.addEventListener("click",function(){a(d)?$(b.stagePanel).panel("close"):console.log("Already exists!")})});$(c).listview("refresh")})};var AjaxUtils=function(){};
AjaxUtils.fetch=function(a,b){return"function"===typeof fetch?fetch(a,{method:"post",body:b,credentials:"include"}).then(function(a){return a.json()}):new Promise(function(c,d){var e=new XMLHttpRequest;e.open("post",a);e.withCredentials=!0;e.addEventListener("loadend",function(){200<=e.status&&300>e.status?c(JSON.parse(e.response)):d(e.statusText)});e.send(b)})};AjaxUtils.post=function(a,b){return AjaxUtils.fetch(a,b)};document.addEventListener("DOMContentLoaded",function(){new EditMain});
var EditMain=function(){this.mapId=document.getElementById("mapId").value;this.detailId=document.getElementById("detailId").value;(this.isDetail=0<this.detailId.length)?this.loadDetail():this.loadStage()};
EditMain.prototype.loadStage=function(){var a=this;this.mapEntity=new MapEntity;this.mapEntity.select(this.mapId).then(function(b){[b.bg1,b.bg2,b.bg3,b.fg1,b.fg2,b.fg3].forEach(function(a){null!=a&&(console.log(a),VisualManager.Instance.reserve(a,null,"image"))});a.field=new FieldEditor(512,224);a.setupStage(b,b.map);a.checkLoading()})};
EditMain.prototype.loadDetail=function(){var a=this;this.productEntity=new ProductEntity;this.productEntity.detail(this.detailId).then(function(b){var c=b.detailList,d=null;a.product=b;c.forEach(function(b){b.id==a.detailId&&(d=b)});b.mediaset.visualList.forEach(function(a){VisualManager.Instance.reserve(a.id,a.name,a.contentType)});b=d.stage;c=d.map?d.map:b.map;a.field=new FieldEditor(512,224);a.setupStage(b,c,d.scenarioList);a.checkLoading()})};
EditMain.prototype.setupStage=function(a,b,c){var d=this;c=void 0===c?[]:c;var e=document.getElementById("inputBox"),f=Stage.createViewList(a),g={speed:{min:0,max:1,step:.1},dir:{min:0,max:1,step:.01},blink:{min:0,max:1,step:.01}};this.stage=new Stage(Stage.SCROLL.LOOP,b,f);this.stage.scenarioList=c;Stage.VIEWS.forEach(function(b){var c=a[b];if(c&&0!=c.length){var f=document.createElement("fieldset");c=document.createElement("legend");c.textContent=b.toUpperCase()+":";f.appendChild(c);Object.keys(g).forEach(function(c){var e=
g[c],h=b+c,k=document.createElement("input"),l=a[h].toFixed(2);k.setAttribute("type","number");k.setAttribute("name",h);Object.keys(e).forEach(function(a){k.setAttribute(a,e[a])});k.value=l;k.addEventListener("change",function(){d.stage.getGround(b)[c]=k.value});f.appendChild(k);$(k).textinput()});e.appendChild(f);$(f).controlgroup({mini:!0})}})};
EditMain.prototype.checkLoading=function(){var a=this,b=document.getElementById("loading"),c=[VisualManager.Instance],d=function(){var e=0,f=0,g=!0;c.forEach(function(a){e+=a.loaded;f+=a.max;g&=a.isComplete()});b.innerHTML=e+"/"+f;g?(b.parentNode.removeChild(b),a.start()):setTimeout(d,125)};d()};
EditMain.prototype.start=function(){var a=this,b=FlexibleView.Instance,c=this.field.landform,d=function(){var e=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame,f=a.controller.delta,g=a.controller.move;c.target=null;c.which=!1;g&&(c.target=g);f&&(a.isMove&&(c.selection="0",a.moveLandform(f)),a.isBrick||a.isActor)&&(c.which=!0);b.clear();a.field.draw();e(d)};this.controller=new Controller;this.brickPanel=new BrickPanel(this.field);
this.isDetail&&(this.actorPanel=new ActorPanel(this.field),this.actorPanel.setupActors(this.product.actorList),this.setupActors(this.product.actorList),$('[name="behavior"]:eq(2)').checkboxradio("enable").checkboxradio("refresh"));c.isEdit=!0;c.loadStage(this.stage);d();this.setupEvents()};
EditMain.prototype.setupActors=function(a){console.log("#setupActors");Enemy.LIST=[{name:"",type:Waver,img:""},{name:"Waver",type:Waver,img:"enemy/waver.png",h:16},{name:"Battery",type:Battery,img:"enemy/battery.png"},{name:"Bouncer",type:Bouncer,img:"enemy/bouncer.png"},{name:"Hanker",type:Hanker,img:"enemy/hanker.png"},{name:"Jerky",type:Jerky,img:"enemy/jerky.png"},{name:"Juno",type:Juno,img:"enemy/juno.png"},{name:"Crab",type:Crab,img:"enemy/crab.png"},{name:"Hatch",type:Hatch,img:"enemy/hatch.png",
h:16},{name:"Charger",type:Charger,img:"enemy/charger.png",h:16},{name:"Twister",type:Twister,img:"enemy/twister.png",h:16},{name:"Slur",type:Slur,img:"enemy/slur.png",h:16},{name:"Waver",type:Waver,img:"enemy/waver.png",h:16},{name:"Waver",type:Waver,img:"enemy/waver.png",h:16},{name:"Waver",type:Waver,img:"enemy/waver.png",h:16},{name:"Waver",type:Waver,img:"enemy/waver.png",h:16},{name:"Waver",type:Waver,img:"enemy/waver.png",h:16},{name:"Waver",type:Waver,img:"enemy/waver.png",h:16},{name:"Waver",
type:Waver,img:"enemy/waver.png",h:16},{name:"Waver",type:Waver,img:"enemy/waver.png",h:16},{name:"Waver",type:Waver,img:"enemy/waver.png",h:16},{name:"Tentacle",type:Tentacle,img:"enemy/tentacle.png"},{name:"Dragon",type:DragonHead,img:"enemy/dragonHead.png"},{name:"Waver(formation)",type:Waver,img:"enemy/waver.png",h:16,formation:!0},{name:"Molten",type:Molten,img:"boss/molten.png"},{name:"Winding",type:Winding,img:"boss/winding.png"},{name:"Titan",type:Titan,img:"boss/titan.icon.png"},{name:"Cascade",
type:Cascade,img:"material/cascade.icon.png"},{name:"Rewinder",type:Rewinder,img:"material/cascade.icon.png"}];a.forEach(function(a){var b=a.seq,d=a.actor,e=eval(a.className),f=Actor.Type.Formation<=b&&b<Actor.Type.Boss;console.log(b+":"+a.className+":"+d.name);Enemy.LIST[b]={name:d.name,type:e,h:16,formation:f}});Enemy.LIST.forEach(function(a){a.instance=new a.type({x:0,y:0})})};
EditMain.prototype.setupEvents=function(){var a=this,b=$("#slider"),c=this.field.landform,d=c.stage.fg.width/Landform.BRICK_WIDTH-1;b.change(function(){var a=b.val()*Landform.BRICK_WIDTH;c.stage.moveH(a)});b.attr("max",d);b.slider("refresh");c.stage.moveH(0);$('[name="behavior"]:eq(1)').click(function(){a.brickPanel.open()});$('[name="behavior"]:eq(2)').click(function(){a.actorPanel.open()});document.getElementById("saveButton").addEventListener("click",function(){a.saveMap()});var e=document.getElementById("mapFile");
e.addEventListener("change",function(){var a=window.URL.createObjectURL(e.files[0]);c.loadMapData(a)});document.getElementById("generateButton").addEventListener("click",function(){c.generateBrick(FlexibleView.Instance.ctx)});this.setupPointingDevice()};
EditMain.prototype.moveLandform=function(a){var b=this.field.landform,c=parseInt(a.x/Landform.BRICK_WIDTH);a=parseInt(a.y/Landform.BRICK_WIDTH);if(0!=c){var d=$("#slider"),e=parseInt(d.attr("min")),f=parseInt(d.attr("max")),g=parseInt(d.val())-c;g<e&&(g=e);f<g&&(g=f);e=g*Landform.BRICK_WIDTH;d.val(g).slider("refresh");b.stage.moveH(e)}0!=a&&b.wheel(a);this.controller.decPoint(c*Landform.BRICK_WIDTH,a*Landform.BRICK_WIDTH)};
EditMain.prototype.setupPointingDevice=function(){document.getElementById("canvas").addEventListener("mousemove",function(a){})};EditMain.prototype.saveMap=function(){console.log("isDetail:"+this.isDetail);var a=this.isDetail?this.saveDetailMap():this.saveStageMap(),b=document.getElementById("messagePopup"),c=b.querySelector("p");$.mobile.loading("show",{text:"Save...",textVisible:!0});a.then(function(a){$.mobile.loading("hide");c.textContent=a.ok?"Stage saved.":"Save failed.";$(b).popup("open",{})})};
EditMain.prototype.saveStageMap=function(){var a=document.getElementById("attrForm");a=new FormData(a);var b=this.field.landform;a.append("id",this.mapId);a.append("map",b.mapImage);return this.mapEntity.saveMap(a)};EditMain.prototype.saveDetailMap=function(){var a=new FormData,b=this.field.landform,c=0;a.append("id",this.detailId);a.append("map",b.mapImage);b.scenarioList.forEach(function(b){Object.keys(b).forEach(function(d){a.append("scenarioList["+c+"]."+d,b[d])});c++});return this.productEntity.saveMap(a)};
$jscomp.global.Object.defineProperties(EditMain.prototype,{isMove:{configurable:!0,enumerable:!0,get:function(){return"m"==$('[name="behavior"]:checked').val()}},isBrick:{configurable:!0,enumerable:!0,get:function(){return"b"==$('[name="behavior"]:checked').val()}},isActor:{configurable:!0,enumerable:!0,get:function(){return"a"==$('[name="behavior"]:checked').val()}}});
var BrickPanel=function(a){var b=this;this.field=a;this.panel=document.getElementById("brickPanel");$('[name="brick"]').click(function(){var a=$('[name="brick"]:checked').val();b.field.landform.selection=a})};BrickPanel.prototype.open=function(){$(this.panel).panel("open")};var ActorPanel=function(a){this.field=a;this.panel=document.getElementById("actorPanel")};
ActorPanel.prototype.setupActors=function(a){var b={};a.forEach(function(a){var c=a.type,d=b[c];d||(d=[],b[c]=d);d.push(a)});var c=this.panel.querySelector('[data-role="controlgroup"] > div');Actor.TypeList.forEach(function(a){var d=b[Actor.Type[a]];if(d){var f=document.createElement("button"),g=[];f.textContent=a;f.setAttribute("disabled","disabled");f.classList.add("ui-btn");f.classList.add("ui-btn-b");f.classList.add("ui-mini");g.push(a);c.appendChild(f);d.forEach(function(b){var d=b.actor,e=document.createElement("div"),
f=document.createElement("label"),h=document.createElement("input"),p=document.createElement("img"),n=d.name;p.setAttribute("src","/visual/src/"+d.imageid);h.setAttribute("type","radio");h.setAttribute("name","actor");h.setAttribute("value",b.seq);f.appendChild(p);f.appendChild(document.createTextNode(n));f.appendChild(h);e.classList.add("ui-radio");e.setAttribute("data-filtertext",[a,n].join(" "));e.appendChild(f);c.appendChild(e);g.push(n)});f.setAttribute("data-filtertext",g.join(" "))}});this.setupEvent();
$(c).parent().trigger("create")};ActorPanel.prototype.setupEvent=function(){var a=this;$('[name="actor"]').click(function(){var b=$('[name="actor"]:checked').val();a.field.landform.selection=b})};ActorPanel.prototype.open=function(){$(this.panel).panel("open")};
function setupActorList(a){var b=$("#actorList"),c=b.controlgroup("container");Enemy.LIST.forEach(function(b,e){var d="actor"+e;e=$('<input type="radio" name="actor"/>').attr("id",d).val(e+1);d=$("<label></label>").text(b.name).attr("for",d);var g=$("<img/>").attr("src","img/"+b.img);d.css("background-image",'url("./img/'+b.img+'")');b.h&&(g.attr("width",b.h),g.attr("height",b.h));b.instance=new b.type(a);c.appendChild(e);c.appendChild(d.prepend(g))});b.parent().trigger("create");b.find("input").click(function(){a.selection=
this.value})}
function setupMouse(a){var b=$(a.canvas);b.mousedown(function(b){var c=a.magni;a.target={x:b.offsetX/c,y:b.offsetY/c};a.which=b.which});b.mousemove(function(b){var c=a.magni;a.target={x:b.offsetX/c,y:b.offsetY/c}});b.mouseup(function(){a.which=null});b.mouseleave(function(){a.target=null});b.on("onwheel"in document?"wheel":"onmousewheel"in document?"mousewheel":"DOMMouseScroll",function(b){b.preventDefault();a.wheel(b.originalEvent.deltaY?-b.originalEvent.deltaY:b.originalEvent.wheelDelta?b.originalEvent.wheelDelta:
-b.originalEvent.detail)})};
