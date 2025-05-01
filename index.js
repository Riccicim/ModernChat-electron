const express = require("express");
const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

let win;
let application = express();

application.set("view engine", "ejs");

application.use(express.static(__dirname + "/public"));

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "app/js/preload.js"),
    },
  });

  application.listen(3000, () => console.log("Server started on port 3000."));

  win.loadURL("http://localhost:3000/");
  win.focus();
}

app.whenReady().then(() => {
  createWindow();
  Menu.setApplicationMenu(null);
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});




application.get("/", (req, res) => {
  res.render("login");
});
application.get("/register", (req, res) => {
  res.render("register");
});
application.get("/login", (req, res) => {
  res.render("login");
});
application.get("/verification", (req, res) => {
  res.render("verification");
});
application.get("/chat", (req, res) => {
  res.render("chat");
});
