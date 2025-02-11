param (
    [string]$behav
)

function ensureContentDirs {
    $coverContainerDir = "content"

    $requiredDirs = @(
        ($coverContainerDir+"/media"),
        ($coverContainerDir+"/static")
    )

    Write-Host "Ensuring content directories:"
    foreach ($dir in $requiredDirs) {
        if (-not (Test-Path -Path $dir -PathType Container)) {
            New-Item -Path $dir -ItemType Directory
        }
    }
}

function __init__ {
    try {
        if($behav -eq "run-b") {
            $dirName = "backend"
            
            # fetch-and-run global-functions.ps1 Contents
                Invoke-Expression (Get-Content "./scripts/global-functions.ps1" -Raw)      
            initPyVenv                              # initialize virtual enviornment
            nav_to_dir $dirName                     # call to function
            ensureContentDirs                       # make django media and static directories if not exist
            req_service_initiate $dirName           # call to function
        } else {
            Write-Host "Acess Denied!"
        }
    } catch {
        Write-Host "$_" -ForegroundColor DarkBlue -BackgroundColor Yellow
    }
}

__init__    #   initialize