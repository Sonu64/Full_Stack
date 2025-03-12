const { Command } = require("commander");
const fs = require("fs");
const program = new Command();

// Providing CLI Name (Usage), Desc, version
program
  .name("count")
  .description(
    "CLI to count words, sentences or occurences of a separator in file."
  )
  .version("1.0.0");

// Commands List
// Words
program
  .command("count_words")
  .description("Count words in a File")
  .argument("<file>", "File Path")
  .action((file, options) => {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) {
        console.log("Error reading file !");
        console.error(err);
        return;
      }
      const splittedString = data.trim().split(" ");
      //console.log(splittedString);
      console.log(`No. of words in ${file} is ${splittedString.length}`);
    });
  });

// Sentences
program
  .command("count_sentences")
  .description("Count sentences in a File")
  .argument("<file>", "File Path")
  .action((file, options) => {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) {
        console.log("Error reading file !");
        console.error(err);
        return;
      }
      const splittedString = data.split("\n");
      //console.log(splittedString);
      console.log(`No. of sentences in ${file} is ${splittedString.length}`);
    });
  });

// Separator
program
  .command("count_on_separator")
  .description("Count in a File based on separator")
  .argument("<file>", "File Path")
  .option("-s, --separator <char>", "separator character", " ")
  .action((file, options) => {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) {
        console.log("Error reading file !");
        console.error(err);
        return;
      }
      const splittedString = data.split(options.separator);
      //console.log(splittedString);
      console.log(
        `No. of occurences of ${options.separator} in ${file} is ${
          splittedString.length - 1
        }.`
      );
    });
  });

// Parsing
program.parse();
