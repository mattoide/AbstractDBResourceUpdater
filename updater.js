const sqlite3 = require('sqlite3').verbose();

const replace_this = "https://media.abstract.it/media/"
const with_this = "https://media.abstract.it/dev-media/"

let db = new sqlite3.Database('./data.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to database.');
});

getRes(function (err, res){
    if(err)
        console.log(err)
    if (res)
        console.log('res')
})

function getRes(cb){
    let sql = `SELECT * FROM files WHERE url LIKE ?`;

    db.all(sql, [replace_this+"%"], (err,rows) =>{

        if(err){
            console.log("Error:")
            console.log(err)
        }


        if (rows && rows.length > 0){

            rows.forEach(row =>{
                let url = row.url.replace(replace_this, with_this);

                let sql = `UPDATE files SET url = ? WHERE url = ?`;

                db.all(sql, [url, row.url], (err, rows) =>{
                   if(err){
                       console.log("err update")
                       console.log(err)

                   }

                    if (rows && rows.length > 0) {
                        console.log("rows uodate")
                        console.log(rows)
                    }
                });

                let urlch4 = "";

                if(row.formats) {


                    let formats = row.formats.replace(replace_this, with_this);


                    let urlch1 = formats.toString().replace(replace_this, with_this)
                    let urlch2 = urlch1.toString().replace(replace_this, with_this)
                    let urlch3 = urlch2.toString().replace(replace_this, with_this)
                     urlch4 = urlch3.toString().replace(replace_this, with_this)
                }
                    sql = `UPDATE files
                           SET formats = ?
                           WHERE formats = ?`;

                    db.all(sql, [urlch4, row.formats], (err, rows) => {
                        if (err) {
                            console.log("err update")
                            console.log(err)

                        }

                        if (rows && rows.length > 0) {
                            console.log("rows uodate")
                            console.log(rows)
                        }
                    });



            })


            cb(null, "urls")

        } else {
            console.log("No data")
            cb(true, null)
        }
    })
}