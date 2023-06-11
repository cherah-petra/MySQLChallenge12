const db = mysql.createConnection(
    {
        host: 'Local_Challenge12',
        user: 'root',
        password: 'password',
        database: 'employee_tracker'
    },
    console.log('connected to the database')
    )

app.get('/', (req, res) => {
    db.query('SELECT * FROM employee WHERE first_name = ?',  'Jim', (err, results) => {
        res.json(results);
    });
});