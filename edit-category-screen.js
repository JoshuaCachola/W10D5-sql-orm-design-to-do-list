// TODO: import your models, here
const { Category } = require('./models');

class EditCategoryScreen {
  constructor(rl, categoryId) {
    this.rl = rl;
    this.categoryId = categoryId;
  }

  async printUi() {
    // TODO: Get the category by its index
    const category = await Category.findByPk(this.categoryId + 1);
    console.clear();
    console.log("********************************************");
    console.log("* EDIT CATEGORY                 (c) 1987   *");
    console.log("********************************************");
    console.log();

    console.log(category.name);
    // TODO: Show the category name here

    console.log();
    console.log("What would you like to rename it? Hit");
    console.log("\"Enter\" when you are done.");
    console.log();
  }

  async show() {
    await this.printUi();
    this.rl.question("> ", async newCategoryName => {

      // TODO: Get the category by its categoryId that was passed in through the
      //       constructor and is stored in this.categoryId
      // TODO: Update it with the new category name
      // TODO: Save it
      const category = await Category.findByPk(this.categoryId + 1);
      category.name = newCategoryName;
      await category.save();
      new ManageCategoriesScreen(this.rl).show();
    });
  }
}

exports.EditCategoryScreen = EditCategoryScreen;

// Requires at bottom to prevent circular dependencies problems in node
const { ManageCategoriesScreen } = require('./manage-categories-screen');
