@echo off
set CUR=%~dp0
set COMP=c:\application\closure-compiler-v20170626.jar
set COMP_OPT=--compilation_level SIMPLE --warning_level DEFAULT --language_out=ES5
set SSFW=ssfw-all.js
set IMPL=lib\entity\*.js enemy\*.js capsule\*.js boss\*.js material\*.js implementor.js

cd %CUR%
type %SSFW% %IMPL% > implementor-all.js 2> nul
java -jar %COMP% %COMP_OPT% --js implementor-all.js --js_output_file implementor-min.js
pause
