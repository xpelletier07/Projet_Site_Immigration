$ErrorActionPreference='Stop'
$base='http://localhost:3000'

function Api([string]$Method,[string]$Path,[object]$Body=$null,[string]$Token=''){
  $h=@{}
  if($Token){$h.Authorization="Bearer $Token"}
  try {
    if($Body -ne $null){
      $json=$Body|ConvertTo-Json -Depth 10
      $r=Invoke-WebRequest -UseBasicParsing -Uri ($base+$Path) -Method $Method -Headers $h -ContentType 'application/json' -Body $json
    } else {
      $r=Invoke-WebRequest -UseBasicParsing -Uri ($base+$Path) -Method $Method -Headers $h
    }
    $d=$null
    if($r.Content){ try{$d=$r.Content|ConvertFrom-Json}catch{$d=$r.Content} }
    [pscustomobject]@{status=[int]$r.StatusCode;data=$d}
  } catch {
    $resp=$_.Exception.Response
    if($resp){
      $status=[int]$resp.StatusCode
      $sr=New-Object IO.StreamReader($resp.GetResponseStream())
      $txt=$sr.ReadToEnd()
      $d=try{$txt|ConvertFrom-Json}catch{$txt}
      [pscustomobject]@{status=$status;data=$d}
    } else { throw }
  }
}

function Code([string]$url,[string]$token){
  try{
    Invoke-WebRequest -UseBasicParsing -Uri $url -Headers @{Authorization="Bearer $token"} -Method Get | Out-Null
    200
  } catch {
    [int]$_.Exception.Response.StatusCode
  }
}

$results=New-Object System.Collections.Generic.List[Object]
function T([string]$n,[bool]$ok,[int]$s){ $results.Add([pscustomobject]@{test=$n;ok=$ok;status=$s})|Out-Null }

$stamp=[int][double]::Parse((Get-Date -UFormat %s))
$c1Mail="full.client1.$stamp@test.local"
$c2Mail="full.client2.$stamp@test.local"
$uMail="full.user.$stamp@test.local"

$adm=Api POST '/auth/login' @{courriel='admin@cmaisonneuve.qc.ca';MDP='password'}
$adminToken=$adm.data.token
T 'Admin login' ($adm.status -eq 200 -and [bool]$adminToken) $adm.status

$mk1=Api POST '/auth/create/Client' @{nom='Full';prenom='Client1';courriel=$c1Mail;telephone='5551001000';MDP='Pass123!'}
$c1Id=$mk1.data.id_client
T 'Create client1' ($mk1.status -eq 201) $mk1.status

$mk2=Api POST '/auth/create/Client' @{nom='Full';prenom='Client2';courriel=$c2Mail;telephone='5552002000';MDP='Pass123!'}
$c2Id=$mk2.data.id_client
T 'Create client2' ($mk2.status -eq 201) $mk2.status

$mkU=Api POST '/auth/create/Utilisateur' @{nom='Full';prenom='User';courriel=$uMail;telephone='5553003000';MDP='Pass123!'} $adminToken
$uId=$mkU.data.id_utilisateur
T 'Create utilisateur by admin' ($mkU.status -eq 201) $mkU.status

$badMkU=Api POST '/auth/create/Utilisateur' @{nom='X';prenom='Y';courriel="x.$stamp@test.local";telephone='555';MDP='Pass123!'} ''
T 'Create utilisateur without token forbidden' ($badMkU.status -eq 401) $badMkU.status

$c1Login=Api POST '/auth/login' @{courriel=$c1Mail;MDP='Pass123!'}
$c1Token=$c1Login.data.token
T 'Client1 login' ($c1Login.status -eq 200) $c1Login.status

$uLogin=Api POST '/auth/login' @{courriel=$uMail;MDP='Pass123!'}
$uToken=$uLogin.data.token
T 'Utilisateur login' ($uLogin.status -eq 200) $uLogin.status

$listAdmins=Api GET '/administrateurs' $null $adminToken
T 'Admin list admins' ($listAdmins.status -eq 200) $listAdmins.status

