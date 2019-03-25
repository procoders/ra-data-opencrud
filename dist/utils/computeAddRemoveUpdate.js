"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var difference_1 = __importDefault(require("lodash/difference"));
var formatId = function (id) { return ({ id: id }); };
exports.computeFieldsToAdd = function (oldIds, newIds) {
    return difference_1.default(newIds, oldIds).map(formatId);
};
exports.computeFieldsToRemove = function (oldIds, newIds) {
    return difference_1.default(oldIds, newIds).map(formatId);
};
exports.computeFieldsToUpdate = function (oldIds, newIds) {
    return oldIds.filter(function (oldId) { return newIds.includes(oldId); }).map(formatId);
};
exports.computeFieldsToAddRemoveUpdate = function (oldIds, newIds) { return ({
    fieldsToAdd: exports.computeFieldsToAdd(oldIds, newIds),
    fieldsToRemove: exports.computeFieldsToRemove(oldIds, newIds),
    fieldsToUpdate: exports.computeFieldsToUpdate(oldIds, newIds)
}); };
//# sourceMappingURL=computeAddRemoveUpdate.js.map