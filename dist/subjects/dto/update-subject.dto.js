"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSubjectDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_subject_dto_1 = require("./create-subject.dto");
class UpdateSubjectDto extends (0, swagger_1.PartialType)(create_subject_dto_1.CreateSubjectDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateSubjectDto = UpdateSubjectDto;
//# sourceMappingURL=update-subject.dto.js.map