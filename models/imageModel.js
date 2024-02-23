import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    place: {type: String},
    imageUrl: {type: String},
});

let image;
try {
    image = mongoose.connection.model("image");
} catch (error) {
    image = mongoose.model("image", imageSchema)
}

export const imageModel = image;