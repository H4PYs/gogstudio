$content = Get-Content -Raw -Encoding UTF8 "index.html"
$content = $content.Replace('id="openQuickAddBtn"', 'id="openQuickAddBtn" class="admin-only"')
$content = $content.Replace('id="mobileDrawerAddBtn"', 'id="mobileDrawerAddBtn" class="admin-only"')
$content = $content.Replace('id="bNavAdd"', 'id="bNavAdd" class="admin-only"')
Set-Content -Value $content -Path "index.html" -Encoding UTF8
