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
        words: ['quit', 'q', 'die', 'uscire', 'fine', 'basta'],
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
     */

    {
        meta: true,
        words: ['trace'],
        patterns: [
            { tokens: ['number'], action: 'TraceLevel' },
            { tokens: ['"off"'], action: 'TraceOff' },
            { tokens: ['"on"'], action: 'TraceOn' },
            { action: 'TraceOn' },
        ]
    },
    {
        meta: true,
        words: ['actions'],
        patterns: [
            { tokens: ['"off"'], action: 'ActionsOff' },
            { tokens: ['"on"'], action: 'ActionsOn' },
            { action: 'ActionsOn' },
        ]
    },
    {
        meta: true,
        words: ['routines', 'messages'],
        patterns: [
            { tokens: ['"off"'], action: 'RoutinesOff' },
            { tokens: ['"on"'], action: 'RoutinesOn' },
            { action: 'RoutinesOn' },
        ]
    },
    {
        meta: true,
        words: ['timers', 'daemons'],
        patterns: [
            { tokens: ['"off"'], action: 'TimersOff' },
            { tokens: ['"on"'], action: 'TimersOn' },
            { action: 'TimersOn' },
        ]
    },
    {
        meta: true,
        words: ['changes'],
        patterns: [
            { tokens: ['"off"'], action: 'ChangesOff' },
            { tokens: ['"on"'], action: 'ChangesOn' },
            { action: 'ChangesOn' },
        ]
    },
    {
        meta: true,
        words: ['recording'],
        patterns: [
            { tokens: ['"off"'], action: 'CommandsOff' },
            { tokens: ['"on"'], action: 'CommandsOn' },
            { action: 'CommandsOn' },
        ]
    },
    {
        meta: true,
        words: ['replay'],
        patterns: [
            { action: 'CommandsRead' },
        ]
    },
    {
        meta: true,
        words: ['random'],
        patterns: [
            { action: 'Predictable' },
        ]
    },
    {
        meta: true,
        words: ['purloin'],
        patterns: [
            { tokens: ['multi'], action: 'XPurloin' },
        ]
    },
    {
        meta: true,
        words: ['abstract'],
        patterns: [
            { tokens: ['noun', '"to"', 'noun'], action: 'XAbstract' },
        ]
    },
    {
        meta: true,
        words: ['tree'],
        patterns: [
            { tokens: ['noun'], action: 'XTree' },
            { action: 'XTree' }
        ]
    },
    {
        meta: true,
        words: ['goto'],
        patterns: [
            { tokens: ['number'], action: 'Goto' },
        ]
    },
    {
        meta: true,
        words: ['gonear'],
        patterns: [
            { tokens: ['noun'], action: 'Gonear' },
        ]
    },
    {
        meta: true,
        words: ['scope'],
        patterns: [
            { tokens: ['noun'], action: 'Scope' },
            { action: 'Scope' }
        ]
    },
    {
        meta: true,
        words: ['showobj'],
        patterns: [
            { tokens: ['multi'], action: 'Showobj' },
            { action: 'Showobj' }
        ]
    },
    {
        meta: true,
        words: ['showverb'],
        patterns: [
            { tokens: ['special'], action: 'Showverb' },
        ]
    },

    /*
     * PLAY VERBS
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
        words: ['mettiti', 'metti'],
        patterns: [
            { tokens: ['multiExcept', 'InPrep', 'noun'], action: 'Insert' },
            { tokens: ['multiExcept', 'SuPrep', 'noun'], action: 'PutOn' },
            { tokens: ['multiHeld', '"giù" / "giu"'], action: 'Drop' },
            { tokens: ['"giù" / "giu"', 'multiHeld'], action: 'Drop' },
            { tokens: ['held'], action: 'Wear' },
        ]
    },
    {
        words: ['inserisci'],
        patterns: [
            { tokens: ['multiExcept', 'InPrep', 'noun'], action: 'Insert' },
        ]
    },
    {
        words: ['svuota'],
        patterns: [
            { tokens: ['noun', 'SuPrep', 'noun'], action: 'EmptyT' },
            { tokens: ['noun'], action: 'Empty' },

        ]
    },
    {
        words: ['trasferisci', 'sposta'],
        patterns: [
            { tokens: ['noun', 'SuPrep / InPrep', 'noun'], action: 'Transfer' },
            { tokens: ['noun'], action: 'Push' },

        ]
    },
    {
        words: ['lascia', 'lancia', 'abbandona', 'posa'],
        patterns: [
            { tokens: ['held', 'APrep / SuPrep / "contro"', 'noun'], action: 'ThrowAt' },
            { tokens: ['multiExcept', 'InPrep', 'noun'], action: 'Insert' },
            { tokens: ['multiExcept', 'SuPrep', 'noun'], action: 'PutOn' },
            { tokens: ['noun=compass'], action: 'Go' },
            { tokens: ['multiHeld'], action: 'Drop' },
            { tokens: ['noun'], action: 'Exit' },

        ]
    },
    {
        words: ['dai', 'paga', 'offri', 'da'],
        patterns: [
            { tokens: ['held', 'APrep', 'creature'], action: 'Give' },
            { tokens: ['APrep', 'creature', 'held'], action: 'Give', reverse: true },
        ]
    },
    {
        words: ['mostra', 'presenta'],
        patterns: [
            { tokens: ['held', 'APrep', 'creature'], action: 'Show' },
            { tokens: ['APrep', 'creature', 'held'], action: 'Show', reverse: true },
        ]
    },
    {
        words: ['fai', 'fa'],
        patterns: [
            { tokens: ['"vedere"', 'held', 'APrep', 'creature'], action: 'Show' },
            { tokens: ['"vedere"', 'APrep', 'creature', 'held'], action: 'Show', reverse: true },
            { tokens: ['held', '"vedere"', 'APrep', 'creature'], action: 'Show' },
            { tokens: ['"inventario"'], action: 'Inv' },
            { action: 'GenericVerb' },
        ]
    },
    {
        words: ['vai', 'va', 'cammina', 'corri'],
        patterns: [
            { tokens: ['"ad" / "a" / "verso"', 'noun=compass'], action: 'Go' },
            { tokens: ['InPrep / APrep / "attraverso"', 'noun'], action: 'Enter' },
            { tokens: ['SuPrep', 'noun'], action: 'Climb' },
            { tokens: ['"dentro"'], action: 'GoIn' },
            { tokens: ['"fuori"'], action: 'Exit' },
            { tokens: ['noun'], action: 'Enter' },
            { action: 'VagueGo' },
        ]
    },
    {
        words: ['scendi'],
        patterns: [
            { tokens: ['DaPrep', 'noun'], action: 'Exit' },
            { tokens: ['noun'], action: 'Exit' },
            { action: 'Exit' },
        ]
    },
    {
        words: ['consulta'],
        patterns: [
            { tokens: ['noun', 'SuPrep', 'topic'], action: 'Consult' },
            { tokens: ['noun', '"circa"', 'topic'], action: 'Consult' },
        ]
    },
    {
        words: ['apri', 'scopri'],
        patterns: [
            { tokens: ['noun', '"con" / "a"', 'held'], action: 'Unlock' },
            { tokens: ['noun'], action: 'Open' },
        ]
    },
    {
        words: ['chiudi', 'copri'],
        patterns: [
            { tokens: ['noun', '"con" / "a"', 'held'], action: 'Lock' },
            { tokens: ['noun'], action: 'Close' },
        ]
    },
    {
        words: ['entra', 'attraversa', 'visita'],
        patterns: [
            { tokens: ['InPrep / APrep', 'noun'], action: 'Enter' },
            { tokens: ['"dentro"'], action: 'GoIn' },
            { tokens: ['noun'], action: 'Enter' },
            { action: 'GoIn' },
        ]
    },
    {
        words: ['siediti', 'siedi', 'sdraiati'],
        patterns: [
            { tokens: ['SuPrep / APrep / InPrep', 'noun'], action: 'Enter' },
        ]
    },
    {
        words: ['fuori', 'esci'],
        patterns: [
            { tokens: ['DaPrep', 'noun'], action: 'Exit' },
            { action: 'Exit' },
        ]
    },
    {
        words: ['x', 'descrivi', 'controlla', 'esamina'],
        patterns: [
            { tokens: ['noun'], action: 'Examine' },
        ]
    },
    {
        words: ['leggi'],
        patterns: [
            { tokens: ['"circa"', 'topic', 'InPrep', 'noun'], action: 'Consult' },
            { tokens: ['topic', 'InPrep', 'noun'], action: 'Consult' },
            { tokens: ['noun'], action: 'Examine' },
        ]
    },
    /* {
        words: ['si'],
        patterns: [
            { action: 'Yes' },
        ]
    },
    {
        words: ['no'],
        patterns: [
            { action: 'No' },
        ]
    }, */
    {
        words: ['spiacente', 'scusa'],
        patterns: [
            { action: 'Sorry' },
        ]
    },
    {
        words: ['porco', 'dannazione'],
        patterns: [
            { tokens: ['topic'], action: 'Strong' },
            { action: 'Strong' },
        ]
    },
    {
        words: ['bestemmia', 'maledici'],
        patterns: [
            { tokens: ['topic'], action: 'Mild' },
            { action: 'Mild' },
        ]
    },
    {
        words: ['cerca', 'trova', 'ricerca'],
        patterns: [
            { tokens: ['InPrep', 'noun'], action: 'Search' },
            { tokens: ['noun'], action: 'Search' },
        ]
    },
    {
        words: ['agitati', 'agita'],
        patterns: [
            { tokens: ['"le mani"'], action: 'WaveHands' },
            { tokens: ['noun'], action: 'Wave' },
            { action: 'WaveHands' },
        ]
    },
    {
        words: ['saluta'],
        patterns: [
            { tokens: ['creature'], action: 'WaveHands' },
            { action: 'WaveHands' },
        ]
    },
    {
        words: ['tira', 'trascina'],
        patterns: [
            { tokens: ['noun'], action: 'Pull' },
        ]
    },
    {
        words: ['premi', 'muovi', 'spingi'],
        patterns: [
            { tokens: ['noun', 'APrep', 'noun'], action: 'PushDir' },
            { tokens: ['noun'], action: 'Push' },
        ]
    },
    {
        words: ['imposta'],
        patterns: [
            { tokens: ['noun', 'APrep', 'special'], action: 'SetTo' },
            { tokens: ['noun'], action: 'Set' },
        ]
    },
    {
        words: ['attiva', 'accendi'],
        patterns: [
            { tokens: ['noun'], action: 'SwitchOn' },
        ]
    },
    {
        words: ['disattiva', 'spegni'],
        patterns: [
            { tokens: ['noun'], action: 'SwitchOff' },
        ]
    },
    {
        words: ['gira', 'ruota'],
        patterns: [
            { tokens: ['noun', '"su on" / "a on"'], action: 'SwitchOn' },
            { tokens: ['noun', '"a off" / "su off"'], action: 'SwitchOff' },
            { tokens: ['noun'], action: 'Turn' },
        ]
    },
    {
        words: ['scassina', 'sblocca'],
        patterns: [
            { tokens: ['noun', '"con" / "a"', 'held'], action: 'Unlock' },
        ]
    },
    {
        words: ['serra', 'blocca'],
        patterns: [
            { tokens: ['noun', '"con" / "a"', 'held'], action: 'Lock' },
        ]
    },
    {
        words: ['attacca', 'rompi', 'colpisci', 'combatti', 'uccidi', 'tortura', 'lotta', 'sfonda', 'ammazza'],
        patterns: [
            { tokens: ['noun', '"con"', 'held'], action: 'Attack' },
            { tokens: ['noun'], action: 'Attack' },
        ]
    },
    {
        words: ['rispondi', 'grida', 'dì', 'dí'],
        patterns: [
            { tokens: ['topic', 'APrep', 'creature'], action: 'Answer' },
        ]
    },
    {
        words: ['parla'],
        patterns: [
            { tokens: ['APrep', 'creature', '"circa" / SuPrep / DiPrep', 'topic'], action: 'Tell' },
            { tokens: ['APrep', 'creature'], action: 'Tell' },
        ]
    },
    {
        words: ['chiedi', 'domanda'],
        patterns: [
            { tokens: ['APrep', 'creature', '"circa" / SuPrep / DiPrep', 'topic'], action: 'Ask' },
            { tokens: ['noun', 'APrep', 'creature'], action: 'AskFor' },
            { tokens: ['APrep', 'creature', 'noun'], action: 'AskFor', reverse: true },
            { tokens: ['APrep', 'creature'], action: 'Ask' },
            { tokens: ['"scusa"', 'APrep', 'creature'], action: 'Sorry' },
            { tokens: ['"scusa"'], action: 'Sorry' },
        ]
    },
    {
        words: ['mangia'],
        patterns: [
            { tokens: ['held'], action: 'Eat' },
        ]
    },
    {
        words: ['scala', 'sali', 'arrampicati', 'arrampica'],
        patterns: [
            { tokens: ['SuPrep', 'noun'], action: 'Climb' },
            { tokens: ['noun'], action: 'Climb' },
        ]
    },
    {
        words: ['acquista', 'compra'],
        patterns: [
            { tokens: ['noun'], action: 'Buy' },
        ]
    },
    {
        words: ['schiaccia', 'spremi', 'spiaccica'],
        patterns: [
            { tokens: ['noun'], action: 'Squeeze' },
        ]
    },
    {
        words: ['scuoti', 'dondola'],
        patterns: [
            { tokens: ['noun'], action: 'Swing' },
        ]
    },
    {
        words: ['accarezza', 'tocca'],
        patterns: [
            { tokens: ['noun'], action: 'Touch' },
        ]
    },
    {
        words: ['riempi', 'colma'],
        patterns: [
            { tokens: ['noun'], action: 'Fill' },
        ]
    },
    {
        words: ['ripulisci', 'pulisci', 'strofina', 'spolvera', 'lucida', 'lustra'],
        patterns: [
            { tokens: ['noun'], action: 'Rub' },
        ]
    },
    {
        words: ['lega', 'fissa', 'congiungi', 'unisci', 'allaccia', 'annoda'],
        patterns: [
            { tokens: ['noun', 'APrep / "con"', 'noun'], action: 'Tie' },
            { tokens: ['noun'], action: 'Tie' },
        ]
    },
    {
        words: ['brucia', 'incendia'],
        patterns: [
            { tokens: ['noun', '"con"', 'held'], action: 'Burn' },
            { tokens: ['noun'], action: 'Burn' },
        ]
    },
    {
        words: ['taglia', 'affetta', 'sfronda', 'sfoltisci', 'spacca', 'strappa'],
        patterns: [
            { tokens: ['noun', '"con"', 'held'], action: 'Cut' },
            { tokens: ['noun'], action: 'Cut' },
        ]
    },
    {
        words: ['scava'],
        patterns: [
            { tokens: ['noun', '"con"', 'held'], action: 'Dig' },
            { tokens: ['noun'], action: 'Dig' },
        ]
    },
    {
        words: ['soffia'],
        patterns: [
            { tokens: ['InPrep ', 'held'], action: 'Blow' },
            { tokens: ['held'], action: 'Blow' },
        ]
    },
    {
        words: ['risvegliati', 'risveglia', 'svegliati', 'sveglia'],
        patterns: [
            { tokens: ['creature'], action: 'WakeOther' },
            { action: 'Wake' },
        ]
    },
    {
        words: ['odora', 'annusa', ],
        patterns: [
            { tokens: ['noun'], action: 'Smell' },
            { action: 'Smell' },
        ]
    },
    {
        words: ['senti', 'ascolta', ],
        patterns: [
            { tokens: ['noun'], action: 'Listen' },
            { action: 'Listen' },
        ]
    },
    {
        words: ['abbraccia', 'bacia'],
        patterns: [
            { tokens: ['creature'], action: 'Kiss' },
            { tokens: ['noun'], action: 'KissOther' },
        ]
    },
    {
        words: ['assaggia', 'assapora', 'gusta'],
        patterns: [
            { tokens: ['noun'], action: 'Taste' },
        ]
    },
    {
        words: ['bevi', 'trangugia', 'sorseggia'],
        patterns: [
            { tokens: ['noun'], action: 'Drink' },
        ]
    },
    {
        words: ['attendi', 'z'],
        patterns: [
            { action: 'Wait' },
        ]
    },
    {
        words: ['sonnecchia', 'dormi', 'ronfa'],
        patterns: [
            { action: 'Sleep' },
        ]
    },
    {
        words: ['inventario', 'inv', 'i'],
        patterns: [
            { tokens: ['"esteso"'], action: 'InvAll' },
            { tokens: ['"completo"'], action: 'InvWide' },
            { action: 'Inv' },
        ]
    },
    {
        words: ['canta'],
        patterns: [
            { action: 'Sing' },
        ]
    },
    {
        words: ['nuota'],
        patterns: [
            { action: 'Swim' },
        ]
    },
    {
        words: ['prega'],
        patterns: [
            { action: 'Pray' },
        ]
    },
    {
        words: ['medita', 'rifletti'],
        patterns: [
            { tokens: ['SuPrep', 'topic'], action: 'Think' },
            { action: 'Think' },
        ]
    },
    {
        words: ['salta'],
        patterns: [
            { tokens: ['SuPrep', 'noun'], action: 'Jump' },
            { action: 'Jump' },
        ]
    },
    {
        words: ['guarda', 'vedi', 'g', 'l'],
        patterns: [
            { tokens: ['InPrep / SuPrep / "attraverso"', 'noun'], action: 'Search' },
            { tokens: ['"sotto"', 'noun'], action: 'LookUnder' },
            { tokens: ['topic', 'InPrep', 'noun'], action: 'Consult', reverse: true },
            { tokens: ['noun'], action: 'Examine' },
            { action: 'Look' },
        ]
    },
    {
        words: ['in', 'dentro'],
        patterns: [
            { action: 'GoIn' },
        ]
    },
    {
        patterns: [
            { tokens: ['noun=compass'], action: 'Go' },
        ]
    }
];