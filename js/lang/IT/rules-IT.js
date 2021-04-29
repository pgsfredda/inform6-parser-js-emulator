rulesXX = `

Art = ((("gli" / "il" / "la" / "lo" / "le" / "i") _+) / "l'")

DiPrep = ((("dello" / "della" / "degli" / "delle" / "del" / "dei" / "di") _+) / "dell'") 
APrep = ((("allo" / "alla" / "agli" / "alle" / "al" / "ai" / "a") _+) / "all'") 
DaPrep = ((("dallo" / "dalla" / "dagli" / "dalle" / "dal" / "dai" / "da") _+) / "dall'") 
InPrep = ((("dentro" / "nello" / "nella" / "negli" / "nelle" / "nel" / "nei" / "in") _+) / "nell'") 
ConPrep = (("col" / "coi" / "con") _+)
SuPrep = ((("sopra" / "sullo" / "sulla" / "sugli" / "sulle" / "sul" / "sui") _+) / "sull'") 

Prep = (DiPrep / APrep / DaPrep / InPrep / SuPrep) / (("tra" / "fra" / "per") _+)

DecimalSep = "."
Conj = (("ed" / "e" / "o") _+)

`;