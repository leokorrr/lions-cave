<template>
    <div class="now">
        <div class="header-underlined header-underlined--page-title">
            <h2 class="header header-underlined__text header-underlined__text--page-title">Now</h2>
            <div class="header-underlined__underline header-underlined__underline--page-title"></div>
        </div>
        <div class="posts-box">
            <div class="posts" v-if="posts && posts.length">
                <div class="post" v-for="(post, index) of posts" v-bind:key="index">
                    <p class="text text--big">“{{post.post_inner}}”</p>
                    <div class="post__date">
                        <span>- {{post.post_date}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'posts',
    data() {
        return {
            posts: [],
            apiLink: process.env.VUE_APP_BACKEND_URL
        }
    },
    created() {
        axios.get(`${this.apiLink}/api/posts`)
            .then(res => {
                this.posts = res.data
            })
            .catch(err => {
                console.log(err)
            })
    }
}
</script>
