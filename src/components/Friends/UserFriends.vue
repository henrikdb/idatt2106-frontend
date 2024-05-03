<template>
  <div class="container" style="margin-bottom: 3rem">
    <h1 class="my-3">Dine venner</h1>
    <div>
      <button class="btn pull-right" @click="addNewFriends" id="addFriend">+ Legg til venn</button>
      <div class="my-3">
        <button class="btn pages" @click="setupFriends" :class="{ 'active-tab': showFriends }">
          Dine venner
        </button>
        <button class="btn pages" @click="requestFriend" :class="{ 'active-tab': showRequests }">
          Venneforespørsler
        </button>
      </div>
    </div>
    <div v-if="showFriends">
      <div v-if="elementsInFriends">
        <div class="row">
          <div class="friendBox d-flex flex-wrap" v-for="friend in friends" :key="friend.id">
            <div class="card card-one">
              <div class="header">
                <div v-if="friend.profileImage" class="avatar">
                  <img :src="apiUrl + '/api/images/' + friend.profileImage" alt="" />
                </div>
                <div v-else class="avatar">
                  <img :src="'../src/assets/userprofile.png'" alt="" />
                </div>
              </div>
              <h3>
                <router-link
                  to=""
                  data-cy="navigateToFriend"
                  href="#"
                  class="btn stretched-link"
                  id="profileName"
                  @click="navigateToFriend(friend.id)"
                  >{{ friend.firstName }} {{ friend.lastName }}</router-link
                >
              </h3>
              <div class="desc">{{ friend.firstName }} {{ friend.lastName }}</div>
              <div class="contacts">
                <a
                  class="text removeFriend"
                  data-bs-toggle="collapse"
                  :href="'#collapseExample' + friend.id"
                  role="button"
                  aria-expanded="false"
                  :aria-controls="'collapseExample' + friend.id"
                >
                  Se mer
                </a>
                <div class="collapse" :id="'collapseExample' + friend.id">
                  <button class="btn btn-danger" @click="removeFriend(friend.id)">
                    <h5>
                      <img src="@/assets/icons/remove-white.svg" style="width: 30px" /> Fjern venn
                    </h5>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>Ingen venner</div>
    </div>
    <div v-else-if="showRequests" class="row">
      <div class="content-body">
        <div v-if="elementsInFriendRequest" id="requests">
          <div class="request" v-for="friend in friendRequests" :key="friend.id">
            <div v-if="friend.profileImage !== null">
              <img
                id="profilePicture"
                :src="apiUrl + '/api/images/' + friend.profileImage"
                alt="bruker"
                class="profile-photo-lg"
              />
            </div>
            <div v-else>
              <img
                id="profilePicture"
                :src="'../src/assets/userprofile.png'"
                alt="bruker"
                class="profile-photo-lg"
              />
            </div>
            <h2>{{ friend.firstName }}</h2>
            - <button class="btn btn-success mx-2" @click="acceptRequest(friend.id)">Godta</button>
            <button class="btn btn-danger" @click="rejectRequest(friend.id)">Avslå</button>
          </div>
        </div>
        <div v-else>Ingen venneforespørsler</div>
      </div>
    </div>
    <div
      v-if="showAddFriend"
      class="modal"
      tabindex="-1"
      role="dialog"
      style="display: block; background-color: rgba(0, 0, 0, 0.5)"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Legg til venn</h5>
            <button
              type="button"
              class="close btn-close"
              @click="showAddFriend = false"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body d-flex justify-content-center align-items-center flex-column">
            <form
              class="col-md-10 d-flex justify-content-center align-items-center flex-row my-4"
              id="searchBox"
              role="search"
              @submit.prevent="searchProfile(searchWord)"
            >
              <input
                class="form-control me-2 custom-border"
                type="search"
                placeholder="Søk"
                aria-label="Søk"
                v-model="searchWord"
              />
              <button class="btn btn-success" type="submit">Søk</button>
            </form>
            <div class="col-md-12">
              <div class="people-nearby">
                <div v-for="user in searchedUsers" :key="user.id" class="nearby-user">
                  <div class="row d-flex align-items-center">
                    <div class="col-md-2 col-sm-2">
                      <div v-if="user.profileImage !== null">
                        <img
                          id="profilePicture"
                          :src="apiUrl + '/api/images/' + user.profileImage"
                          alt="bruker"
                          class="profile-photo-lg"
                        />
                      </div>
                      <div v-else>
                        <img
                          id="profilePicture"
                          :src="'../src/assets/userprofile.png'"
                          alt="bruker"
                          class="profile-photo-lg"
                        />
                      </div>
                    </div>
                    <div class="col-md-7 col-sm-7">
                      <h5>
                        <a href="#" class="profile-link" @click="toUserProfile(user.id)"
                          >{{ user.firstName }} {{ user.lastName }}</a
                        >
                      </h5>
                    </div>
                    <div class="col-md-3 col-sm-3">
                      <button
                        class="btn btn-primary pull-right"
                        @click="addFriend(user.id)"
                        :disabled="friendRequestsSent[user.id]"
                        v-if="!friendRequestsSent[user.id]"
                      >
                        Legg til venn
                      </button>
                      <button
                        class="btn btn-secondary pull-right"
                        disabled
                        v-if="friendRequestsSent[user.id]"
                      >
                        Forespørsel sendt
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Ref, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { FriendService, UserService } from '@/api'
import handleUnknownError from '@/components/Exceptions/unkownErrorHandler'

