const mongoose = require("mongoose")

const connection = mongoose.connect("mongodb+srv://amarjeet:amarjeet@cluster0.b4efj1j.mongodb.net/nemmasai?retryWrites=true&w=majority")

module.exports = {connection}