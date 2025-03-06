import { injectable, inject, id } from "inversify";
import { Request, Response } from "express";
import TYPES from "../constant/Types";
const path = require("path");
const { v4: uuidv4 } = require("uuid");
import { UserRepository } from "../repository/userRepository";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/users";
import { Restaurant} from "../entities/MongoDbRepo";
import {RestaurantMenu} from '../entities/resturantMenu'
import mongoose from "mongoose";
@injectable()
export class userService {
  private UserRepository = AppDataSource.getRepository(User);
  

  @inject(TYPES.UserRepository) private readonly userRepo: UserRepository;

  // public async addUser(request: Request, response: Response) {
  //   const getUserData = request.body;
  //   console.log("this is My jwt payload", response.locals);
  //   const jwtPayloads = response.locals; // Accessing JWT payload data
  //   // Store JWT payload in class property
  //   console.log("What pay laod is comming ", jwtPayloads["number"]);
  //   const address = await getCurrentLocation(
  //     request.body.latitude,
  //     request.body.longitude
  //   );
  //   getUserData["Address"] = address;
  //   console.log("USER DATA AFter chnages ", getUserData);

  //   const user = await this.userRepo.updateUser(
  //     jwtPayloads["number"],
  //     getUserData
  //   ); //adding user details to db

  //   return response.status(200).send({
  //     message: "User Created ",
  //   });
  // }

  public async getUserData(request: Request, response: Response) {
    //const jwtPayload = request['user'];
    const { number } = response.locals.jwt;
    console.log("this is My jwt payload", number);
    const userData = await this.userRepo.getUserDeatails(number);
    console.log("User Data ", userData);
    try {
      if (!userData) {
        return response.status(500).send({
          message: "User Dees not exists ",
        });
      } else {
        return response.status(200).send({
          Data: userData,
        });
      }
    } catch (err) {
      console.log("**ERRROR **", err.message);
    }
  }
  public async SaveResturant(request: Request, response: Response) {
    console.log("iam 3");
    const { id, ...rest } = request.body; // Extract `id`
    
    try {
      console.log("Request Body:", request.body); // Verify request body

      if (!request.body) {
        return response.status(400).json({ error: "Request body is empty" });
      }

      const newRestaurant = new Restaurant({ _id: id, ...rest })
      const savedRestaurant = await newRestaurant.save();
      response.status(201).json(savedRestaurant);
    } catch (error) {
      console.error("Error saving restaurant:", error);
      response.status(500).json({ error: error.message });
    }
  }

  public async deleteResturant(request: Request, response: Response) {
       const id=request.query.id
    try {
      console.log("Request Body:", id); // Verify request body

      if (!request.body) {
        return response.status(400).json({ error: "Request body is empty" });
      }
      const result = await Restaurant.findByIdAndDelete(id);
      if (result) {
        response.status(200).json({ message:`${id} Deleted ` });
        console.log("Document Deleted:", result);
      } else {
        console.log("No document found with that ID");
      }
    } catch (error) {
      console.error("Error saving restaurant:", error);
      response.status(500).json({ error: error.message });
    }
  };


  public async fetchAllResturant(request: Request, response: Response) {
    
 try {
    // Verify request body

   const restaurants = await Restaurant.find(); // Fetch all documents
   if (restaurants) {
     response.status(200).json({ data:restaurants});
     console.log("restaurants:", restaurants);
   } else {
     console.log("No document found ");
   }
 } catch (error) {
   console.error("Error saving restaurant:", error);
   response.status(500).json({ error: error.message });
 }
};

public async addResturantMenu(request: Request, response: Response){
  const { id, ...rest } = request.body; // Extract `id`
    
  try {
    console.log("Request Body:", request.body); // Verify request body

    if (!request.body) {
      return response.status(400).json({ error: "Request body is empty" });
    }

    const newRestaurantMenu = new RestaurantMenu({ _id: id, ...rest })
    const savedRestaurantMenu = await newRestaurantMenu.save();
    response.status(201).json(savedRestaurantMenu);
  } catch (error) {
    console.error("Error saving restaurant:", error);
    response.status(500).json({ error: error.message });
  }
};

public async getResturantMenu(request: Request, response: Response) {
    const resId=request.query.id 
    console.log(resId)
  try {
     // Verify request body
 
    const restaurants = await RestaurantMenu.findById(resId); // Fetch all documents
    if (restaurants) {
      response.status(200).json({ data:restaurants});
      console.log("restaurants:", restaurants);
    } else {
      console.log("No document found ");
    }
  } catch (error) {
    console.error("Error saving restaurant:", error);
    response.status(500).json({ error: error.message });
  }
 };

 public async deleteResturantMenu(request: Request, response: Response) {
  //const ObjectId = mongoose.Types.ObjectId;
  console.log("❌ Errro From delete Menu ")
  try {
    const restaurantId = request.query.id ; // Extract ID from query parameters

    // Check if the ID is valid
    // if (!ObjectId.isValid(restaurantId)) {
    //   return response.status(400).json({ error: "Invalid restaurant ID" });
    // }

    // Convert to ObjectId and delete
    const deletedRestaurant = await RestaurantMenu.findByIdAndDelete(restaurantId);

    if (!deletedRestaurant) {
      return response.status(404).json({ message: "Restaurant not found" });
    }

    response.json({ message: "Restaurant deleted successfully", deletedRestaurant });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};


}
