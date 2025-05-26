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