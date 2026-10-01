$c = Get-Content -Raw -Encoding UTF8 "index.html"
$c = $c -replace 'GitHub: Kodu Dosyaya.*', 'GitHub: Kodu Dosyaya Yapıştır'
$c = $c -replace 'GitHub: Upload Sayfas.*', 'GitHub: Upload Sayfasını Aç'
Set-Content -Value $c -Path "index.html" -Encoding UTF8
