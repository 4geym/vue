<template>
    <div>
        <h1>Page with posts</h1>
        <MyInput
            v-focus
            v-model="searchQuery"
            placeholder="Search..."
        />
        <div class="app__btns">
             <MyButton
                @click="showDialog"
            >Create post</MyButton>
            <MySelect
                v-model="selectedSort"
                :options="sortOptions"
            />
        </div>
        <MyDialog v-model:show="dialogVisible">
            <PostForm
                @create="createPost"
            />
        </MyDialog>
        <!-- :posts="posts" for watch  -->
        <!-- :posts="sortedPosts" for computed solo  -->
        <PostList 
            :posts="sortedAndSearchPosts"  
            @remove="removePost"
            v-if="!isPostsLoading"
        />
        <div v-else>Loading...</div>
        <div v-intersection="loadMorePosts" class="observer"></div>
        <!-- Pagination with number -->
        <!-- <div class="page__wrapper">
            <div 
                v-for="pageNumber in totalPages" 
                :key="pageNumber"
                class="page"
                :class="{
                    'current-page': page === pageNumber
                }"
                @click="changePage(pageNumber)"
            >{{ pageNumber }}</div>
        </div> -->
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

export default {
    components: {
        PostList, PostForm
    },

    data() {
        return {
            posts: [],
            dialogVisible: false,
            isPostsLoading: false,
            selectedSort: '',
            searchQuery: '',
            page: 1,
            limit: 10,
            totalPages: 0,
            sortOptions: [
                {value: 'title', name: 'Name'},
                {value: 'body', name: 'Description'}
            ]
        };
    },

    methods: {
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
        async fetchPosts() {
            try {
                this.isPostsLoading = true
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit
                    }
                })
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                this.posts = response.data
            } catch (error) {
                alert(e)
            } finally {
                this.isPostsLoading = false
            }
        },
        async loadMorePosts() {
            try {
                this.page += 1
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit
                    }
                })
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                this.posts = [...this.posts, ...response.data]
            } catch (error) {
                alert(e)
            }
        },
    },
    mounted() {
        this.fetchPosts()
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
        sortedPosts() {
            return [...this.posts].sort((post1, post2) => {
                return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
            })
        },
        sortedAndSearchPosts() {
            return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLocaleLowerCase()))
        }
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