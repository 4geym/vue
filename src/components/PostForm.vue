<template>
    <div>
        <form @submit.prevent>
            <h4>Create post</h4>
            <MyInput 
                v-focus
                v-model="post.title"
                type="text" 
                placeholder="Name"
            />
            <MyInput 
                v-model="post.body"
                type="text" 
                placeholder="Description"
            />
            <MyButton 
                style="align-self: flex-end; margin-top: 15px;"
                @click="createPost"
            >Create</MyButton>
        </form>
    </div>
</template>

<script>
import MyButton from './UI/MyButton.vue';
import MyInput from './UI/MyInput.vue';

    export default {
    data() {
        return {
            post: {
                title: "",
                body: ""
            }
        };
    },
    methods: {
        createPost(e) {
            this.post.id = Date.now();
            this.$emit("create", this.post);
            this.post = {
                title: "",
                body: ""
            };
        }
    },
    components: { MyButton, MyInput, MyInput }
}
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
}
</style>