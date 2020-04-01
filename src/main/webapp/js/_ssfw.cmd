@echo off
set CUR=%~dp0
set COMP=c:\application\closure-compiler-v20190709.jar
set COMP_OPT=--compilation_level SIMPLE --warning_level DEFAULT --language_out=ES5
set SSFW=ssfw\entity\*.js ssfw\*.js
set OUTPUT=../../resources/static/js
set JAVA_HOME=C:\Program Files\Java\jdk-10.0.1
set PATH=%JAVA_HOME%\bin;%PATH%

echo SSFW...
cd %CUR%
type %SSFW% > ssfw-all.js 2> nul
java -jar %COMP% %COMP_OPT% --js ssfw-all.js --js_output_file ssfw-gen-all.js
type GeneratorFunction.js ssfw-gen-all.js > %OUTPUT%/ssfw-min.js 2> nul
:pause