$forbidAdmins=Api GET '/administrateurs' $null $c1Token
T 'Client forbidden admins list' ($forbidAdmins.status -eq 403) $forbidAdmins.status

$listClientsEmp=Api GET '/clients' $null $uToken
T 'Employe list clients' ($listClientsEmp.status -eq 200) $listClientsEmp.status

$forbidClients=Api GET '/clients' $null $c1Token
T 'Client forbidden list clients' ($forbidClients.status -eq 403) $forbidClients.status

$selfProfile=Api GET ("/clients/{0}" -f $c1Id) $null $c1Token
T 'Client read own profile' ($selfProfile.status -eq 200) $selfProfile.status

$otherProfile=Api GET ("/clients/{0}" -f $c2Id) $null $c1Token
T 'Client blocked other profile' ($otherProfile.status -eq 403) $otherProfile.status

$updSelf=Api PUT ("/clients/update/{0}" -f $c1Id) @{nom='FullUpdated';prenom='Client1';courriel=$c1Mail;telephone='5551009999'} $c1Token
T 'Client update own profile' ($updSelf.status -eq 200) $updSelf.status

$updOther=Api PUT ("/clients/update/{0}" -f $c2Id) @{nom='Hack';prenom='No';courriel=$c2Mail;telephone='0'} $c1Token
T 'Client blocked update other profile' ($updOther.status -eq 403) $updOther.status

$d1=Api POST '/dossiers/create' @{id_client=$c1Id} $c1Token
$d1Id=$d1.data.id_dossier
T 'Create dossier1' ($d1.status -eq 201) $d1.status

$d2=Api POST '/dossiers/create' @{id_client=$c1Id} $c1Token
$d2Id=$d2.data.id_dossier
T 'Create dossier2' ($d2.status -eq 201) $d2.status

$listD=Api GET '/dossiers' $null $uToken
T 'Employe list dossiers' ($listD.status -eq 200) $listD.status

$getDByClient=Api GET ("/dossiers/client/{0}" -f $c1Id) $null $c1Token
T 'Client list own dossiers' ($getDByClient.status -eq 200) $getDByClient.status

$getD1=Api GET ("/dossiers/{0}" -f $d1Id) $null $c1Token
T 'Client read own dossier by id' ($getD1.status -eq 200) $getD1.status

$dem=Api POST '/type-demandes' @{id_dossier=$d1Id;Type_Demande='Permis travail';Description='Full test';Statut='En attente'} $c1Token
$demId=$dem.data.id_demande
T 'Create demande' ($dem.status -eq 201) $dem.status

$demGet=Api GET ("/type-demandes/{0}" -f $demId) $null $c1Token
T 'Get demande by id' ($demGet.status -eq 200) $demGet.status

$demUpd=Api PUT ("/type-demandes/update/{0}" -f $demId) @{Type_Demande='Permis travail';Description='Assigned';Statut='En traitement';id_utilisateur=$uId} $uToken
T 'Employe update demande' ($demUpd.status -eq 200) $demUpd.status

$demList=Api GET ("/type-demandes/dossier/{0}" -f $d1Id) $null $c1Token
T 'Client list demandes by dossier' ($demList.status -eq 200) $demList.status

$noteCreate=Api POST '/notes' @{id_dossier=$d1Id;note='Note full'} $uToken
$noteId=$noteCreate.data.id_note
T 'Create note by employe' ($noteCreate.status -eq 201) $noteCreate.status

$noteList=Api GET ("/notes/dossier/{0}" -f $d1Id) $null $uToken
T 'List notes by dossier' ($noteList.status -eq 200) $noteList.status

$noteGet=Api GET ("/notes/{0}" -f $noteId) $null $uToken
T 'Get note by id' ($noteGet.status -eq 200) $noteGet.status

$noteUpd=Api PUT ("/notes/update/{0}" -f $noteId) @{note='Note edited'} $uToken
T 'Update note' ($noteUpd.status -eq 200) $noteUpd.status

$noteForbid=Api GET ("/notes/{0}" -f $noteId) $null $c1Token
T 'Client forbidden note access' ($noteForbid.status -eq 403) $noteForbid.status

