var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;$jscomp.objectCreate=$jscomp.ASSUME_ES5||"function"==typeof Object.create?Object.create:function(a){var b=function(){};b.prototype=a;return new b};$jscomp.underscoreProtoCanBeSet=function(){var a={a:!0},b={};try{return b.__proto__=a,b.a}catch(c){}return!1};
$jscomp.setPrototypeOf="function"==typeof Object.setPrototypeOf?Object.setPrototypeOf:$jscomp.underscoreProtoCanBeSet()?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null;
$jscomp.inherits=function(a,b){a.prototype=$jscomp.objectCreate(b.prototype);a.prototype.constructor=a;if($jscomp.setPrototypeOf){var c=$jscomp.setPrototypeOf;c(a,b)}else for(c in b)if("prototype"!=c)if(Object.defineProperties){var d=Object.getOwnPropertyDescriptor(b,c);d&&Object.defineProperty(a,c,d)}else a[c]=b[c];a.superClass_=b.prototype};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.arrayIteratorImpl=function(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}};$jscomp.arrayIterator=function(a){return{next:$jscomp.arrayIteratorImpl(a)}};$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)};$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.SymbolClass=function(a,b){this.$jscomp$symbol$id_=a;$jscomp.defineProperty(this,"description",{configurable:!0,writable:!0,value:b})};$jscomp.SymbolClass.prototype.toString=function(){return this.$jscomp$symbol$id_};
$jscomp.Symbol=function(){function a(c){if(this instanceof a)throw new TypeError("Symbol is not a constructor");return new $jscomp.SymbolClass($jscomp.SYMBOL_PREFIX+(c||"")+"_"+b++,c)}var b=0;return a}();
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.iterator;a||(a=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("Symbol.iterator"));"function"!=typeof Array.prototype[a]&&$jscomp.defineProperty(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))}});$jscomp.initSymbolIterator=function(){}};
$jscomp.initSymbolAsyncIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.asyncIterator;a||(a=$jscomp.global.Symbol.asyncIterator=$jscomp.global.Symbol("Symbol.asyncIterator"));$jscomp.initSymbolAsyncIterator=function(){}};$jscomp.iteratorPrototype=function(a){$jscomp.initSymbolIterator();a={next:a};a[$jscomp.global.Symbol.iterator]=function(){return this};return a};
$jscomp.iteratorFromArray=function(a,b){$jscomp.initSymbolIterator();a instanceof String&&(a+="");var c=0,d={next:function(){if(c<a.length){var e=c++;return{value:b(e,a[e]),done:!1}}d.next=function(){return{done:!0,value:void 0}};return d.next()}};d[Symbol.iterator]=function(){return d};return d};
$jscomp.polyfill=function(a,b,c,d){if(b){c=$jscomp.global;a=a.split(".");for(d=0;d<a.length-1;d++){var e=a[d];e in c||(c[e]={});c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&$jscomp.defineProperty(c,a,{configurable:!0,writable:!0,value:b})}};$jscomp.polyfill("Array.prototype.keys",function(a){return a?a:function(){return $jscomp.iteratorFromArray(this,function(a){return a})}},"es6","es3");$jscomp.owns=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)};
$jscomp.assign="function"==typeof Object.assign?Object.assign:function(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(d)for(var e in d)$jscomp.owns(d,e)&&(a[e]=d[e])}return a};$jscomp.polyfill("Object.assign",function(a){return a||$jscomp.assign},"es6","es3");
$jscomp.polyfill("Array.prototype.fill",function(a){return a?a:function(a,c,d){var b=this.length||0;0>c&&(c=Math.max(0,b+c));if(null==d||d>b)d=b;d=Number(d);0>d&&(d=Math.max(0,b+d));for(c=Number(c||0);c<d;c++)this[c]=a;return this}},"es6","es3");
$jscomp.checkStringArgs=function(a,b,c){if(null==a)throw new TypeError("The 'this' value for String.prototype."+c+" must not be null or undefined");if(b instanceof RegExp)throw new TypeError("First argument to String.prototype."+c+" must not be a regular expression");return a+""};
$jscomp.polyfill("String.prototype.startsWith",function(a){return a?a:function(a,c){var b=$jscomp.checkStringArgs(this,a,"startsWith");a+="";var e=b.length,f=a.length;c=Math.max(0,Math.min(c|0,b.length));for(var g=0;g<f&&c<e;)if(b[c++]!=a[g++])return!1;return g>=f}},"es6","es3");$jscomp.findInternal=function(a,b,c){a instanceof String&&(a=String(a));for(var d=a.length,e=0;e<d;e++){var f=a[e];if(b.call(c,f,e,a))return{i:e,v:f}}return{i:-1,v:void 0}};
$jscomp.polyfill("Array.prototype.find",function(a){return a?a:function(a,c){return $jscomp.findInternal(this,a,c).v}},"es6","es3");$jscomp.makeIterator=function(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):$jscomp.arrayIterator(a)};$jscomp.FORCE_POLYFILL_PROMISE=!1;
$jscomp.polyfill("Promise",function(a){function b(){this.batch_=null}function c(a){return a instanceof e?a:new e(function(b,c){b(a)})}if(a&&!$jscomp.FORCE_POLYFILL_PROMISE)return a;b.prototype.asyncExecute=function(a){if(null==this.batch_){this.batch_=[];var b=this;this.asyncExecuteFunction(function(){b.executeBatch_()})}this.batch_.push(a)};var d=$jscomp.global.setTimeout;b.prototype.asyncExecuteFunction=function(a){d(a,0)};b.prototype.executeBatch_=function(){for(;this.batch_&&this.batch_.length;){var a=
this.batch_;this.batch_=[];for(var b=0;b<a.length;++b){var c=a[b];a[b]=null;try{c()}catch(h){this.asyncThrow_(h)}}}this.batch_=null};b.prototype.asyncThrow_=function(a){this.asyncExecuteFunction(function(){throw a;})};var e=function(a){this.state_=0;this.result_=void 0;this.onSettledCallbacks_=[];var b=this.createResolveAndReject_();try{a(b.resolve,b.reject)}catch(l){b.reject(l)}};e.prototype.createResolveAndReject_=function(){function a(a){return function(d){c||(c=!0,a.call(b,d))}}var b=this,c=!1;
return{resolve:a(this.resolveTo_),reject:a(this.reject_)}};e.prototype.resolveTo_=function(a){if(a===this)this.reject_(new TypeError("A Promise cannot resolve to itself"));else if(a instanceof e)this.settleSameAsPromise_(a);else{a:switch(typeof a){case "object":var b=null!=a;break a;case "function":b=!0;break a;default:b=!1}b?this.resolveToNonPromiseObj_(a):this.fulfill_(a)}};e.prototype.resolveToNonPromiseObj_=function(a){var b=void 0;try{b=a.then}catch(l){this.reject_(l);return}"function"==typeof b?
this.settleSameAsThenable_(b,a):this.fulfill_(a)};e.prototype.reject_=function(a){this.settle_(2,a)};e.prototype.fulfill_=function(a){this.settle_(1,a)};e.prototype.settle_=function(a,b){if(0!=this.state_)throw Error("Cannot settle("+a+", "+b+"): Promise already settled in state"+this.state_);this.state_=a;this.result_=b;this.executeOnSettledCallbacks_()};e.prototype.executeOnSettledCallbacks_=function(){if(null!=this.onSettledCallbacks_){for(var a=0;a<this.onSettledCallbacks_.length;++a)f.asyncExecute(this.onSettledCallbacks_[a]);
this.onSettledCallbacks_=null}};var f=new b;e.prototype.settleSameAsPromise_=function(a){var b=this.createResolveAndReject_();a.callWhenSettled_(b.resolve,b.reject)};e.prototype.settleSameAsThenable_=function(a,b){var c=this.createResolveAndReject_();try{a.call(b,c.resolve,c.reject)}catch(h){c.reject(h)}};e.prototype.then=function(a,b){function c(a,b){return"function"==typeof a?function(b){try{d(a(b))}catch(p){f(p)}}:b}var d,f,g=new e(function(a,b){d=a;f=b});this.callWhenSettled_(c(a,d),c(b,f));return g};
e.prototype.catch=function(a){return this.then(void 0,a)};e.prototype.callWhenSettled_=function(a,b){function c(){switch(d.state_){case 1:a(d.result_);break;case 2:b(d.result_);break;default:throw Error("Unexpected state: "+d.state_);}}var d=this;null==this.onSettledCallbacks_?f.asyncExecute(c):this.onSettledCallbacks_.push(c)};e.resolve=c;e.reject=function(a){return new e(function(b,c){c(a)})};e.race=function(a){return new e(function(b,d){for(var e=$jscomp.makeIterator(a),f=e.next();!f.done;f=e.next())c(f.value).callWhenSettled_(b,
d)})};e.all=function(a){var b=$jscomp.makeIterator(a),d=b.next();return d.done?c([]):new e(function(a,e){function f(b){return function(c){g[b]=c;h--;0==h&&a(g)}}var g=[],h=0;do g.push(void 0),h++,c(d.value).callWhenSettled_(f(g.length-1),e),d=b.next();while(!d.done)})};return e},"es6","es3");
$jscomp.polyfill("String.prototype.repeat",function(a){return a?a:function(a){var b=$jscomp.checkStringArgs(this,null,"repeat");if(0>a||1342177279<a)throw new RangeError("Invalid count value");a|=0;for(var d="";a;)if(a&1&&(d+=b),a>>>=1)b+=b;return d}},"es6","es3");
var AccessibleRange=function(a,b){var c=document.createElement("legend");c.textContent="Access:";Object.keys(AccessibleRange.List).forEach(function(c){var d=b+c,f=document.createElement("input"),g=document.createElement("label");f.setAttribute("id",d);f.setAttribute("type","radio");f.setAttribute("name","access");f.setAttribute("value",c);g.setAttribute("for",d);g.textContent=AccessibleRange.List[c];a.appendChild(f);a.appendChild(g)});a.setAttribute("data-role","controlgroup");a.setAttribute("data-type",
"horizontal");a.setAttribute("data-mini","true");a.appendChild(c);$(a).parents("form").trigger("create")};AccessibleRange.List={0:"Private",1:"Protected",2:"Public"};
var AudioSelectionButton=function(a,b){var c=this;b=void 0===b?"OTHER":b;var d=document.createElement("legend"),e=document.createElement("a"),f=document.createElement("input"),g=document.createElement("div"),k=document.createElement("button"),l=document.createElement("button"),h=document.createElement("button"),m=document.createElement("fieldset"),q=a.toLowerCase();d.textContent=a+":";e.setAttribute("href","#audioChooser");e.setAttribute("data-target",q);e.setAttribute("data-filter",b);e.setAttribute("data-rel",
"popup");e.className="ui-btn ui-mini ui-corner-all ui-shadow ui-btn-icon-left ui-icon-audio";e.textContent="Choose...";f.setAttribute("type","hidden");f.setAttribute("name",q);f.addEventListener("valueChanged",function(){c.resetImage()});k.textContent="W";k.setAttribute("data-icon","audio");k.addEventListener("click",function(a){a.preventDefault();window.open("/audio/webm/?id="+f.value)});l.textContent="A";l.setAttribute("data-icon","audio");l.addEventListener("click",function(a){a.preventDefault();
window.open("/audio/audio/?id="+f.value)});h.textContent="Del";h.setAttribute("data-icon","delete");h.setAttribute("data-theme","b");h.className="ui-btn-icon-notext";h.addEventListener("click",function(a){a.preventDefault();f.value="";c.resetImage()});g.appendChild(k);g.appendChild(l);g.appendChild(h);m.appendChild(d);m.appendChild(e);m.appendChild(f);m.appendChild(g);$(g).controlgroup({type:"horizontal",mini:!0});this.fieldset=m;this.button=e;this.hidden=f;this.controlgroup=g};
AudioSelectionButton.prototype.resetImage=function(){this.hidden.value?($(this.controlgroup).show(),$(this.button).hide()):($(this.controlgroup).hide(),$(this.button).show())};var Customer=function(){};Customer.prototype.check=function(){return $.ajax({type:"post",url:"/customer/check",dataType:"json",data:{}})};Customer.prototype.signIn=function(a,b){return $.ajax({type:"post",url:"/customer/signIn",dataType:"json",data:{userid:a,passwd:b}})};
var FieldEditor=function(a){var b=Field.call(this,a)||this;b.setRect(a.width,a.height);b.setupLandform(a);return Field.Instance=b};$jscomp.inherits(FieldEditor,Field);FieldEditor.prototype.setupLandform=function(a){this.landform=new LandformEditor(a.canvas)};var FieldMapEditor=function(){var a=FieldMap.call(this)||this;a.brickColor="b";a.col=0;a.colDir=1;a.currentBrick=null;a.scale=1;a.progress=0;return a};$jscomp.inherits(FieldMapEditor,FieldMap);
FieldMapEditor.prototype.getImageData=function(){var a=document.createElement("canvas"),b=a.getContext("2d"),c=this._mainVisual.image;a.width=c.width;a.height=c.height;b.drawImage(c,0,0);return b.getImageData(0,0,c.width,c.height)};
FieldMapEditor.prototype.generateBrick=function(a){a=this.getImageData();var b=this.brickSize,c=b/2,d=4*b,e=this.bricks.bricks;c=4*(a.width*c+c);var f=0;console.log("img width:"+a.width+"/height:"+a.height);console.log("bricks width:"+e.width+"/height:"+e.height);for(var g=0;g<e.height;g++){for(var k=0;k<e.width;k++,f+=4,c+=d){for(var l=!1,h=0;4>h;h++)a.data[c+h]&&(l=!0);this.bricks.putBrick(f,l?Bricks.BRICK_TYPE.WALL:0)}c+=a.width*(b-1)*4}console.log("ix:"+f);console.log("sx:"+c)};
FieldMapEditor.prototype.clear=function(){this.bricks.clear(this)};FieldMapEditor.prototype.touch=function(a,b,c){a=this.bricks.getIndex({x:a,y:b});b=this.bricks.bricks.data[a+2];null==this.currentBrick&&(this.currentBrick=b==c?0:c);this.bricks.putBrick(a,this.currentBrick)};FieldMapEditor.prototype.leave=function(){this.currentBrick=null};FieldMapEditor.prototype.setProgress=function(a){FieldMap.prototype.setProgress.call(this,a);this._mainVisual.x=0;this._mainVisual.y=0;this.progress=a};
FieldMapEditor.prototype.draw=function(a){FieldMap.prototype.draw.call(this,a);a.save();"b"==this.brickColor?(a.strokeStyle="rgba(255, 255, 255, .7)",a.fillStyle="rgba(0, 0, 0, .5)"):"w"==this.brickColor&&(a.strokeStyle="rgba(0, 0, 0, .7)",a.fillStyle="rgba(255, 255, 255, .5)");"-"!=this.brickColor&&this.bricks.draw(a);a.restore();this.col+=4*this.colDir;if(0>=this.col||255<=this.col)this.colDir*=-1};
FieldMapEditor.prototype.drawForDebug=function(a){var b=this.progress/this.scale;a.save();a.strokeStyle="white";a.strokeText("x:"+this.x+"/"+this.y,b,20);a.restore()};FieldMapEditor.prototype.save=function(){var a=document.createElement("canvas"),b=a.getContext("2d"),c=this.bricks.bricks;a.width=c.width;a.height=c.height;b.putImageData(c,0,0);this.map=a.toDataURL("image/png");return(new MapEntity).save(this)};
FieldMapEditor.create=function(a){return"string"==typeof a?(new MapEntity).select(a).then(function(a){return FieldMapEditor.create(a)}):Object.assign(new FieldMapEditor,a).init()};
var ImageSelectionButton=function(a,b){var c=this;b=void 0===b?"OTHER":b;var d=document.createElement("legend"),e=document.createElement("a"),f=document.createElement("input"),g=document.createElement("input"),k=document.createElement("fieldset"),l=a.toLowerCase();d.textContent=a+":";e.setAttribute("href","#imageChooser");e.setAttribute("data-target",l);e.setAttribute("data-filter",b);e.setAttribute("data-rel","popup");e.className="ui-btn ui-mini ui-corner-all ui-shadow ui-btn-icon-left ui-icon-heart";
e.textContent="Choose...";f.setAttribute("type","hidden");f.setAttribute("name",l);f.addEventListener("valueChanged",function(){c.resetImage()});g.setAttribute("type","image");g.addEventListener("click",function(a){a.preventDefault();f.value="";c.resetImage()});k.appendChild(d);k.appendChild(e);k.appendChild(f);k.appendChild(g);this.fieldset=k;this.button=e;this.hidden=f;this.img=g};
ImageSelectionButton.prototype.resetImage=function(){var a=this.hidden.value;a?(this.img.setAttribute("src","/visual/src/"+a),$(this.img).show(),$(this.button).hide()):(this.img.removeAttribute("src"),$(this.img).hide(),$(this.button).show())};var LandformEditor=function(a){return Landform.call(this,a)||this};$jscomp.inherits(LandformEditor,Landform);
LandformEditor.prototype.drawEnemy=function(a,b,c,d){d=void 0===d?!1:d;var e=this.ctx,f=Enemy.LIST[a];e.save();e.fillStyle="rgba(255, 255, 255, 0.5)";e.beginPath();e.arc(b,c,4,0,Math.PI2,!1);e.fill();e.fillText(a,b,c);e.restore();if(!f||!f.instance)return null;a=Product.Instance.stage.fg;var g=a.y,k=f.formation?3:1;f=f.instance;b+=f.hW;c+=f.hH;f.x=b-a.x;f.y=c-g;f.checkInverse();f.x=b;for(f.y=c;k--;)f.draw(e),f.x+=2,f.y+=2;d&&(e.save(),e.translate(f.x,f.y),e.drawImage(this.reverse,-8,-4),e.restore());
return f};
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
var ListviewRow=function(a,b){b=void 0===b?null:b;var c=document.createElement("img"),d=document.createElement("span"),e=document.createElement("p"),f=document.createElement("a"),g=document.createElement("li");d.textContent=a.name;e.textContent=a.description;a.href&&f.setAttribute("href",a.href);null!=b&&(c.setAttribute("src",b),f.appendChild(c));f.appendChild(d);f.appendChild(e);a.count&&(b=document.createElement("span"),b.classList.add("ui-li-count"),b.textContent=a.count,f.appendChild(b));a.aside&&
(b=document.createElement("p"),b.classList.add("ui-li-aside"),b.textContent=a.aside,f.appendChild(b));g.appendChild(f);this.img=c;this.anchor=f;this.li=g},ResourceChooser=function(a){this.id="#"+a;this.setupEvents()};
ResourceChooser.prototype.setupEvents=function(){var a=this;document.querySelectorAll('[href="'+this.id+'"]').forEach(function(b){var c=$(b).parents("fieldset")[0];b.addEventListener("click",function(){var d=b.getAttribute("data-target"),e=b.getAttribute("data-filter");d=c.querySelector('[name="'+d+'"]');a.list(d,e)})})};ResourceChooser.prototype.createRow=function(a,b){return new ListviewRow(a,void 0===b?null:b)};
ResourceChooser.prototype.list=function(a,b){var c=this,d=new FormData;d.append("keyword","");d.append("type",b);this.listView=document.querySelector(this.id+" > ul");this.listView.textContent="Loadling...";this.entity.list(d).then(function(b){c.listView.textContent=null;b.forEach(function(b){var d=c.createRow(b);c.listView.appendChild(d.li);d.anchor.addEventListener("click",function(){c.embedId(a,b.id)})});$(c.listView).listview("refresh")})};
ResourceChooser.prototype.embedId=function(a,b){a.value=b;a.dispatchEvent(ResourceChooser.ValueChangedEvent);$(this.id).popup("close")};ResourceChooser.ValueChangedEvent=new Event("valueChanged");var StageEditor=function(){return Stage.call(this)||this};$jscomp.inherits(StageEditor,Stage);StageEditor.prototype.setProgress=function(a){0!=this.fg.speed&&(a=a*this.map.brickSize/this.fg.speed,this.map.setProgress(a),this.progress=a)};
StageEditor.prototype.draw=function(a){var b=this,c=this.roll==Stage.SCROLL.OFF||this.roll==Stage.SCROLL.ON;a.save();c&&a.translate(0,Product.Instance.height);Stage.prototype.draw.call(this,a);this.map.draw(a);this.eventList.forEach(function(c){var d=b.map.brickSize,f=d/2,g=c.v*d+f;c=c.h*d+f;a.fillStyle="orange";a.beginPath();a.arc(g,c,f,0,Math.PI2);a.fill()});a.restore()};StageEditor.prototype.createFieldMap=function(){return FieldMapEditor.create(this.map)};
StageEditor.prototype.init=function(){console.log("StageEditor#init");Stage.prototype.init.call(this);console.log("map:"+this.map.constructor.name);this.eventList=this.scenarioList.concat();return this};StageEditor.create=function(a){return Object.assign(new StageEditor,a).init()};var TitleBg=function(){this.x=0;this.width=1200;this.move()};
TitleBg.prototype.move=function(a){var b=this;document.querySelector("div[data-role=header]").style.backgroundPosition=-this.x+"px 0";this.x++;this.width<this.x&&(this.x=0);requestAnimationFrame(function(a){return b.move(a)})};var EntityBase=function(a){this.base=a};EntityBase.prototype.list=function(a){a=void 0===a?{}:a;return AjaxUtils.post("/"+this.base+"/list",a)};EntityBase.prototype.select=function(a){var b=new FormData;b.append("id",a);return AjaxUtils.post("/"+this.base+"/select",b)};
EntityBase.prototype.save=function(a){var b=[];return fetch("/"+this.base+"/save",{method:"POST",headers:{"Content-Type":"application/json;charset=UTF-8"},body:JSON.stringify(a,function(a,d){if(!a.startsWith("_")){if(null!=d&&"object"==typeof d){if(0<=b.indexOf(d))return;b.push(d)}return d}}),credentials:"include"}).then(function(a){return a.json()})};EntityBase.prototype.saveResource=function(a){return fetch("/"+this.base+"/save",{method:"post",body:a,credentials:"include"}).then(function(a){return a.json()})};
var ActorEntity=function(){EntityBase.call(this,"actor")};$jscomp.inherits(ActorEntity,EntityBase);var AudioEntity=function(){EntityBase.call(this,"audio")};$jscomp.inherits(AudioEntity,EntityBase);AudioEntity.Type={OTHER:0,FX:1,BGM:2};var AudioSetEntity=function(){EntityBase.call(this,"audioSet")};$jscomp.inherits(AudioSetEntity,EntityBase);var MapEntity=function(){EntityBase.call(this,"map")};$jscomp.inherits(MapEntity,EntityBase);var MediasetEntity=function(){EntityBase.call(this,"mediaset")};
$jscomp.inherits(MediasetEntity,EntityBase);var ProductEntity=function(){EntityBase.call(this,"product")};$jscomp.inherits(ProductEntity,EntityBase);ProductEntity.prototype.listActors=function(a){var b=new FormData;b.append("id",a);return AjaxUtils.post("/product/listActors",b)};ProductEntity.prototype.saveMap=function(a){return AjaxUtils.post("/detail/save",a)};ProductEntity.prototype.increase=function(a){var b=new FormData;b.append("id",a);return AjaxUtils.post("/product/increase",b)};
var ScoreEntity=function(){EntityBase.call(this,"score")};$jscomp.inherits(ScoreEntity,EntityBase);ScoreEntity.prototype.register=function(a){return AjaxUtils.post("/score/register",a)};var VisualEntity=function(){EntityBase.call(this,"visual")};$jscomp.inherits(VisualEntity,EntityBase);VisualEntity.Type={OTHER:0,ACT:1,BACK:2,FORE:3};var EditStagePanel=function(a){this.appMain=a;this.panel=document.getElementById("editStagePanel");this.roll=this.panel.querySelector("select");this.rec={};this.setupEvent()};
EditStagePanel.prototype.setupEvent=function(){var a=this;this.roll.addEventListener("change",function(){a.rec.roll=a.roll.value});this.panel.querySelector(".ui-icon-edit").addEventListener("click",function(){window.open("/detail/edit/"+a.rec.id)});this.panel.querySelector(".ui-icon-delete").addEventListener("click",function(){a.appMain.removeStage(a.rec.stageId);$(a.panel).panel("close")});$(this.panel).on("panelclose",function(){a.appMain.updateStage(a.rec)})};
EditStagePanel.prototype.open=function(a){this.rec=a;$(this.roll).val([a.roll]).selectmenu("refresh")};var ImageSelector=function(){this.imageSelector=document.getElementById("imageSelector");this.mediasetId=document.getElementById("mediasetId").value;this.entity=new VisualEntity;this.setupEvents()};
ImageSelector.prototype.setupEvents=function(){var a=this,b=document.querySelector("#addImageButton"),c=document.querySelector("[name=visualType]");b.addEventListener("click",function(){$(a.imageSelector).popup("open",{})});c.addEventListener("change",function(){return a.loadVisual(c.value)});this.loadVisual(c.value)};
ImageSelector.prototype.loadVisual=function(a){var b=this.imageSelector.querySelector("ul"),c=new FormData;c.append("mediasetId",this.mediasetId);c.append("type",a);b.textContent="Loadling...";this.entity.list(c).then(function(a){a=Array.isArray(a)?a:a.result;b.textContent=null;a.forEach(function(a){var c=(new ListviewRow(a)).li;c.querySelector("a").addEventListener("click",function(){console.log(a)});b.appendChild(c)});$(b).listview("refresh")})};
var ProductActorChoicePanel=function(a){this.page=a;this.panel=document.getElementById("ProductActorChoicePanel");this.actorType=this.panel.querySelector("select");this.listView=this.panel.querySelector("ul");this.entity=new ActorEntity;this.setupEvent()};ProductActorChoicePanel.prototype.setupEvent=function(){var a=this;document.querySelector('[href="#ProductActorChoicePanel"]').addEventListener("click",function(){a.listActor()});this.setupActorType()};
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
var EditMain=function(){var a=this,b=document.getElementById("mediasetId").value,c=document.getElementById("mapId").value;this.view=document.getElementById("view");this.canvas=document.getElementById("canvas");this.ctx=canvas.getContext("2d");Mediaset.create(b).then(function(a){a.loadVisual();return FieldMapEditor.create(c)}).then(function(b){a.fieldMap=b;a.checkLoading()})};
EditMain.prototype.checkLoading=function(){var a=this,b=document.getElementById("loading");Mediaset.Instance.checkLoading(function(a,d){b.innerHTML=a+"/"+d}).then(function(){b.parentNode.removeChild(b);a.start()})};
EditMain.prototype.start=function(){var a=this,b=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame,c=function(){a.ctx.save();a.ctx.clearRect(0,0,a.ctx.width,a.ctx.height);a.ctx.scale(a.scale,a.scale);a.fieldMap.draw(a.ctx);a.ctx.restore();b(c)};this.changeScale();this.setupEvents();c()};EditMain.prototype.changeColor=function(){this.fieldMap.brickColor=this.brickColor};
EditMain.prototype.changeScale=function(){var a=this.fieldMap._mainVisual;this.canvas.width=a.image.width*this.scale;this.canvas.height=a.image.height*this.scale;this.ctx.width=this.canvas.width;this.ctx.height=this.canvas.height;this.fieldMap.scale=this.scale};
EditMain.prototype.setupEvents=function(){var a=this;this.view.addEventListener("scroll",function(){return a.fieldMap.setProgress(a.view.scrollLeft)});$('[name="color"]').click(function(){return a.changeColor()});$('[name="scale"]').click(function(){return a.changeScale()});document.getElementById("saveButton").addEventListener("click",function(){return a.saveMap()});this.setupImagePanel();this.setupBrickPanel();this.setupPointingDevice()};
EditMain.prototype.setupImagePanel=function(){var a=this,b=document.getElementById("imagePanel"),c=document.getElementById("mapName"),d=b.querySelector("ul"),e=d.querySelector(".sortable-item.ui-state-disabled");this.imageSelector=new ImageSelector;c.addEventListener("change",function(){return a.fieldMap.name=c.value});this.fieldMap.mapVisualList.forEach(function(b,c){var f=document.createElement("li"),g=document.createElement("a"),h=document.createElement("span");h.textContent=b.imageName;g.append(h);
g.addEventListener("click",function(){return a.openMapVisualPopup(b)});f.append(g);b.isMain?(h=document.createElement("span"),h.textContent="*",h.classList.add("ui-li-count"),g.append(h)):(g=document.createElement("a"),g.addEventListener("click",function(){console.log("delete")}),f.append(g));f.setAttribute("data-index",c);f.classList.add("sortable-item","mapVisual");0>=b.seq?d.insertBefore(f,e):d.append(f)});$(d).listview("refresh");$(d).sortable({helper:"clone",items:"> li.sortable-item",update:function(b,
c){a.sortMapVisual(d);$(d).listview("refresh")}})};EditMain.prototype.sortMapVisual=function(a){var b=this,c=[],d=a.querySelectorAll(".mapVisual"),e=a.querySelectorAll("li.fg ~ *").length-d.length+1;d.forEach(function(a,d){a=a.getAttribute("data-index");a=b.fieldMap.mapVisualList[a];a.seq=e+d;a.z=1E4*a.seq-1;a.isMain&&(b.fieldMap.mainSeq=a.seq);c.push(a)});this.fieldMap.mapVisualList=c};
EditMain.prototype.setupBrickPanel=function(){var a=this,b=document.getElementById("brickSize");b.addEventListener("change",function(){return a.fieldMap.brickSize=b.value});document.getElementById("generateButton").addEventListener("click",function(){confirm("Sure?")&&a.fieldMap.generateBrick(a.ctx)});document.getElementById("clearButton").addEventListener("click",function(){confirm("Sure?")&&a.fieldMap.clear()})};
EditMain.prototype.openMapVisualPopup=function(a){var b=document.getElementById("mapVisualPopup"),c=b.querySelector("[name=repeat]"),d=b.querySelector("[name=radian]"),e=b.querySelector("[name=speed]"),f=b.querySelector("[name=blink]");c.value=a.repeat;d.value=a.radian;e.value=a.speed;f.value=a.blink;$(b).popup("open")};
EditMain.prototype.setupPointingDevice=function(){var a=this,b=document.getElementById("canvas"),c=!1,d=function(b){c&&a.fieldMap.touch((a.view.scrollLeft+b.clientX)/a.scale,b.pageY/a.scale,a.brickNum)};b.addEventListener("mousemove",function(a){return d(a)});b.addEventListener("mousedown",function(b){c=!0;"-"==a.brickColor&&document.querySelectorAll('[name="color"]')[0].click();d(b)});b.addEventListener("mouseup",function(){c=!1;a.fieldMap.leave()});b.addEventListener("mouseleave",function(){c=!1;
a.fieldMap.leave()})};EditMain.prototype.saveMap=function(){var a=document.getElementById("messagePopup"),b=a.querySelector("p");$.mobile.loading("show",{text:"Save...",textVisible:!0});this.fieldMap.save().then(function(c){$.mobile.loading("hide");b.textContent=c.ok?"Stage saved.":"Save failed.";$(a).popup("open",{})})};
$jscomp.global.Object.defineProperties(EditMain.prototype,{brickColor:{configurable:!0,enumerable:!0,get:function(){return document.querySelector('[name="color"]:checked').value}},scale:{configurable:!0,enumerable:!0,get:function(){return document.querySelector('[name="scale"]:checked').value}},brickNum:{configurable:!0,enumerable:!0,get:function(){return parseInt(document.querySelector('[name="brick"]:checked').value)}}});
