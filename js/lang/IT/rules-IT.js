rulesXX = `

Art = ((("gli" / "il" / "la" / "lo" / "le" / "i") _+) / "l'")

DiPrep = _* ((("dello" / "della" / "degli" / "delle" / "del" / "dei" / "di") _+) / "dell'") 
APrep = _* ((("allo" / "alla" / "agli" / "alle" / "al" / "ai" / "a") _+) / "all'") 
DaPrep = _* ((("dallo" / "dalla" / "dagli" / "dalle" / "dal" / "dai" / "da") _+) / "dall'") 
InPrep = _* ((("dentro" / "nello" / "nella" / "negli" / "nelle" / "nel" / "nei" / "in") _+) / "nell'") 
ConPrep = _* (("col" / "coi" / "con") _+)
SuPrep = _* ((("sopra" / "sullo" / "sulla" / "sugli" / "sulle" / "sul" / "sui") _+) / "sull'") 

Prep = _* (DiPrep / APrep / DaPrep / InPrep / SuPrep) / (("tra" / "fra" / "per") _+)

DecimalSep = "."
Conj = (("ed" / "e" / "o") _+)

`;