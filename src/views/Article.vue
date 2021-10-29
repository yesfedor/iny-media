<template>
  <div class="container article">
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-10 offset-lg-1 text-center article__header rounded py-3">
          <div class="row">
            <div class="col-12">
              <h1 class="article__title">{{articleTitle}}</h1>
            </div>
            <div class="col-12">
              <span class="d-block w-50 float-start text-start ps-3">
                Автор: <span class="article__user">{{$t('articleAuthorUsername')}}</span>
              </span>
              <span class="d-block w-50 float-end text-end pe-3">27/09/2021</span>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-10 offset-lg-1 article__content py-3 border-start border-end">
          <Markdown class="theme app__markdown" :source="articleInMarkdownCode"></Markdown>
        </div>
        <div class="col-12 col-lg-10 offset-lg-1 text-center article__footer rounded py-3">
          <span class="article__copyright">Весь контент принадлежит Purple X</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Markdown from 'vue3-markdown-it'
import '../css/articleMarkdown.css'
export default {
  name: 'Article',
  components: {
    Markdown
  },
  data () {
    return {
      articleInMarkdownCode: '# title',
      articleTitle: 'Title',
      articleAuthorUsername: '@yesfedor'
    }
  },
  mounted () {
    document.title = 'Purple X - Статьи'
  },
  methods: {}
}
</script>

<style>
.article {
  width: 100%;
  height: calc(100vh - var(--h-header));
  background: var(--base-back-lighter);
}
.article__header {
  margin-top: 5rem;
  background: var(--base-back);
}
.article__title {
  color: var(--base-strong);
  margin: 0;
  padding: 0;
}
.article__user {
  color: var(--accent-strong-darker);
  cursor: pointer;
}
.article__content {
}
.article__footer {
  margin-bottom: 5rem;
  background: var(--base-back);
}
.article__copyright {
  color: var(--base-strong-lighter);
}
</style>
