@echo off
setlocal enabledelayedexpansion
title PowerShell Repair & Diagnostic Utility

echo =====================================================================
echo           POWERSHELL REPAIR & DIAGNOSTIC UTILITY
echo =====================================================================
echo.

:: 1. Check for Administrative Privileges
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo [!] WARNING: This script is not running as Administrator.
    echo     Please right-click this file and choose "Run as administrator".
    echo.
    pause
    exit /b 1
)

echo [1/5] Checking PowerShell ModuleLogging Registry Misconfiguration...
:: Check if ModuleLogging is set up incorrectly as a string value instead of a key
reg query "HKLM\SOFTWARE\Policies\Microsoft\Windows\PowerShell\ModuleLogging" /v "ModuleNames" >nul 2>&1
if %errorLevel% equ 0 (
    echo     [!] Found invalid ModuleNames string value under ModuleLogging!
    echo     This is a known cause of PSVersionInfo TypeInitializationException crashes.
    echo     Deleting corrupted ModuleLogging policy entry...
    reg delete "HKLM\SOFTWARE\Policies\Microsoft\Windows\PowerShell\ModuleLogging" /v "ModuleNames" /f
    echo     [+] Corrupted ModuleNames value removed.
) else (
    echo     [+] No corrupted ModuleNames string found under HKLM.
)

reg query "HKCU\SOFTWARE\Policies\Microsoft\Windows\PowerShell\ModuleLogging" /v "ModuleNames" >nul 2>&1
if %errorLevel% equ 0 (
    echo     [!] Found invalid ModuleNames in HKCU. Removing...
    reg delete "HKCU\SOFTWARE\Policies\Microsoft\Windows\PowerShell\ModuleLogging" /v "ModuleNames" /f
    echo     [+] Removed from HKCU.
) else (
    echo     [+] No corrupted ModuleNames string found under HKCU.
)
echo.

echo [2/5] Verifying and Restoring Core PowerShell Engine Registry Keys...
:: Ensure HKLM\SOFTWARE\Microsoft\PowerShell\3\PowerShellEngine has ApplicationBase and RuntimeVersion
reg add "HKLM\SOFTWARE\Microsoft\PowerShell\3\PowerShellEngine" /v "ApplicationBase" /t REG_SZ /d "C:\Windows\System32\WindowsPowerShell\v1.0" /f >nul
reg add "HKLM\SOFTWARE\Microsoft\PowerShell\3\PowerShellEngine" /v "RuntimeVersion" /t REG_SZ /d "v4.0.30319" /f >nul
reg add "HKLM\SOFTWARE\Microsoft\PowerShell\3\PowerShellEngine" /v "PSCompatibleVersion" /t REG_SZ /d "1.0, 2.0, 3.0, 4.0, 5.0, 5.1.19041.1" /f >nul
reg add "HKLM\SOFTWARE\Microsoft\PowerShell\3\PowerShellEngine" /v "ConsoleHostAssemblyName" /t REG_SZ /d "Microsoft.PowerShell.ConsoleHost, Version=3.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35, ProcessorArchitecture=msil" /f >nul

:: Also verify version 1 key
reg add "HKLM\SOFTWARE\Microsoft\PowerShell\1\PowerShellEngine" /v "ApplicationBase" /t REG_SZ /d "C:\Windows\System32\WindowsPowerShell\v1.0" /f >nul
reg add "HKLM\SOFTWARE\Microsoft\PowerShell\1\PowerShellEngine" /v "RuntimeVersion" /t REG_SZ /d "v4.0.30319" /f >nul
echo     [+] PowerShell Engine registry values verified and restored.
echo.

echo [3/5] Testing PowerShell Launch with -NoProfile...
powershell.exe -NoProfile -Command "Write-Host 'SUCCESS: Windows PowerShell initialized properly!'" 2>nul
if %errorLevel% equ 0 (
    echo.
    echo =====================================================================
    echo   [SUCCESS] Windows PowerShell is now launching and working!
    echo =====================================================================
    echo.
    pause
    exit /b 0
) else (
    echo     [-] PowerShell still failed to launch. Proceeding to system repair...
)
echo.

echo [4/5] Running System File Checker (SFC) to repair corrupt .NET / Windows files...
echo     This may take 3-5 minutes, please do not close this window...
sfc /scannow
echo.

echo [5/5] Re-testing PowerShell...
powershell.exe -NoProfile -Command "Write-Host 'SUCCESS: Windows PowerShell initialized properly!'" 2>nul
if %errorLevel% equ 0 (
    echo.
    echo =====================================================================
    echo   [SUCCESS] Windows PowerShell is fixed and working properly!
    echo =====================================================================
) else (
    echo.
    echo =====================================================================
    echo   PowerShell is still throwing an initialization error.
    echo   Running DISM component store repair...
    echo =====================================================================
    dism /online /cleanup-image /restorehealth
    echo.
    echo DISM repair finished. Please reboot your computer.
)

echo.
pause

