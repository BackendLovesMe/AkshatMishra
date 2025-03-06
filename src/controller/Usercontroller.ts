import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
} from "inversify-express-utils";
import { inject, injectable } from "inversify";
import { Request, Response, NextFunction, request, response } from "express";
import { userService } from "../service/userService";
import {
  validate,
  SchemaType,
  RequestReaderType,
  RequestReader,
} from "../validate";
import TYPES from "../constant/Types";
//import { authenticateJwt } from '../middleware/authenticateJwt';

@controller("/api/v1.0")
export class Controller {
  @inject(TYPES.Userservice) private userService: userService;

  @httpPost("/updateUser")
  // public async addUser(request: Request, response: Response) {
  //   console.log("Hey hey ");
  //   return this.userService.addUser(request, response);
  // }
  @httpPost("/getUserData")
  public async getUserData(resuest:Request, response :Response){
    return this.userService.getUserData(request, response);

  }
  @httpPost("/SaveResturant")
  public async getresturtantDeatils(request:Request, response :Response){
    console.log("iam in save resturant list ")
    return this.userService.SaveResturant(request, response);
  }
  @httpDelete('/DeleteResturant')
  public async deleteResturant(request:Request, response :Response){
    console.log("iam in Delete resturant list ")
    return this.userService.deleteResturant(request, response);
  }

  @httpGet('/fetchAllResturant')
  public async fetchAllResturant(request:Request, response :Response){
    console.log("iam in Delete resturant list ")
    return this.userService.fetchAllResturant(request, response);
  }
  @httpPost('/addResturantMenu')
  public async addResturantMenu(request: Request, response: Response) {
      console.log("flow1")
      return this.userService.addResturantMenu(request, response);

  }

  @httpGet('/getResturantMenu')
  public async getResturantMenu(request: Request, response: Response) {
    console.log("flow1")
    return this.userService.getResturantMenu(request, response);

}
@httpDelete('/deleteResturantMenu')
  public async deleteResturantMenu(request:Request, response :Response){
    console.log("iam in Delete resturant Menu ")
    return this.userService.deleteResturantMenu(request, response);
  }


 

}

