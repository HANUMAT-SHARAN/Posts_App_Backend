const express = require("express");
const { authenticate } = require("../Middlewares/authenticate");
const { PostModel } = require("../Models/PostModel");
const PostRouter = express.Router();

PostRouter.use(authenticate);

PostRouter.post("/posts/create", async (req, res) => {
  console.log(req.body);
  let newPost = new PostModel(req.body);
  await newPost.save();
  res.send({ msg: "Post Uploaded Success" });
});
// // /{
//     "_id": "63f352b9f55c32d416dfad40",
//     "title": "mai hun don",
//     "body": "maza nah arha ",
//     "device": "Mobile",
//     "no_if_comments": 4,
//     "__v": 0
//   },


//chimkad
PostRouter.get("/posts", async (req, res) => {
  const { userId } = req.body;
  const { device, device1, device2 } = req.query;
  try {
    if (device) {
      let particularPosts = await PostModel.find({ userId, device });
      res.send(particularPosts);
    } else if ((device1&& device2)) {
      let arr=[]
      let d1=await PostModel.find({ userId, device:device1 });
      let d2=await PostModel.find({ userId, device:device2 });
      arr=[...d1,...d2]
      res.send(arr)
    } else {
      let userPosts = await PostModel.find({ userId: userId });
      res.send(userPosts);
    }
  } catch (error) {
    res.send("Error");
  }
});
PostRouter.get("/posts/top", async (req, res) => {
  const { userId } = req.body;
  try {
    let userPosts = await PostModel.find({ userId: userId })
      .sort({ no_if_comments: -1 })
      .limit(1);
    console.log(userPosts);
    res.send(userPosts);
  } catch (error) {
    res.send("Error");
  }
});

PostRouter.delete("/posts/delete/:id", async (req, res) => {
  const p = req.params.id;
  const { userId } = req.body;
  console.log(p);
  await PostModel.findByIdAndDelete(p);
  res.send({ msg: "Post Deleted success" });
});
PostRouter.patch("/posts/update/:id", async (req, res) => {
  const p = req.params.id;
  const { userId } = req.body;
  console.log(p);
  await PostModel.findByIdAndUpdate(p, req.body);
  res.send({ msg: "Post Updated success" });
});

module.exports = { PostRouter };
