module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'telegram_id', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    // await queryInterface.addColumn('users', 'is_bot', {
    //   type: Sequelize.BOOLEAN,
    //   allowNull: false,
    //   defaultValue: false,
    // });
    // await queryInterface.addColumn('users', 'language_code', {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    //   defaultValue: 'uk',
    // });
  },
};
