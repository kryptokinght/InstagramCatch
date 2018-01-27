//content.js deals with the webpage in the current opened tab
var i = 0, temp, tops = [], img_info = [];
chrome.runtime.onMessage.addListener(gotMessage);
//receives a message from popup.js asking for the image URL scraped from
// webpage in the current tab
function gotMessage(message, sender, sendResopnse) {

  if("https://www.instagram.com/" === message.tabURL) {
    tops = [];
    var ims = document.getElementsByTagName('img');
    for(i = 0; i < ims.length; i++) {
      if(ims[i].className.match(/_2di/g)) {
        temp = ims[i].getBoundingClientRect().top;
        if(temp < 0)
          temp = -(temp)
        img_info.push(temp);
        img_info.push(ims[i].src);
        tops.push(img_info);
        img_info = [];
      }
    }
    //find the min top value and send the url to popup.js
    let min = tops[0][0], index = 0;
    for(i = 0; i< tops.length; i++) {
      if(tops[i][0] < min) {
        min = tops[i][0];
        index = i;
      }
    }
    sendResopnse({ txt:tops[index][1] });
  }
  
  else 
  {
    var vids = document.getElementsByTagName('video');
    if(vids.length)
      sendResopnse({txt : vids[0].src});
    else {
      var ims = document.getElementsByTagName('img');
      var img_location = ims[ims.length - 1].src;
      //responds to popup.js with the image URL
      sendResopnse({txt : img_location});
    }
    
  }

}
//Icon made  from www.flaticon.com 
