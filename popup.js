console.log("Instacatcher123 popup.js loaded!!");


function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}


//params for tab
var params = {
  active : true,
  currentWindow : true
}
//get all the tabs
chrome.tabs.query(params, gotTabs);
//once receiveing all the tabs, send msg to content.js with the current tab id
// as tabs[0].id.
function gotTabs(tabs) {
  //msg to be sent to content.js
  let msg = {
      tabURL : tabs[0].url
    }
  //after sending the message, the content.js sends a response
  chrome.tabs.sendMessage(tabs[0].id, msg, function(response) {
    if(response != undefined) {
      //create image element
      var imgx = document.createElement("img");
      console.log(response.txt);
      
      /*imgx.setAttribute('src',response.txt);
      imgx.style.width = 30;
      imgx.style.height = 30;
      imgx.setAttribute('crossorigin','Anonymous');
      
      var image = new Image(); //00000
      image.crossOrigin = "Anonymous"; //0000
      document.getElementsByTagName('body')[0].appendChild(imgx);

      var img = document.getElementById("scream");

      var imgData = getBase64Image(img);
      console.log(imgData);
      localStorage.setItem("imgData", imgData);
      var dataImage = localStorage.getItem('imgData');
      localStorage.removeItem('imgData');
      console.log("*************************");
      console.log(dataImage);
      var a = document.createElement('a');
      imgx.setAttribute('src', "data:image/png;base64," + imgData);
      a.setAttribute('href', "data:image/png;base64," + imgData);*/
      var a = document.createElement('a');
      a.setAttribute('href', response.txt);
      a.setAttribute('id', 'kappa');
      a.setAttribute('download', '');
      document.getElementsByTagName('body')[0].appendChild(a);
      let element = document.getElementById("kappa");
      element.click();
      element.parentNode.removeChild(element);
    }
    else {
      let h3 = document.getElementsByTagName('h3');
      console.log(h3);
      h3.innerHTML = "<span style = 'color : red'>Sorry</span>, this website is not supported!";

    }

  });
}
