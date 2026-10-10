$ErrorActionPreference = 'Stop'
$mailbox = Read-Host 'Hostinger mailbox username (sales@prohealthdigitalllc.com)'
if ($mailbox -ne 'sales@prohealthdigitalllc.com') { throw 'Use the sales@prohealthdigitalllc.com mailbox.' }
$securePassword = Read-Host 'Mailbox password (hidden)' -AsSecureString
$pointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePassword)
try {
    $password = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($pointer)
    if ([string]::IsNullOrWhiteSpace($password)) { throw 'Password cannot be empty.' }
    $encodedPassword = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($password))
    $configuration = "SMTP_HOST=smtp.hostinger.com`nSMTP_PORT=465`nSMTP_USER=$mailbox`nSMTP_PASS_B64=$encodedPassword`nSMTP_FROM=sales@prohealthdigitalllc.com`n"
    $encodedConfiguration = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($configuration))
    $encodedConfiguration | & ssh.exe -o BatchMode=yes vps 'umask 077; base64 -d > /opt/prohealthdigitalllc/mail.env; chmod 600 /opt/prohealthdigitalllc/mail.env'
    if ($LASTEXITCODE -ne 0) { throw 'SSH configuration failed.' }
    Write-Host 'Private mail configuration saved on the VPS. Tell Codex it is ready for verification.'
} finally {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($pointer)
    $password = $null; $encodedPassword = $null; $configuration = $null; $encodedConfiguration = $null
}
