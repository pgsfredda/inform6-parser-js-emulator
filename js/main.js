var rulesVerbs = generate(verbs, 'Rules');
var rules = rulesBase + getLangDiv(lang) + rulesXX + rulesVerbs;
var parser = peg.generate(rules.trim());

var divs = {};

function setDivs(elements) {
    divs = elements;

    resetInput();
}

function resetInput() {
    divs.input.value = '';
    resetCurr();
    initResult();
    showWorld();
    showVerbs();
}

function initResult() {
    removeClass(divs.input, 'statusOK');
    removeClass(divs.input, 'statusWA');
    removeClass(divs.input, 'statusKO');
    divs.errors.panel.style = "display: none";
    divs.output.panel.style = "display: none";
}

function showWorld() {
    divs.world.title.innerHTML = `World in scope${curr.actor? (((curr.options) &&(curr.options.held))?' held by '+ curr.actor:((curr.options) &&(curr.options.inside))?' inside ' + curr.options.inside + ' for ' + curr.actor: ' for '+ curr.actor) : ': whole'}`;
    var world = getObjsInScope(curr.actor, curr.options);
    divs.world.content.innerHTML = `<pre>${world? JSON.stringify(world, function(k, v) { return v === undefined ? 'undefined' : v; }, 4): '*** empty ***'}</pre>`;
}

function showVerbs() {
    var res = '<table>';

    verbs.forEach(v => {
        var tab = (x) => `<span class="tabspace">${x}</span>`;

        res += '<tr><th colspan="2"><span>' + (typeof v.words === 'string' ? '<em>No verb</em>' : '<strong>Verb' + (v.meta ? ' meta' : '') + '</strong> ' + v.words.reduce((p, c) => p + (p ? ', ' : '') + '\'' + c + '\'', '')) + '</span></th></tr>';
        res += v.patterns.reduce((p, c) => p + `<tr><td>${tab('*')}${(c.tokens)?tab(c.tokens.reduce((pp, cc) => pp + (pp ? ' ' : '') + (typeof cc === 'string'?cc.replace(/"/g, '\''): cc[Object.keys(cc)[0]]) , '')):''}</td><td>${tab('->')}${tab(c.action)}${c.reverse?' reverse': ''}</td></tr>`, '');
    });

    res += '</table>'

    divs.verbs.content.innerHTML = res;
}

function showResult(parsed) {
    addClass(divs.input, 'statusOK');
    divs.output.content.innerHTML = `<h4>Params</h4>
        <pre>${JSON.stringify(parsed, function(k, v) { return v === undefined ? 'undefined' : (typeof v === 'function'? v.name: v); }, 4)}</pre>
        <h4>Results</h4>
    `
    var res;
    try {
        res = `
            <pre>${JSON.stringify(parsed.action(parsed), function(k, v) { return v === undefined ? 'undefined' : v; }, 4)}</pre>
        `;
    } catch (error) {
        res = `<span class="functerr">Error found:<br /><em>${error}</em></span>
        `
    }
    divs.output.content.innerHTML += res;
    divs.output.panel.style = "display: block";
}

function showError(error) {
    addClass(divs.input, error.warn ? 'statusWA' : 'statusKO');
    divs.errors.panel.style = "display: block";
    divs.errors.content.innerHTML = `
            <p><strong>${error.name}</strong></p>
            <p><em>${error.message}</em></p>
        `;
    if (!error.warn) divs.errors.content.innerHTML += `
            <pre>${error?.details?.message}<br />From (l:${error?.details?.location?.start?.line}, c:${error?.details?.location?.start?.column}) to (l:${error?.details?.location?.end?.line}, c:${error?.details?.location?.end?.column})</pre>
        `;
}

function getResult(resFunct, errFunct) {
    var ph = (divs.input.value).trim();

    initResult();

    try {
        if (ph) {
            resetErr();

            var parsed = parser.parse(ph);

            showWorld();
            showVerbs();

            if (resFunct) showResult(parsed);

            return { parsed };
        }
    } catch (error) {
        error.warn = error.warn || (parsingErr.errno !== NO_PE);

        error.name = (error.warn ? 'Applcation Error' : error.name);
        error.details = {
            message: error.message,
            location: error.location
        }
        error.message = (error.warn ? `${parsingErr.errno}${parsingErr.value? ': ' + JSON.stringify(parsingErr.value): ''}` : 'Parsing error found');

        if (errFunct) showError(error);

        return { error };
    }
}

function onSubmit(showResult, showError) {
    getResult(showResult, showError);
    return false;
}

//console.log(rules);
//console.log(getObjsInScope());
//console.log(getActionNeededList(verbs));