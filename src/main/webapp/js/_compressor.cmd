@echo off
set CUR=%~dp0
set JAVA_HOME=C:\Program Files\Java\jdk-10.0.1
set COMP=c:\application\closure-compiler-v20190709.jar
set COMP_OPT=--compilation_level SIMPLE --warning_level DEFAULT --language_out=ES5
set LIBS=lib\*.js lib\entity\*.js lib\page\*.js lib\util\*.js
set PATH=%JAVA_HOME%\bin;%PATH%

cd %CUR%
type %LIBS% index.js > index-all.js 2> nul
java -jar %COMP% %COMP_OPT% --js index-all.js --js_output_file index-min.js

type %LIBS% detail.js > detail-all.js 2> nul
java -jar %COMP% %COMP_OPT% --js detail-all.js --js_output_file detail-min.js

type %LIBS% repository.js > repository-all.js 2> nul
java -jar %COMP% %COMP_OPT% --js repository-all.js --js_output_file repository-min.js

type %LIBS% edit.js > edit-all.js 2> nul
java -jar %COMP% %COMP_OPT% --js edit-all.js --js_output_file edit-min.js

type %LIBS% play.js > play-all.js 2> nul
java -jar %COMP% %COMP_OPT% --js play-all.js --js_output_file play-min.js

del *-all.js
pause
