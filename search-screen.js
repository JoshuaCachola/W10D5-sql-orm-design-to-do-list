// TODO: Import your models, here
const { Note, Task } = require('./models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
class SearchScreen {
  constructor(rl) {
    this.rl = rl;
  }

  async printUi() {
    console.clear();
    console.log("********************************************");
    console.log("* SEARCH ITEMS                  (c) 1987   *");
    console.log("********************************************");
    console.log();
    console.log("Please type your search term and hit Enter.");
    console.log();
  }

  async printResultsUi(term) {
    console.clear();
    console.log("********************************************");
    console.log("* SEARCH RESULTS                (c) 1987   *");
    console.log("********************************************");
    console.log();
    console.log("Your search matches");
    console.log();

    // TODO: Search the notes and to-do items
    const notes = await Note.findAll({
      where: {
        description: {
          [Op.substring]: term
        }
      }
    });

    const tasks = await Task.findAll({
      where: {
        desciption: {
          [Op.substring]: term
        }
      }
    });

    // models.Note.findAll({
    //   include: {
    //     model: models.Task
    //   }
    // });
    // require:row
    for (let i = 0; i < notes.length; i++) {
      console.log(`${i + 1}. ${notes[i].description}`);
    }

    for (let i = 0; i < tasks.length; i++) {
      console.log(`${i + notes.length + 1}. ${tasks[i].name}`);
    }

    // const notesAndTasks = [...notes, ...tasks];
    // notesAndTasks.forEach((todo, i) => console.log(`${i + 1}. ${todo.name}`));
    // TODO: Print them out

    console.log();
  }

  async show() {
    await this.printUi();
    this.rl.question("> ", async term => {
      await this.printResultsUi(term);
      this.rl.question("Enter to return to the main screen. ", () => {
        const screen = new MainScreen(this.rl);
        screen.show();
      });
    });
  }
}

exports.SearchScreen = SearchScreen;

const { MainScreen } = require('./main-screen');

// https://sequelize.org/v5/manual/querying.html