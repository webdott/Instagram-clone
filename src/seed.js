// NOTE: replace 'b58cCbArfDRejQ4FXN3etRtEq7n2' with your Firebase auth user id (can be taken from Firebase)
export function seedDatabase(firebase) {
    const users = [
    {
        userId: 'b58cCbArfDRejQ4FXN3etRtEq7n2',
        username: '__webdot',
        fullName: 'Uchechuwku Nwafor',
        emailAddress: 'nwaforuchechukwu2007@gmail.com',
        following: ['2'],
        followers: ['2', '3', '4'],
        dateCreated: Date.now()
    },
    {
        userId: '2',
        username: 'snincode',
        fullName: 'Abdulrazaq Sodiq',
        emailAddress: 'razaqi@bleh.com',
        following: [],
        followers: ['b58cCbArfDRejQ4FXN3etRtEq7n2'],
        dateCreated: Date.now()
    },
    {
        userId: '3',
        username: 'swiss_se',
        fullName: 'Seun Awodele',
        emailAddress: 'swiss@tooswiss.com',
        following: [],
        followers: ['b58cCbArfDRejQ4FXN3etRtEq7n2'],
        dateCreated: Date.now()
    },
    {
        userId: '4',
        username: 'unknownthoth',
        fullName: 'Shalom Tata',
        emailAddress: 'thoth@trojan.com',
        following: [],
        followers: ['b58cCbArfDRejQ4FXN3etRtEq7n2'],
        dateCreated: Date.now()
    }
    ];

    for (let k = 0; k < users.length; k++) {
        firebase.firestore().collection('users').add(users[k]);
    }

    for (let i = 1; i <= 5; ++i) {
    firebase
        .firestore()
        .collection('photos')
        .add({
        photoId: i,
        userId: '2',
        imageSrc: `/images/users/uche/${i}.jpg`,
        caption: '🐐🐐🐐🐐',
        likes: [],
        comments: [
            {
                displayName: '__webdot',
                comment: 'Look at curry man!! so inspirational'
            },
            {
                displayName: 'swiss_se',
                comment: 'Greatest shooter of all time!!'
            }
        ],
        userLatitude: '40.7128°',
        userLongitude: '74.0060°',
        dateCreated: Date.now()
        });
    }
}  