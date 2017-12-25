//define signal variable here
var oCatList = document.querySelector('.cat-list')
var oCatShow = document.querySelector('.cat-show')

var modal = {
  init(){
    this.ajaxRequest.initCatList()
  },
  //猫咪列表
  catList : [],
  //猫咪列表的ajax请求地址
  catListAjax : "./cat.json",
  //猫咪列表的dom
  oCatList,
  //显示猫咪的dom
  oCatShow,
  //当前猫
  currentCat : null,
  ajaxRequest : {
    initCatList(){
      var xhr = new XMLHttpRequest()
      xhr.open('GET',modal.catListAjax)
      xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
          var data = JSON.parse(xhr.responseText).data
          var cat = data.cat
          for(var i =0; i<cat.length; i++){
            modal.catList.push(cat[i])
          }
          modal.currentCat = modal.catList[0]
          octopus.renderList()
          octopus.renderCatAdmin()
        }
      }
      xhr.send()
    }
  }
}

var octopus = {
  init(){
    modal.init()
    catView.init()
  },
  renderTheCatAdmin(){
    catAdmin.render(this.getCurrentCat())
  },
  renderCatAdmin(){
    catAdmin.init()
  },
  addCounter(){
    modal.currentCat.counter++
    catView.render(modal.currentCat)
  },
  renderList(){
    listTable.init()
  },
  getCatList(){
    var list = modal.catList
    return list
  },
  renderCatView(){
    catView.render(modal.currentCat)
  },
  recordClick(cat_name){
    for(var i = 0 ; i< modal.catList.length ;i++){
      if(modal.catList[i].cat_name === cat_name) modal.catList[i].counter++
    }
  },
  setCurrentCat(cat){
    modal.currentCat = cat
  },
  getCurrentCat(){
    return modal.currentCat
  },
  saveCat(name,url,counter){
    this.getCurrentCat().cat_name = name
    this.getCurrentCat().cat_thumb = url
    this.getCurrentCat().counter = counter
    this.renderList()
    this.renderCatView()
  }
}

var listTable = {
  init(){
    this.render()
  },
  render(){
    oCatList.innerHTML = ''
    var listData = octopus.getCatList()
    for(var i = 0;i<listData.length;i++){
      var newList = document.createElement("li")
      newList.innerHTML = listData[i].cat_name
      this.bindClickEvent(newList,listData[i])
      modal.oCatList.appendChild(newList)
    }
  },
  bindClickEvent(newList,listData){
    newList.addEventListener("click",function(){
      octopus.setCurrentCat(listData)
      octopus.renderCatView()
      octopus.renderTheCatAdmin()
    })
  }
}

var catView = {
  init(){
    console.log(this)
    this.cat_countainer = document.querySelector('.cat-show').querySelector("div")
    this.cat_image = document.querySelector('.cat-show').querySelector('img')
    this.cat_name = document.querySelector('.cat-show').querySelector('p')
    this.cat_counter =  document.querySelector('.cat-show').querySelector('span')

    this.bindClickEvent(this.cat_countainer)
  },
  render(listData){
    this.cat_image.src = listData.cat_thumb
    this.cat_name.innerHTML = listData.cat_name
    this.cat_counter.innerHTML = listData.counter
  },
  bindClickEvent(cat_container){
    cat_container.addEventListener("click",function(){
      octopus.addCounter()
    })
  }
}

var catAdmin = {
  init(){
    this.cat_trigger = document.querySelector('.cat-admin-trigger')
    this.cat_container = document.querySelector('.cat-admin-collapse')
    this.cat_name = document.querySelector('.cat-admin-name')
    this.cat_url = document.querySelector('.cat-admin-url')
    this.cat_counter = document.querySelector('.cat-admin-counter')
    this.cat_submit = document.querySelector('.cat-admin-submit')
    this.cat_cancel = document.querySelector('.cat-admin-cancel')

    this.collapseEvent(this.cat_trigger,this.cat_container)
    this.collapseEvent(this.cat_cancel,this.cat_container)
    this.bindSubmit(this.cat_submit,this.cat_name,this.cat_url,this.cat_counter,this.cat_container)

  },
  render(cat){
    this.cat_name.value = cat.cat_name
    this.cat_url.value = cat.cat_thumb
    this.cat_counter.value = cat.counter
  },
  collapseEvent(obj,target){
    var _this = this
    obj.addEventListener("click",function(){
      if(target.style.display === 'none') target.style.display = 'block'
      else target.style.display = 'none'
      _this.render(octopus.getCurrentCat())
    })
  },
  bindSubmit(submitBtn,name,url,counter,container){
    submitBtn.addEventListener("click",function(){
      container.style.display = 'none'
      octopus.saveCat(name.value,url.value,counter.value)
    })
  }
}


;(function(){
  octopus.init()
})()
