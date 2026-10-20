$root = $PSScriptRoot
$prefix = "http://127.0.0.1:4173/"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
$listener.Start()
Write-Output "Serving HTTP on $prefix"

$mimes = @{
  ".html" = "text/html; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".js"   = "text/javascript; charset=utf-8"
  ".svg"  = "image/svg+xml"
  ".png"  = "image/png"
  ".jpg"  = "image/jpeg"
  ".ico"  = "image/x-icon"
}

while ($listener.IsListening) {
  $context = $listener.GetContext()
  $path = [Uri]::UnescapeDataString($context.Request.Url.LocalPath)
  if ($path -eq "/") { $path = "/index.html" }

  $safe = $path.TrimStart("/").Replace("/", [IO.Path]::DirectorySeparatorChar)
  $file = Join-Path $root $safe
  $fullRoot = (Resolve-Path $root).Path
  $fullFile = [IO.Path]::GetFullPath($file)

  if (-not $fullFile.StartsWith($fullRoot)) {
    $context.Response.StatusCode = 403
    $context.Response.Close()
    continue
  }

  if (Test-Path -LiteralPath $fullFile -PathType Leaf) {
    $bytes = [IO.File]::ReadAllBytes($fullFile)
    $ext = [IO.Path]::GetExtension($fullFile).ToLowerInvariant()
    $context.Response.ContentType = $(if ($mimes.ContainsKey($ext)) { $mimes[$ext] } else { "application/octet-stream" })
    $context.Response.ContentLength64 = $bytes.Length
    $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  } else {
    $context.Response.StatusCode = 404
    $msg = [Text.Encoding]::UTF8.GetBytes("Not found")
    $context.Response.OutputStream.Write($msg, 0, $msg.Length)
  }
  $context.Response.Close()
}
