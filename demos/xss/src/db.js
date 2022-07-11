import express from 'express';

const posts = [];

export const db_push = (content) => {
    posts.push({content: content, image: ''});
}

export const db_pull = () => {
    return posts;
}