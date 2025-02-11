param (
    [string]$behav
)

function __init__ {
    try {
        if($behav -eq "run-f") {
            $dirName = "frontend"
            
            # fetch-and-run global-functions.ps1 Contents
                Invoke-Expression (Get-Content "./scripts/global-functions.ps1" -Raw)      
            initPyVenv                              # initialize virtual enviornment
            nav_to_dir $dirName                     # call to function
            req_service_initiate $dirName           # call to function
        } else {
            Write-Host "Acess Denied!"
        }
    } catch {
        Write-Host "$_" -ForegroundColor DarkBlue -BackgroundColor Yellow
    }
}

__init__    #   initialize