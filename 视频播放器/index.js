const player = document.getElementsByTagName('video')[0]
const ol = document.getElementsByTagName('ol')[0]

function ajax(url) {
  let xmlhttp
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest()
  } else {
    // code for IE6, IE5
    xmlhttp = new ActiveXObject('Microsoft.XMLHTTP')
  }
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      handleData(xmlhttp.responseText)
    }
  }
  xmlhttp.open('GET', url, true)
  xmlhttp.send()
}

ajax('./album.json')

function handleData(text) {
  data = JSON.parse(text)
  list = data.rows
  for(let i in list){
    let oli = document.createElement('li');
    oli.innerHTML = list[i].title
  }
}