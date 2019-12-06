const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "David"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "David"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    name: "David",
    title: "Help",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere minus sequi atque non aliquam dolor maxime sapiente doloribus cupiditate ullam, vero similique, excepturi tempore dolorum doloremque autem quia itaque totam."
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({
      error: "You must provide an address query"
    });
  } else {
    geocode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) return res.send({ error });
        forecast(latitude, longitude, (error, forecastData) => {
          if (error) return res.send({ error });

          res.send({
            forecast: forecastData,
            location: location,
            address: req.query.address
          });
        });
      }
    );
  }
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    name: "David",
    title: "Help article not found"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    name: "David",
    title: "Page not found"
  });
});

app.listen(port, () => {
  console.log(`Server is UP on port ${port}`);
});
