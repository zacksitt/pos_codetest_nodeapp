const mongoose = require('mongoose')
const commonMdl = require("./common");
const mongo = require('../lib/mongo');

const agentSchema = mongoose.Schema({
    
    id: {
      type: Number,
      required: true,
      unique:true
    },
    cms_user_id:{
        type: Number,
        required: true
    },
    name: {
      type: String,
      required:true  
    },
    conv_key:{
      type: String,
      required:true
    },
    created_at: {
        type: Date,
    },
    updated_at: {
      type: Date,
    }
})

agentSchema.methods.AddNewAgent = async function(data) {

  // Generate an auth token for the user
  const agent = this
  // const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
  // user.token = token;
  // user.tokens = user.tokens.concat({token})

  let usql = "select * from user where id = ?";
  let users = await commonMdl.query(usql,[data.admin_id]);

  if(users && users[0]){

    let u = users[0];
    let conv_key = data.channel;

    agent.id = await mongo.getID("agents");
    agent.cms_user_id = data.admin_id;
    agent.name = u.name;
    agent.conv_key = conv_key;
    agent.created_at = new Date();
    agent.updated_at = new Date();
    await agent.save();
    // agent.insert(newAgent);
  }
  

  //await agent.save()
  //return token
}

agentSchema.pre('save', async function (next) {
    next()
})

const adminLog = mongoose.model('agents', agentSchema)
module.exports = adminLog