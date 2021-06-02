function openNav() {
    document.getElementById("side").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("side").style.width = "0";
  }
  
  function openTab(tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabCon");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab");
    
    document.getElementById(tabName).style.display = "block";
  }
  $('.tab').on('click', function(e) {
    e.preventDefault();
  
    $('.tab.current').removeClass('current');
    $(this).addClass('current');
  });
  
  document.getElementById("homeButton").click();
  
  $('footer').append(`
  <div id="footer">
        <div class="footerItems">
            <h2>Other apps</h2>
            <a>Weby</a>
            <a>Moby</a>
            <a>Crash</a>
        </div>
        <div class="footerItems">
            <h2>Company</h2>
            <a>About Weby</a>
            <a>Wither</a>
        </div>
    </div>
    <div id="footer2">
        <div class="supportBtn footerBtn" onclick="supportWeby()"><span>Support</span><i class="far fa-heart"></i></div>
        <div class="subscribeBtn footerBtn" onclick="subscribeWeby()"><span>Subscribe</span><i class="far fa-thumbs-up"></i></div>
    </div>
    <div id="about">
        <span>Created & Powered by Weby</span>
        <span>&copy; Weby, Inc.</span>
    </div>
  `)