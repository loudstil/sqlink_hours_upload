Sub CreateFileToUpload()

Dim Rng As Range
Dim PathName As String
Dim Target As Worksheet

'getting the path for saving the file
PathName = Application.ActiveWorkbook.Path


Set Rng = Range("AH17:AP17", Range("AP17").End(xlDown))

Rng.Select

'creating a new worksheet
Set Target = Worksheets.Add

Rng.Copy

Target.Range("A1").PasteSpecial

Set Rng = Target.Range("I1", Range("I1").End(xlDown))

Set Rng = Range(Rng, "A1")


Application.CutCopyMode = False
Rng.Select
Rng.UnMerge
Columns("E:G").Delete Shift:=xlToLeft
Columns("B:C").Delete Shift:=xlToLeft

ActiveWorkbook.SaveAs Filename:=PathName & "\SQLink" & Replace(Date$, "-", "") & ".csv", FileFormat:=xlCSV, CreateBackup:=False




End Sub
