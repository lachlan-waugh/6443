const posts = [];

exports.push = (post) => {
    posts.push(post);
}

exports.pull = () => {
    return posts;
}