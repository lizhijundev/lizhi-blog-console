<template>
  <span>Strikethrough</span>
</template>

<style scoped>
  span {
    position: relative;
  }

  span::before {
    position: absolute;
    top: 50%;
    right: 0;
    left: 0;
    height: 3px;
    content: '';
    background-color: #1890ff;
    transition: transform 0.3s ease;
    transform: scaleX(0) translateY(-50%);
    transform-origin: right center;
  }

  span:hover {
    color: hsl(0deg 0% 100% / 80%);
  }

  span:hover::before {
    transform: scaleX(1) translateY(-50%);
    transform-origin: left center;
  }
</style>