$factCreate=Api POST '/factures' @{id_dossier=$d1Id;description='Facture full';montant=10;date_emission='2026-05-30';date_echeance='2026-06-30';statut='A payer'} $uToken
$factId=$factCreate.data.id_facture
T 'Create facture' ($factCreate.status -eq 201) $factCreate.status

$factGet=Api GET ("/factures/{0}" -f $factId) $null $c1Token
T 'Client get facture by id' ($factGet.status -eq 200) $factGet.status

$factUpd=Api PUT ("/factures/update/{0}" -f $factId) @{description='Facture edited';montant=11;date_emission='2026-05-30';date_echeance='2026-07-01';statut='En retard'} $uToken
T 'Update facture' ($factUpd.status -eq 200) $factUpd.status

$tmp=Join-Path $env:TEMP "full_doc_$stamp.txt"
Set-Content -Path $tmp -Value 'full-doc' -NoNewline
$uploadCode=& curl.exe -s -o NUL -w "%{http_code}" -X POST "$base/documents" -H "Authorization: Bearer $c1Token" -F "id_dossier=$d1Id" -F "file=@$tmp;type=text/plain"
T 'Upload document' (([int]$uploadCode)-eq 201) ([int]$uploadCode)

$docs=Api GET ("/documents/dossier/{0}" -f $d1Id) $null $c1Token
$docId=if($docs.data -is [array]){$docs.data[-1].id_document}else{$docs.data.id_document}
T 'List documents' ($docs.status -eq 200 -and [bool]$docId) $docs.status

$docInfo=Api GET ("/documents/{0}/info" -f $docId) $null $c1Token
T 'Get document info' ($docInfo.status -eq 200) $docInfo.status

$dl=Code "$base/documents/$docId/telecharger" $c1Token
T 'Client download document' ($dl -eq 200) $dl

$docDel=Api DELETE ("/documents/delete/{0}" -f $docId) $null $uToken
T 'Delete document by employe' ($docDel.status -eq 200) $docDel.status

$noteDel=Api DELETE ("/notes/delete/{0}" -f $noteId) $null $uToken
T 'Delete note' ($noteDel.status -eq 200) $noteDel.status

$factDel=Api DELETE ("/factures/delete/{0}" -f $factId) $null $uToken
T 'Delete facture' ($factDel.status -eq 200) $factDel.status

$demDel=Api DELETE ("/type-demandes/delete/{0}" -f $demId) $null $uToken
T 'Delete demande' ($demDel.status -eq 200) $demDel.status

$dossierDel=Api DELETE ("/dossiers/delete/{0}" -f $d2Id) $null $uToken
T 'Delete dossier2 by employe' ($dossierDel.status -eq 200) $dossierDel.status

$usersAssign=Api GET '/utilisateurs/assignables' $null $uToken
T 'List assignables employe' ($usersAssign.status -eq 200) $usersAssign.status

$usersAdmin=Api GET '/utilisateurs' $null $adminToken
T 'Admin list utilisateurs' ($usersAdmin.status -eq 200) $usersAdmin.status

$usersForbid=Api GET '/utilisateurs' $null $uToken
T 'Employe forbidden list utilisateurs admin-only' ($usersForbid.status -eq 403) $usersForbid.status

$updU=Api PUT ("/utilisateurs/update/{0}" -f $uId) @{nom='Full';prenom='UserUpdated';courriel=$uMail;telephone='5553333333'} $adminToken
T 'Admin update utilisateur' ($updU.status -eq 200) $updU.status

$summary=[pscustomobject]@{
  total=$results.Count
  passed=($results|Where-Object ok).Count
  failed=($results|Where-Object { -not $_.ok }).Count
}

[pscustomobject]@{
  summary=$summary
  ids=[pscustomobject]@{client1=$c1Id;client2=$c2Id;utilisateur=$uId;dossier1=$d1Id;dossier2=$d2Id}
  results=$results
} | ConvertTo-Json -Depth 7 -Compress
