import { APIGatewayProxyEventV2 } from "aws-lambda";
import { SuccessResponse, ErrorResponse } from "../utility/response";
import { UserRepository } from "../repository/userRepository";
import { autoInjectable } from "tsyringe";
import { plainToClass } from "class-transformer";
import { SignupInput } from "../models/dto/SignupInput";
import { AppValidationError } from "../utility/error";
import {
  GetHashedPassword,
  GetSalt,
  GetToken,
  ValidatePassword,
  VerifyToken,
} from "../utility/password";
import { LoginInput } from "../models/dto/LoginInput";
import {
  GenerateAccessCode,
  SendVerificationCode,
} from "../utility/notification";

@autoInjectable()
export class UserService {
  repository: UserRepository;
  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  // User creation, validation & login
  async CreateUser(event: APIGatewayProxyEventV2) {
    try {
      const input = plainToClass(SignupInput, event.body);
      const error = await AppValidationError(input);
      if (error) return ErrorResponse(404, error);

      const salt = await GetSalt();
      const hashedPassword = await GetHashedPassword(input.password, salt);
      const data = await this.repository.createAccount({
        email: input.email,
        password: hashedPassword,
        salt: salt,
        phone: input.phone,
        userType: "BUYER",
      });
      return SuccessResponse(data);
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }

  async LoginUser(event: APIGatewayProxyEventV2) {
    try {
      const input = plainToClass(LoginInput, event.body);
      const error = await AppValidationError(input);
      if (error) return ErrorResponse(404, error);
      const data = await this.repository.findAccount(input.email);
      const verified = await ValidatePassword(
        input.password,
        data.password,
        data.salt
      );
      if (!verified) {
        throw new Error("password does not match!");
      }
      const token = GetToken(data);

      return SuccessResponse({ token });
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }

  async GetVerificationToken(event: APIGatewayProxyEventV2) {
    const token = event.headers.authorization;
    const payload = await VerifyToken(token);
    if (payload) {
      const { code, expiry } = GenerateAccessCode();
      // save on DB to confirm verification
      const response = await SendVerificationCode(code, payload.phone);
      return SuccessResponse({
        message: "verification code is sent to your registered mobile number!",
      });
    }
  }

  async VerifyUser(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "response from verity user" });
  }

  // User profile
  async CreateProfile(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "response from create user profile" });
  }
  async GetProfile(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "response from get user profile" });
  }
  async EditProfile(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "response from edit user profile" });
  }

  // Cart Section
  async CreateCart(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "response from create cart" });
  }
  async GetCart(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "response from get cart" });
  }
  async UpdateCart(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "response from edit cart" });
  }

  // Payment Section
  async CreatePaymentMethod(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "response from create payment method" });
  }
  async GetPaymentMethod(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "response from get payment method" });
  }
  async UpdatePaymentMethod(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "response from edit payment method" });
  }
}
