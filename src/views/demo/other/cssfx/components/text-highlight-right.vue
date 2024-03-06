<template>
  <span>Highlight</span>
</template>

<style scoped>
  span {
    position: relative;
    z-index: 1;
  }

  span::before {
    position: absolute;
    inset: 0 -0.25em;
    z-index: -1;
    content: '';
    background-color: #1890ff;
    transition: transform 0.2s ease-in-out;
    transform: scaleX(0);
    transform-origin: right center;
  }

  span:hover::before {
    transform: scaleX(1);
    transform-origin: left center;
  }
</style>
