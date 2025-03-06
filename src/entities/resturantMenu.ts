import { number, string } from "joi";
import mongoose from "mongoose";
console.log("HEY IAM")
// Define the schema
 const restaurantMenuSchema = new mongoose.Schema({
   _id: Number,
    name: String,
    costForTwo: String,
    cloudinaryImageId: String,
    avgRating: Number,
    menu: {
      type: [
        {
          name: String,
          price: Number,
          image: String,
          category: String,
          description: String
        }
      ],
      default: []
    },
    deliveryTime: Number
  });

// Create the model
export const RestaurantMenu = mongoose.model("restaurantMenu",  restaurantMenuSchema);


