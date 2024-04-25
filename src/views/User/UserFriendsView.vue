<template>
  <!-- Refactor with a for-loop -->
    <div class="container">
        <h1>Your Friends</h1>
        <button class="btn btn-primary pull-right my-3" @click="addFriend">+ Add Friend</button>
        <div class="row">
            <div class="col-lg-3">
                <div class="card card-one">
                    <div class="header">
                        <div class="avatar">
                            <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="">
                        </div>
                    </div>
                    <h3>Amillie Price</h3>
                  <a href="#" @click="navigateToFriend(46)" class="btn  stretched-link"></a>
                    <div class="desc">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit et cupiditate deleniti.
                    </div>
                    <div class="contacts">
                        <a class="text removeFriend" data-bs-toggle="collapse" href="#collapseExample" role="button"
                            aria-expanded="false" aria-controls="collapseExample">
                            See more
                        </a>

                        <div class="collapse" id="collapseExample">
                            <button class="btn btn-danger">
                               
                                <h5> <img src="@/assets/icons/remove-white.svg" style="width: 30px"> Remove friend</h5>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="card card-one">
                    <div class="header">
                        <div class="avatar">
                            <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="">
                        </div>
                    </div>
                    <h3>Victoria Fox</h3>
                    <div class="desc">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit et cupiditate deleniti.
                    </div>
                    <div class="contacts">
                        <a class="text removeFriend" data-bs-toggle="collapse" href="#collapseExample" role="button"
                            aria-expanded="false" aria-controls="collapseExample">
                            See more
                        </a>

                        <div class="collapse" id="collapseExample">
                            <button class="btn btn-danger">
                               
                                <h5> <img src="@/assets/icons/remove-white.svg" style="width: 30px"> Remove friend</h5>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="card card-one">
                    <div class="header">
                        <div class="avatar">
                            <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="">
                        </div>
                    </div>
                    <h3>Coray Shoe</h3>
                    <div class="desc">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit et cupiditate deleniti.
                    </div>
                    <div class="contacts">
                        <a class="text removeFriend" data-bs-toggle="collapse" href="#collapseExample" role="button"
                            aria-expanded="false" aria-controls="collapseExample">
                            See more
                        </a>

                        <div class="collapse" id="collapseExample">
                            <button class="btn btn-danger">
                               
                                <h5> <img src="@/assets/icons/remove-white.svg" style="width: 30px"> Remove friend</h5>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="card card-one">
                    <div class="header">
                        <div class="avatar">
                            <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="">
                        </div>
                    </div>
                    <h3>Christiano Mooray</h3>
                    <div class="desc">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit et cupiditate deleniti.
                    </div>
                    <div class="contacts">
                        <a class="text removeFriend" data-bs-toggle="collapse" href="#collapseExample" role="button"
                            aria-expanded="false" aria-controls="collapseExample">
                            See more
                        </a>

                        <div class="collapse" id="collapseExample">
                            <button class="btn btn-danger">
                               
                                <h5> <img src="@/assets/icons/remove-white.svg" style="width: 30px"> Remove friend</h5>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-3">
                <div class="card card-one">
                    <div class="header">
                        <div class="avatar">
                            <img src="https://bootdey.com/img/Content/avatar/avatar4.png" alt="">
                        </div>
                    </div>
                    <h3>Lynda West</h3>
                    <div class="desc">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit et cupiditate deleniti.
                    </div>
                    <div class="contacts">
                        <a class="text removeFriend" data-bs-toggle="collapse" href="#collapseExample" role="button"
                            aria-expanded="false" aria-controls="collapseExample">
                            See more
                        </a>

                        <div class="collapse" id="collapseExample">
                            <button class="btn btn-danger">
                               
                                <h5> <img src="@/assets/icons/remove-white.svg" style="width: 30px"> Remove friend</h5>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="card card-one">
                    <div class="header">
                        <div class="avatar">
                            <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="">
                        </div>
                    </div>
                    <h3>Jayden G</h3>
                    <div class="desc">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit et cupiditate deleniti.
                    </div>
                    <div class="contacts">
                        <a class="text removeFriend" data-bs-toggle="collapse" href="#collapseExample" role="button"
                            aria-expanded="false" aria-controls="collapseExample">
                            See more
                        </a>

                        <div class="collapse" id="collapseExample">
                            <button class="btn btn-danger">
                               
                                <h5> <img src="@/assets/icons/remove-white.svg" style="width: 30px"> Remove friend</h5>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="card card-one">
                    <div class="header">
                        <div class="avatar">
                            <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="">
                        </div>
                    </div>
                    <h3>Julia Ann</h3>
                    <div class="desc">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit et cupiditate deleniti.
                    </div>
                    <div class="contacts">
                        <a class="text removeFriend" data-bs-toggle="collapse" href="#collapseExample" role="button"
                            aria-expanded="false" aria-controls="collapseExample">
                            See more
                        </a>

                        <div class="collapse" id="collapseExample">
                            <button class="btn btn-danger">
                               
                                <h5> <img src="@/assets/icons/remove-white.svg" style="width: 30px"> Remove friend</h5>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="card card-one">
                    <div class="header">
                        <div class="avatar">
                            <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="">
                        </div>
                    </div>
                    <h3>Ava Ray</h3>
                    <div class="desc">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit et cupiditate deleniti.
                    </div>
                    <div class="contacts">
                        <a class="text removeFriend" data-bs-toggle="collapse" href="#collapseExample" role="button"
                            aria-expanded="false" aria-controls="collapseExample">
                            See more
                        </a>

                        <div class="collapse" id="collapseExample">
                            <button class="btn btn-danger">
                               
                                <h5> <img src="@/assets/icons/remove-white.svg" style="width: 30px"> Remove friend</h5>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="card card-one">
                    <div class="header">
                        <div class="avatar">
                            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="">
                        </div>
                    </div>
                    <h3>Maria Shwenstiger</h3>
                    <div class="desc">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit et cupiditate deleniti.
                    </div>
                    <div class="contacts">
                        <a class="text removeFriend" data-bs-toggle="collapse" href="#collapseExample" role="button"
                            aria-expanded="false" aria-controls="collapseExample">
                            See more
                        </a>

                        <div class="collapse" id="collapseExample">
                            <button class="btn btn-danger">
                               
                                <h5> <img src="@/assets/icons/remove-white.svg" style="width: 30px"> Remove friend</h5>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="card card-one">
                    <div class="header">
                        <div class="avatar">
                            <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="">
                        </div>
                    </div>
                    <h3>Kate Perry</h3>
                    <div class="desc">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit et cupiditate deleniti.
                    </div>
                    <div class="contacts">
                        <a class="text removeFriend" data-bs-toggle="collapse" href="#collapseExample" role="button"
                            aria-expanded="false" aria-controls="collapseExample">
                            See more
                        </a>

                        <div class="collapse" id="collapseExample">
                            <button class="btn btn-danger">
                               
                                <h5> <img src="@/assets/icons/remove-white.svg" style="width: 30px"> Remove friend</h5>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="card card-one">
                    <div class="header">
                        <div class="avatar">
                            <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="">
                        </div>
                    </div>
                    <h3>Robart Gibbs</h3>
                    <div class="desc">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit et cupiditate deleniti.
                    </div>
                    <div class="contacts">
                        <a class="text removeFriend" data-bs-toggle="collapse" href="#collapseExample" role="button"
                            aria-expanded="false" aria-controls="collapseExample">
                            See more
                        </a>

                        <div class="collapse" id="collapseExample">
                            <button class="btn btn-danger">
                               
                                <h5> <img src="@/assets/icons/remove-white.svg" style="width: 30px"> Remove friend</h5>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="card card-one">
                    <div class="header">
                        <div class="avatar">
                            <img src="https://bootdey.com/img/Content/avatar/avatar5.png" alt="">
                        </div>
                    </div>
                    <h3>Anna Winslet</h3>
                    <div class="desc">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit et cupiditate deleniti.
                    </div>
                    <div class="contacts">
                        <a class="text removeFriend" data-bs-toggle="collapse" href="#collapseExample" role="button"
                            aria-expanded="false" aria-controls="collapseExample">
                            See more
                        </a>

                        <div class="collapse" id="collapseExample">
                            <button class="btn btn-danger">
                               
                                <h5> <img src="@/assets/icons/remove-white.svg" style="width: 30px"> Remove friend</h5>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted, computed } from "vue";


import { useUserInfoStore } from '@/stores/UserStore';

const userStore = useUserInfoStore();

const createdQuizzes = ref(1);
const createdQuizzesIsEmpty = ref(null);
const coAuthorQuizzes = ref(null);
const coAuthorQuizzesIsEmpty = ref(null);
const router = useRouter();

let userid = ref("");

async function fetchUserData() {

}

function addFriend() {
    router.push('/add-friend');
}

// Define the navigateToQuiz method
const navigateToFriend = (friendID :string) => {
router.push('/profile/' + friendID)
};

const removeFriend = (friendID) => {

};

onMounted(fetchUserData);
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
</style>