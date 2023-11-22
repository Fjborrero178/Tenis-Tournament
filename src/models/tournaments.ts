import { Schema, model, models } from "mongoose";

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