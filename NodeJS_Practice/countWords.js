const { Command } = require("commander");
const fs = require("fs");
const program = new Command();

// Providing CLI Name (Usage), Desc, version
program
  .name("countWords")
  .description("CLI to count words or letters in a file based on a seperator.")
  .version("1.0.0");

// Command List
program
  .command("count")
  .description("Count words in a File")
  .argument("<file>", "File Path")
  .option("-s, --separator <char>", "Separator Character", " ")
  .action((file, options) => {
    fs.readFile(file, "utf-8", (err, data) => {
      try {
        console.log(options.separator);
        const splittedString = data.split(options.separator);
        console.log(splittedString);
        console.log(`No. of words is ${splittedString.length}`);
      } catch (err) {
        console.log("Error reading file !");
        console.error(err);
      }
    });
  });

program.parse();
