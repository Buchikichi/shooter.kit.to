@echo off
set CUR=%~dp0
set COMP=c:\applications\closure-compiler-v20170423.jar
set COMP_OPT=--compilation_level SIMPLE --warning_level DEFAULT --language_out=ES5
set LIBS=entity\*.js lib\*.js lib\util\*.js

cd %CUR%
type %LIBS% index.js > index-all.js 2> nul
java -jar %COMP% %COMP_OPT% --js index-all.js --js_output_file index-min.js

type %LIBS% detail.js > detail-all.js 2> nul
java -jar %COMP% %COMP_OPT% --js detail-all.js --js_output_file detail-min.js

type %LIBS% repository.js > repository-all.js 2> nul
java -jar %COMP% %COMP_OPT% --js repository-all.js --js_output_file repository-min.js

del *-all.js
pause
