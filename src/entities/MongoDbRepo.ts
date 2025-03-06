import { number, string } from "joi";
import mongoose from "mongoose";
console.log("HEY IAM")
// Define the schema
 const restaurantSchema = new mongoose.Schema({
  _id:Number,
  name: String,
  location: String,
  locality:String,
  areaName:String,
  costForTwo:String,
  cloudinaryImageId:String,
  avgRating: Number,
  cuisines:{ type: [String], default: [] } ,
  deliveryTime:Number
});

// Create the model
export const Restaurant = mongoose.model("Restaurant", restaurantSchema);


