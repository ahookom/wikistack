var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});
var Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    }
},  {
    hooks: {
      beforeValidate: function(page) {
        console.log('made it');
        page.urlTitle = page.title.replace(/[^\w+]/g, '_');
      }
    },
  getterMethods: {
    route: function() {
      console.log('urlTitle ', this.getDataValue('urlTitle'));
      return '/wiki/' + this.getDataValue('urlTitle');}
  }
}
);

var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
    }
});

module.exports = {
  Page: Page,
  User: User
};
