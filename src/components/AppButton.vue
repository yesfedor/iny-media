<template>
  <button class="button" :disabled="(loader !== 'loader' ? false:true)">
    <app-loader v-if="loader !== ''" :code="loader">
      <slot></slot>
      <template #loader>
        <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
        <span class="visually-hidden">Loading...</span>
      </template>
    </app-loader>
    <slot v-else></slot>
  </button>
</template>

<script>
import AppLoader from './AppLoader.vue'

export default {
  name: 'AppButton',
  components: {
    AppLoader
  },
  props: {
    loader: {
      required: false,
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.button {
  border: 2px solid var(--base-strong);
  background-color: var(--base-strong);
  color: var(--base-weak);
  padding: 0.5rem 1rem;
  font-size: 16px;
  cursor: pointer;
  border-radius: 0.5em;
}

.button__primary {
  border: 2px solid var(--accent-strong);
  background-color: var(--accent-strong);
  color: var(--accent-weak-lighter);
}
.button__primary_outline {
  border: 2px solid var(--accent-strong);
  background-color: transparent;
  color: var(--accent-strong);
  font-weight: 700;
}

.button__complement {
  border: 2px solid var(--complement-strong);
  background-color: var(--complement-strong);
  color: var(--complement-weak-lighter);
}
.button__complement_outline {
  border: 2px solid var(--complement-strong);
  background-color: transparent;
  color: var(--complement-strong);
  font-weight: 700;
}

.button__success {
  border: 2px solid var(--success-strong);
  background-color: var(--success-strong);
  color: var(--accent-weak);
}
.button__success_outline {
  border: 2px solid var(--success-strong);
  background-color: transparent;
  color: var(--success-strong);
  font-weight: 700;
}

.button__warning {
  border: 2px solid var(--warning-strong);
  background-color: var(--warning-strong);
  color: var(--warning-weak);
}
.button__warning_outline {
  border: 2px solid var(--warning-strong);
  background-color: transparent;
  color: var(--warning-strong);
  font-weight: 700;
}

.button__error {
  border: 2px solid var(--critic-strong);
  background-color: var(--critic-strong);
  color: var(--critic-weak-lighter);
}
.button__error_outline {
  border: 2px solid var(--critic-strong);
  background-color: transparent;
  color: var(--critic-strong);
  font-weight: 700;
}

.button__link {
  border: 2px solid transparent;
  background-color: transparent;
  color: var(--accent-strong);
}

.button__subscribe {
  font-size: 14px;
  position: relative;
  border: 2px solid var(--base-account-button-subscribe-boder);
  border-radius: 1.5rem;
  background: var(--base-account-button-subscribe-background);
  color: var(--base-account-button-subscribe-color);
}

.button__unsubscribe {
  font-size: 14px;
  border: 2px solid var(--base-account-button-unsubscribe-boder);
  border-radius: 1.5rem;
  background: var(--base-account-button-unsubscribe-background);
  color: var(--base-account-button-unsubscribe-color);
}
</style>
