# Script to open file and run its contents
    # Invoke-Expression (Get-Content "./scripts/b.ps1" -Raw)
    # iex (gc "./scripts/_frontend_service.ps1" -Raw)                       # ScriptPath
    # iex (gc "./scripts/_frontend_service.ps1" -Raw) -ArgumentList $arg    # ScriptPath-WITH-ARGUMENT
    # _backend_service
    <#
        # RUN-SERVICE
            # iex (gc ./scripts/init-services.ps1 -Raw)
            # iex (gc "./scripts/init-services.ps1" -Raw)
    #>


$global:filePath = Get-Location
$global:BACKEND_SERVICE_CODE = "<#Backend#>"
$global:FRONTEND_SERVICE_CODE = "<#Frontend#>"
$global:hasRun = $false

function get_required_service {
    if(-not $global:hasRun) {
        $global:hasRun = $true
        
        [bool]$valid = $false
        while(-not $valid) {
            $serviceInput = Read-Host "`a Enter:`t 'b'(backend) or 'f'(frontend)"
            $serviceInput = $serviceInput.ToLower()

            switch ($serviceInput) {
                "b" { 
                    $valid = $true
                    return $global:BACKEND_SERVICE_CODE
                }
                "backend" { 
                    $valid = $true
                    return $global:BACKEND_SERVICE_CODE
                }
                "f" { 
                    $valid = $true
                    return $global:FRONTEND_SERVICE_CODE
                }
                "frontend" { 
                    $valid = $true
                    return $global:FRONTEND_SERVICE_CODE
                }
                default { 
                    [System.Media.SystemSounds]::Beep.Play()      # Plays the 'Beep' sound
                    Write-Host "Wrong Argument!`n You entered: '$serviceInput',  Try Again... " -ForegroundColor Red
                }
            }
        }
    }
    
    return $null
}

function Set_EP_RS_Prc {
    Set-ExecutionPolicy RemoteSigned -Scope Process
}

#  deactivate python virtual enviornment(venv)
function dv {
    deactivate
}

function djrb {
    py manage.py runserver
}

function djrf {
    npm run dev
}

function __init_start__ {
    $service_code = get_required_service # call to function
    
    if(
        $service_code                    # call to function
    ) {
        Set_EP_RS_Prc               # call to function
        if ($service_code -eq $global:FRONTEND_SERVICE_CODE) {
            $Host.UI.RawUI.WindowTitle = "CCS Frontend Terminal"
            & "$global:filePath/scripts/_frontend_service" -behav "run-f"       # run _frontend_service
        } elseif ($service_code -eq $global:BACKEND_SERVICE_CODE) {
            $Host.UI.RawUI.WindowTitle = "CCS Backend Terminal"
            & "$global:filePath//scripts/_backend_service" -behav "run-b"       # run _backend_service
        }
    }
}

__init_start__    #   initialize