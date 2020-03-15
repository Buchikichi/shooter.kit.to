@echo off
cd %~dp0
call _ssfw.cmd
call _implementor.cmd

call _compiler.cmd editActor
call _compiler.cmd editMap
call _compiler.cmd editProduct
call _compiler.cmd editStage
call _compiler.cmd index
call _compiler.cmd play
call _compiler.cmd repository

del *-all.js
pause
