[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

# inform6-parser-js-emulator
This is the first very much work-in-progress of an integration test of **[PEG.js][LINK-PEG]**, by David Majda, to simulate a parser like **[Inform6][LINK-IN6]**, by Graham Nelson, but using js/TS language.

## Working version: https://creativaweb.it/parser/
## The project
The complete project involves the creation of a development tool for interactive fiction that reproduces the functions of Inform 6 (at least the most importants) in Typescript language.

This is only the integration test environment for the use of PEG.js as parser generator in the different natural languages like english, italian, etc.   

There are no library dependencies except on **[PEG.js][LINK-PEG]** ver. 0.10.0. (current release) here used in the minified version.
## Localization
At this moment there are only some test available in the italian language. If you want to change the language to be loaded, change the `meta` line in the `<head>` element with the `name`="meta-lang". Only the first two letters will be considered as key to access the specific language (i.e. **IT**alian).  

For example:
```html
<head>
    <meta name="meta-lang" content="ITalian">
</head>
```

## Main page
![Tool main window!](/images/mainwindow.jpg "Tool main window")

When the index.html file is loaded the page is divided into three areas:

1. **Main Area**: the command line input and result output.  
    It can take on four colors:
    - white: when empty,
    - **<span style="color: seagreen">green</span>**: when the command has been correctly understood and executed,
    - **<span style="color: orange">orange</span>**: when the command has been parserized but not understood or is not actionable,
    - **<span style="color: #921a1a">red</span>**: when the command has not been parserized because it is not defined in the grammar.  

    You can clear entirly the command line by click the "C" button.

1. **World in scope**: the simplified world in scope currently considered.  
It can be "the whole world" or refer to the actor to whom the command refers (the Player is the default).  
It is possible scroll up and down the scope world definition.   

1. **Verb definitions**: the verb grammar definitions in Inform 6 style.  
It is possible scroll up and down the list to view all the verb definition.  
## Verb definition
To define a verb you have to supply the follow informations:   
```js
{
    meta: true / false, //(optional)
    words: ['word1', 'word2', ...], //(optional)
    patterns: [
        tokens: ['token1', 'token2', ...] //(optional)
        action: Action,
        reverse: true / false //(optional)
    ]
}
```
### Meta
This is an optional flag. You can omit *meta* or set its value to `false`. Otherwise you can set its value to `true` to tell the system the verb is a *meta verb* (see [DM4 Inform 6 Manual][LINK-DM4] for other informations).
### Words
This is an array of string delimited with a single apostrophe. These are multi choices to define the same verb with a given pattern.
### Patterns
This is an array of patterns to apply at the user input to identify the correct `action` to activate.  
Each pattern is composed of
- `tokens`: an optional array of token (see below other infos)
- `action`: a js function that accept a `params` argument, an object with all the phrase infos (see below other infos)
- `reverse`: is an optional flag to specify the inverse order of params (noun and second, see below). You can omit *reverse* or set its value to `false`.
### Tokens
Tokens is an optional array to identify the correct `action` to activate.   
A token is defined always as a single apostrophe string but:
- **string token** (as verbs or other words), must be delimited interior with also quotation marks (i.e. `'"word"'`)
- **normal token** (as noun, multi, etc), must be delimited only with single apostrophe (i.e. `'multi'`)

For a list of string token option use a slash / (i.e. `'"fullscore" / "punteggio"'`); each word is delimited with a quotation mark couple, all the optional words are delimited as a unique token with an apostrophe couple. Spaces can be omitted.

The follow example

```js
{
    meta: true,
    words: ['score', 'punteggio'],
    patterns: [
        { tokens: ['"completo" / "pieno"'], action: 'FullScore', reverse: false },
        { action: 'Score' },
    ]
}
```
is generated as
```js
Verb meta 'score', 'punteggio'
*   'completo' / 'pieno'	->  FullScore
*	                        ->  Score;
```
For all token options and semanthic see [DM4 Inform 6 Manual][LINK-DM4].

The verb definition order define the priority of trying apply the words patterns.   
The pattern order is relevant for the priority of trying apply the token patterns.   
Always put more complete and accurate (longest) patterns before (see the example below).  
The internal token order in the array is semanthic relevant.   

```js
{
    words: ['prendi', 'trasporta', 'afferra', 'raccogli'],
    patterns: [
        { tokens: ['multiInside', 'DaPrep', 'noun'], action: 'Remove' },
        { tokens: ['multi'], action: 'Take' },
    ]
}
```
The apply and choice strategy in the parsing phase is slightly different from Inform 6 but simpler to predict in effects.
### Actions and Params
Each `action` is the name of a js function that receives an object as parameter called `params`.   

```js
// "prendi la giacca e i pantaloni dall'armadio"
function action(params) {
    console.log(params); // see below
}
```
```json
{
    "actor": "Player",
    "verb": "prendi",
    "action": "Remove",
    "noun": {
        "multiInside": [
            "giacca",
            "pantaloni"
        ]
    },
    "second": {
        "noun": "armadio"
    }
}
```
The `params` object is defined as below:
```
{
    actor: who activate the action (Player is the default), always defined,
    verb: the verb string used in the command,
    action: the function to activate, always defined,
    noun: the first token in the command,
    second: the second token in the command,
}
```
Not all the fields are always defined when the action is called. Articles and prepositions are skipped.
### Token types
There are many types of tokens for the placeholder `noun` and `second` as descripted in [DM4 Inform 6 Manual][LINK-DM4]. For the token `multi*` (multi, multiInside, multiExcept) is adopted the js convention (camelcase except the first letter) and the placeholder (noun or second) is an array   
(i.e. `{"multiInside": ["giacca","pantaloni"]}`).  
Otherwise, if the token get a single value (noun, held) the placeholder get a string.
### Tricks
The possible results of parsering are:
- **<span style="color: seagreen">successful result</span>**: the user command is fully understood and an action activated
- **<span style="color: orange">warning result</span>**: the user command is clear but something is not compatible (an object not found in the scope, no object compatible with the command, ...)
- **<span style="color: #921a1a">error result</span>**: no pattern found compatible with the user command (syntax error)

If you want to avoid having an headache, it is very helpful to follow few simple rules to obtain only successful or warning results so the user experience can be nice.

1. use always a single apostrophe couple to delimit a token (i.e. `'noun', 'prep'`)
1. add an internal quotation mark couple to delimit a specific string token (i.e. `'"score"'`)
1. if you define more patterns for the same words in a single verb definition, put first the longest and more accurate definition. The more precise comes first
```js
{
    words: ['prendi', 'trasporta', 'afferra', 'raccogli'],
    patterns: [
        { tokens: ['multiInside', 'DaPrep', 'noun'], action: 'Remove' },
        { tokens: ['multi'], action: 'Take' },
    ]
}
```
4. `multi` skip the articles but don't manage the preposition and "eat" al tokens until the end of command if no preposition are found: patterns with `multi` always at last position as last chance
1. the patters like `* 'noun' 'prep' 'second'` always before
1. if you have two pattern very similar but with two different preposition and the same action you can reduce them in a single pattern like `* 'noun' ('prep1' / 'prep2') 'second' -> 'action'`
```js
{
    words: ['siedi' ,'siediti', 'sdraiati' ],
    patterns: [
        { tokens: ['SuPrep / APrep', noun], action: 'Enter', reverse: false },
    ]
}
```
## World and Grammar
To create a new language version
1. create a dir under `"lang"` with the same name of language label (IT, EN, ...).
1. create the rules definition file `./js/lang/XX/rules-XX.js` for prepositions, articles, conjunctions a decimal separator
1. create the words definition file `./js/lang/XX/words-XX.js` for compass and other words
1. create the verbs definition file `./js/lang/XX/verbs-XX.js` for actions activation
1. create the world definition file `./js/lang/XX/world-XX.js`; actually the system is case-sensitive therefore `'a'` is different from `'A'`
## Last but not least
This is not a complete system as a replacement for Inform 6. This is just a test environment with some useful algorithms reuseble in the complete design.   
If you have any suggestions or problem reports, please, check the project [Issues][LINK-ISS] section.


[LINK-PEG]: https://pegjs.org/ "PEG.js Parser Generator for JavaScript"
[LINK-IN6]: https://www.inform-fiction.org/ "Inform 6 home page"
[LINK-DM4]: https://www.inform-fiction.org/manual/html/index.html "DM4 Inform 6 Manual"
[LINK-ISS]: https://github.com/pgsfredda/inform6-parser-js-emulator/issues "Issues"
