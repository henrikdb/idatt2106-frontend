<script setup lang="ts">
import { ref } from 'vue'
import { FriendService } from '@/api';

async function addFriend(friendID: number) {
    const response = await FriendService.addFriendRequest({ userId: friendID });
    console.log(response);
}
</script>


<template>
    <div class="container">
        <h1>Add Friend</h1>
        <div class="row">
            <form class="col-md-5" id="searchBox" role="search">
                <input class="form-control me-2 custom-border" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-success" type="submit">Search</button>
            </form>
            <div class="col-md-8">
                <div class="people-nearby">
                    <div class="nearby-user">
                        <div class="row">
                            <div class="col-md-2 col-sm-2">
                                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="user"
                                    class="profile-photo-lg">
                            </div>
                            <div class="col-md-7 col-sm-7">
                                <h5><a href="#" class="profile-link">Sophia Page</a></h5>
                                <p>Software Engineer</p>
                                <p class="text-muted">500m away</p>
                            </div>
                            <div class="col-md-3 col-sm-3">
                                <button class="btn btn-primary pull-right" @click="addFriend(1)">Add Friend</button>
                            </div>
                        </div>
                    </div>
                    <div class="nearby-user">
                        <div class="row">
                            <div class="col-md-2 col-sm-2">
                                <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="user"
                                    class="profile-photo-lg">
                            </div>
                            <div class="col-md-7 col-sm-7">
                                <h5><a href="#" class="profile-link">Emma Johnson</a></h5>
                                <p>Model at Fashion</p>
                                <p class="text-muted">800m away</p>
                            </div>
                            <div class="col-md-3 col-sm-3">
                                <button class="btn btn-primary pull-right">Add Friend</button>
                            </div>
                        </div>
                    </div>
                    <div class="nearby-user">
                        <div class="row">
                            <div class="col-md-2 col-sm-2">
                                <img src="https://bootdey.com/img/Content/avatar/avatar5.png" alt="user"
                                    class="profile-photo-lg">
                            </div>
                            <div class="col-md-7 col-sm-7">
                                <h5><a href="#" class="profile-link">Nora Wilson</a></h5>
                                <p>Writer at Newspaper</p>
                                <p class="text-muted">2.5km away</p>
                            </div>
                            <div class="col-md-3 col-sm-3">
                                <button class="btn btn-primary pull-right">Add Friend</button>
                            </div>
                        </div>
                    </div>
                    <div class="nearby-user">
                        <div class="row">
                            <div class="col-md-2 col-sm-2">
                                <img src="https://bootdey.com/img/Content/avatar/avatar4.png" alt="user"
                                    class="profile-photo-lg">
                            </div>
                            <div class="col-md-7 col-sm-7">
                                <h5><a href="#" class="profile-link">Diana Amber</a></h5>
                                <p>Student</p>
                                <p class="text-muted">700m away</p>
                            </div>
                            <div class="col-md-3 col-sm-3">
                                <button class="btn btn-primary pull-right">Add Friend</button>
                            </div>
                        </div>
                    </div>
                    <div class="nearby-user">
                        <div class="row">
                            <div class="col-md-2 col-sm-2">
                                <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="user"
                                    class="profile-photo-lg">
                            </div>
                            <div class="col-md-7 col-sm-7">
                                <h5><a href="#" class="profile-link">Addison Thomas</a></h5>
                                <p>Barber at Fashion</p>
                                <p class="text-muted">1.5km away</p>
                            </div>
                            <div class="col-md-3 col-sm-3">
                                <button class="btn btn-primary pull-right">Add Friend</button>
                            </div>
                        </div>
                    </div>
                    <div class="nearby-user">
                        <div class="row">
                            <div class="col-md-2 col-sm-2">
                                <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="user"
                                    class="profile-photo-lg">
                            </div>
                            <div class="col-md-7 col-sm-7">
                                <h5><a href="#" class="profile-link">Jonathon Thompson</a></h5>
                                <p>Fashion Designer</p>
                                <p class="text-muted">2km away</p>
                            </div>
                            <div class="col-md-3 col-sm-3">
                                <button class="btn btn-primary pull-right">Add Friend</button>
                            </div>
                        </div>
                    </div>
                    <div class="nearby-user">
                        <div class="row">
                            <div class="col-md-2 col-sm-2">
                                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="user"
                                    class="profile-photo-lg">
                            </div>
                            <div class="col-md-7 col-sm-7">
                                <h5><a href="#" class="profile-link">Olivia Steward</a></h5>
                                <p>Creative Director</p>
                                <p class="text-muted">2km away</p>
                            </div>
                            <div class="col-md-3 col-sm-3">
                                <button class="btn btn-primary pull-right">Add Friend</button>
                            </div>
                        </div>
                    </div>
                    <div class="nearby-user">
                        <div class="row">
                            <div class="col-md-2 col-sm-2">
                                <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="user"
                                    class="profile-photo-lg">
                            </div>
                            <div class="col-md-7 col-sm-7">
                                <h5><a href="#" class="profile-link">Elena Foster</a></h5>
                                <p>Executive Officer</p>
                                <p class="text-muted">4km away</p>
                            </div>
                            <div class="col-md-3 col-sm-3">
                                <button class="btn btn-primary pull-right">Add Friend</button>
                            </div>
                        </div>
                    </div>
                    <div class="nearby-user">
                        <div class="row">
                            <div class="col-md-2 col-sm-2">
                                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="user"
                                    class="profile-photo-lg">
                            </div>
                            <div class="col-md-7 col-sm-7">
                                <h5><a href="#" class="profile-link">Brian Walton</a></h5>
                                <p>Designer at Designer</p>
                                <p class="text-muted">3km away</p>
                            </div>
                            <div class="col-md-3 col-sm-3">
                                <button class="btn btn-primary pull-right">Add Friend</button>
                            </div>
                        </div>
                    </div>
                    <div class="nearby-user">
                        <div class="row">
                            <div class="col-md-2 col-sm-2">
                                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="user"
                                    class="profile-photo-lg">
                            </div>
                            <div class="col-md-7 col-sm-7">
                                <h5><a href="#" class="profile-link">Cris Haris</a></h5>
                                <p>General Manager at Manager</p>
                                <p class="text-muted">1km away</p>
                            </div>
                            <div class="col-md-3 col-sm-3">
                                <button class="btn btn-primary pull-right">Add Friend</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
body {
    margin-top: 20px;
    background: #FAFAFA;
}

.people-nearby .google-maps {
    background: #f8f8f8;
    border-radius: 4px;
    border: 1px solid #f1f2f2;
    padding: 20px;
    margin-bottom: 20px;
}

.people-nearby .google-maps .map {
    height: 300px;
    width: 100%;
    border: none;
}

.people-nearby .nearby-user {
    padding: 20px 0;
    border-top: 1px solid #f1f2f2;
    border-bottom: 1px solid #f1f2f2;
    margin-bottom: 20px;
}

img.profile-photo-lg {
    height: 80px;
    width: 80px;
    border-radius: 50%;
}

#searchBox {
    margin-bottom: 20px;
    display: flex;
    text-wrap: nowrap;
}

.row {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.form-control.custom-border {
    border-color: #222223;
    /* Change to your desired color */
}
</style>