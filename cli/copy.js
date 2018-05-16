const fs = require("fs-extra");
function copy() {
  try {
    fs.copySync("./src/lib", "./build/lib");
    console.log("./src/libs success!");
  } catch (e) {
    console.error(err);
  }
}
copy();
