// const express = require("express");
// const app = express();

// const userModel = require("./usermodel");

// app.get("/", (req, res) => {
//   res.send("hey");
// });

// app.get("/create", async (req, res) => {
//   let createduser = await userModel.create({
//     name: "Ranjita",
//     username: "Ranju",
//     email: "ranju@gmail.com",
//   });
//   res.send(createduser);
// });

// app.get("/update", async (req, res) => {
//   let updateduser = await userModel.findOneAndUpdate(
//     { email: "sachin@gmail.com" },
//     { name: "Sachin naik" },
//     { new: true }
//   );
//   res.send(updateduser);
// });

// app.get("/read", async (req, res) => {
//   let readuser = await userModel.find();
//   res.send(readuser);
// });

// app.get("/delete", async (req, res) => {
//   let deleteduser = await userModel.findOneAndDelete({ name: "Ranjita" });
//   res.send(deleteduser);
// });

// app.listen(3000);

//----------------------------------------------

const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/read", async (req, res) => {
  try {
    let users = await userModel.find();
    res.render("read", { users });
  } catch (error) {
    res.status(500).send("Error fetching users: " + error.message);
  }
});

app.get("/create", (req, res) => {
  res.render("create");
});

// Route to render form for editing a user
app.get("/edit/:id", async (req, res) => {
  try {
    // Find user by _id in MongoDB
    let user = await userModel.findOne({ _id: req.params.id });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.render("edit", { user });
  } catch (error) {
    res.status(500).send("Error fetching user: " + error.message);
  }
});

// Route to handle updating a user
app.post("/update/:id", async (req, res) => {
  const { name, email, image } = req.body;
  
  try {
    // Find user by _id and update fields
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: req.params.id },
      { name, email, image },
      { new: true } // Return updated document
    );

    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    res.redirect("/read");
  } catch (error) {
    res.status(500).send("Error updating user: " + error.message);
  }
});

app.get("/delete/:id", async (req, res) => {
  let users = await userModel.findOneAndDelete({ _id: req.params.id });
  res.redirect("/read");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
