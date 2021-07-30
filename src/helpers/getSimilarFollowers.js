const getSimilarFollowers = (profileUserFollowers, loggedInUserFollowing) => {
    let similarFollowers = [];
    if(profileUserFollowers){
        profileUserFollowers.map(follower => {
            if(loggedInUserFollowing.includes(follower)) similarFollowers.push(follower);
        })
    };

    return similarFollowers;
};

export default getSimilarFollowers;