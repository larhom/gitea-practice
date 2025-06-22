export class UserGenerator {
    randomSuffix = Date.now();

    users = {
        QaAutoUser1: {
            randomSuffix: this.randomSuffix,
            username: `QaAuto_user1${this.randomSuffix}`,
            email: `larhom+QaAuto_user1${this.randomSuffix}@qamadness.com`,
            password: 'Qa_test123',
            fullName: 'Klavdiia Petrivna',
            biography: 'Klavdiia Petrivna lorem ipsum',
            website: 'https://loremipsum1.com',
            location: 'Kalynivka'
        },

        QaAutoUser2: {
            randomSuffix: this.randomSuffix,
            username: `QaAuto_user2${this.randomSuffix}`,
            email: `larhom+QaAuto_user2${this.randomSuffix}@qamadness.com`,
            password: 'Qa_test123',
            fullName: 'Klavdiy Petrovych',
            biography: 'Klavdiy Petrovych lorem ipsum',
            website: 'https://loremipsum2.net',
            location: 'Yablunivka'
        },
    }
}

export const testApiUsers = {
    QaAutoUser1: {
        username: `QaAuto_user11750601210964`,
        email: `larhom+QaAuto_user11750601210964@qamadness.com`,
        password: 'Qa_test123',
        fullName: "Test API",
        biography: "Test API lorem ipsum",
        website: "https://loremipsum1.com",
        location: "Paris",
        apiKey: 'f4bfc11d7f7368d1395d6fb63bc5e438aecbd532'
    },

    QaAutoUser2: {
        username: `QaAuto_user21750601212037`,
        email: `larhom+QaAuto_user21750601212037@qamadness.com`,
    }
}
