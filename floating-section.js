$(function() {
  var floating = $("#floating_section");

  if (floating.length <= 0 ) return;

  var footer = $("#footer"), // footer 框架
    content = $("#content"), // 頁面主框架
    header = $("#header"), // header 框架
    left_content = $(".main-content"), // 左側視窗
    sidebar = $("#sidebar"), // Sidebar
    headerMayFloat = false, // header 是否會浮動
    floatingHeight = floating.outerHeight(), // 浮動框架高度
    floatingTop = floating.offset().top, // 浮動框架 top 位置
    floatingLeft = floating.offset().left,  // 浮動框架 left 位置
    contentHeight, // 頁面主框架高度
    contentTop, // 頁面主框架 top 位置
    footerTop, // footer 框架 top 位置
    headerHeight = (header && headerMayFloat) ? header.outerHeight() : 0, // header 框架高度
    bottom_distances, // 主框架與 footer 間距
    fixedCSS = {"top": headerHeight + "px", "position": "fixed"},
    staticCSS = {"position": "static"};

  window.floatingSectionMove = function (){
    var scrollTop = $(document).scrollTop(); // 取得頁面下滾距離
    fixScrollTop = scrollTop + headerHeight; // 補上浮動 header 高度

    if ((fixScrollTop > floatingTop) && (left_content.height() > sidebar.height())) { // 視窗捲動至浮動框架之下
      footerTop = footer.offset().top; // 重新計算 footer 框架 top 位置
      contentTop = content.offset().top; // 頁面主框架 top 位置
      contentHeight = content.outerHeight(); // 頁面主框架高度
      bottom_distances = (footerTop - contentTop - contentHeight); // 主框架與 footer 間距
      if ((fixScrollTop + floatingHeight + bottom_distances) > footerTop ) { // 檢查是否接觸 footer
        newTop = footerTop - (scrollTop + floatingHeight + bottom_distances); // 計算出新的位置
        floating.css({"top": newTop + "px","position": "fixed"}); // 鎖定位置
      } else {
        floating.css(fixedCSS); // 鎖定位置
      }
    } else {
      floatingTop = floating.offset().top; // 重新計算浮動框架 top 位置
      floating.css(staticCSS); // 標準位置
    }
  };

  $(window).scroll(function(){
    floatingSectionMove();
  });

  $(window).resize(function(){
    floatingSectionMove();
  });

});
