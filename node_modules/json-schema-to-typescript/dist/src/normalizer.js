"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cli_color_1 = require("cli-color");
var lodash_1 = require("lodash");
var utils_1 = require("./utils");
var stringify = require("json-stringify-safe");
var rules = new Map();
rules.set('Destructure unary types', function (schema) {
    if (schema.type && Array.isArray(schema.type) && schema.type.length === 1) {
        schema.type = schema.type[0];
    }
    return schema;
});
rules.set('Add empty `required` property if none is defined', function (schema, rootSchema) {
    if (stringify(schema) === stringify(rootSchema) && !('required' in schema)) {
        schema.required = [];
    }
    return schema;
});
rules.set('Transform `required`=false to `required`=[]', function (schema, rootSchema) {
    if (stringify(schema) === stringify(rootSchema) && schema.required === false) {
        schema.required = [];
    }
    return schema;
});
// TODO: default to empty schema (as per spec) instead
rules.set('Default additionalProperties to true', function (schema, rootSchema) {
    if (stringify(schema) === stringify(rootSchema) && !('additionalProperties' in schema)) {
        schema.additionalProperties = true;
    }
    return schema;
});
rules.set('Default top level `id`', function (schema, rootSchema, fileName) {
    if (!schema.id && stringify(schema) === stringify(rootSchema)) {
        schema.id = utils_1.toSafeString(utils_1.justName(fileName));
    }
    return schema;
});
function normalize(schema, filename) {
    var _schema = lodash_1.cloneDeep(schema);
    rules.forEach(function (rule, key) {
        _schema = utils_1.mapDeep(_schema, function (schema) { return rule(schema, _schema, filename); });
        utils_1.log(cli_color_1.whiteBright.bgYellow('normalizer'), "Applied rule: \"" + key + "\"");
    });
    return _schema;
}
exports.normalize = normalize;
//# sourceMappingURL=normalizer.js.map