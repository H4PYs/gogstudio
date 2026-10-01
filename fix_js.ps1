$content = Get-Content -Raw -Encoding UTF8 "js\app.js"
$adminCode = @"
  // Admin Mode (Gizli Butonlar İçin)
  if (window.location.search.includes("admin=1")) {
    localStorage.setItem("gog_admin", "true");
  } else if (window.location.search.includes("admin=0")) {
    localStorage.removeItem("gog_admin");
  }
  if (localStorage.getItem("gog_admin") === "true") {
    document.body.classList.add("admin-mode");
  }

"@

$content = $content.Replace('document.addEventListener("DOMContentLoaded", () => {', 'document.addEventListener("DOMContentLoaded", () => {' + "`r`n" + $adminCode)
Set-Content -Value $content -Path "js\app.js" -Encoding UTF8
