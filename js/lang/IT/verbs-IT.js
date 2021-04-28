verbs = [{
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
        words: ['prendi', 'trasporta', 'afferra', 'raccogli'],
        patterns: [
            { tokens: ['multiInside', 'DaPrep', 'noun'], action: 'Remove' },
            { tokens: ['multi'], action: 'Take' },
        ]
    }

];