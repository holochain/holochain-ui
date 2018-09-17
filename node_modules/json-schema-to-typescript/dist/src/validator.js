"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var rules = new Map();
rules.set('Enum members and tsEnumNames must be of the same length', function (schema) {
    if (schema.enum && schema.tsEnumNames && schema.enum.length !== schema.tsEnumNames.length) {
        return false;
    }
});
rules.set('tsEnumNames must be an array of strings', function (schema) {
    if (schema.tsEnumNames && schema.tsEnumNames.some(function (_) { return typeof _ !== 'string'; })) {
        return false;
    }
});
function validate(schema, filename) {
    var errors = [];
    rules.forEach(function (rule, ruleName) {
        utils_1.mapDeep(schema, function (schema, key) {
            if (rule(schema) === false) {
                errors.push("Error at key \"" + key + "\" in file \"" + filename + "\": " + ruleName);
            }
            return schema;
        });
    });
    return errors;
}
exports.validate = validate;
//# sourceMappingURL=validator.js.map