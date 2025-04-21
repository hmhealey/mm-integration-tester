import bodyParser from 'body-parser';
import express from 'express';

const mmUrl = process.env.MM_SERVICESETTINGS_SITEURL ?? 'http://localhost:8065';

const port = 3000;
const commandUrl = 'http://localhost:' + port;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.post('/dialog', (request, response) => {
    console.log('Responding to /dialog', request.body);

    response.sendStatus(200);

    const dialogResponse = {
        trigger_id: request.body.trigger_id,
        url: commandUrl + '/dialog/response',
        dialog: {
            callback_id: 'something',
            title: 'Test Dialog',
            elements: [
                {
                    display_name: 'User',
                    name: 'someuser',
                    type: 'select',
                    placeholder: 'Pick a user...',
                    data_source: 'users',
                },
            ],
            submit_label: 'Submit',
        },
    };

    fetch(mmUrl + '/api/v4/actions/dialogs/open', {
        body: JSON.stringify(dialogResponse),
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
    });
});

app.post('/dialog/response', (request, response) => {
    console.log('Received dialog response', request.body);

    response.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Listening on ${commandUrl}`);
});
