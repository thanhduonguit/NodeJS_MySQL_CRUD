const controller = {}

controller.list = (req, res) => {
    req.getConnection( (err, conn) => {
        conn.query('SELECT * FROM customer', (err, customers) => {
            if (err) {
                res.json(err)
            }
            res.render('customers', {
                data: customers
            })
        })
    })
}

// add
controller.save = (req, res) => {
    const data = req.body
    console.log(req.body)
    req.getConnection( (err, conn) => {
        conn.query('INSERT INTO customer set ?', data, (err, customer) => {
            //console.log(customer)
            res.redirect('/')
        })
    })
}

// get edit
controller.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM customer WHERE id = ?", [id], (err, rows) => {
            res.render('customer_edit', {
                data: rows[0]
            })
        });
    });
};

// post edit
controller.update = (req, res) => {
    const { id } = req.params;
    const newCustomer = req.body;
    req.getConnection((err, conn) => {
        conn.query('UPDATE customer set ? where id = ?', [newCustomer, id], (err, rows) => {
            res.redirect('/');
        });
    });
};

// delete
controller.delete = (req, res) => {
    //console.log(req.params)
    const { id } = req.params;
    req.getConnection((err, connection) => {
        connection.query('DELETE FROM customer WHERE id = ?', [id], (err, rows) => {
            res.redirect('/');
        });
    });
}

module.exports = controller