'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    description: DataTypes.TEXT
  }, {});
  Note.associate = function(models) {
    // associations can be defined here
  };
  return Note;
};