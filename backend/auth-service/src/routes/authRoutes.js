const express = require("express");
const passport = require("passport");
const config = require("../../config/env");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

// Google rimanda qui. Se il login riesce NON restituiamo il JSON di Google:
// la sessione contiene già l'utente, quindi riportiamo il browser sul sito.
// Sarà la navbar a chiedere /me per sapere chi è loggato.
router.get("/google/callback",
  passport.authenticate("google", {
    //failureRedirect: "/login",
    failureRedirect: `${config.FRONTEND_URL}`,
  }),
  (req, res) => {
    //console.log(req.user);
    //res.json(req.user);
    res.redirect(config.FRONTEND_URL);
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
      res.redirect(config.FRONTEND_URL);
    });
  });
});

module.exports = router;