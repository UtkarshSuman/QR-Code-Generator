import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
import open from "open";

async function generateQR() {
  const { URL } = await inquirer.prompt([
    { message: "Type the URL:", name: "URL" }
  ]);

  const filePath = "qr_img.png";

  const qr_svg = qr.image(URL);
  qr_svg.pipe(fs.createWriteStream(filePath));

  fs.writeFileSync("URL.txt", URL);

  qr_svg.on("end", () => {
    open(filePath);
    console.log("QR code opened!");
  });
}

generateQR();