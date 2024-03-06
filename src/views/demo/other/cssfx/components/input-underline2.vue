<template>
  <div>
    <input placeholder="Input Underline" type="text" />
    <span />
  </div>
</template>

<style scoped>
  div {
    position: relative;
  }

  input {
    width: 6.5em;
    font-family: inherit;
    font-size: inherit;
    color: white;
    background-color: transparent;
    border: 1px solid transparent;
    border-bottom-color: hsl(341deg 97% 59% / 20%);
  }

  input:focus {
    outline: none;
  }

  input::placeholder {
    color: hsl(0deg 0% 100% / 60%);
  }

  span {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 100%;
    height: 1px;
    background-color: #1890ff;
    opacity: 0;
    transition: all 0.3s ease;
    transform: translate(-50%, 0) scaleX(0);
    transform-origin: center;
  }

  input:focus ~ span {
    opacity: 1;
    transform: translate(-50%, 0) scaleX(1);
  }
</style>
