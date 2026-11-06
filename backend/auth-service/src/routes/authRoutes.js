const express = require("express");
const passport = require("passport");
const env = require("../../config/env");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    // failureRedirect: "/login",
    failureRedirect: `${env.FRONTEND_URL}`,
  }),
  (req, res) => {

    //console.log(req.user);

    //res.send("Login Google completato");
    //res.json(req.user);
    res.redirect(env.FRONTEND_URL);
  }
);

// Usata dalla navbar: restituisce solo ciò che serve all'interfaccia
router.get("/me", (req, res) => {
  // risposta dipendente dalla sessione: mai in cache
  res.set("Cache-Control", "no-store");

  if (!req.isAuthenticated()) { // json non autenticato
    return res.json({ authenticated: false});
  }
  res.json({ // json autenticato
    authenticated: true,
    firstName: req.user.firstName, // restituzione del nome dell'utente
    
  });

});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return next(err);

    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.redirect(env.FRONTEND_URL);
    });
  });
});

module.exports = router;