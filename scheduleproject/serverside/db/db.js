const mongoose = require('mongoose');

const password = "zJTnvdzF14QZkpm8";

const connectionString = `mongodb+srv://cwoodard:${password}@cluster0.mpal0rg.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Database connected')).catch((err) => console.log(err));

