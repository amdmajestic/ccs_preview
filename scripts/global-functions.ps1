$global:filePath = Get-Location

function nav_to_dir {
    # param ($dirURL)
    param ([string]$dirURL)

    $currentDir = gl
    $scriptPath = Join-Path $currentDir $dirURL

    # Check if the directory exists before attempting to change to it
    if (Test-Path -Path $scriptPath -PathType Container) {
        # Write-Host "Changing directory to: $scriptPath"
            Set-Location -Path $scriptPath   # Changes the current directory to $scriptPath
    } else {
        Write-Host "Error: The specified directory does not exist." -ForegroundColor DarkRed -BackgroundColor Blue
    }
}

#  activate python virtual enviornment(venv)
function activate_venv {
    ./ccs_venv/Scripts/Activate
}

function req_service_initiate {
    param (
        [ValidateSet("frontend", "backend")]
        [string]$service_type
    )
    $req_choice = $null

    function make_service_acknowledgement {
        $chosenAck = $null
        
        # Set the color of the prompt using Write-Host
            Write-Host "Do you want to initiate ``$service_type service`` and its files?" -ForegroundColor DarkGray
            Write-Host "For Yes or No, enter (y/n)" -ForegroundColor DarkGray

        # Capture the user input with Read-Host (without color on input)
            $ackChoice = Read-Host

        $ackChoice = $ackChoice.ToLower()
        
        switch ($ackChoice) {
            "y" { 
                $chosenAck = $true
            }
            "yes" { 
                $chosenAck = $true
            }
            "n" { 
                $chosenAck = $false
            }
            "no" { 
                $chosenAck = $false
            }
            default { 
                [System.Media.SystemSounds]::Beep.Play()          # Plays the 'Beep' sound
                Write-Host "Wrong Choice!`n You entered: '$ackChoice',  Try Again... " -ForegroundColor Magenta
                $chosenAck = make_service_acknowledgement
            }
        }

        return $chosenAck
    }


    function ps1_run_command {
    param (
        [ValidateSet("file", "array", "text")]
        [string]$type,          
        [string]$url = $null,
        $context = $null
    )
        if(($type -eq "file") -or ($type -eq "array" )) {
            # Read the content of the file into the variable $contents_arr
            if($type -eq "file") {
                $contents_arr = Get-Content $url
            } else {
                $contents_arr = $context
            }

            $LineNo = 0
            # Iterate over each content in the array $a
            foreach ($content in $contents_arr) {
                # Trim any leading/trailing whitespace (e.g., in case of accidental spaces)
                    $content = $content.Trim()
                
                # Ensure the content isn't empty before proceeding
                    if ($content -ne "") {                        
                        Write-Host "<C# $LineNo>  Starting: $content" -ForegroundColor DarkGreen
                        
                        $defaultForegroundColor = $Host.UI.RawUI.ForegroundColor
                        $defaultBackgroundColor = $Host.UI.RawUI.BackgroundColor
                        $Host.UI.RawUI.ForegroundColor = "Magenta"
                        $Host.UI.RawUI.BackgroundColor = "Green"
                        
                        Write-Host "~~~~~`t~--------------~~~~~"
                        # Start the process to run the npm install command and wait for it to complete
                            Invoke-Expression $content
                        Write-Host "~~~~~`t~--------------~~~~~"
                        
                        $Host.UI.RawUI.ForegroundColor = $defaultForegroundColor
                        $Host.UI.RawUI.BackgroundColor = $defaultBackgroundColor
                        
                        # Output message when installation is finished
                            Write-Host ""
                            Write-Host "Finished: $content" -ForegroundColor DarkCyan
                    } else {
                        Write-Host "<C# $LineNo>  Skipping empty content"    -ForegroundColor DarkMagenta
                    }
                $LineNo++
            }
        } elseif($type -eq "text") {
            Invoke-Expression $context
        }
    }

    function frontend_service {
        $s_ack = make_service_acknowledgement
        if($s_ack) {
            $file_path = "../backend/requirements--frontend.txt"
            ps1_run_command -type "file" -url "$file_path"
        }
    }

    function backend_service {
        $s_ack = make_service_acknowledgement
        if($s_ack) {
            $commands = @(
                "py -m pip install -r requirements.txt",
                "py manage.py createdb_and_makemigrations",
                "py manage.py migrate"
            )
            ps1_run_command -type "array" -context $commands
        }
    }


    if($service_type -eq "frontend") {
        frontend_service         # call to frontend_service function
    } elseif($service_type -eq "backend") {
        backend_service         # call to backend_service function
    }
    #  else {
    #     Write-Host "`tError: Invalid service type. `n`tPlease pass paramerter either frontend or backend." -ForegroundColor Blue -BackgroundColor Yellow
    # }
}
