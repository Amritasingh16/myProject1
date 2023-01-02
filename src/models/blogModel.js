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
        },

        category: {
            type: String,
            required: true
        },
        subcategory:
        {
            type: [String]

        },
        isPublished: {
            type: Boolean,
            default: false,
        },

        publishedAt: {
            type: Date,
            default: Date.now()
        },

        isDeleted: {
            type: Boolean,
            default: false
        },
        deletedAt: {
            type: Date,
            default: Date.now()
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("blogDataBase",blogSchema);