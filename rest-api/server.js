import express from 'express'

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

let students = [
    {id: 1, name: 'omer', age: 16},
    {id: 2, name: 'john', age: 22}
];

app.get('/api/students',(req, res) => {
    res.send(students);
})

app.get('/api/students',(req,res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if(!student) return res.status(404).send('Student not found.');
    res.send(student);
})

app.post('/api/students',(req,res) => {
    const student = {
        id: students.length + 1,
        name: req.body.name,
        age: req.body.age
    }
    students.push(student);
    res.send(student);
});

app.put('/api/students/:id',(req,res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if(!student) return res.status(404).send('Student not found.');

    student.name = req.body.name;
    student.age = req.body.age;

    res.send(student);
})

app.delete('/api/students/:id', (req,res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));

    if(!student) return res.status(404).send('Student not found.');

    const index = students.indexOf(student);
    students.splice(index, 1);

    res.send(student);
})

app.listen(PORT,() => console.log(`server started on port ${PORT}`))

