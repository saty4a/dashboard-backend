import mongoose from "mongoose";

const textSchema = new mongoose.Schema({
    place: {type: String},
    text: {type: String},
});

let text;
try {
    text = mongoose.connection.model("changeText");
} catch (error) {
    text = mongoose.model("changeText", textSchema)
}

export const textModel = text;