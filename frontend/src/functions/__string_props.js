/**  The Properties defined in this file should also be defined in "<project-folder>/stringExtensions.d.ts"   **/


/**
 * Converts a string to sentence case.
 * @returns {string} The string in sentence case.
 */
String.prototype.toSentenceCase = function() {
    if (!this) return this;
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

/**
 * Checks if a string represents a truthy value.
 * @param {string} str - The string to be converted to a boolean.
 * @return {boolean} Returns `true` if the string represents a truthy value (`'true'`, `'1'`, `'yes'`), otherwise returns `false`.
 */
String.prototype.stringToBool = function() {
    const value = this.trim().toLowerCase();
        return value === 'true' || value === '1';
        // return value == 'true' || value == '1';
        //  || value === 'yes';
};

/**
 * Capitalizes the first letter of each word in a string.
 * @returns {string} The string with each word capitalized.
 */
Object.defineProperty(String.prototype, 'toTitleCase', {
    value: function() {
        if (!this) return this;
        return this.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    },
    writable: false,
    configurable: false,
    enumerable: false
});


// /**
//  * Converts a string to sentence case.
//  * @returns {string} The string in sentence case.
//  */
// Object.defineProperty(String.prototype, 'toSentenceCase', {
//   value: function() {
//     if (!this) return this;
//     return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
//   },
//   writable: false,
//   configurable: false,
//   enumerable: false
// });