const PARSING_ERROR = 'Parsing Error';
const GENERIC_PE = 'STUCK_PE';
const NO_PE = '';

var parsingErr;

var inlineCmp = [];

var verbs = [];
var rulesXX = '';
var wholeWord = {};

var curr = {};
var last = {};

var compassValues = {};

function compass(noun) {
    var res = '';

    if ((noun) && (noun.noun)) {
        for (const key in compassValues) {
            if (compassValues.hasOwnProperty.call(compassValues, key)) {
                const element = compassValues[key];
                if ((Array.isArray(element)) && (element.indexOf(noun.noun) >= 0)) {
                    res = key;
                    break;
                }
            }
        }
    }

    //console.log('compass', compassValues, noun, res);

    return res;
}

function getErrValue(params, options) {
    var res = { actor: params.actor, action: params.action.name };

    options = options || {};

    var data = (options.data) ? options.data : params[options.field || 'noun'][Object.keys(params[options.field || 'noun'])[0]];

    if (!options.clearData) {
        res = Object.assign({}, res, { data });
        if (options.inside) res = Object.assign({}, res, { inside: (options.inside) });
        if (options.attr) res = Object.assign({}, res, { attr: (options.attr) });
    }

    return res;
}

function resetErr(err) {
    if (err) setErr(err, true);
    else setErr({ errno: NO_PE, value: undefined }, true);

    return parsingErr;
}

function setErr(err, force) {
    if ((force) || (parsingErr.errno === GENERIC_PE) || (parsingErr.errno === NO_PE)) parsingErr = Object.assign({}, err);

    return parsingErr;
}

function resetCurr() {
    last = curr;

    curr = {
        actor: undefined,
        verb: undefined,
        action: undefined,
        noun: undefined,
        second: undefined,
        options: undefined
    };

    return curr;
}

function checkVerbs(lastVerb) {
    if (!lastVerb) return true;

    var found = false;
    var i = 0;

    while ((!found) && (i < verbs.length)) {
        found = (verbs[i].words.indexOf(lastVerb) >= 0);
        i++;
    }

    if (!found) {
        setErr({ errno: 'VERB_PE', value: lastVerb });
        return false;
    }

    return true;
}

function findObj(obj, where) {
    var res;

    if ((!obj) || (!where)) return false;

    res = (Object.keys(where).indexOf(obj) >= 0);

    //console.log('findObj', obj, where, res);

    return res;
}

function getWorld(actor, world) {
    var res;

    //console.log('getWorld ENTRY', actor, world);

    if ((actor) && (!Array.isArray(world)) && (typeof world === 'object') && (typeof actor === 'string')) {
        if (findObj(actor, world)) res = world;
        else {
            for (const o in world) {
                res = getWorld(actor, world[o]);
                //console.log('getWorld LOOP', actor, o, res);
                if (res) break;
            }
        }
    } else if (!actor) res = world;

    //console.log('getWorld EXIT', res);

    return res;
}

function getObjsInScope(actor, options) {
    var world = getWorld(actor, wholeWord);
    var res;

    res = world ? ((options && options.held) ? world[actor] : ((options && options.inside) ? world[options.inside] : Object.assign({}, world, world[actor]))) : undefined;

    //console.log('getObjsInScope', res);

    if (res) return res;

    return world;
}

function getObj(actor, objName, options) {
    return getObjsInScope(actor, options)[objName];
}

function objInScope(actor, obj, options) {
    if (findObj(obj, getObjsInScope(actor, options))) return true;
    if (compass({ noun: obj })) return true;

    return false;
}

function filterObjsInList(params, list, options) {
    var res = list.map(l => l);
    var where = getObjsInScope(params.actor, options);

    options = Object.assign({}, options || {}, { data: list });

    //console.log('filterObjsInList', JSON.stringify({ where, list, options, res, parsingErr }));

    if (where) {
        list.forEach(o => {
            if (!objInScope(params.actor, o, options)) res.splice(res.indexOf(o), 1);
            //console.log(o, res, objInScope(actor, o));
        });
        if (res.length == 0) {
            setErr({ errno: options.held ? 'NOTHELD_PE' : 'CANTSEE_PE', value: getErrValue(params, options) });
            //console.log('filterObjsInList exit where', parsingErr);
            return [];
        }
    }

    if ((options) && (options.except)) {
        list.forEach(o => {
            if (options.except === o) res.splice(res.indexOf(o), 1);
        });
        if (res.length == 0) {
            setErr({ errno: 'EXCEPT_PE', value: getErrValue(params, options) });
            return [];
        }
    }

    if (!where) {
        if (!options)
            setErr({ errno: 'TOOLIT_PE', value: getErrValue(params, { clearData: true }) });
        else if (options.inside)
            setErr({ errno: 'CANTSEE_PE', value: getErrValue(params, options) });
        else if (!options.except)
            setErr({ errno: 'TOOLIT_PE', value: getErrValue(params, { clearData: true }) });
        return []
    }

    //console.log(res);

    return res;
}

