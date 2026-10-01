$c = Get-Content -Raw -Encoding UTF8 "index.html"
$c = $c -replace '(?s)GitHub: Kodu Dosyaya.*?(?=\s*</a>)', 'GitHub: Kodu Dosyaya Yap&#305;&#351;t&#305;r'
$c = $c -replace '(?s)GitHub: Upload Sayfas.*?(?=\s*</a>)', 'GitHub: Upload Sayfas&#305;n&#305; A&ccedil;'
Set-Content -Value $c -Path "index.html" -Encoding UTF8
