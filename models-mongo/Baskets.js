var mongoose = require('mongoose');
var Schema = mongoose.Schema;
if (mongoose.connection.readyState === 0) {
  // mongoose.connect(require('./connection-string'));
  // mongoose.connect('mongodb://localhost:27017/usersdb', { useNewUrlParser: true, useUnifiedTopology: true })

}


var newSchema = new Schema({

//  'user_id': { type: String },

  'createdAt': { type: Date, default: Date.now },
  'updatedAt': { type: Date, default: Date.now }
});

newSchema.pre('save', function(next){
  this.updatedAt = Date.now();
  next();
});

newSchema.pre('update', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

newSchema.pre('findOneAndUpdate', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});



module.exports = mongoose.model('Baskets', newSchema);
