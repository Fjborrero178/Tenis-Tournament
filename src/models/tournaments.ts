import { Schema, model, models } from "mongoose";

/**
 This section defines the schema for a tournament, specifying various properties like name, lastName,and password. It also includes validation rules such as required fields.
 */
const TournamentSchema = new Schema({
      local: {
        type: String,
    },
    visitante:{
        type: String,
       
      },
      date: {
        type: String,
        required: [true, "place is required"],
       
      },
      time: {
        type: String,
        required: [true, "place is required"],
    },
    place: {
        type: String,
        required: [true, "place is required"],
    },
})

const Tournament= models.Tournament || model('Tournament', TournamentSchema)

export default Tournament;