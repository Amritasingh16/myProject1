const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        body: {
            type: String,
            require:true
        },
        authorId: {
            type: ObjectId,
            required: true,
            ref: "Author"

        },
        tags: {
        type: [String],
        lowercase: true
        },

        category: {
            type: String,
            required: true,
            lowercase: true
        },
        subcategory:
        {
            type: [String],
            lowercase: true

        },
        isPublished: {
            type: Boolean,
            default: false,
        },

        publishedAt: {
            type: Date
        },

        isDeleted: {
            type: Boolean,
            default: false
        },
        deletedAt: {
            type: Date
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("blogDataBase",blogSchema);