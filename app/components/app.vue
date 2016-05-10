<template lang="jade">
.app
  tour

</template>

<script>

    import Auth from '../api/auth';
    import Tour from './tour/tour.vue';

    export default {

        name: 'App',

        vuex: {
            state: {
                token: state => state.auth.token
            }
        },
        components: {
          Tour
        },

        created() {
            Auth.signin('username', 'password');
        }
    }

</script>
