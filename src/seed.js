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

    for (let i = 1; i <= 2; ++i) {
    firebase
        .firestore()
        .collection('photos')
        .add({
        photoId: i*8,
        userId: '4',
        imageSrc: `/images/users/tata/${i}.jpg`,
        caption: 'Never forget',
        likes: [],
        comments: [
            
        ],
        userLatitude: '540.7128°',
        userLongitude: '740.0060°',
        dateCreated: Date.now()
        });
    }

    for (let i = 1; i <= 3; ++i) {
    firebase
        .firestore()
        .collection('photos')
        .add({
        photoId: i*20,
        userId: 'b58cCbArfDRejQ4FXN3etRtEq7n2',
        imageSrc: `/images/users/uche/${i}.jpg`,
        caption: 'Hello there',
        likes: [],
        comments: [
            
        ],
        userLatitude: '54.7137°',
        userLongitude: '90.0160°',
        dateCreated: Date.now()
        });
    }
    
}  