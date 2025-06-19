<!--
  - Minecraft Monitor
  - Copyright (C) 2025-Present  Kevin Traini
  -
  - This program is free software; you can redistribute it and/or modify
  - it under the terms of the GNU General Public License as published by
  - the Free Software Foundation; either version 2 of the License, or
  - (at your option) any later version.
  -
  - This program is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  - GNU General Public License for more details.
  -
  - You should have received a copy of the GNU General Public License along
  - with this program; if not, write to the Free Software Foundation, Inc.,
  - 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
  -->
<template>
    <div class="greetings">
        <h1 class="green">
            {{ msg }}
        </h1>
        <h3>
            You’ve successfully created a project with
            <a
                href="https://vite.dev/"
                target="_blank"
                rel="noopener"
            >Vite</a> +
            <a
                href="https://vuejs.org/"
                target="_blank"
                rel="noopener"
            >Vue 3</a>. What's next?
        </h3>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    msg: string;
}>();
</script>

<style scoped>
h1 {
    font-weight: 500;
    font-size: 2.6rem;
    position: relative;
    top: -10px;
}

h3 {
    font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
    text-align: center;
}

@media (min-width: 1024px) {
    .greetings h1,
    .greetings h3 {
        text-align: left;
    }
}
</style>
