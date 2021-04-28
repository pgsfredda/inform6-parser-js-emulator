/**
 * @description Function to allow one JavaScript file to be included by another.
 * @function
 * @param {string} jsFile the javascript source file name
 * @param {string} [jsCond] the html condition string given in <!--[if]> ... <![endif]--> tags source file name
 * 
 * @copyright Copyright (C) 2006-2008, by cryer
 * @author Cryer
 * @see {@link http://www.cryer.co.uk|www.cryer.co.uk} 
 */
includeJS = function(jsFile, jsCond) {
    if (jsCond) document.write('<!--[if ' + jsCond + ']>');
    document.write('<script type="text/javascript" src="' + jsFile + '"></script>');
    if (jsCond) document.write('<![endif]-->');
};

function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
}

function addClass(element, klass) {
    if (element.classList) {
        element.classList.add(klass);
    } else {
        // For IE9
        var classes = element.className.split(" ");

        if ((classes.indexOf(klass)) < 0) classes.push(klass);
        element.className = classes.join(" ");
    }
}

function removeClass(element, klass) {
    if (element.classList) {
        element.classList.remove(klass);
    } else {
        // For IE9
        var classes = element.className.split(" ");
        var i = classes.indexOf(klass);

        if (i >= 0) classes.splice(i, 1);
        element.className = classes.join(" ");
    }
}