let apiUrl = import.meta.env.VITE_APP_API_URL

const router = useRouter()

// Declaring reactive variables
const friends = ref()
const showFriends = ref(true)
const showRequests = ref(false)
const showAddFriend = ref(false)
const friendRequests = ref([] as any)
const addFriends = ref([] as any)
const searchedUsers = ref([] as any)

const friendRequestsSent: Ref<Record<number, boolean>> = ref({})
const searchWord = ref('')

const elementsInFriendRequest = ref(false)
const elementsInFriends = ref(false)

/**
 * Navigates to the user profile page based on the given user ID.
 *
 * @param {number} userId The ID of the user whose profile will be navigated to.
 */
const toUserProfile = (userId: number) => {
  router.push('/profile/' + userId)
}

/**
 * Searches for user profiles based on the provided search term.
 *
 * @param {string} searchTerm The term to be used for searching user profiles.
 */
const searchProfile = async (searchTerm: string) => {
  const userPayload = {
    searchTerm: searchTerm as string,
    filter: 'NON_FRIENDS' as string
  }
  try {
    const response = await UserService.getUsersByNameAndFilter(userPayload)
    searchedUsers.value = response
    console.log(response)
  } catch (error) {
    handleUnknownError(error)
    console.error('Failed to search for profile', error)
  }
}

/**
 * Adds new friends to the user's friend list.
 */
const addNewFriends = async () => {
  const userPayload = {
    amount: 6 as number,
    filter: 'NON_FRIENDS' as string
  }
  try {
    const response = await UserService.getRandomUsers(userPayload)
    searchedUsers.value = response
    showAddFriend.value = true
  } catch (error) {
    handleUnknownError(error)
    console.error('Failed to add friend', error)
  }
}

/**
 * Sends a friend request to the specified user.
 *
 * @param {number} friendID The ID of the user to whom the friend request will be sent.
 */
async function addFriend(friendID: number) {
  try {
    await FriendService.addFriendRequest({ userId: friendID })
    // Use a spread to update the state and keep immutability
    friendRequestsSent.value = { ...friendRequestsSent.value, [friendID]: true }
  } catch (error) {
    handleUnknownError(error)
    console.error('Failed to send friend request', error)
  }
}

/**
 * Fetches friend requests and updates the state accordingly.
 */
