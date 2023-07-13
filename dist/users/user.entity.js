"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const openapi = require("@nestjs/swagger");
class User {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: false, type: () => Number }, email: { required: true, type: () => String }, surname: { required: true, type: () => String }, password: { required: true, type: () => String } };
    }
}
exports.default = User;
//# sourceMappingURL=user.entity.js.map