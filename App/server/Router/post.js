var express = require("express");
const { Counter } = require("../Model/Counter");
const { Post } = require("../Model/Post");
const { User } = require("../Model/User");
var router = express.Router();
const multer = require("multer");
const setUpload = require("../util/upload.js");

router.post("/submit", (req, res) => {
  let temp = {
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
  };
  Counter.findOne({ name: "counter" })
    .exec()
    .then((counter) => {
      temp.postNum = counter.postNum;
      User.findOne({ uid: req.body.uid })
        .exec()
        .then((userInfo) => {
          temp.author = userInfo._id;
          const communityPost = new Post(temp);
          communityPost
            .save()
            .then(() => {
              Counter.updateOne(
                { name: "counter" },
                { $inc: { postNum: 1 } }
              ).then(res.status(200).json({ success: true }));
            })
            .catch((err) => {
              res.status(400).json({ success: false, err });
            });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/list", (req, res) => {
  let sort = {};
  if (req.body.sort === "최신순") {
    sort.createdAt = -1;
  } else {
    sort.repleNum = -1;
  }
  Post.find({
    $or: [
      { title: { $regex: req.body.SearchTerm } },
      { content: { $regex: req.body.SearchTerm } },
    ],
  })
    .populate("author")
    .sort(sort)
    .skip(req.body.skip)
    .limit(5)
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, postList: doc });
    })
    .catch((err) => {
      res.status(400).json({ success: false, err });
    });
});
router.post("/detail", (req, res) => {
  Post.findOne({ postNum: Number(req.body.postNum) })
    .populate("author")
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, post: doc });
    })
    .catch((err) => {
      res.status(400).json({ success: false, err });
    });
});

router.post("/edit", (req, res) => {
  let temp = {
    title: req.body.title,
    content: req.body.content,
  };
  Post.updateOne({ postNum: Number(req.body.postNum) }, { $set: temp })
    .exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.status(400).json({ success: false, err });
    });
});

router.post("/delete", (req, res) => {
  Post.deleteOne({ postNum: Number(req.body.postNum) })
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.status(400).json({ success: false, err });
    });
});

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "image/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage }).single("file");

// router.post("/image/upload", (req, res) => {
//   upload(req, res, (err) => {
//     if (err) {
//       res.status(400).json({ success: false });
//     } else {
//       res.status(200).json({ success: true, filePath: res.req.file.path });
//     }
//   });
// });

router.post("/image/upload", setUpload("panda/post"), (req, res, next) => {
  res.status(200).json({ success: true, filePath: res.req.file.location });
});

module.exports = router;
