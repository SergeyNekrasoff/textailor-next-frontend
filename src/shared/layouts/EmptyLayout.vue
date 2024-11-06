<template>
  <div class="layout layout--empty" ref="app">
    <slot name="header" />

    <main>
      <router-view />
    </main>
  </div>
</template>
