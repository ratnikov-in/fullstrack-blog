const card = post => {
  return `
 <div class="card z-depth-4">
 <div class="card-contentt">
   <span class="card-title">${post.title}</span>
   <p>${post.text}</p>
   <small>${post.date}</small>
   <small>${post._id}</small>
 </div>
 <div class="card-action">
   <button class="btn btn-small red js-remove" data-id = "${post._id}"><i class="material-icons">delete</i></button>
 </div>
</div>
`
}
let postsArray = []
let modal
const BASE_URL = 'api/post'
class postApi {
  static fetch () {
    return fetch(BASE_URL, { method: 'get' }).then(res => {
      console.log('res ' + res)
      return res.json()
    })
  }
  static create (post) {
    console.log('Create post ' + post)
    return fetch(BASE_URL, {
      method: 'post',
      body: JSON.stringify(post),
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }
    }).then(res => {
      console.log('Static create ' + res)
      return res.json()
    })
  }
  static remove (id) {
    return fetch(`${BASE_URL}/${id}`, {
      method: 'delete'
    }).then(res => {
      console.log('Static delete ' + res)
      return res.json()
    })
  }
}

document.addEventListener('DOMContentLoaded', () => {
  postApi.fetch().then(backendPosts => {
    postsArray = backendPosts
    console.log('backendPosts ' + backendPosts)
    renderPosts(postsArray)
  })
  modal = M.Modal.init(document.querySelector('.modal'))
  document.querySelector('#createPost').addEventListener('click', onCreatePost)
  document.querySelector('#posts').addEventListener('click', onDeletePost)
})
function renderPosts (_posts = []) {
  const $posts = document.querySelector('#posts')
  if (_posts.length > 0) {
    $posts.innerHTML = _posts.map(post => card(post)).join('')
  } else { $posts.innerHTML = `<div class='center'>Постов пока нет</div>` }
}

function onCreatePost () {
  const $title = document.querySelector('#title')
  const $text = document.querySelector('#text')
  if ($text.value && $title.value) {
    const newPost = {
      title: $title.value,
      text: $text.value
    }
    console.log('New post: ' + JSON.stringify(newPost))
    postApi.create(newPost).then(post => {
      console.log('Then post: ' + post)
      console.log(typeof posts)
      postsArray.push(post)
      renderPosts(postsArray)
    })
    modal.close()
    $text.value = ''
    $title.value = ''
    M.updateTextFields()
  }
}
function onDeletePost () {
  if (event.target.classList.contains('js-remove')) {
    const desc = confirm('Вы уверены что хотите удалить запись?')
    if (desc) {
      let id = event.target.getAttribute('data-id')
      console.log(id)
      postApi.remove(id).then(() => {
        const postIndex = postsArray.findIndex(post => post._id === id)
        postsArray.slice(postIndex, 1)
        renderPosts(postsArray)
      })
    }
  }
}
