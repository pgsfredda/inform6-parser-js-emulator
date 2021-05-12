function getActionNeededList(verbs) {
    var res = '';

    verbs.forEach(v => v.patterns.forEach(p => { res += (typeof window[p.action] != 'function') ? `function ${p.action}(params) { return params; }\n` : '' }));

    return res;
}

function getActor(params) {
    return ((params && params.actor) ? params.actor : '');
}

function TypeNum(params) {
    return (params && params.noun) ? params.noun.number : 'Nessun numero';
}

function TypeStr(params) {
    return (params && params.noun) ? params.noun.topic : 'Nessun topic';
}

function Take(params) {
    return params ? params.noun : 'Nessun noun';
}

function Strong(params) {
    return getActor(params) + ' non dovrebbe dire le parolacce!!!';
}

function Go(params) {
    return getActor(params) + ' ' + ((params && params.noun) ? 'va verso ' + compass(params.noun) : 'non capisco dove debba andare');
}

function Remove(params) {
    return getActor(params) + ' ' + ((params && params.noun && params.second) ? 'toglie ' + params.noun.multiInside + ' da ' + params.second.noun : 'non capisco cosa voglia fare');
}

function Wear(params) {
    return getActor(params) + ' ' + ((params && params.noun) ? 'indossa ' + params.noun.held : 'non capisco cosa debba indossare');
}

function Say(params) { return getActor(params) + ' dice: \'' + (Array.isArray(params.noun.topic) ? params.noun.topic.join(" ") : params.noun.topic) + '\''; }


function EnterOn(params) { return params; }

function EnterIn(params) { return params; }

function Insert(params) { return params; }

function PutOn(params) { return params; }

function Drop(params) { return params; }

function Eat(params) { return params; }

function VagueUse(params) { return 'Cosa vuoi che faccia ' + getActor(params) + ' di ' + params.noun.noun + '?' }

function VagueGo(params) { return 'Dove vuoi che vada ' + getActor(params) + '?' }

function GenericVerb(params) { return 'Un po\' generico per ' + getActor(params) }

function GoIn(params) { return params; }

function Exit(params) { return params; }

function Enter(params) { return params; }

function Empty(params) { return params; }

function EmptyT(params) { return params; }

function Examine(params) { return params; }

function Disrobe(params) { return params; }

function Visio(params) { return params; }

function Show(params) { return params; }

function Transfer(params) { return params; }

function Push(params) { return params; }

function Score(params) { return 'Punteggio non calcolato'; }

function FullScore(params) { return 'Punteggio pieno non calcolato'; }

function Quit(params) { return 'Attività conclusa'; }

function Restore(params) { return params; }

function Restart(params) { return params; }

function Verify(params) { return params; }

function Save(params) { return params; }

function ScriptOff(params) { return params; }

function ScriptOn(params) { return params; }

function LMode3(params) { return params; }

function LMode2(params) { return params; }

function LMode1(params) { return params; }

function Pronouns(params) { return params; }

function NotifyOn(params) { return params; }

function NotifyOff(params) { return params; }

function Version(params) { return params; }

function Places(params) { return params; }

function Objects(params) { return params; }

function ThrowAt(params) { return params; }

function Give(params) { return params; }

function Inv(params) { params.title = 'Inventario'.toUpperCase(); return params; }

function InvAll(params) { params.title = 'Inventario esteso'.toUpperCase(); return params; }

function InvWide(params) { params.title = 'Inventario completo'.toUpperCase(); return params; }

function Climb(params) { return params; }

function Look(params) { return params; }

function LookUnder(params) { return params; }

function Search(params) { return params; }

function Consult(params) { return params; }

function Open(params) { return params; }

function Unlock(params) { return params; }

function Lock(params) { return params; }

function Close(params) { return params; }

function Yes(params) { return params; }

function No(params) { return params; }

function Sorry(params) { return params; }

function Mild(params) { return params; }

function Wave(params) { return params; }

function WaveHands(params) { return params; }

function Pull(params) { return params; }

function PushDir(params) { return params; }