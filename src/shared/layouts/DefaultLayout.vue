<template>
  <div class="layout layout--default" ref="app">
    <slot name="header" />

    <slot name="navigation"></slot>

    <main>
      <router-view />
    </main>
    <slot name="footer" />
  </div>
</template>
