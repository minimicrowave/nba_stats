let conditionCmd1 = process.argv[2]
let conditionGrp1 = process.argv[3];
let condition1 = process.argv[4];
let conditionGrp2 = process.argv[5];
let condition2 = process.argv[6];
var text;

const pg = require('pg');

const configs = {
    user: 'Serene',
    host: '127.0.0.1',
    database: 'nba_db',
    port: 5432,
};

const client = new pg.Client(configs);


let queryDoneCallback= (err, result) => {
    if (err) {
        console.log("Query error: ", err.message);
    } else {
        result.rows.forEach((eachResult) => {
            console.log(`${result.rows.id}. ${result.rows.name} | AGE: ${result.rows.age} | TEAM: ${result.rows.id} | GAMES: ${result.rows.games} | POINTS: ${result.rows.points}`)
        })
    }
}

client.connect((err) => {
    if (err) {
        console.log("oops you have an error: ", err.message);

    } else {
        if (process.argv.length === 5) {
            text = `SELECT * FROM players ${conditionCmd1} ${conditionGrp1} = ${condition1};`;
            console.log(text);
            client.query(text, queryDoneCallback);

        } else if (process.argv === 6) {
            text = `SELECT * FROM players ${conditionCmd1} ${conditionGrp1} ${condition1}, ${conditionGrp2};`;
            client.query(text, queryDoneCallback);

        } else if (process.argv === 7) {
            text = `SELECT * FROM players ${conditionCmd1} ${conditionGrp1} ${condition1} AND ${conditionGrp2} ${condition2};`;
            client.query(text, queryDoneCallback);

        } else {
            console.log("Input not recognised");
        }

    }
})

// idea is that the process.argv.length assumes the fn executed by client.connect. undone.