var rulesBase = String.raw `

start = Rules

/*
 * INFORM'S TOKENS LIKE RULES
 */    
Number = num:(Float / Integer) { return _number(num) }

Actor = act:(Noun "," _* ) { return act[0] }

Noun = noun:Obj { return _noun(noun) }

Held = held:Obj { return _held(held) }
    
Creature = creature:Obj { return _creature(creature) }
    
Multi = multi:List { return _multi(multi) }

MultiHeld = mh:List { return _multiHeld(mh) }
    
MultiExcept = me:List { return _multiExcept(me) }
    
MultiInside = mi:List { return _multiInside(mi) }

Special = sp:(Cit / Topic / Number) { return _special(sp) }

/*
 * GENERAL RULES
 */
Punctuation = [,;.:!?]

Blanks = [ \t\n\r']

Word = chars: [a-zA-Zàáäèéëìíïòóöùúü\-\']+ { return chars.join("") }
    
Cit = ["] cit:( Punctuation / Word / Integer / Blanks )* ["] { return cit.join("") }

Float = float:(Integer DecimalSep Integer) { return parseFloat(float.join("")) }

Integer = digits: [0-9]+ { return parseInt(digits.join("")) }

_ "whitespace" = Blanks+

Token = _* t:(!(Prep) w:Word Punctuation? ! {return _inlineSkip(w)} { return w }) _* { return t }

Topic = topic:(Token+ / Cit) { return _topic(topic.join(" ")) }

Skip = Conj / ("," _*) / Art

Obj = _* (Skip)* o:(el:(!(Prep/Art/Conj) w:(Word / Cit) ! {return _inlineSkip(w)}) _* { return Array.isArray(el)?el.join(""): el })+ { return o.join(" ")}

List = Obj+

`;


// ORIGINAL: Skip = (Prep/Art/Conj/("," _*))