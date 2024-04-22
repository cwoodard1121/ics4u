
const mongoose = require('mongoose');
const connectionstring =  'mongodb+srv://cameronwoodard1121:lAFpKvlMbvbMtt1A@ics4u.2naegbn.mongodb.net/?retryWrites=true&w=majority&appName=ics4u'


mongoose.connect(connectionstring, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => {
    try {
        console.log("Successfully connected to db.");
    } catch (err) {
        console.log("issue connecting to db");
    }
});