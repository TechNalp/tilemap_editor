@echo off

echo LANCEMENT tilemapeditorFUN
cd /d "%~dp0"
REM Permet de se mettre dans le répértoire du script lui même

cd ./back

echo INSTALLATION DES DEPENDANCES

call npm install

cd ../tilemapeditor

call npm install


echo BUILD DE LA VERSION

call npm run build

echo SETUP DU SERVEUR
cd ../back
IF NOT EXIST "./db_store" (
    mkdir "./db_store"
)

if NOT %errorlevel% equ 0 (
    echo Impossible de créer le dossier "back/db_store"
    exit /b 1
)

echo LANCEMENT DU SERVEUR

call node server.js