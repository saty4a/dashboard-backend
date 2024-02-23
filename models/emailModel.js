import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
    email: {type: String},
});

let email;
try {
    email = mongoose.connection.model("email");
} catch (error) {
    email = mongoose.model("email", emailSchema)
}

export const emailModel = email;