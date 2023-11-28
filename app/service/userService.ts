import { APIGatewayProxyEventV2 } from "aws-lambda";
import { SuccessResponse, ErrorResponse } from "../utility/response";
import { UserRepository } from "../repository/userRepository";
import { autoInjectable } from "tsyringe";
import { plainToClass } from "class-transformer";
import { SignupInput } from "../models/dto/SignupInput";
import { AppValidationError } from "../utility/error";

@autoInjectable()
export class UserService {
  repository: UserRepository;
  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  // User creation, validation & login
  async CreateUser(event: APIGatewayProxyEventV2) {
    const input = plainToClass(SignupInput, event.body);
    const error = await AppValidationError(input);
    if (error) return ErrorResponse(404, error);

    // await this.repository.CreateUserOperation();
    return SuccessResponse(input);
  }

  async LoginUser(event: APIGatewayProxyEventV2) {
    const body = JSON.stringify(event.body);
    console.log(body);
    return SuccessResponse({ message: "response from login user" });
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
