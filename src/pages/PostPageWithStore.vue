<template>
    <div>
        <h1>Page with posts</h1>
        <!-- <MyInput
            v-focus
            v-model="searchQuery"
            placeholder="Search..."
        /> -->
        <div class="app__btns">
             <MyButton
                @click="showDialog"
            >Create post</MyButton>
            <!-- <MySelect
                v-model="selectedSort"
                :options="sortOptions"
            /> -->
        </div>
        <MyDialog v-model:show="dialogVisible">
            <PostForm
                @create="createPost"
            />
        </MyDialog>

        <PostList 
            :posts="sortedAndSearchPosts"  
            @remove="removePost"
            v-if="!isPostsLoading"
        />
        <div v-else>Loading...</div>
        <div v-intersection="loadMorePosts" class="observer"></div>

    </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import MyDialog from '@/components/UI/MyDialog.vue';
import MyButton from '@/components/UI/MyButton.vue';
import axios from 'axios'
import MySelect from '@/components/UI/MySelect.vue';
import MyInput from '@/components/UI/MyInput.vue';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
    components: {
        PostList, PostForm
    },

    data() {
        return {
            dialogVisible: false,
        };
    },

    methods: {
        ...mapActions({
            loadMorePosts: 'post/loadMorePosts',
            fetchPosts: 'post/fetchPosts',
        }),
        ...mapMutations({  
            setPage: 'post/setPage'
        }),
        createPost(post) {
            this.posts.push(post)
            this.dialogVisible = false
        },
        removePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id)
        },
        showDialog() {
            this.dialogVisible = true
        },
        // Pagination with numbers
        // changePage(pageNumber) {
        //     this.page = pageNumber
        //     this.fetchPosts()
        // },
        
    },
    mounted() {
        //this.fetchPosts()
        // const options={
        //     rootMargin: '0px',
        //     threshold: 1.0
        // }
        // const callback = (entries, observer) => {
        //     if(entries[0].isIntersecting && this.page < this.totalPages) {
        //         this.loadMorePosts()
        //     }
        // };
        // const observer = new IntersectionObserver(callback, options);
        // observer.observe(this.$refs.observer)
    },
    computed: {
        ...mapState({
            posts: state => state. post. posts,
            isPostsLoading: state => state.post.isPostsLoading,
            selectedSort: state => state. post. selectedSort,
            searchQuery: state => state. post. searchQuery,
            page: state => state. post. page,
            limit: state => state. post. limit,
            totalPages: state => state. post. totalPages,
            sortOptions: state => state. post. sortOptions

        }),
        ...mapGetters({
            sortedPosts: 'post/sortedPosts',
            sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
        })
    }, 
    watch: {
        // selectedSort(newValue) {
        //     this.posts.sort((post1, post2) => {
        //         return post1[newValue]?.localeCompare(post2[newValue])
        //     })
        // }
    },
    components: { PostList, PostForm, MyDialog, MyButton, MySelect, MyInput }
}
</script>

<style>
.app__btns {
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
}
.page__wrapper {
    display: flex;
    margin-top: 15px;
}
.page {
    border: 1px solid teal;
    padding: 10px;
}
.current-page {
    border: 2px solid black;
}
.observer {
    height: 30px;
}
</style>