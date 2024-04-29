<template>
    <div class="container">
        <h1>Your Friends</h1>
        <button class="btn btn-primary pull-right my-3" @click="addFriend">+ Add Friend</button>
        <div class="row">
            <div class="col-lg-3" v-for="friend in friends" :key="friend.id">
                <div class="card card-one">
                    <div class="header">
                        <div v-if="friend.profileImage" class="avatar">
                            <img :src="'http://localhost:8080/api/images/' + friend.profileImage" alt="">
                        </div>
                        <div v-else class="avatar">
                            <img :src="'../src/assets/userprofile.png'" alt="">
                        </div>
                    </div>
                    <h3><a href="#" class="btn stretched-link" id="profileName" @click="navigateToFriend(friend.id)">{{ friend.firstName }}</a></h3>
                    <div class="desc">{{ friend.firstName }} {{ friend.lastName }}</div>
                    <div class="contacts">
                        <a class="text removeFriend" data-bs-toggle="collapse"
                            :href="'#collapseExample' + friend.id" role="button" aria-expanded="false" :aria-controls="'collapseExample' + friend.id">
                            See more
                        </a>
                        <div class="collapse" :id="'collapseExample' + friend.id">
                            <button class="btn btn-danger" @click="removeFriend(friend.id)">
                                <h5><img src="@/assets/icons/remove-white.svg" style="width: 30px"> Remove friend</h5>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { FriendService } from '@/api';
import type { UserDTO } from '@/api';

const router = useRouter();
const friends = ref();

function addFriend() {
    router.push('/add-friend');
}

const navigateToFriend = (friendID: number) => {
    router.push('/profile/' + friendID);
};

const removeFriend = async (friendID: number) => {
    try {
        // Attempt to delete the friend from the backend.
        await FriendService.deleteFriendOrFriendRequest({ friendId: friendID });
        // Update the friends list by filtering out the removed friend.
        friends.value = friends.value.filter((friend: UserDTO) => friend.id !== friendID);
    } catch (error) {
        console.error('Failed to remove friend', error);
    }
};


const setupFriends = async () => {
    try {
        const response = await FriendService.getFriends();
        friends.value = response;
        console.log(response);
    } catch (error) {
        console.error('Failed to fetch friends', error);
    }
};

onMounted(() => {
    setupFriends();
});
</script>


<style scoped>
body {
    background-color: #f0f6ff;
    color: #28384d;

}

/*social */
.card-one {
    position: relative;
    width: 300px;
    background: #fff;
    box-shadow: 0 10px 7px -5px rgba(0, 0, 0, 0.4);
}

.card {
    margin-bottom: 35px;
    padding-bottom: 1rem;
    box-shadow: 0 10px 20px 0 rgba(26, 44, 57, 0.14);
    border: none;
}

.follower-wrapper li {
    list-style-type: none;
    color: #fff;
    display: inline-block;
    float: left;
    margin-right: 20px;
}

.social-profile {
    color: #fff;
}

.social-profile a {
    color: #fff;
}

.social-profile {
    position: relative;
    margin-bottom: 150px;
}

.social-profile .user-profile {
    position: absolute;
    bottom: -75px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    left: 50px;
}

.social-nav {
    position: absolute;
    bottom: 0;
}

.social-prof {
    color: #333;
    text-align: center;
}

.social-prof .wrapper {
    width: 70%;
    margin: auto;
    margin-top: -100px;
}

.social-prof img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-bottom: 20px;
    border: 5px solid #fff;
    /*border: 10px solid #70b5e6ee;*/
}

.social-prof h3 {
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 0;
}

.social-prof p {
    font-size: 18px;
}

.social-prof .nav-tabs {
    border: none;
}

.card .nav>li {
    position: relative;
    display: block;
}

.card .nav>li>a {
    position: relative;
    display: block;
    padding: 10px 15px;
    font-weight: 300;
    border-radius: 4px;
}

.card .nav>li>a:focus,
.card .nav>li>a:hover {
    text-decoration: none;
    background-color: #eee;
}

.card .s-nav>li>a.active {
    text-decoration: none;
    background-color: #3afe;
    color: #fff;
}

.text-blue {
    color: #3afe;
}

ul.friend-list {
    margin: 0;
    padding: 0;
}

ul.friend-list li {
    list-style-type: none;
    display: flex;
    align-items: center;
}

ul.friend-list li:hover {
    background: rgba(0, 0, 0, .1);
    cursor: pointer;
}

ul.friend-list .left img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-right: 20px;
}

ul.friend-list li {
    padding: 10px;
}

ul.friend-list .right h3 {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 0;
}

ul.friend-list .right p {
    font-size: 11px;
    color: #6c757d;
    margin: 0;
}

.social-timeline-card .dropdown-toggle::after {
    display: none;
}

.info-card h4 {
    font-size: 15px;
}

.info-card h2 {
    font-size: 18px;
    margin-bottom: 20px;
}

.social-about .social-info {
    font-size: 16px;
    margin-bottom: 20px;
}

.social-about p {
    margin-bottom: 20px;
}

.info-card i {
    color: #3afe;
}

.card-one {
    position: relative;
    width: 300px;
    background: #fff;
    box-shadow: 0 10px 7px -5px rgba(0, 0, 0, 0.4);
}

.card-one .header {
    position: relative;
    width: 100%;
    height: 60px;
    background-color: #3afe;
}

.card-one .header::before,
.card-one .header::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: inherit;
}

.card-one .header::before {
    -webkit-transform: skewY(-8deg);
    transform: skewY(-8deg);
    -webkit-transform-origin: 100% 100%;
    transform-origin: 100% 100%;
}

.card-one .header::after {
    -webkit-transform: skewY(8deg);
    transform: skewY(8deg);
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
}

.card-one .header .avatar {
    position: absolute;
    left: 50%;
    top: 30px;
    margin-left: -50px;
    z-index: 5;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    background: #ccc;
    border: 3px solid #fff;
}

.card-one .header .avatar img {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 100px;
    height: auto;
}

.card-one h3 {
    position: relative;
    margin: 80px 0 30px;
    text-align: center;
}

.card-one h3::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    margin-left: -15px;
    width: 30px;
    height: 1px;
    background: #000;
}

.card-one .desc {
    padding: 0 1rem 2rem;
    text-align: center;
    line-height: 1.5;
    color: #777;
}

#gallery li {
    width: 24%;
    float: left;
    margin: 6px;

}

.removeFriend {
    text-wrap: nowrap;
}

.contacts {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

#profileName {
    font-size: 1.5rem;
    font-weight: 600;
    width: 100%;
}
</style>