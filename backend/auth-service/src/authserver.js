require("dotenv").config();

const express = require("express");
const session = require("express-session");
const passport = require("../config/passport");
const env = require("../config/env");
const googleAuthRoutes = require("./routes/authRoutes");

const app = express();
app.set("trust proxy", 1);

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true, // il JS del browser non può leggere il cookie
      sameSite: "lax", // necessario per il ritorno da Google (navigazione top-level)
      secure: env.NODE_ENV === "production", // solo HTTPS in produzione
      maxAge: 1000*60*60*8 //8 ore
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", googleAuthRoutes);

app.listen(env.AUTH_PORT, () => {
  console.log(`Auth Server avviato sulla porta ${env.AUTH_PORT}`);
});
