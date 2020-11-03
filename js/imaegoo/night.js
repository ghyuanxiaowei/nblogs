(function() {
  /**
   * Icarus 夜间模式 by iMaeGoo
   * https://www.imaegoo.com/
   */ 
  var isNight = localStorage.getItem('night');
  var nightNav;

  function applyNight(value) {
      if (value.toString() === 'true') {
          document.body.classList.add('night');
        //   if (document.querySelector('.canvas-snow')) {
        //       document.querySelector('.canvas-snow').setAttribute('style', 'display: none');
        //   }
          if (document.querySelector('.snow-container')) {
              document.querySelector('.snow-container').setAttribute("style", "z-index: 0")
          }
      } else {
          document.body.classList.remove('night');
        //   if (document.querySelector('.canvas-snow')) {
        //       document.querySelector('.canvas-snow').setAttribute('style', 'display: block');
        //   }
         if (document.querySelector('.snow-container')) {
            document.querySelector('.snow-container').setAttribute("style", "z-index: 10001")
         }
     }
     searchDisqusThread(value.toString())
  }

  function searchDisqusThread(value) {
      if (document.querySelector('#disqus_thread')) {
          if (value === 'true') {
            document.querySelector('#disqus_thread').parentNode.parentNode.setAttribute("style", "background: #b5b5b5b8")
          } else {
            document.querySelector('#disqus_thread').parentNode.parentNode.setAttribute("style", "background: #FFFFFF")
          }
      } else {
          var clearTime = setTimeout(() => {
            searchDisqusThread(value)
            clearTimeout(clearTime)  
          })
      }
  }

  function findNightNav() {
      nightNav = document.getElementById('night-nav');
      if (!nightNav) {
          setTimeout(findNightNav, 100);
      } else {
          nightNav.addEventListener('click', switchNight);
      }
  }

  function switchNight() {
      isNight = isNight ? isNight.toString() !== 'true' : true;
      applyNight(isNight);
      localStorage.setItem('night', isNight);
  }

  findNightNav();
  isNight && applyNight(isNight);
}());