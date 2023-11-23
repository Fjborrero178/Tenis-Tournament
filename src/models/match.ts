import { Schema, model, models } from "mongoose";
/**
 This section defines the schema for a match, specifying various properties like local, vistante, email, data,time,place. It also includes validation rules such as required fields and email format validation. 
 */
const MatchSchema = new Schema({
      local: {
        type: String,
        required: [true, "local is required"],
    },
      emaillocal: {
        type: String,
        required: [true, "Email local  is required"],
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Email is invalid",
        ],
    },
    visitante:{
        type: String,
        required: [true, "visitante is required"],
      },
      emailvisitante: {
        type: String,
        required: [true, "Email Visitante is required"],
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Email is invalid",
        ],
      },
      date: {
        type: String,
        required: [true, "date is required"],
       
      },
      time: {
        type: String,
        required: [true, "time is required"],
    },
    place: {
        type: String,
        required: [true, "place is required"],
    },
})

const Match= models.Match || model('Match', MatchSchema)

export default Match;