var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.arrayIteratorImpl=function(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}};$jscomp.arrayIterator=function(a){return{next:$jscomp.arrayIteratorImpl(a)}};$jscomp.makeIterator=function(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):$jscomp.arrayIterator(a)};$jscomp.arrayFromIterator=function(a){for(var b,c=[];!(b=a.next()).done;)c.push(b.value);return c};
$jscomp.arrayFromIterable=function(a){return a instanceof Array?a:$jscomp.arrayFromIterator($jscomp.makeIterator(a))};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;$jscomp.objectCreate=$jscomp.ASSUME_ES5||"function"==typeof Object.create?Object.create:function(a){var b=function(){};b.prototype=a;return new b};$jscomp.underscoreProtoCanBeSet=function(){var a={a:!0},b={};try{return b.__proto__=a,b.a}catch(c){}return!1};
$jscomp.setPrototypeOf="function"==typeof Object.setPrototypeOf?Object.setPrototypeOf:$jscomp.underscoreProtoCanBeSet()?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null;
$jscomp.inherits=function(a,b){a.prototype=$jscomp.objectCreate(b.prototype);a.prototype.constructor=a;if($jscomp.setPrototypeOf){var c=$jscomp.setPrototypeOf;c(a,b)}else for(c in b)if("prototype"!=c)if(Object.defineProperties){var d=Object.getOwnPropertyDescriptor(b,c);d&&Object.defineProperty(a,c,d)}else a[c]=b[c];a.superClass_=b.prototype};
$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)};$jscomp.getGlobal=function(a){a=["object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global,a];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}return globalThis};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.SymbolClass=function(a,b){this.$jscomp$symbol$id_=a;$jscomp.defineProperty(this,"description",{configurable:!0,writable:!0,value:b})};$jscomp.SymbolClass.prototype.toString=function(){return this.$jscomp$symbol$id_};
$jscomp.Symbol=function(){function a(c){if(this instanceof a)throw new TypeError("Symbol is not a constructor");return new $jscomp.SymbolClass($jscomp.SYMBOL_PREFIX+(c||"")+"_"+b++,c)}var b=0;return a}();
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.iterator;a||(a=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("Symbol.iterator"));"function"!=typeof Array.prototype[a]&&$jscomp.defineProperty(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))}});$jscomp.initSymbolIterator=function(){}};
$jscomp.initSymbolAsyncIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.asyncIterator;a||(a=$jscomp.global.Symbol.asyncIterator=$jscomp.global.Symbol("Symbol.asyncIterator"));$jscomp.initSymbolAsyncIterator=function(){}};$jscomp.iteratorPrototype=function(a){$jscomp.initSymbolIterator();a={next:a};a[$jscomp.global.Symbol.iterator]=function(){return this};return a};
$jscomp.iteratorFromArray=function(a,b){$jscomp.initSymbolIterator();a instanceof String&&(a+="");var c=0,d={next:function(){if(c<a.length){var e=c++;return{value:b(e,a[e]),done:!1}}d.next=function(){return{done:!0,value:void 0}};return d.next()}};d[Symbol.iterator]=function(){return d};return d};
$jscomp.polyfill=function(a,b,c,d){if(b){c=$jscomp.global;a=a.split(".");for(d=0;d<a.length-1;d++){var e=a[d];e in c||(c[e]={});c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&$jscomp.defineProperty(c,a,{configurable:!0,writable:!0,value:b})}};$jscomp.polyfill("Array.prototype.keys",function(a){return a?a:function(){return $jscomp.iteratorFromArray(this,function(a){return a})}},"es6","es3");$jscomp.owns=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)};
$jscomp.assign="function"==typeof Object.assign?Object.assign:function(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(d)for(var e in d)$jscomp.owns(d,e)&&(a[e]=d[e])}return a};$jscomp.polyfill("Object.assign",function(a){return a||$jscomp.assign},"es6","es3");
$jscomp.polyfill("Array.prototype.fill",function(a){return a?a:function(a,c,d){var b=this.length||0;0>c&&(c=Math.max(0,b+c));if(null==d||d>b)d=b;d=Number(d);0>d&&(d=Math.max(0,b+d));for(c=Number(c||0);c<d;c++)this[c]=a;return this}},"es6","es3");$jscomp.findInternal=function(a,b,c){a instanceof String&&(a=String(a));for(var d=a.length,e=0;e<d;e++){var f=a[e];if(b.call(c,f,e,a))return{i:e,v:f}}return{i:-1,v:void 0}};
$jscomp.polyfill("Array.prototype.find",function(a){return a?a:function(a,c){return $jscomp.findInternal(this,a,c).v}},"es6","es3");$jscomp.polyfill("Object.is",function(a){return a?a:function(a,c){return a===c?0!==a||1/a===1/c:a!==a&&c!==c}},"es6","es3");
$jscomp.polyfill("Array.prototype.includes",function(a){return a?a:function(a,c){var b=this;b instanceof String&&(b=String(b));var e=b.length;c=c||0;for(0>c&&(c=Math.max(c+e,0));c<e;c++){var f=b[c];if(f===a||Object.is(f,a))return!0}return!1}},"es7","es3");
$jscomp.checkStringArgs=function(a,b,c){if(null==a)throw new TypeError("The 'this' value for String.prototype."+c+" must not be null or undefined");if(b instanceof RegExp)throw new TypeError("First argument to String.prototype."+c+" must not be a regular expression");return a+""};$jscomp.polyfill("String.prototype.includes",function(a){return a?a:function(a,c){return-1!==$jscomp.checkStringArgs(this,a,"includes").indexOf(a,c||0)}},"es6","es3");
$jscomp.polyfill("String.prototype.startsWith",function(a){return a?a:function(a,c){var b=$jscomp.checkStringArgs(this,a,"startsWith");a+="";var e=b.length,f=a.length;c=Math.max(0,Math.min(c|0,b.length));for(var g=0;g<f&&c<e;)if(b[c++]!=a[g++])return!1;return g>=f}},"es6","es3");
var AccessibleRange=function(a,b){var c=document.createElement("legend");c.textContent="Access:";Object.keys(AccessibleRange.List).forEach(function(c){var d=b+c,f=document.createElement("input"),g=document.createElement("label");f.setAttribute("id",d);f.setAttribute("type","radio");f.setAttribute("name","access");f.setAttribute("value",c);g.setAttribute("for",d);g.textContent=AccessibleRange.List[c];a.appendChild(f);a.appendChild(g)});a.setAttribute("data-role","controlgroup");a.setAttribute("data-type",
"horizontal");a.setAttribute("data-mini","true");a.appendChild(c);$(a).parents("form").trigger("create")};AccessibleRange.List={0:"Private",1:"Protected",2:"Public"};var ActorEditor=function(){return Actor.call(this)||this};$jscomp.inherits(ActorEditor,Actor);
ActorEditor.prototype.draw=function(a){a.save();Actor.prototype.draw.call(this,a);a.strokeStyle="rgba(255, 255, 255, .6)";if(0==this.regionType)a.beginPath(),a.arc(0,0,this.regionSize/2,0,Math.PI2,!1),a.stroke();else{var b=this.regionSize/2;a.strokeRect(-b,-b,this.regionSize,this.regionSize)}a.restore()};ActorEditor.prototype.save=function(){var a=this;this.actorVisualList.forEach(function(b){return b.actor={id:a.id}});return(new ActorEntity).save(this)};
ActorEditor.create=function(a){return"string"==typeof a?(new ActorEntity).select(a).then(function(a){return ActorEditor.create(a)}):Object.assign(new ActorEditor,a).init()};
var AudioSelectionButton=function(a,b){var c=this;b=void 0===b?"OTHER":b;var d=document.createElement("legend"),e=document.createElement("a"),f=document.createElement("input"),g=document.createElement("div"),h=document.createElement("button"),l=document.createElement("button"),k=document.createElement("button"),m=document.createElement("fieldset"),n=a.toLowerCase();d.textContent=a+":";e.setAttribute("href","#audioChooser");e.setAttribute("data-target",n);e.setAttribute("data-filter",b);e.setAttribute("data-rel",
"popup");e.className="ui-btn ui-mini ui-corner-all ui-shadow ui-btn-icon-left ui-icon-audio";e.textContent="Choose...";f.setAttribute("type","hidden");f.setAttribute("name",n);f.addEventListener("valueChanged",function(){c.resetImage()});h.textContent="W";h.setAttribute("data-icon","audio");h.addEventListener("click",function(a){a.preventDefault();window.open("/audio/webm/?id="+f.value)});l.textContent="A";l.setAttribute("data-icon","audio");l.addEventListener("click",function(a){a.preventDefault();
window.open("/audio/audio/?id="+f.value)});k.textContent="Del";k.setAttribute("data-icon","delete");k.setAttribute("data-theme","b");k.className="ui-btn-icon-notext";k.addEventListener("click",function(a){a.preventDefault();f.value="";c.resetImage()});g.appendChild(h);g.appendChild(l);g.appendChild(k);m.appendChild(d);m.appendChild(e);m.appendChild(f);m.appendChild(g);$(g).controlgroup({type:"horizontal",mini:!0});this.fieldset=m;this.button=e;this.hidden=f;this.controlgroup=g};
AudioSelectionButton.prototype.resetImage=function(){this.hidden.value?($(this.controlgroup).show(),$(this.button).hide()):($(this.controlgroup).hide(),$(this.button).show())};var Customer=function(){};Customer.prototype.check=function(){return $.ajax({type:"post",url:"/customer/check",dataType:"json",data:{}})};Customer.prototype.signIn=function(a,b){return $.ajax({type:"post",url:"/customer/signIn",dataType:"json",data:{userid:a,passwd:b}})};
var FieldMapEditor=function(){var a=FieldMap.call(this)||this;a.brickColor="b";a.col=0;a.colDir=1;a.currentBrick=null;a.scale=1;a.progress=0;return a};$jscomp.inherits(FieldMapEditor,FieldMap);FieldMapEditor.prototype.getImageData=function(){var a=document.createElement("canvas"),b=a.getContext("2d"),c=this._mainVisual.image;a.width=c.width;a.height=c.height;b.drawImage(c,0,0);return b.getImageData(0,0,c.width,c.height)};
FieldMapEditor.prototype.generateBrick=function(a){a=this.getImageData();var b=this.brickSize,c=b/2,d=4*b,e=this.bricks.bricks;c=4*(a.width*c+c);var f=0;console.log("img width:"+a.width+"/height:"+a.height);console.log("bricks width:"+e.width+"/height:"+e.height);for(var g=0;g<e.height;g++){for(var h=0;h<e.width;h++,f+=4,c+=d){for(var l=!1,k=0;4>k;k++)a.data[c+k]&&(l=!0);this.bricks.putBrick(f,l?Bricks.BRICK_TYPE.WALL:0)}c+=a.width*(b-1)*4}console.log("ix:"+f);console.log("sx:"+c)};
FieldMapEditor.prototype.clear=function(){this.bricks.clear(this)};FieldMapEditor.prototype.touch=function(a,b,c){a=this.bricks.getIndex({x:a,y:b});b=this.bricks.bricks.data[a+2];null==this.currentBrick&&(this.currentBrick=b==c?0:c);this.bricks.putBrick(a,this.currentBrick)};FieldMapEditor.prototype.leave=function(){this.currentBrick=null};FieldMapEditor.prototype.setProgress=function(a){FieldMap.prototype.setProgress.call(this,a);this._mainVisual.x=0;this._mainVisual.y=0;this.progress=a};
FieldMapEditor.prototype.drawGuide=function(a){if(this._stage&&this._stage.hasGuide){var b=this._mainVisual.image,c=-this._stage.startPos,d=b.height,e=this._stage.length;a.lineWidth=3;a.strokeStyle="rgba(255, 255, 255, .6)";a.beginPath();a.moveTo(c,-1);a.lineTo(e,-1);a.stroke();a.beginPath();a.moveTo(c,d+1);a.lineTo(e,d+1);a.stroke();c=0;for(a.strokeStyle="rgba(255, 0, 0, .6)";c<=e;)a.beginPath(),a.moveTo(c,0),a.lineTo(c,d),a.stroke(),c+=b.width;c=this._stage.length-Product.Instance.width;a.setLineDash([4,
1]);a.beginPath();a.moveTo(c,0);a.lineTo(c,d);a.stroke()}};FieldMapEditor.prototype.draw=function(a){FieldMap.prototype.draw.call(this,a);a.save();"b"==this.brickColor?(a.strokeStyle="rgba(255, 255, 255, .7)",a.fillStyle="rgba(0, 0, 0, .5)"):"w"==this.brickColor&&(a.strokeStyle="rgba(0, 0, 0, .7)",a.fillStyle="rgba(255, 255, 255, .5)");"-"!=this.brickColor&&this.bricks.draw(a);this.drawGuide(a);a.restore();this.col+=4*this.colDir;if(0>=this.col||255<=this.col)this.colDir*=-1};
FieldMapEditor.prototype.drawForDebug=function(a){var b=this.progress/this.scale;a.save();a.strokeStyle="white";a.strokeText("x:"+this.x+"/"+this.y,b,20);a.restore()};FieldMapEditor.prototype.save=function(){var a=document.createElement("canvas"),b=a.getContext("2d"),c=this.bricks.bricks;a.width=c.width;a.height=c.height;b.putImageData(c,0,0);this.map=a.toDataURL("image/png");return(new MapEntity).save(this)};
FieldMapEditor.create=function(a,b){b=void 0===b?null:b;if("string"==typeof a)return(new MapEntity).select(a).then(function(a){return FieldMapEditor.create(a,b)});var c=Object.assign(new FieldMapEditor,a);return null==b?c.init():Mediaset.create(c.mediasetId).then(function(a){c._mediaset=a.loadVisual();return c._mediaset.checkLoading(b)}).then(function(){return c.init()})};
var ImageSelectionButton=function(a,b){var c=this;b=void 0===b?"OTHER":b;var d=document.createElement("legend"),e=document.createElement("a"),f=document.createElement("input"),g=document.createElement("input"),h=document.createElement("fieldset"),l=a.toLowerCase();d.textContent=a+":";e.setAttribute("href","#imageChooser");e.setAttribute("data-target",l);e.setAttribute("data-filter",b);e.setAttribute("data-rel","popup");e.className="ui-btn ui-mini ui-corner-all ui-shadow ui-btn-icon-left ui-icon-heart";
e.textContent="Choose...";f.setAttribute("type","hidden");f.setAttribute("name",l);f.addEventListener("valueChanged",function(){c.resetImage()});g.setAttribute("type","image");g.addEventListener("click",function(a){a.preventDefault();f.value="";c.resetImage()});h.appendChild(d);h.appendChild(e);h.appendChild(f);h.appendChild(g);this.fieldset=h;this.button=e;this.hidden=f;this.img=g};
ImageSelectionButton.prototype.resetImage=function(){var a=this.hidden.value;a?(this.img.setAttribute("src","/visual/src/"+a),$(this.img).show(),$(this.button).hide()):(this.img.removeAttribute("src"),$(this.img).hide(),$(this.button).show())};var LandformEditor=function(a){return Landform.call(this,a)||this};$jscomp.inherits(LandformEditor,Landform);
LandformEditor.prototype.drawEnemy=function(a,b,c,d){d=void 0===d?!1:d;var e=this.ctx,f=Enemy.LIST[a];e.save();e.fillStyle="rgba(255, 255, 255, 0.5)";e.beginPath();e.arc(b,c,4,0,Math.PI2,!1);e.fill();e.fillText(a,b,c);e.restore();if(!f||!f.instance)return null;a=Product.Instance.stage.fg;var g=a.y,h=f.formation?3:1;f=f.instance;b+=f.hW;c+=f.hH;f.x=b-a.x;f.y=c-g;f.checkInverse();f.x=b;for(f.y=c;h--;)f.draw(e),f.x+=2,f.y+=2;d&&(e.save(),e.translate(f.x,f.y),e.drawImage(this.reverse,-8,-4),e.restore());
return f};
LandformEditor.prototype.drawBrick=function(){if(this.brick){var a=Field.Instance,b=this.stage.fg,c=b.x,d=b.y;b=this.ctx;var e=255<this.col?this.col-256:0,f=255<this.col?255:this.col%256,g=Landform.BRICK_WIDTH-2,h=Math.round(c/Landform.BRICK_WIDTH)*Landform.BRICK_WIDTH,l=h/Landform.BRICK_WIDTH,k=Math.min(l+512/Landform.BRICK_WIDTH,this.bw),m=Math.round(d/Landform.BRICK_WIDTH)*Landform.BRICK_WIDTH/Landform.BRICK_WIDTH,n=this.brick.data;b.save();b.translate(-c,-d);b.strokeStyle="rgba("+e+", "+f+", 255, .4)";
b.fillStyle=b.strokeStyle;for(d=0;d<this.bh;d++){f=m+d;e=f*Landform.BRICK_WIDTH;f=4*(f%this.bh*this.bw+l);for(var t=l,q=h;t<k;t++,q+=Landform.BRICK_WIDTH,f+=4)if(!(0>t)){var p=n[f],r=n[f+1];r&&this.drawEnemy(r,q,e,p&Landform.ATTR.REVERSE);p=n[f+2];255==p?b.fillRect(q,e,g,g):254==p&&(p=q+Landform.BRICK_HALF-1,r=e+Landform.BRICK_HALF-1,b.beginPath(),b.arc(p,r,g/2,0,Math.PI2,!1),b.stroke(),b.strokeRect(q,e,g,g))}}this.width-a.width<=c&&(a=this.width-Landform.BRICK_WIDTH,b.fillStyle="rgba(255, 0, 0, .4)",
b.fillRect(a,0,Landform.BRICK_WIDTH,this.height));b.restore();this.col+=16*this.colDir;if(0>=this.col||Landform.COL_MAX<=this.col)this.colDir*=-1}};
LandformEditor.prototype.drawTarget=function(){if(this.target){var a=Math.round((this.target.x-Landform.BRICK_HALF)/Landform.BRICK_WIDTH)*Landform.BRICK_WIDTH,b=Math.round((this.target.y-Landform.BRICK_HALF)/Landform.BRICK_WIDTH)*Landform.BRICK_WIDTH,c=this.ctx,d=Landform.BRICK_WIDTH,e=parseInt(this.selection);0<e&&(e=this.drawEnemy(e,a,b))&&(d=e.width);c.save();c.fillStyle="rgba(128, 255, 255, .4)";c.fillRect(a,b,d,d);c.restore();this.touchDown(a,b)}};
LandformEditor.prototype.touchDown=function(a,b){if(!this.which)this.ty=this.tx=-1,this.brickVal=null;else if(this.tx!=a||this.ty!=b){var c=parseInt(this.selection);if(0<c){var d=this.getAttr(this.target),e=this.getActor(this.target),f=d&Landform.ATTR.REVERSE;e==c&&f?this.putActor(this.target,0,0):(d=e==c?d|Landform.ATTR.REVERSE:d&~Landform.ATTR.REVERSE,this.putActor(this.target,c,d))}else d=this.getBrick(this.target),c=this.selection.substr(1),null==this.brickVal&&(this.brickVal=0<d?0:255-c),this.putBrick(this.target,
this.brickVal);this.touch=!0;this.tx=a;this.ty=b}};LandformEditor.prototype.putActor=function(a,b,c){c=void 0===c?null:c;null!=c&&this.putBrick(a,c,Landform.BRICK_LAYER.ATTR);this.putBrick(a,b,Landform.BRICK_LAYER.ACTOR)};LandformEditor.prototype.draw=function(){var a=this.ctx;Landform.prototype.draw.call(this);a.save();this.drawBrick();this.drawTarget();a.restore();this.touch&&this.brick&&(this.updateMap(),this.touch=!1)};
LandformEditor.prototype.updateMap=function(){var a=document.getElementById("mapImage");if(a){var b=document.createElement("canvas"),c=b.getContext("2d");b.width=this.brick.width;b.height=this.brick.height;c.putImageData(this.brick,0,0);a.setAttribute("src",b.toDataURL("image/png"))}};LandformEditor.prototype.getImageData=function(){var a=document.createElement("canvas"),b=a.getContext("2d");a.width=this.width;a.height=this.height;b.drawImage(this.img,0,0);return b.getImageData(0,0,this.width,this.height)};
LandformEditor.prototype.getBrickData=function(a){return null!=this.brick?this.brick:a.createImageData(this.width/Landform.BRICK_WIDTH,this.height/Landform.BRICK_WIDTH)};
LandformEditor.prototype.generateBrick=function(a){if(this.img.src&&this.img.complete){var b=this.getImageData(),c=this.width/Landform.BRICK_WIDTH,d=this.height/Landform.BRICK_WIDTH;a=this.getBrickData(a);var e=a.data,f=this.width*Landform.BRICK_HALF+4*Landform.BRICK_HALF,g=0;console.log(this.width+" x "+this.height+" | "+this.width*this.height*4);console.log(c+" x "+d+" | "+e.length);for(var h=0;h<d;h++){for(var l=0;l<c;l++){for(var k=!1,m=0;4>m;m++)b.data[f+m]&&(k=!0);k=k?255:0;e[g+2]=k;e[g+3]=
k;f+=4*Landform.BRICK_WIDTH;g+=4}f+=this.width*(Landform.BRICK_WIDTH-1)*4}console.log("ix:"+g);console.log("sx:"+f);this.brick=a;this.touch=!0}};LandformEditor.prototype.wheel=function(a){var b=this.stage.fg;0>a?(b.y+=Landform.BRICK_WIDTH,this.height<=b.y&&(b.y=0)):(0==b.y&&(b.y=this.height),b.y-=Landform.BRICK_WIDTH)};
var ListviewRow=function(a,b){b=void 0===b?null:b;var c=document.createElement("img"),d=document.createElement("span"),e=document.createElement("p"),f=document.createElement("a"),g=document.createElement("li");d.textContent=a.name;e.textContent=a.description;a.href&&f.setAttribute("href",a.href);null!=b&&(c.setAttribute("src",b),f.appendChild(c));f.appendChild(d);f.appendChild(e);a.count&&(b=document.createElement("span"),b.classList.add("ui-li-count"),b.textContent=a.count,f.appendChild(b));a.aside&&
(b=document.createElement("p"),b.classList.add("ui-li-aside"),b.textContent=a.aside,f.appendChild(b));g.appendChild(f);this.img=c;this.anchor=f;this.li=g},ProductEditor=function(){return Product.call(this)||this};$jscomp.inherits(ProductEditor,Product);ProductEditor.prototype.updateStageSeq=function(a){var b=this;this.stageList=a.map(function(a){var c=b.stageList.find(function(b){return b.id==a.id});c.seq=a.seq;return c})};
ProductEditor.prototype.save=function(){console.log("ProductEditor#save");return(new ProductEntity).save(this)};ProductEditor.create=function(a,b){return Product.load(a,b,ProductEditor)};var ResourceChooser=function(a){this.id="#"+a;this.setupEvents()};
ResourceChooser.prototype.setupEvents=function(){var a=this;document.querySelectorAll('[href="'+this.id+'"]').forEach(function(b){var c=$(b).parents("fieldset")[0];b.addEventListener("click",function(){var d=b.getAttribute("data-target"),e=b.getAttribute("data-filter");d=c.querySelector('[name="'+d+'"]');a.list(d,e)})})};ResourceChooser.prototype.createRow=function(a,b){return new ListviewRow(a,void 0===b?null:b)};
ResourceChooser.prototype.list=function(a,b){var c=this,d=new FormData;d.append("keyword","");d.append("type",b);this.listView=document.querySelector(this.id+" > ul");this.listView.textContent="Loadling...";this.entity.list(d).then(function(b){c.listView.textContent=null;b.forEach(function(b){var d=c.createRow(b);c.listView.appendChild(d.li);d.anchor.addEventListener("click",function(){c.embedId(a,b.id)})});$(c.listView).listview("refresh")})};
ResourceChooser.prototype.embedId=function(a,b){a.value=b;a.dispatchEvent(ResourceChooser.ValueChangedEvent);$(this.id).popup("close")};ResourceChooser.ValueChangedEvent=new Event("valueChanged");var StageEditor=function(){var a=Stage.call(this)||this;a.cursorType=StageEditor.CURSOR_TYPE.NONE;a.pos={x:0,y:0};a._currentScenario=null;return a};$jscomp.inherits(StageEditor,Stage);
StageEditor.prototype.setProgress=function(a){0!=this.fg.speed&&(a=a*this.map.brickSize/this.fg.speed,this.map.setProgress(a),this.progress=a)};StageEditor.prototype.setCursorPos=function(a){this._eventList.forEach(function(a){return a.hasFocus=!1});var b=this._eventList.find(function(b){return"E"==b.target&&b.includes(a)});this.pos=a;b?(b.hasFocus=!0,this._currentScenario=b):this._currentScenario=(b=this._eventList.find(function(b){return"E"!=b.target&&b.isHit(a)}))?b:null};
StageEditor.prototype.removeScenario=function(a){if(a=void 0===a?this._currentScenario:a){var b=a.op,c=a.v,d=a.h;console.log("StageEditor#removeScenario:");console.log(a);this._eventList=this._eventList.filter(function(a){return a.op!=b||a.v!=c||a.h!=d})}};
StageEditor.prototype.addScenario=function(a,b){b=Scenario.create(b,this);var c=this.map.brickSize,d=parseInt(a.x/c);a="E"==b.target?parseInt(a.y/c):0;b.v=d;b.h=a;this.removeScenario(b);this._eventList.push(b);console.log("StageEditor#addScenario:");console.log(b)};StageEditor.prototype.changeRoll=function(a){this.scroll=this.roll=a;this.map._mainVisual.pattern=null};
StageEditor.prototype.drawCursor=function(a){if(this.cursorType!=StageEditor.CURSOR_TYPE.NONE){var b=this.map.brickSize,c=parseInt(this.pos.x/b)*b;if(this.cursorType==StageEditor.CURSOR_TYPE.ACTOR){var d=parseInt(this.pos.y/b)*b;a.fillStyle="rgba(120, 60, 255, .5)";a.fillRect(c,d,b,b)}else if(this.cursorType==StageEditor.CURSOR_TYPE.EVENT){d=this.scroll&Stage.SCROLL.LOOP?0:-this._product.height;var e=a.canvas.height;a.fillStyle="rgba(255, 60, 120, .5)";a.fillRect(c,d,b,e)}}};
StageEditor.prototype.draw=function(a){var b=this.roll==Stage.SCROLL.OFF||this.roll==Stage.SCROLL.ON?Product.Instance.height:0;a.save();a.translate(this.startPos,b);Stage.prototype.draw.call(this,a);this.map.draw(a);this._eventList.forEach(function(b){return b.draw(a)});this._currentScenario&&this._currentScenario.drawBalloon(a,this.pos);this.drawCursor(a);a.restore()};StageEditor.prototype.save=function(){console.log("StageEditor#save");this.scenarioList=this._eventList.concat();return(new StageEntity).save(this)};
StageEditor.prototype.createFieldMap=function(){return FieldMapEditor.create(this.map)};StageEditor.create=function(a,b){return Object.assign(new StageEditor,a,{_product:b}).init()};StageEditor.CURSOR_TYPE={NONE:0,ACTOR:1,EVENT:2,REMOVE:3};var AudioSelector=function(){this.selectorPopup=document.getElementById("audioSelector");this.mediasetId=document.getElementById("mediasetId").value;this.entity=new AudioEntity;this.targetButton=null;this.setupEvents()};
AudioSelector.prototype.setupEvents=function(){var a=this,b=document.querySelectorAll(".audioSelector"),c=document.querySelector("[name=audioType]");b.forEach(function(b){b.addEventListener("click",function(){a.targetButton=b;$(a.selectorPopup).popup("open",{})})});c.addEventListener("change",function(){return a.loadList(c.value)});this.loadList(c.value)};
AudioSelector.prototype.loadList=function(a){var b=this,c=this.selectorPopup.querySelector("ul");a={criteria:{mediaset:{id:this.mediasetId},audioType:a}};c.textContent="Loadling...";this.entity.list(a).then(function(a){c.textContent=null;a.querySelectorAll("li").forEach(function(a){var d=a.querySelector("span").textContent,e=a.getAttribute("data-seq");a.querySelector("a").addEventListener("click",function(){b.targetButton.textContent=d;b.targetButton.setAttribute("data-seq",e);$(b.selectorPopup).popup("close")});
c.appendChild(a)});$(c).listview("refresh")})};var ImageSelector=function(a){this.selectorPopup=document.getElementById("imageSelector");this.mediasetId=a;this.entity=new VisualEntity;this.targetButton=null;this.setupEvents()};
ImageSelector.prototype.setupEvents=function(){var a=this,b=document.querySelectorAll(".imageSelector"),c=document.querySelector("[name=visualType]");b.forEach(function(b){b.addEventListener("click",function(){a.targetButton=b;a.targetButton.removeAttribute("data-seq");$(a.selectorPopup).popup("open",{})})});c.addEventListener("change",function(){return a.loadList(c.value)});this.loadList(c.value)};
ImageSelector.prototype.loadList=function(a){var b=this,c=this.selectorPopup.querySelector("ul");a={criteria:{mediaset:{id:this.mediasetId},visualType:a}};c.textContent="Loadling...";this.entity.list(a).then(function(a){c.textContent=null;a.querySelectorAll("li").forEach(function(a){var d=a.querySelector("span").textContent,e=a.getAttribute("data-seq");a.querySelector("a").addEventListener("click",function(){console.log("visualSeq:"+e);b.targetButton.setAttribute("data-seq",e);b.targetButton.setAttribute("data-name",
d);$(b.selectorPopup).popup("close")});c.appendChild(a)});$(c).listview("refresh")})};var PanelBase=function(a,b){b=void 0===b?null:b;this.panel=document.getElementById(a);this.inputList=this.panel.querySelectorAll("[type=text], [type=number], textarea, select");this.target=b;this.setupEvents()};
PanelBase.prototype.setupEvents=function(){var a=this;this.inputList.forEach(function(b){return b.addEventListener("change",function(){var c=b.value;if("SELECT"==b.tagName){var d=b.querySelector("option:checked").getAttribute("data-value");d&&(c=d)}a.target[b.name]=c})})};PanelBase.prototype.resetInputs=function(){var a=this;this.inputList.forEach(function(b){b.value=a.target[b.name];"SELECT"==b.tagName&&$(b).selectmenu("refresh",!1);b.dispatchEvent(new Event("change"))})};var PotController=function(a){this.init(a)};
PotController.prototype.init=function(a){for(var b=a.parentNode,c=null;b;){if(b.classList&&b.classList.contains("ui-collapsible-content-collapsed")){b.classList.remove("ui-collapsible-content-collapsed");c=b;break}b=b.parentNode}this.setupEvents(a);c&&c.classList.add("ui-collapsible-content-collapsed")};PotController.prototype.setupEvents=function(a){var b=a.parentNode.querySelector("[type=number]");a=a.querySelector(".oval");new PotKnob(b,a.querySelector(".knob"),a.querySelector(".hand"))};
PotController.create=function(){document.querySelectorAll(".potController").forEach(function(a){return new PotController(a)})};var PotKnob=function(a,b,c){var d=b.parentNode,e=d.getBoundingClientRect(),f=b.getBoundingClientRect();this.number=a;this.oval=d;this.hand=c;this.knob=b;this.radius=e.width/2;this.knobRadius=f.width/2;this.setupEvents();this.setDegree(a.value,!0)};
PotKnob.prototype.setupEvents=function(){var a=this;this.number.addEventListener("change",function(){a.setDegree(a.number.value,!0)});$(this.knob).draggable({drag:function(){var b=a.oval.getBoundingClientRect(),c=a.knob.getBoundingClientRect();a.setDegree(Math.atan2(c.top+a.knobRadius-(b.top+a.radius),c.left+a.knobRadius-(b.left+a.radius))/Math.PI*180);a.number.value=a.degree},stop:function(){return a.resetKnob()}})};
PotKnob.prototype.resetKnob=function(){var a=this.degree/180*Math.PI,b=Math.sin(a)*this.radius-this.knobRadius;this.knob.style.left=Math.cos(a)*this.radius+this.radius-this.knobRadius+"px";this.knob.style.top=b+"px"};PotKnob.prototype.setDegree=function(a,b){b=void 0===b?!1:b;this.degree=parseInt(a);this.hand.style.transform="rotate("+this.degree+"deg)";b&&this.resetKnob()};
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
ProductActorPanel.prototype.setupForm=function(a){var b=a.querySelector("span").textContent;a=a.querySelector("a").getAttribute("data-class");var c=this.panel.querySelector('[name="actorName"]'),d=this.panel.querySelector('[name="className"]');c.value=b;d.value=a;d.focus()};ProductActorPanel.prototype.open=function(a){this.li=a;this.setupForm(a)};var StagePanel=function(){this.panel=document.getElementById("stagePanel");this.map=new MapEntity;this.stage=new StageEntity};
StagePanel.prototype.open=function(a){var b=this,c=this.panel.querySelector("ul");c.textContent="Loading...";this.map.list("").then(function(d){c.textContent=null;d.result.forEach(function(d){var e=(new ListviewRow(d,"/img/icon.listview.png")).li,g=e.querySelector("a");c.appendChild(e);g.addEventListener("click",function(){return b.addStage(d,a)})});$(c).listview("refresh")})};
StagePanel.prototype.addStage=function(a,b){var c=this,d=document.getElementById("messagePopup"),e=d.querySelector("p"),f=document.querySelector("input[name=id]"),g=document.getElementById("productStageView").querySelectorAll("li").length;a={product:{id:f.value},map:{id:a.id},seq:g};$.mobile.loading("show",{text:"Save...",textVisible:!0});(new StageEntity).save(a).then(function(a){$.mobile.loading("hide");if(a.ok){if(!b(a.result)){console.log("Already exists!");return}}else e.textContent="Save failed.",
$(d).popup("open",{});$(c.panel).panel("close")})};document.addEventListener("DOMContentLoaded",function(){return new ProductEditorMain});var ProductEditorMain=function(){var a=this,b=document.querySelector("input[name=id]").value,c=document.getElementById("loading");ProductEditor.create(b,function(a,b){return c.innerHTML=a+"/"+b}).then(function(b){a.product=b;c.parentNode.removeChild(c)});this.stagePanel=new StagePanel;this.productActorPage=new ProductActorPage;this.setupEvents();this.setupListView()};
ProductEditorMain.prototype.setupEvents=function(){var a=this,b=document.querySelector('a[href="#stagePanel"]'),c=document.getElementById("editMediasetButton");b.addEventListener("click",function(){a.stagePanel.open(a.addStage)});c.addEventListener("click",function(){var a=document.getElementById("mediaset.id");window.open("/mediaset/edit/"+a.value)});document.getElementById("saveButton").addEventListener("click",function(){return a.saveProduct()})};
ProductEditorMain.prototype.setupListView=function(){var a=this;this.productStageView=document.getElementById("productStageView");this.productStageView.querySelectorAll("li").forEach(function(a){var b=a.querySelector("a:first-child");a=a.querySelector("a:last-child");var d=b.getAttribute("data-id");b.addEventListener("click",function(){return window.open("/stage/edit/"+d)});a.addEventListener("click",function(){})});$(this.productStageView).sortable({handle:".sortable"});this.actorList=document.querySelectorAll(".actorList");
this.actorList.forEach(function(b){$(b).sortable({connectWith:".actorList",items:"li:not(.divider)",stop:function(b,d){console.log(b);console.log(d);a.actorList.forEach(function(b){a.refreshCounter(b)})}})})};ProductEditorMain.prototype.refreshCounter=function(a){var b=a.querySelectorAll("li:not(.divider)");a.previousElementSibling.querySelector(".ui-li-count").textContent=b.length};
ProductEditorMain.prototype.getRec=function(a){var b=a.getAttribute("data-id"),c=a.getAttribute("data-stage");a=a.getAttribute("data-roll");return{id:b,stageId:c,roll:a}};
ProductEditorMain.prototype.addStage=function(a){var b=this,c=a.id,d=new ListviewRow(a,"/img/icon.listview.png"),e=d.li;d=d.anchor;var f=document.createElement("a");console.log(a);d.setAttribute("data-stage",c);d.setAttribute("data-roll",0);d.addEventListener("click",function(){return window.open("/stage/edit/"+c)});f.addEventListener("click",function(){return b.productStageView.removeChild(e)});e.appendChild(f);this.productStageView.appendChild(e);$(this.productStageView).listview("refresh");return!0};
ProductEditorMain.prototype.getLi=function(a){var b=null;this.productStageView.querySelectorAll("li").forEach(function(c){c.querySelector("a").getAttribute("data-stage")==a&&(b=c)});return b};ProductEditorMain.prototype.updateStage=function(a){var b=this.getLi(a.stageId);null!=b&&b.querySelector("a").setAttribute("data-roll",a.roll)};ProductEditorMain.prototype.removeStage=function(a){a=this.getLi(a);this.productStageView.removeChild(a)};
ProductEditorMain.prototype.listStages=function(){var a=this,b=[];this.productStageView.querySelectorAll("li").forEach(function(c,d){c=c.querySelector("a");c=a.getRec(c);c.seq=d;b.push(c)});return b};
ProductEditorMain.prototype.saveProduct=function(){var a=document.getElementById("productForm");new FormData(a);a=this.listStages();this.productActorPage.listActor();this.product.updateStageSeq(a);$.mobile.loading("show",{text:"Save...",textVisible:!0});this.product.save().then(function(a){var b=document.getElementById("messagePopup"),d=b.querySelector("p");$.mobile.loading("hide");d.textContent=a.ok?"Saved.":"Save failed.";$(b).popup("open",{})})};
