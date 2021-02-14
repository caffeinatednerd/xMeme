//jshint esversion:6

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/xmemeDB", {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

// Schema
xmemeSchema = mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    caption: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

// xmemeSchema.index({ name: 1, url: 1, caption: 1 }, { unique: true });

// Collection
const Meme = mongoose.model("Meme", xmemeSchema);

app.get("/", function(req, res) {
  Meme.find(function(err, memes) {
    if(err) {
      console.log(err);
    } else {
      res.render("list", {newListItems: memes});
      // mongoose.connection.close();
    }
  }).sort({ _id: -1 }).limit(100);

});


////////////////////////// Requests targeting all memes /////////////////////////
app.route("/memes")
  .get(function(req, res) {
    Meme.find(function(err, memes) {
      if(err) {
        console.log(err);
      } else {
        res.send(memes);
        // mongoose.connection.close();
      }
    }).sort({ _id: -1 }).limit(100);
  })

  .post(function(req, res) {
    const name_got = req.body.name;
    const url_got = req.body.url;
    const caption_got = req.body.caption;

    const meme = new Meme({
      name: name_got,
      url: url_got,
      caption: caption_got
    });

    Meme.exists({ name: name_got, url: url_got, caption: caption_got}, function (err, result) {
      if(err) {
          console.log(err);
      } else {
        if(result == false) {
          meme.save(function(err, saved_meme){
              if(!err) {
                const meme_id = saved_meme._id;
                // res.send(meme_id);
                console.log(meme_id);

                res.status(201).redirect("/");
              } else {
                console.log(err);
              }
          });
        } else {
          res.status(409).json({
            status: "409",
            message: "Meme with same parameters already exists"
          });
        }
      }
    });

  });


////////////////////////// Requests targeting a specific meme /////////////////////////
app.route("/memes/:id")
  .get(function(req, res) {
    Meme.findOne({_id: req.params.id}, function(err, foundMeme) {
      if(foundMeme) {
        res.send({
          _id: foundMeme._id,
          name: foundMeme.name,
          caption: foundMeme.caption,
          url: foundMeme.url,
        });
      } else {
        res.status(404).send({
          status: 404,
          message: 'Meme not found'
        });
      }
    });
  });


app.listen(8081, function () {
  console.log("Server started on port 8081");
});
