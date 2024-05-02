
const mongoose = require('mongoose');
const connectionstring =  'mongodb+srv://cameronwoodard1121:lAFpKvlMbvbMtt1A@ics4u.2naegbn.mongodb.net/?retryWrites=true&w=majority&appName=ics4u'


mongoose.connect(connectionstring, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(()=>console.log("database connected :)")).catch((err)=>console.log("THERE WAS A Fricking ERROR: " + err));
