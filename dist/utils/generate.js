"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateUUID = () => {
    return "xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};
const generate = { uuid: generateUUID };
exports.default = generate;
