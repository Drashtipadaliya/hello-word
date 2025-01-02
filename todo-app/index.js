/* eslint-disable no-undef */
const app = require("./app");
const PORT = process.env.PORT || 3000; // Change to 4001 or any other available port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
