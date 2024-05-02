<script>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
    <body>
        <section class="hero ">
            <div class="hero-body">
                <div class="container is-overlay has-background">
                    <div class="columns is-centered">
                        <div class="column is-half">
                            <div class="box has-text-centered">
                                <h1 class="title">BVG athletics website</h1>
                                <p class="subtitle">All schedules</p>
                                <RouterLink to="/league" class="button is-primary">Go to Schedule</RouterLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        
    </body>
    
    
</template>

<style scoped>

$orange: #FFA500;
$primary: $orange;

/* Set secondary color if needed */
$secondary: $orange;
</style>