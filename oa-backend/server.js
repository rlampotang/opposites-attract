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
const port = parseInt(process.env.PORT, 10) || 5500;

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

app.get("/user/dashboard", async (req, res) => {
    const uid = req.uid;
    const ref = await db.ref(`users/${uid}/surveyProgress`).get();
    const surveyProgress = ref.val();
    const surveyData = surveyProgress?.survey;
    if (!surveyProgress || !surveyData) {
        return res.send({
            matches: null
        });
    }

    const usersRef = await db.ref("users").get();
    const users = usersRef.val();
    const matches = [];
    for (const [otherUid, otherUser] of Object.entries(users)) {
        if (otherUid === uid) continue;
        const otherSurvey = otherUser.surveyProgress?.survey ?? {};
        const match = {};
        for (const [key, value] of Object.entries(surveyData)) {
            if (otherSurvey[key] === value) {
                match[key] = value;
            }
        }
        matches.push({
            uid: otherUid,
            score: Object.keys(match).length,
        });
    }
    matches.sort((a, b) => b.score - a.score);

    res.send({
        matches: matches.slice(0, 3),
    });
});

app.get("/person*", async (req, res) => {
    const { uid } = req.query;
    const ref = await db.ref(`users/${uid}`).get();
    const user = ref.val();

    //Get user info from authentification
    const auth = getAuth();
    const {
        displayName,
        email,
        photoURL,
    } = await auth.getUser(uid);

    res.send({
        ...user,
        displayName,
        email,
        photoURL,
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