function _createAction(params) {
    last = curr;
    curr = params;

    return curr;
}

function _tokenCheck(field, params) {
    var token = Object.keys(params[field])[0];
    var options = { field, token };

    //console.log('_tokenCheck', options, params);

    switch (token) {
        case 'noun':
            return _singleCheck(params, options);
        case 'held':
            options = Object.assign(options, { held: true });
            return _singleCheck(params, options);
        case 'creature':
            return _creatureCheck(params, options);
        case 'number':
        case 'topic':
        case 'special':
            return true;
        case 'multi':
            return _multiCheck(params, options);
        case 'multiInside':
            options = Object.assign(options, { inside: params.second.noun });
            return _multiCheck(params, options);
        case 'multiHeld':
            options = Object.assign(options, { held: true });
            return _multiCheck(params, options);
        case 'multiExcept':
            options = Object.assign(options, { except: params.second.noun });
            return _multiCheck(params, options);
        default:
            return false;
    }
}

function _actionCheck(params) {

    //console.log('_actionCheck', params.actor, params.verb, params.action, params.noun, params.second);

    if (!params.noun) { return true }

    if ((params.second) && (!_tokenCheck('second', params))) return false;


    return _tokenCheck('noun', params);
}

function _resetInlineCmp() {
    //console.log('RESET');
    inlineCmp = [];
    return true;
}

function _inlineSkip(w) {
    var res = ((inlineCmp.length > 0) && (inlineCmp.findIndex((e) => (e === w)) >= 0));
    //console.log('SKIP', inlineCmp, w, res);
    return res;
}

function _setInlineCmp(cmp) {
    //inlineCmp = inlineCmp.concat(c.replace(/"/g, '').split(/[ ]*\/[ ]*/));
    inlineCmp = inlineCmp.concat(cmp.split(/[ ]*\/[ ]*/).filter((c) => { return c.search(/"/) >= 0 }).map(el => el.replace(/"/g, '')));
    //console.log('SET', inlineCmp, cmp);
    return true;
}

function _special(special) {
    return { special };
}

function _number(number) {
    return { number };
}

function _noun(noun) {
    return { noun };
}

function _held(held) {
    return { held };
}

function _topic(topic) {
    return { topic };
}

function _creature(creature) {
    return { creature };
}

function _multi(multi) {
    return { multi };
}

function _multiHeld(multiHeld) {
    return { multiHeld };
}

function _multiExcept(multiExcept) {
    return { multiExcept };
}

function _multiInside(multiInside) {
    return { multiInside };
}

function _actor(act) {
    return (act && act.noun) || "Player";
}

function _attrCheck(params, attr) {
    var res, objs;

    if ((params.actor) && (params.noun) && (attr)) objs = (getObjsInScope(params.actor) || []);

    res = ((objs) && (objs[params.noun.noun]) && (objs[params.noun.noun][attr]));

    if (!res) setErr({ errno: !objs[params.noun.noun] ? 'CANTSEE_PE' : 'NOTHING_PE', value: getErrValue(params, { data: params.noun.noun, attr: objs[params.noun.noun] ? attr : undefined }) });

    //console.log(`_attrCheck {actor: ${params.actor}, noun: ${JSON.stringify(params.noun)}, obj: ${JSON.stringify(objs[params.noun.noun])}, attr: ${attr}} ${res?'TRUE': 'FALSE'}`, { parsingErr });

    return res;
}

function _multiCheck(params, options) {
    var tmp = filterObjsInList(params, params.noun[options.token], options);
    if (tmp.length > 0) {
        params.noun[options.token] = tmp;
        //console.log(`_multiCheck {field: ${options.field}, token: ${options.token}} TRUE`, { params, options, tmp, parsingErr });
        return true;
    }

    //console.log(`_multiCheck {field: ${options.field}, token: ${options.token}} FALSE`, { params, options, tmp, parsingErr });

    return false;
}

function _singleCheck(params, options) {
    var res = objInScope(params.actor, params[options.field][options.token], options);

    if (!res) setErr({ errno: options.held ? 'NOTHELD_PE' : 'CANTSEE_PE', value: getErrValue(params, options) });

    //console.log(`_singleCheck {field: ${options.field}, token: ${options.token}} ${res?'TRUE': 'FALSE'}`, { params, options, res, parsingErr });

    return res;
}

function _creatureCheck(params, options) {
    if (_singleCheck(params, options)) {
        var objs = getObjsInScope(params.actor);
        var creature = params[options.field][options.token];
        return ((objs) && (objs[creature]) && (objs[creature]['creature']));
    }

    return false;
}