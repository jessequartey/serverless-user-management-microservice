"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendVerificationCode = exports.GenerateAccessCode = void 0;
const twilio_1 = __importDefault(require("twilio"));
const accountSid = "AC277ff00aef73a114d9f91f298b9398cb";
const authToken = "89ad357347461438d7c21758d4717941";
const client = (0, twilio_1.default)(accountSid, authToken);
const GenerateAccessCode = () => {
    const code = Math.floor(10000 + Math.random() * 900000);
    let expiry = new Date();
    expiry.setTime(new Date().getTime() + 30 * 60 * 1000);
    return { code, expiry };
};
exports.GenerateAccessCode = GenerateAccessCode;
const SendVerificationCode = (code, toPhoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield client.messages.create({
        body: `Your verification code is ${code} it will expire within 30 minutes.`,
        from: "+19189923434",
        to: toPhoneNumber.trim(),
    });
    console.log(response);
    return response;
});
exports.SendVerificationCode = SendVerificationCode;
//# sourceMappingURL=notification.js.map