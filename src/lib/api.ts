import axios from 'axios';

const API_BASE_URL = 'https://aiekip.com/api'

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type":'application/json'
    }
})

export const PostsAPI = {
    getAllPosts: () => api.get('/posts/'),
    getPostBySlug: (slug: string) => api.get(`/posts/${slug}/`),
    getPostDetails: (slug: string) => api.get(`/posts/${slug}/details/`),
    
}


export const CommentsAPI = {
    getComments: (postId: string) => api.get(`/posts/${postId}/details`),
    createComment: (postId: string, data: { content: string, parent?: string }) =>
        api.post('/comments/', {
            post: postId,
            ...data
        }),
}

export default api;
// specificly designed for Django AI Ekip