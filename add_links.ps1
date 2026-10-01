$content = Get-Content -Raw -Encoding UTF8 "index.html"
$oldHtml = '<div class="code-output-area" id="codeSnippetOutput"></div>'
$newHtml = '<div class="code-output-area" id="codeSnippetOutput"></div>
            
            <div style="display: flex; gap: 10px; margin-top: 12px; flex-direction: column;">
              <a href="https://github.com/H4PYs/gogstudio/edit/main/js/media-data.js" target="_blank" rel="noopener" class="btn btn-primary" style="width: 100%; background: #238636; border-color: #2ea043;">
                GitHub: Kodu Dosyaya Yapıştır
              </a>
              <a href="https://github.com/H4PYs/gogstudio/upload/main" target="_blank" rel="noopener" class="btn btn-outline" style="width: 100%;">
                GitHub: Upload Sayfasını Aç
              </a>
            </div>'

$content = $content.Replace($oldHtml, $newHtml)
Set-Content -Value $content -Path "index.html" -Encoding UTF8
