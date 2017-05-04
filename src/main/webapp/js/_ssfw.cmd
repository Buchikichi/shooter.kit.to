@echo off
set CUR=%~dp0
set COMP=c:\applications\closure-compiler-v20170423.jar
set COMP_OPT=--compilation_level SIMPLE --warning_level DEFAULT --language_out=ES5
set SSFW=ssfw\*.js

cd %CUR%
type %SSFW% > ssfw-all.js 2> nul
java -jar %COMP% %COMP_OPT% --js ssfw-all.js --js_output_file ssfw-min.js
pause
