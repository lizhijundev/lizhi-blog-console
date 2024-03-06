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
    transition: all 0.1s ease-in-out;
    transform: scaleY(0.1);
    transform-origin: bottom center;
  }

  span:hover::before {
    background-color: #1890ff;
    transform: scaleY(1);
  }
</style>
