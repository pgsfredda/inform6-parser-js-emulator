verbs = [
    /*
     * META VERBS - GENERAL GROUP
     */
    {
        meta: true,
        words: ['score', 'punteggio'],
        patterns: [
            { tokens: ['"completo" / "pieno"'], action: 'FullScore' },
            { action: 'Score' },
        ]
    },
    {
        meta: true,
        words: ['fullscore', 'full', 'punti'],
        patterns: [
            { tokens: ['"score"'], action: 'FullScore' },
            { action: 'FullScore' },

        ]
    },
    {
        meta: true,
        words: ['q', 'quit', 'die', 'uscire', 'fine', 'basta'],
        patterns: [
            { action: 'Quit' },
        ]
    },
    {
        meta: true,
        words: ['restore', 'carica', 'caricare'],
        patterns: [
            { tokens: ['"partita" / "gioco"'], action: 'Restore' },
            { action: 'Restore' },
        ]
    },
    {
        meta: true,
        words: ['restart', 'ricomincia', 'ricominciare'],
        patterns: [
            { tokens: ['"partita" / "gioco"'], action: 'Restart' },
            { action: 'Restart' },
        ]
    },
    {
        meta: true,
        words: ['verify', 'verifica', 'verificare'],
        patterns: [
            { tokens: ['"gioco"'], action: 'Verify' },
            { action: 'Verify' },
        ]
    },
    {
        meta: true,
        words: ['save', 'salva', 'salvare'],
        patterns: [
            { tokens: ['"partita" / "gioco"'], action: 'Save' },
            { action: 'Save' },
        ]
    },
    {
        meta: true,
        words: ['script', 'transcript', 'trascrizione'],
        patterns: [
            { tokens: ['"off" / "disattivata"'], action: 'ScriptOff' },
            { tokens: ['"on" / "attivata"'], action: 'ScriptOn' },
            { action: 'ScriptOn' },
        ]
    },
    {
        meta: true,
        words: ['noscript', 'unscript'],
        patterns: [
            { action: 'ScriptOff' },
        ]
    },
    {
        meta: true,
        words: ['modalità', 'modalita'],
        patterns: [
            { tokens: ['"breve" / "corta"'], action: 'LMode3' },
            { tokens: ['"lunga" / "completa"'], action: 'LMode2' },
            { tokens: ['"normale"'], action: 'LMode1' },
        ]
    },
    {
        meta: true,
        words: ['superbrief', 'short', 'breve'],
        patterns: [
            { action: 'LMode3' },
        ]
    },
    {
        meta: true,
        words: ['verbose', 'long', 'lungo'],
        patterns: [
            { action: 'LMode2' },
        ]
    },
    {
        meta: true,
        words: ['brief', 'normal', 'normale'],
        patterns: [
            { action: 'LMode1' },
        ]
    },
    {
        meta: true,
        words: ['pronouns', 'nouns', 'pronomi'],
        patterns: [
            { action: 'Pronouns' },
        ]
    },
    {
        meta: true,
        words: ['notify', 'notifica'],
        patterns: [
            { tokens: ['"on" / "attivata"'], action: 'NotifyOn' },
            { tokens: ['"off" / "disattivata"'], action: 'NotifyOff' },
        ]
    },
    {
        meta: true,
        words: ['version', 'versione'],
        patterns: [
            { action: 'Version' },
        ]
    },
    {
        meta: true,
        words: ['places', 'luoghi', 'posti'],
        patterns: [
            { action: 'Places' },
        ]
    },
    {
        meta: true,
        words: ['objects', 'oggetti', 'posti'],
        patterns: [
            { action: 'Objects' },
        ]
    },
    /*
     * META VERBS - DEBUG GROUP
     * 
     * (TO BE DONE)
     */

    /*
     * GAME VERBS
     */

    {
        words: ['prendi', 'trasporta', 'afferra', 'raccogli'],
        patterns: [
            { tokens: ['multiInside', 'DaPrep', 'noun'], action: 'Remove' },
            { tokens: ['multi'], action: 'Take' },
        ]
    },
    {
        words: ['stai', 'sta'],
        patterns: [
            { tokens: ['SuPrep', 'noun'], action: 'Enter' },
            { tokens: ['InPrep', 'noun'], action: 'Enter' },
        ]
    },
    {
        words: ['rimuovi', 'togli'],
        patterns: [
            { tokens: ['multiInside', 'DaPrep', 'noun'], action: 'Remove' },
            { tokens: [{ attr: 'worn' }], action: 'Disrobe' },
            { tokens: ['held'], action: 'Disrobe' },
            { tokens: ['multi'], action: 'Take' },
        ]
    },
    {
        words: ['indossa'],
        patterns: [
            { tokens: ['held'], action: 'Wear' },
        ]
    },
    {
        words: ['metti', 'mettiti'],
        patterns: [
            { tokens: ['multiExcept', 'InPrep', 'noun'], action: 'Insert' },
            { tokens: ['multiExcept', 'SuPrep', 'noun'], action: 'PutOn' },
            { tokens: ['multiHeld', '"giù" / "giu"'], action: 'Drop' },
            { tokens: ['"giù" / "giu"', 'multiHeld'], action: 'Drop' },
            { tokens: ['held'], action: 'Wear' },
        ]
    },


    {
        patterns: [
            { tokens: ['noun=compass'], action: 'Go' },
        ]
    },

    /* 
    Verb 'metti' 'mettiti'
                    * held                            -> Wear
                    * 'gi@`u'/'giu' multiheld         -> Drop
                    * multiheld 'gi@`u'/'giu'         -> Drop
                    * multiexcept 'dentro'/'in'/'nel'/'nello'/'nell^'/'nella'/
                      'negli'/'nelle'/'nei' noun
                                                     -> Insert
                    * multiexcept 'su'/'sul'/'sullo'/'sull^'/'sulla'/'sui'/
                      'sugli'/'sulle'/'sopra' noun 
                                                      -> PutOn;
    Verb 'inserisci'
                    * multiexcept 'dentro'/'in'/'nel'/'nello'/'nell^'/'nella'/
                      'negli'/'nelle'/'nei' noun
                                                     -> Insert;
    Verb 'svuota' 
                    * noun                           -> Empty
                    * noun 'su'/'sul'/'sullo'/'sull^'/'sulla'/'sui'/
                      'sugli'/'sulle'/'sopra' noun
                                                     -> EmptyT;
    Verb 'trasferisci' 'sposta'
                    * noun                           -> Push
                    * noun 'su'/'sul'/'sullo'/'sull^'/'sulla'/'sui'/
                      'sugli'/'sulle'/'sopra' noun 
                                                     -> Transfer
                    * noun 'dentro'/'in'/'nel'/'nello'/'nell^'/'nella'/
                      'negli'/'nelle'/'nei' noun
                                                     -> Transfer;

    [ ADirection; if (noun in compass) rtrue; rfalse; ];
    Verb 'lascia' 'lancia' 'abbandona' 'posa'
                    * multiheld                      -> Drop
                    * multiexcept 'dentro'/'in'/'nel'/'nello'/'nell^'/'nella'/
                    'negli'/'nelle'/'nei' noun
                                                    -> Insert
                    * multiexcept 'su'/'sul'/'sullo'/'sull^'/'sulla'/'sui'/
                    'sugli'/'sulle'/'sopra' noun 
                                                    -> PutOn
                    * held 'a'/'ad'/'all^'/'allo'/'alla'/'al'/'agli'/'ai'/
                    'alle'/'su'/'sul'/'sullo'/'sull^'/'sulla'/'sui'/
                    'sugli'/'sulle'/'sopra'/'contro' noun 
                                                    -> ThrowAt
                    * noun=ADirection				 -> Go
                    * noun 							 -> Exit;
    Verb 'dai' 'paga' 'offri' 'da'
                    * held 'a'/'ad'/'all^'/'allo'/'alla'/'al'/'agli'/'ai'/
                    'alle' creature            
                                                    -> Give
                    * 'a'/'ad'/'all^'/'allo'/'alla'/'al'/'agli'/'ai'/
                    'alle' creature held           
                                                    -> Give reverse;
    Verb 'mostra' 'presenta'
                    * held 'a'/'ad'/'all^'/'allo'/'alla'/'al'/'agli'/'ai'/
                    'alle' creature            
                                                    -> Show
                    * 'a'/'ad'/'all^'/'allo'/'alla'/'al'/'agli'/'ai'/
                    'alle' creature held            
                                                    -> Show reverse;
    Verb 'fai' 'fa'
                    *								 -> GenericVerb
                    * 'inventario'	      			 -> Inv
                    * 'vedere' held 'a'/'ad'/'all^'/'allo'/'alla'/'al'/'agli'/'ai'/
                    'alle' creature				 -> Show
                    * 'vedere' 'a'/'ad'/'all^'/'allo'/'alla'/'al'/'agli'/'ai'/
                    'alle' creature held            
                                                    -> Show reverse
                    * held 'vedere' 'a'/'ad'/'all^'/'allo'/'alla'/'al'/'agli'/'ai'/
                    'alle' creature				 -> Show;
                                                
    Verb 'vai' 'cammina' 'corri' 'va'
                    *                                -> VagueGo
                    * 'fuori'                        -> Exit
                    * 'a'/'ad'/'verso' noun=ADirection
                                                    -> Go
                    * noun                           -> Enter 
                    * 'dentro'                       -> GoIn
                    * 'in'/'nel'/'nello'/'nell^'/'nella'/'nei'/
                    'negli'/'nelle'/'dentro'/'attraverso'/
                    'a'/'ad'/'all^'/'allo'/'alla'/'al'/'agli'/'ai'/
                    'alle' noun
                                                    -> Enter
                    * 'su'/'sul'/'sullo'/'sull^'/'sulla'/'sui'/
                    'sugli'/'sulle'/'sopra' noun	 -> Climb;
    Verb 'scendi'
                    * 'da'/'dal'/'dallo'/'dalla'/'dall^'/'dai'/
                    'dagli'/'dalle' noun           -> Exit
                    *                                -> Exit
                    * noun                           -> Exit;

    Verb 'inventario' 'inv' 'i//'
                    *                                -> Inv
                    * 'esteso'                       -> InvTall
                    * 'completo'                     -> InvWide;
    Verb 'guarda' 'g//' 'vedi' 'l//'
                    *                                -> Look
                    * noun                           -> Examine
                    * 'dentro'/'in'/'nel'/'nello'/'nell^'/'nella'/
                    'negli'/'nelle'/'nei'/'attraverso'/
                    'su'/'sul'/'sullo'/'sull^'/'sulla'/'sui'/
                    'sugli'/'sulle'/'sopra' noun
                                                    -> Search
                    * 'sotto' noun                   -> LookUnder;
                    !* topic 'dentro'/'in'/'nel'/'nello'/'nell^'/'nella'/
                    !  'negli'/'nelle'/'nei' noun
                    !                                 -> Consult reverse;

    Verb 'consulta' * noun 'circa' topic             -> Consult
                    * noun 'su'/'sul'/'sullo'/'sull^'/'sulla'/'sui'/
                    'sugli'/'sulle'/'sopra' topic
                                                    -> Consult;
    Verb 'apri' 'scopri'
                    * noun                           -> Open
                    * noun 'con'/'a' held            -> Unlock;
    Verb 'chiudi' 'copri'
                    * noun                           -> Close
                    * noun  'con'/'a' held           -> Lock;
    Verb 'entra' 'attraversa' 'visita'
                    *                                -> GoIn
                    * 'dentro'						 -> GoIn
                    * 'dentro'/'in'/'nel'/'nello'/'nell^'/'nella'/
                    'negli'/'nelle'/'nei' noun     -> Enter
                    * 'dentro' 'a'/'ad'/'all^'/'allo'/'alla'/'al'/'agli'/'ai'/
                    'alle' noun                    -> Enter
                    * noun                           -> Enter;
    Verb 'siedi' 'siediti' 'sdraiati'               
                    * 'su'/'sul'/'sullo'/'sull^'/'sulla'/'sui'/
                    'sugli'/'sulle'/'sopra' noun
                                                    -> Enter
                    * 'a'/'ad'/'all^'/'allo'/'alla'/'al'/'agli'/'ai'/
                    'alle' noun                    -> Enter
                    * 'dentro'/'in'/'nel'/'nello'/'nell^'/'nella'/
                    'negli'/'nelle'/'nei' noun
                                                    -> Enter;
    Verb 'in' 'dentro'
                    *                                -> GoIn;
    Verb 'fuori' 'esci'
                    *                                -> Exit
                    * 'da'/'dal'/'dallo'/'dalla'/'dall^'/'dai'/
                    'dagli'/'dalle' noun           -> Exit;
    Verb 'esamina' 'x//' 'descrivi' 'controlla'
                    * noun                           -> Examine;
    Verb 'leggi'
                    * noun                           -> Examine
                    * 'circa' topic 'dentro'/'in'/'nel'/'nello'/'nell^'/'nella'/
                    'negli'/'nelle'/'nei' noun
                                                    -> Consult
                    * topic 'dentro'/'in'/'nel'/'nello'/'nell^'/'nella'/
                    'negli'/'nelle'/'nei' noun
                                                    -> Consult;
    Verb 'si' 's@`i'
                    *                                -> Yes;
    Verb 'no//'
                    *                                -> No;
    Verb 'spiacente' 'scusa'
                    *                                -> Sorry;
    Verb 'merda' 'cazzo' 'dannazione' 'porco'
                    *                                -> Strong;
    Verb 'impreca' 'bestemmia' 'maledici'
                    *                                -> Mild
                    * topic                          -> Mild;
    Verb 'cerca' 'trova' 'ricerca'
                    * noun                           -> Search
                    * 'dentro'/'in'/'nel'/'nello'/'nell^'/'nella'/
                    'negli'/'nelle'/'nei' noun     -> Search;
    Verb 'agita' 'agitati'
                    * 								 -> WaveHands
                    *'mani'                          -> WaveHands
                    * noun                           -> Wave;
    Verb 'saluta'
                    *                                -> WaveHands
                    * creature                       -> WaveHands;
    Verb 'imposta'
                    * noun                           -> Set
                    * noun 'to' special              -> SetTo;
    Verb 'tira' 'trascina'
                    * noun                           -> Pull;
    Verb 'premi' 'muovi' 'spingi'
                    * noun                           -> Push
                    * noun 'a'/'ad'/'all^'/'allo'/'alla'/'al'/'agli'/'ai'/
                    'alle' noun                    -> PushDir;
    Verb 'gira' 'ruota'
                    * noun                           -> Turn
                    * noun 'a on'/'su on'            -> Switchon
                    * noun 'a off'/'su off'          -> Switchoff;
    Verb 'attiva' 'accendi'
                    * noun                           -> Switchon;
    Verb 'disattiva' 'spegni'
                    * noun                           -> Switchoff;
    Verb 'scassina' 'sblocca'
                    * noun 'con'/'a' held            -> Unlock;
    Verb 'serra' 'blocca'                 
                    * noun 'con' held                -> Lock;
    Verb 'attacca' 'rompi' 'colpisci' 'combatti'
        'uccidi' 'tortura' 'lotta' 'sfonda' 'ammazza'  
                    * noun                           -> Attack
                    * noun 'con' held                -> Attack;
    Verb 'aspetta' 'attendi' 'z//'
                    *                                -> Wait;
    Verb 'rispondi' 'd@`i' 'grida' 'di' 'di^' 'dici'
                    * topic 'a'/'ad'/'all^'/'allo'/'alla'/'al'/'agli'/'ai'/
                    'alle' creature          
                                                    -> Answer;
    Verb 'parla'
                    * 'a'/'ad'/'all^'/'allo'/'alla'/'al'/'agli'/'ai'/
                    'alle' creature 'circa'/'su'/'sul'/
                    'sullo'/'sull^'/'sulla'/'sugli'/'sui'/
                    'sulle'/'di'/'dello'/'della'/'dell^'/'dei'/
                    'degli'/'delle' topic   
                                                    -> Tell
                    * 'a'/'ad'/'all^'/'allo'/'alla'/'al'/'agli'/'ai'/
                    'alle' creature
                                                    -> Tell;                                        
    Verb 'chiedi' 'domanda'
                    * 'a'/'ad'/'all^'/'allo'/'alla'/'al'/'agli'/'ai'/
                    'alle' creature 'circa'/'su'/'sul'/'sui'/
                    'sullo'/'sull^'/'sulla'/'sugli'/
                    'sulle'/'di'/'dello'/'della'/'dell^'/'dei'/
                    'degli'/'delle' topic   
                                                    -> Ask
                    * 'a'/'ad'/'all^'/'allo'/'alla'/'al'/'agli'/'ai'/
                    'alle' creature                -> Ask
                    * 'scusa'/'scuse'				 -> Sorry
                    * 'a'/'ad'/'all^'/'allo'/'alla'/'al'/'agli'/'ai'/
                    'alle' creature noun			 -> Askfor
                    *  noun 'a'/'ad'/'all^'/'allo'/'alla'/'al'/'agli'/'ai'/
                    'alle' creature           
                                                    -> AskFor reverse;
    Verb 'mangia'
                    * held                           -> Eat;
    Verb 'dormi' 'sonnecchia'
                    *                                -> Sleep;
    Verb 'pela'
                    * noun                           -> Take;
    Verb 'canta'
                    *                                -> Sing;
    Verb 'scala' 'sali' 'arrampica' 'arrampicati'
                    * 'su'/'sul'/'sullo'/'sull^'/'sulla'/'sui'/
                    'sugli'/'sulle' noun           
                                                    -> Climb
                    * noun                           -> Climb;
    Verb 'compra' 'acquista'
                    * noun                           -> Buy;
    Verb 'schiaccia' 'spremi' 'spiaccica'
                    * noun                           -> Squeeze;
    Verb 'nuota'
                    *                                -> Swim;
    Verb 'scuoti'
                    * noun                           -> Swing;
    Verb 'soffia'
                    * 'dentro'/'in'/'nel'/'nello'/'nell^'/'nella'/
                    'negli'/'nelle'/'nei' held  
                                                    -> Blow
                    * held                           -> Blow;
    Verb 'prega'
                    *                                -> Pray;
    Verb 'sveglia' 'svegliati' 'risveglia' 'risvegliati'
                    *                                -> Wake
                    * creature                       -> WakeOther;
    Verb 'bacia' 'abbraccia'
                    * creature                       -> Kiss;
    Verb 'pensa' 'medita'
                    *                                -> Think;
    Verb 'annusa' 'odora'
                    *                                -> Smell
                    * noun                           -> Smell;
    Verb 'senti' 'ascolta'
                    *                                -> Listen
                    * noun                           -> Listen;
    Verb 'assaggia' 'assapora' 'gusta'
                    * noun                           -> Taste;
    Verb 'tocca' 'accarezza' 'palpa'
                    * noun                           -> Touch;
    Verb 'pulisci' 'strofina' 'spolvera' 'ripulisci' 'lucida' 'lustra'
                    * noun                           -> Rub;
    Verb 'lega' 'fissa' 'congiungi' 'unisci' 'allaccia' 'annoda'
                    * noun                           -> Tie
                    * noun 'a'/'ad'/'all^'/'allo'/'alla'/'al'/'agli'/'ai'/
                    'alle'  noun                   -> Tie
                    * noun 'con' noun                -> Tie;
    Verb 'brucia' 'incendia'
                    * noun                           -> Burn
                    * noun 'con' held                -> Burn;
    Verb 'bevi' 'trangugia' 'sorseggia'
                    * noun                           -> Drink;
    Verb 'riempi' 'colma'
                    * noun                           -> Fill;
    Verb 'taglia' 'affetta' 'sfronda' 'sfoltisci' 'spacca' 'strappa'
                    * noun                           -> Cut
                    * noun 'con' held                -> Cut;
    Verb 'salta'
                    *                                -> Jump
                    * 'su'/'sul'/'sullo'/'sull^'/'sulla'/'sui'/
                    'sugli'/'sulle'/'sopra' noun
                                                    -> JumpOver;
    Verb 'scava'    * noun                           -> Dig
                    * noun 'con' held                -> Dig;


     */
];