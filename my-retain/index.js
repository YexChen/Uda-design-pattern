//we will build a MVC framework here

// define signal variable here
var oInput = document.querySelector('.retain-input')
var oRetainBox = document.querySelector('.retain-show')

//Model
var Mode = {
  data_name : "todo",
  init : function(){
    // this.getData()
  },
  getData : function(name){
    var ls_data=localStorage.getItem(name)
    if(!ls_data){
      return null
    }
    localStorage.setItem(this.data_name,[])
    return JSON.parse(ls_data)
  },
  setData : function(key,data){
    var ls_data = localStorage.getItem(key)
    if(!ls_data){
      localStorage.setItem(key,[JSON.stringify(data)])
    }
    else{
      var ls_t_data = JSON.parse(ls_data)
      localStorage.setItem(key,ls_t_data.push(JSON.stringify(data)))
    }
  },
  removeData : function(dom){
    dom.parentNode.removeChild(dom)
  },
  addInstance : function(){
    var data = oInput.value
    this.setData(this.data_name,data)
    oInput.value = ""
  }
}

//Octopus
var Octopus = {
  data_name : "todo",
  init : function(){
    View.init()
  },
  getData : function(){
    return Mode.getData(this.data_name)
  },
  removeInstance : function(dom){
    Mode.removeData(dom)
    View.render(Mode.getData())
  },
  addInstance : function(){
    Mode.addInstance()
    View.render(Mode.getData())
  }
}
//View
var View = {
  init : function(){
    var dataList = Octopus.getData()
    this.render(dataList)
    window.onkeydown = function(e){
      if(e.keyCode == 13){
        Octopus.addInstance()
      }
    }
  },
  render : function(dataList){
    if(dataList === undefined || !dataList)
      return
    for(var i =0;i<dataList.length;i++){
      var dom = document.createElement("div")
      dom.className = "retain-item"
      dom.innerText = dataList[i]
      oRetainBox.appendChild(dom)
      this.bindEvent(dom)
    }
  },
  bindEvent(dom){
    dom.addEventListener("click",Octopus.removeInstance(dom))
  }
}

Octopus.init()
