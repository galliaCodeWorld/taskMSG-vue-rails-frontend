<template>
  <footer class="footer">
    <div class="container">
      <nav>
        <ul>
          <li>
            <a v-if="$route.meta.rtlActive" href="http://About.example.com">
              شركة
            </a>
            <a v-else href="https://About.example.com">
              About Us
            </a>
          </li>
          <li>
            <a v-if="$route.meta.rtlActive" href="http://blog.example.com">
              محفظة
            </a>
            <a v-else href="http://blog.example.com">
              Blog
            </a>
          </li>
        </ul>
      </nav>
      <div class="copyright text-center">
        &copy; {{ new Date().getFullYear() }}
        <a
          href="https://support.example.com"
          target="_blank"
        >
          Contact Support Team</a>
      </div>
    </div>
  </footer>
</template>
<script>
export default {};
</script>
<style></style>
