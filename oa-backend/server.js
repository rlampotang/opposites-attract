require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const admin = require('firebase-admin');
const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getDatabase } = require('firebase-admin/database');
const { getAuth } = require('firebase-admin/auth');

const serviceAccount = require('./serviceAccount.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
});
const db = getDatabase();

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 5500;

app.get('/', (req, res) => res.send('Hello World!'));

app.use("*", async (req, res, next) => {
    const uid = req.headers.authorization;
    if (!uid) {
        return res.status(403).send("No user provided");
    }

    getAuth()
        .verifyIdToken(uid)
        .then((decodedToken) => {
            const uid = decodedToken.uid;
            req.uid = uid;
            next();
        })
        .catch((error) => {
            console.log("Error verifying token: " + error);
            res.status(500).send("Invalid token");
        });
});

app.get("/user/dashboard", (req, res) => {
    res.send({
        matches: null
    });
});

app.get("/user/surveyProgress", async (req, res) => {
    const uid = req.uid;
    const ref = await db.ref(`users/${uid}/surveyProgress`).get();
    const surveyProgress = ref.val();

    res.send({
        prog: surveyProgress?.prog ?? 0,
        survey: surveyProgress?.survey ?? {},
    });
});

app.post("/user/survey", async (req, res) => {
    const { surveyData = {} } = req.body;

    const uid = req.uid;
    await db.ref(`users/${uid}/surveyProgress`).set({
        prog: Object.keys(surveyData).length,
        survey: surveyData,
    });

    res.send({
        state: "success"
    });
});

app.listen(port, () => console.log(`Opposites-Attract Backend listening on port ${port}!`));