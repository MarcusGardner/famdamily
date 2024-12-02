<script lang="ts">
  export let src: string;
  export let alt: string = '';
  export let srcset: string = '';
  export let sizes: string = '';
  export let className: string = '';
</script>

<img
  src={src}
  alt={alt}
  srcset={srcset}
  sizes={sizes}
  class={className}
/>

<style>
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
</style>
