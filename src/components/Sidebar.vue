<template>
    <div class="sidebar">
      <div class="author">
        <img src="../img/lionscave.jpg" alt="" class="author__img">
      </div>
      <div class="header-underlined header-underlined--name">
        <h2 class="header header-underlined__text header-underlined__text--name">Leo Zisman</h2>
        <div class="header-underlined__underline header-underlined__underline--name"></div>
      </div>
      <ul class="nav-list">
        <li class="nav-list__item">
          <router-link v-bind:to="'/'" exact class="link">
            <span>Projects</span>
            <div class="nav-list__line-ctn">
              <div class="nav-list__line"></div>
            </div>
          </router-link>
        </li>
        <li class="nav-list__item">
          <router-link v-bind:to="'/about'" class="link">
            <span>About</span>
            <div class="nav-list__line-ctn">
              <div class="nav-list__line"></div>
            </div>
          </router-link>
        </li>
        <li class="nav-list__item">
          <router-link v-bind:to="'/now'" class="link">
            <span>Now</span>
            <div class="nav-list__line-ctn">
              <div class="nav-list__line"></div>
            </div>
          </router-link>
        </li>
      </ul>
      <div class="copyright">
        &copy; Leo Zisman, 2019
      </div>
    </div>
</template>

<script>
export default {
  name: 'Sidebar',
}
</script>

