var lang = document.getElementsByName('meta-lang').length > 0 ? document.getElementsByName('meta-lang')[0].content : undefined;

if (lang) {
    lang = (lang + '').substr(0, 2);
    includeJS(`./js/lang/${lang}/rules-${lang}.js`);
    includeJS(`./js/lang/${lang}/words-${lang}.js`);
    includeJS(`./js/lang/${lang}/verbs-${lang}.js`);
    includeJS(`./js/lang/${lang}/world-${lang}.js`);
} else {
    console.error("lang not defined. Insert in the head the following element\n<meta name'meta-lang' content='xx'>\nwhere xx is the language id you choice (i.e. EN, IT, ...)")
}

function getLangDiv(lang) {
    return `

/***********************************************
 * 
 * CUSTOM LANG RULES
 * Language: ${lang}
 * 
 ***********************************************/

`;
}