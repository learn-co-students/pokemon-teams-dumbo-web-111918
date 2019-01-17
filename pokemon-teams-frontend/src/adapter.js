class Adapter {
  constructor(url, type){
    this.url = url
    this.type = type
  }

  index() {
    return fetch(this.url + `/${this.type}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(res => res.json())
  }

  create(id) {
    let obj = {trainer_id: id}
    return fetch(`${this.url}/${this.type}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(obj)
    }).then(res => res.json())
  }

  show(id) {
    return fetch(this.url + `/${this.type}/${id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(res => res.json())
  }

  update(id, object) {
    return fetch(this.url + `/${this.type}/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(object)
    }).then(res => res.json())
  }

  delete(id) {
    return fetch(this.url + `/${this.type}/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(res => res.json())
  }
}
