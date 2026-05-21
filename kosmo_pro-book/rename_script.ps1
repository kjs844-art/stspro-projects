$dir = "c:\Users\USER\Documents\workspace-spring-tools-for-eclipse-5.0.1.RELEASE\kosmo_pro-book\src\main"
$files = Get-ChildItem -Path $dir -File -Recurse -Include *.java,*.jsp,*.xml

$utf8NoBom = New-Object System.Text.UTF8Encoding $false

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName)
    $newContent = $content
    
    $newContent = $newContent -replace "Step4_BookMapper\.xml", "Step6_BookMapper.xml"
    $newContent = $newContent -replace "Step4_BookMapper", "Step5_BookMapper"
    
    $newContent = $newContent -replace "M_Step4_MemberMapper\.xml", "M_Step6_MemberMapper.xml"
    $newContent = $newContent -replace "M_Step4_MemberMapper", "M_Step5_MemberMapper"
    
    $newContent = $newContent -replace "Step3_BookServiceImpl", "Step4_BookServiceImpl"
    $newContent = $newContent -replace "M_Step3_MemberServiceImpl", "M_Step4_MemberServiceImpl"
    
    $newContent = $newContent -replace "Step5_PageDTO", "Step7_PageDTO"
    
    if ($content -ne $newContent) {
        [System.IO.File]::WriteAllText($file.FullName, $newContent, $utf8NoBom)
        Write-Host "Updated $($file.FullName)"
    }
}

Rename-Item -Path "$dir\java\com\joe\book\service\Step3_BookServiceImpl.java" -NewName "Step4_BookServiceImpl.java" -ErrorAction SilentlyContinue
Rename-Item -Path "$dir\java\com\joe\book\mapper\Step4_BookMapper.java" -NewName "Step5_BookMapper.java" -ErrorAction SilentlyContinue
Rename-Item -Path "$dir\resources\mapper\Step4_BookMapper.xml" -NewName "Step6_BookMapper.xml" -ErrorAction SilentlyContinue
Rename-Item -Path "$dir\java\com\joe\book\model\Step5_PageDTO.java" -NewName "Step7_PageDTO.java" -ErrorAction SilentlyContinue

Rename-Item -Path "$dir\java\com\joe\book\service\M_Step3_MemberServiceImpl.java" -NewName "M_Step4_MemberServiceImpl.java" -ErrorAction SilentlyContinue
Rename-Item -Path "$dir\java\com\joe\book\mapper\M_Step4_MemberMapper.java" -NewName "M_Step5_MemberMapper.java" -ErrorAction SilentlyContinue
Rename-Item -Path "$dir\resources\mapper\M_Step4_MemberMapper.xml" -NewName "M_Step6_MemberMapper.xml" -ErrorAction SilentlyContinue

Write-Host "Done!"