<template>
    <div v-show="posts.length > 0">
        <h3>Posts list</h3>
        <transition-group name="post-list">
            <PostItem 
                v-for="post in posts" 
                :post="post"
                :key="post.id"
                @remove="$emit('remove', post)"
            />
        </transition-group>
    </div>
    <h2 v-show="posts.length === 0" style="color: red">
        List is empty!
    </h2>
</template>

<script>
import PostItem from './PostItem.vue';

    export default {
    props: {
        posts: {
            type: Array,
            required: true
        }
    },
    components: { PostItem }
}
</script>

<style scoped>
.post-list-item{
    display:inline-block;
    margin-right:10px;
}
.post-list-enter-active,
.post-list-leave-active{
    transition:all 0.3s ease;
}
.post-list-enter-from,
.post-list-leave-to{
    opacity:0;
    transform:translateX(130px);
}
.post-list-move {
    transition:transform 0.3s ease;
}
</style>