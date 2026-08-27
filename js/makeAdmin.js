const admin = require("../config/firebase");
const { getAuth } = require("firebase-admin/auth");

const email = "admin@marketgo.com";

async function makeAdmin() {
    try {
        const auth = getAuth();

        const user = await auth.getUserByEmail(email);

        await auth.setCustomUserClaims(user.uid, {
            admin: true
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

makeAdmin();