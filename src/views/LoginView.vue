<script setup lang="ts">
import InputText from 'primevue/inputtext';

const loginEmail = () => {

}

/*
 * Create form to request access token from Google's OAuth 2.0 server.
 */
function googleOauthSignIn() {
  // Google's OAuth 2.0 endpoint for requesting an access token
  var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

  // Create <form> element to submit parameters to OAuth 2.0 endpoint.
  var form = document.createElement('form');
  form.setAttribute('method', 'GET'); // Send as a GET request.
  form.setAttribute('action', oauth2Endpoint);

  // Parameters to pass to OAuth 2.0 endpoint.
  var params = {
    'client_id': '1004669497691-6ls2jdbj99fu7ap7p1d56r1cqjsl68j5.apps.googleusercontent.com',
    'redirect_uri': `${import.meta.env.VITE_REDIRECT_URI}`,
    'response_type': 'token',
    'scope': 'profile',
    'include_granted_scopes': 'true',
    'state': 'pass-through value'
  };

  // Add form parameters as hidden input values.
  for (var p in params) {
    var input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', p);
    //@ts-ignore
    input.setAttribute('value', params[p]);
    form.appendChild(input);
  }

  // Add form to page and submit it to open the OAuth 2.0 endpoint.
  document.body.appendChild(form);
  form.submit();

}
</script>

<template>
  <div class="panel">
    <section class="container blue-whale-alpha text-white" style="text-align: center;">
      <div class="providers" style="margin-bottom: 100px">

        <Button @click="googleOauthSignIn" label="Enter with Google" icon="pi pi-google"
          style="width: 100%; margin-top: 10%;" :pt:icon:style="'font-size: 2vw'" />
        <Button @click="" label="Enter with GitHub" icon="pi pi-github" style="width: 100%; margin-top: 10%;"
          :pt:icon:style="'font-size: 2vw'" />
        <!-- <Button @click="login" label="Login with Facebook" icon="pi pi-facebook" style="width: 100%; margin-top: 10%;" /> -->
        <!-- <Button @click="login" label="Login with Twitter" icon="pi pi-twitter" style="width: 100%; margin-top: 10%;" /> -->
        <!-- <Button @click="login" label="Login with Apple" icon="pi pi-apple" style="width: 100%; margin-top: 10%;" /> -->
      </div>
      <p>or</p>
      <InputText type="email" placeholder="Email" style="width: 100%; margin-top: 5%;" />
      <InputText type="password" placeholder="Password" style="width: 100%; margin-top: 5%;" />
      <Button @click="loginEmail" label="Enter" style="width: 100%; margin-top: 10%;" />
    </section>
  </div>
</template>

<style>
.panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  border-radius: 10px;
  margin-bottom: 5vh;
}

.container{
  padding: 2%;
  width: 30%;
  border-radius: 10px;
}
</style>