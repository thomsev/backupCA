document.addEventListener('DOMContentLoaded', () => {
    getUserInfo();
    getUserPosts();
});

async function getUserInfo() {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch(`${API_BASE_URL}/api/v1/users/${user.id}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error('Error fetching user info');
        }

        const data = await response.json();
        document.getElementById('username').textContent = data.name;
    } catch (error) {
        console.error('Error fetching user info:', error);
    }
}

async function getUserPosts() {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch(`${API_BASE_URL}/api/v1/users/${user.id}/posts`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error('Error fetching user posts');
        }

        const posts = await response.json();
        const postsList = document.getElementById('posts-list');

        posts.forEach(post => {
            const listItem = document.createElement('li');
            listItem.textContent = post.content;
            postsList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching user posts:', error);
    }
}
