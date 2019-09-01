@echo off
cd %~dp0
call _ssfw.cmd
call _implementor.cmd

call _compiler.cmd index
call _compiler.cmd detail
call _compiler.cmd repository
call _compiler.cmd edit
call _compiler.cmd play

del *-all.js
pause