async function requestFriend() {
  showRequests.value = true
  showFriends.value = false
  try {
    const response = await FriendService.getFriendRequests()
    friendRequests.value = response
    elementsInFriendRequest.value = response.length > 0
    console.log('Friend requests: ' + response)
  } catch (error) {
    handleUnknownError(error)
    console.error('Failed to fetch friend requests', error)
  }
}

/**
 * Navigates to the profile page of the specified friend.
 *
 * @param friendID The ID of the friend whose profile will be navigated to.
 */
const navigateToFriend = (friendID: number) => {
  router.push('/profile/' + friendID)
}

/**
 * Removes the specified friend from the user's friend list.
 *
 * @param friendID The ID of the friend to be removed.
 */
const removeFriend = async (friendID: number) => {
  try {
    await FriendService.deleteFriendOrFriendRequest({ friendId: friendID })
    const responseFriends = await FriendService.getFriends()
    friends.value = responseFriends
  } catch (error) {
    handleUnknownError(error)
    console.error('Failed to remove friend', error)
  }
}

/**
 * Sets up the user's friends by fetching and updating the friends list.
 */
const setupFriends = async () => {
  showFriends.value = true
  showRequests.value = false
  try {
    const response = await FriendService.getFriends()
    friends.value = response
    elementsInFriends.value = response.length > 0
    console.log(response)
  } catch (error) {
    handleUnknownError(error)
    console.error('Failed to fetch friends', error)
  }
}

/**
 * Accepts a friend request with the specified request ID.
 *
 * @param {number} requestID The ID of the friend request to be accepted.
 */
const acceptRequest = async (requestID: number) => {
  try {
    await FriendService.acceptFriendRequest({ friendId: requestID })
    const responseRequest = await FriendService.getFriendRequests()
    friendRequests.value = responseRequest
    const responseFriends = await FriendService.getFriends()
    friends.value = responseFriends
  } catch (error) {
    handleUnknownError(error)
    console.error('Failed to accept friend request', error)
  }
}

/**
 * Rejects a friend request with the specified request ID.
 *
 * @param {number} requestID The ID of the friend request to be rejected.
 */
const rejectRequest = async (requestID: number) => {
  try {
    await FriendService.deleteFriendOrFriendRequest({ friendId: requestID })
    const response = await FriendService.getFriendRequests()
    friendRequests.value = response
  } catch (error) {
    handleUnknownError(error)
    console.error('Failed to reject friend request', error)
  }
}

/**
 * Initializes the component by setting up the user's friends.
 */
onMounted(() => {
  setupFriends()
})
</script>

<style scoped>
body {
  background-color: #f0f6ff;
  color: #28384d;
}

/*social */
.card-one {
  position: relative;
  width: 200px;
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

.card .nav > li {
  position: relative;
  display: block;
}

.card .nav > li > a {
  position: relative;
  display: block;
  padding: 10px 15px;
  font-weight: 300;
  border-radius: 4px;
}

.card .nav > li > a:focus,
.card .nav > li > a:hover {
  text-decoration: none;
  background-color: #eee;
}

.card .s-nav > li > a.active {
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
  background: rgba(0, 0, 0, 0.1);
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
  background-color: rgba(7, 46, 74, 0.895);
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

#requests {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.request {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
}

#profilePicture {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-right: 1rem;
  border: 2px solid #000;
}

.modal-content {
  padding: 1rem;
}

.modal-header {
  margin-bottom: 5px;
}

.pages {
  border-bottom: 1px solid #000;
  border-radius: 0px;
  margin: 0px 5px;
}

.pages {
  border-bottom: 2px solid #000;
  /* default border */
  border-radius: 0px;
  margin: 0px 5px;
}

.active-tab {
  border-bottom: 4px solid #000;
  /* thicker border when active */
}

#addFriend {
  background-color: #084766;
  color: white;
}

#addFriend:hover {
  background-color: #003b58f5;
}

.friendBox {
  width: 250px;
}
</style>
