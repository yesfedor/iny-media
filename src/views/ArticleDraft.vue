<template>
  <div class="container article">
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-10 offset-lg-1 text-center article__header rounded py-3 theme">
          <div class="row">
            <div class="col-12">
              <h1 class="article__title">
                {{articleTitle}}
                <i type="button" data-bs-toggle="modal" data-bs-target="#editor" class="fal fa-edit ms-3 article__edited"></i>
              </h1>
            </div>
            <div class="col-12">
              <span class="d-block w-50 float-start text-start ps-3">
                Автор: <span class="article__user">{{articleAuthorUsername}}</span>
              </span>
              <span class="d-block w-50 float-end text-end pe-3">{{articleDate}}</span>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-10 offset-lg-1 article__content py-3 border-start border-end theme">
          <Markdown class="theme app__markdown" :source="articleInMarkdownCode"></Markdown>
        </div>
        <div class="col-12 col-lg-10 offset-lg-1 text-center article__footer rounded py-3 theme">
          <span class="article__copyright">Весь контент принадлежит Purple X</span>
        </div>
      </div>
    </div>
  </div>
  <div class="modal editor" id="editor" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Редактор</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body editor__view">
          <div class="row">
            <div class="col-12 input-group mb-3">
              <span class="input-group-text" id="editorTitle">Title:</span>
              <input v-model="articleTitle" type="text" class="form-control" placeholder="Title" aria-label="Title" aria-describedby="editorTitle">
            </div>
            <div class="col-12 form-floating editor__content">
              <textarea rows="16" cols="45" class="form-control editor__content" placeholder="# title" v-model="articleInMarkdownCode"></textarea>
            </div>
            <div class="col-12 text-center mt-3">
              <input @change="uploadImage()" ref="input_image" class="d-none" type="file" accept="image/png, image/gif, image/jpeg"/>
              <span @click="$refs.input_image.click()" class="editor__link d-block w-50 float-start">Получить код картинки (загрузить)</span>
              <span class="editor__link d-block w-50 float-start">Код: {{articleUploadImageCode}}</span>
            </div>
            <div class="col-12 text-center mt-3">
              <a class="editor__link" target="_blank" href="https://goo.su/7WRG">Подробнее о синтаксисе Markdown</a>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="articleSave()" data-bs-dismiss="modal" type="button" class="btn btn-primary">Сохранить</button>
          <button @click="articlePublish()" data-bs-dismiss="modal" type="button" class="btn btn-link">Опубликовать</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../interfaces/User'
import Markdown from 'vue3-markdown-it'
import '../css/articleMarkdown.css'
import Api from '../api'
export default {
  name: 'ArticleDraft',
  components: {
    Markdown
  },
  data () {
    return {
      posYOffset: '',
      articleInMarkdownCode: '# content',
      articleTitle: 'Title',
      articleAuthorUsername: '@yesfedor',
      articleDate: '27/09/2021',
      articleUploadImageCode: '![alt text](filename)'
    }
  },
  mounted () {
    document.title = 'Новая статья'
    setTimeout(() => {
      this.posYOffset = (document.querySelector('.article__header').offsetHeight + document.querySelector('.article__footer').offsetHeight) + 'px'
    }, 1400)
  },
  methods: {
    articleSave () {
    },
    articlePublish () {
    },
    uploadImage () {
      const codeMarkdown = '![uploaded image](filename)'
      const file = this.$refs.input_image.files[0] || { type: 'NaN' }
      const allowTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg', 'image/webp']

      if (file.size > 8388608) return 'the file is too large'
      if (!allowTypes.includes(file.type)) return 'file not support'

      const responce = Api.uploadImage(file)
      responce.then(({ data }) => {
        if (data.code === 200) this.articleUploadImageCode = codeMarkdown.replace('filename', data.path)
        else this.articleUploadImageCode = 'Ошибка загрузки фото'
      })
    }
  }
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
.article__edited {
  color: var(--accent-strong-darker);
  cursor: pointer;
}
.article__user {
  color: var(--accent-strong-darker);
  cursor: pointer;
}
.article__content {
  --offset: v-bind(posYOffset);
  min-height: calc(100vh - var(--h-header) - var(--offset) - 10rem);
}
.article__footer {
  margin-bottom: 5rem;
  background: var(--base-back);
}
.article__copyright {
  color: var(--base-strong-lighter);
}
.editor {
  background: rgba(0, 0, 0, 0.125);
}
.editor__view {
  background: var(--base-weak-lighter);
}
.editor__content {
  min-height: 50vh !important;
}
.editor__link {
  color: var(--accent-strong);
}
.editor__link {
  cursor: pointer;
  color: var(--accent-strong-darker);
}
</style>
