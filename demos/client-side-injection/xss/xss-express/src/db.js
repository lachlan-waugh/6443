let posts = [];

export const db_push = (content) => {
    posts.push(content);
};

export const db_pull = () => {
    return posts;
};

export const db_clear = () => {
    posts = []
};