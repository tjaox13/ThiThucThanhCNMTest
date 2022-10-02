const express = require('express');
const app = express();
const port = 3000;

app.use(express.json({ extended: false}));
app.use(express.static('./views'));
app.set('view engine', 'ejs');
app.set('views', './views')


const AWS = require('aws-sdk');
const config = new AWS.Config({
    accessKeyId: 'AKIATKO6XXVP5EBYWQ7P',
    secretAccessKey: '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',
    region: 'ap-southreast-1'
});

AWS.config = config;

const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = 'SanPham';
const multer = require('multer');
const upload = multer();
app.get('/', (request, response) => {
    const params = {
        TableName: tableName,
    }

    docClient.scan(params, (err, data) => {
        if (err) {
            response.send('Internal Server Error');
        } else {
            return response.render('index', {sanPhams: data.Items});
        }
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
