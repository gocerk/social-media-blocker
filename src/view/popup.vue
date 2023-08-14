<template>
  <div class="main_app bg-dark overflow-hidden position-relative border-0 px-4 py-4">
    <h3 class="text-light fw-bold text-center">Social Media Blocker</h3>
    
    <hr class="divider">

    <div class="form-check form-switch mt-5">
      <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" v-on:change="onSwitchChange">
      <label class="form-check-label text-light" for="flexSwitchCheckDefault">Block Social Media Content</label>
      <p class="fw-normal text-light">Instagram, Twitter, Facebook, TikTok, Snapchat, Reddit, Pinterest, LinkedIn</p>
    </div>

    <div class="mt-5">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" v-on:change="redirectOnChecked" id="flexCheckDefault">
        <label class="form-check-label text-light" for="flexCheckDefault">Redirect to custom URL</label>
      </div>

      <input disabled type="text" v-on:change="saveRedirectURL" class="form-control h-25" id="redirectInput" placeholder="Redirect URL">
    </div>

    <footer class="text-end">
      <p class="fw-normal text-light mt-5" style="font-size: 12px;">
        Made with ❤️ by 
        <a href="https://kaangocer.com" target="_blank" class="text-decoration-none text-light fw-bold">Kaan Gocer</a>
      </p>
    </footer>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import utils from '../entry/popup';

const onSwitchChange = async (e) => {
  if(e.target.checked) {
    await utils.setBlock(true);
    utils.startBlockListener();
    console.log('checked')
  } else {
    await utils.setBlock(false);
    utils.stopBlockListener();
    console.log('unchecked')
  }
}

const redirectOnChecked = async (e) => {
  const input = document.getElementById('redirectInput');
  if(e.target.checked) {
    input.disabled = false;
  } else {
    input.disabled = true;
    await utils.setRedirectURL('');
  }
}

const saveRedirectURL = async (e) => {
  const input = document.getElementById('redirectInput');
  await utils.setRedirectURL(input.value);
}

onMounted(async () => {
  chrome.storage.local.get(['block', 'redirectURL']).then((res) => {
    if(res.block) {
      document.getElementById('flexSwitchCheckDefault').checked = true;
    } else if(!res.block){
      document.getElementById('flexSwitchCheckDefault').checked = false;
    }

    if(res.redirectURL) {
      document.getElementById('flexCheckDefault').checked = true;
      document.getElementById('redirectInput').value = res.redirectURL;
    } else if(!res.redirectURL) {
      document.getElementById('flexCheckDefault').checked = false;
      document.getElementById('redirectInput').value = '';
    }
  })
});

</script>


<script>
export default {
  name: 'popupView'
}
</script>

<style>
.main_app {
  background: 0% 0% no-repeat padding-box;
  width: 300px;
  height: 350px;
}

.divider {
  border: 1px solid #FFFFFF;
  opacity: 0.1;
  margin: 0px 0px 20px 0px;
}

p {
  font-size: 10px;
}
</style>
