@echo off
set CUR=%~dp0
set COMP=c:\application\closure-compiler-v20190709.jar
set COMP_OPT=--compilation_level SIMPLE --warning_level DEFAULT --language_out=ES5
set SSFW=ssfw-all.js
set IMPL=enemy\*.js capsule\*.js boss\*.js material\*.js
set OUTPUT=../../resources/static/js
set JAVA_HOME=C:\Program Files\Java\jdk-10.0.1
set PATH=%JAVA_HOME%\bin;%PATH%

echo Implementor...
cd %CUR%
type %SSFW% %IMPL% > implementor-all.js 2> nul
java -jar %COMP% %COMP_OPT% --js implementor-all.js --js_output_file %OUTPUT%/implementor-min.js
:pause
