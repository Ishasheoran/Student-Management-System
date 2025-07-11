import app from "./app.js";
app.get("/", (req, res) => {
  res.send("Hello Render!");
});
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
