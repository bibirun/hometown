$(function(){
	if($('.index').length > 0){
		//登录面板居中显示
		var height = $('#form').height();
		var width = $('#form').width();
		height = height/2-height;width = width/2-width;
		$('#form').css({'margin-top':height,'top':'50%','margin-left':width});
		
		//初始容器高度
		var boxHeight = $(window).height();
		$('#particles').css('height',boxHeight+'px');
		
		//调用插件
	
		$('body').particleground({
			dotColor: '#5cbdaa',
			lineColor: '#5cbdaa'
		});
	}
	
	
	if($('.cbody').length > 0){
		
		//下拉菜单插件初始化
		$('#menu').metisMenu();
		//滚动插件初始化
		$('#b_sidebar').slimscroll({
		  height: $(window).height()-60,
		  width: '220',
		  size: '5px'
		});
		$('#iframescroll').slimscroll({
		  height: $(window).height()-135,
		  width: $(window).width()-220,
		  size: '5px'
		});
		
		var itemBoxWidth = $('.control_tag').width() - 470;//计算列表的长度
		$('.b_tags_content').css('width',itemBoxWidth+'px');//初始化列表的长度
		//选项卡切换
		var b_itemTag = $('.b_items');
		b_itemTag.click(function(){
			//判断是否存在于导航条之中
			
			//创建一个数组，把当前显示的项的text存入数组中，判断当前项是否已在显示列表
			var item = new Array();
			var tagIndex,tagText;
			$('.public_tag').each(function(){
				item.push($(this).text());//遍当历显示列表，并把所有的项的text存入数组中
			});
			//判断item,点击的项是否已经在显示列表，如果没有找到则代表没有在显示列表中，应新生成一个项。有则显示当前列表项
			tagIndex = jQuery.inArray($(this).text(),item);
			if(tagIndex==-1){
				//给当前所有的选项卡的项清除选中状态和关闭按钮×
				$('.public_tag').removeClass('b_active');
				$('.b_close').hide().remove();
				//追加一个选项到选项卡栏
				$('.tag-warpper').append('<div class = "public_tag b_active" data-links="'+$(this).attr("data-link")+'">'+$(this).text()+'<span class = "b_close"><i class="fa fa-times-circle lmargin5 "></i><span></div>');
				//改变显示内容
				$('#iframescroll').attr('src',$(this).attr('data-link'));
				//统计所有列表项的长度
				var allItemWith = 0;//定义一个变量，存储遍历列表项的总长度
				$('.public_tag').each(function(){
					allItemWith += $(this).outerWidth(true);
				});
				//alert(allItemWith);
				//判断列表的长度与父盒子的长度关系,如果列表的长度大于父盒子长度减10，则移动列表的显示位置
				if(allItemWith > itemBoxWidth ){
					$('.tag-warpper').css('margin-left',-(allItemWith - itemBoxWidth+10)+'px');
				}
			}else{
				$('.public_tag').removeClass('b_active');//移除所有的背景色
				$('.b_close').hide().remove();//移除所有的×
				tagText = item[tagIndex];//获得item数组保存对应索引的值
				$('.public_tag:contains("'+tagText+'")').addClass('b_active').append('<span class = "b_close"><i class="fa fa-times-circle lmargin5 "></i><span>');
				$('#iframescroll').attr('src',$(this).attr('data-link'));
			}
				
		});
		//检测选卡项是否被点击，如果点击则在内容显示对应的内容
		$('.cbody').delegate('.public_tag','click',function(){
			if($(this).text() !=='首页'){
				$('.public_tag').removeClass('b_active');
				$('.b_close').hide().remove();
				$(this).addClass('b_active');
				$(this).append('<span class = "b_close"><i class="fa fa-times-circle lmargin5 "></i><span>');
				$('#iframescroll').attr('src',$(this).attr('data-links'));
			}else{
				//如果不是首页，判断.public_tag个数是否大于1，等于1说明只有首页存在，这样就不添加背景色，相反则添加背景色
				if($('.public_tag').length > 1){
					$('.public_tag').removeClass('b_active');
					$('.b_close').hide().remove();
					//增加背景色
					$(this).addClass('b_active');
					$('#iframescroll').attr('src',$(this).attr('data-links'));
				}else{
					$('.public_tag').removeClass('b_active');
					$('.b_close').hide().remove();
					$('#iframescroll').attr('src',$(this).attr('data-links'));
				}
				
			}
		});
		//检测关闭按钮×是否被点击，被点击则关闭当前选项卡，并把内容切换到上一个的内容，所有的选项卡关闭则显示首页
		$('.cbody').delegate('.b_close','click',function(event){
			//显示×号
			if($(this).parent().prev('.public_tag').text() !=='首页'){
				$(this).parent().prev('.public_tag').addClass('b_active').append('<span class = "b_close"><i class="fa fa-times-circle lmargin5 "></i><span>');
			}
			$('#iframescroll').attr('src',$(this).parent().prev('.public_tag').attr('data-links'));
			var currentItemWidth = $(this).parent().outerWidth(true);//取得当前项的长度
			$(this).parent().hide().remove();//隐藏并删除项
			
			//监测关闭后列表的长度，如果列表项的总长度少于盒子的长度则做相应移动
			var closeItemWidth = 0;//定义一个变量，存储遍历列表项的总长度
			$('.public_tag').each(function(){
				closeItemWidth += $(this).outerWidth(true);
			});
			if(closeItemWidth < itemBoxWidth ){
				$('.tag-warpper').css('margin-left','0px');
			}else{
				
				var tagWarpperLeft = $('.tag-warpper').css('margin-left');//取得.tag-warpper的margin-left值
				var pTagWarpperLeft = Math.abs(parseFloat(tagWarpperLeft));//取得.tag-warpper的margin-left的绝对值
				if(tagWarpperLeft >=0){//.tag-warpper的margin-left值大于等于0，说明有隐藏部分
					$('.tag-warpper').css('margin-left','0px');
				}else if(currentItemWidth >= pTagWarpperLeft){//当前项的长度,.tag-warpper的margin-left的绝对值
					$('.tag-warpper').css('margin-left','0px');
				}else{
					$('.tag-warpper').css('margin-left',-(pTagWarpperLeft - currentItemWidth + 15)+'px');//删除后列表项向右移动当前元素的长度个像素
				}
				
			}
			//阻止事件冒泡
			event.preventDefalut();
		});
		//点击向左按钮
		$('.to_left').click(function(){
			var allItemWidth = 0;//定义一个变量，存储遍历列表项的总长度
			$('.public_tag').each(function(){
				allItemWidth += $(this).outerWidth(true);
			});
			//判断列项的总长度与列表项盒子长度关系
			if(allItemWidth > itemBoxWidth ){
				var tagWarpperLeft = $('.tag-warpper').css('margin-left');//取得.tag-warpper的margin-left值
				var pTagWarpperLeft = Math.abs(parseFloat(tagWarpperLeft));//取得.tag-warpper的margin-left的绝对值
				if(pTagWarpperLeft <= 50){//.tag-warpper的margin-left值大于等于0，说明有隐藏部分
					$('.tag-warpper').css('margin-left','0px');
				}else{
					$('.tag-warpper').css('margin-left',-(pTagWarpperLeft - 50 + 15)+'px');//删除后列表项向右移动当前元素的长度个像素
				}
			}
		});
		
		//点击向右按钮
		$('.to_right').click(function(){
			var allItemWidth = 0;//定义一个变量，存储遍历列表项的总长度
			$('.public_tag').each(function(){
				allItemWidth += $(this).outerWidth(true);
			});
			//判断列项的总长度与列表项盒子长度关系
			if(allItemWidth > itemBoxWidth ){
				//判断右边是否有项被遮挡住，需要右移起效
				var boxMarginLeft = allItemWidth - itemBoxWidth;//item列表项总长与item盒子之差，即应向左隐藏的长度
				var tagWarpperLeft = $('.tag-warpper').css('margin-left');//取得.tag-warpper的margin-left值
				var pTagWarpperLeft = Math.abs(parseFloat(tagWarpperLeft));//取得.tag-warpper的margin-left的绝对值
				var compareValue = boxMarginLeft - pTagWarpperLeft;
				if( compareValue > 0){
					if(compareValue < 50){
						$('.tag-warpper').css('margin-left',-(pTagWarpperLeft + compareValue + 15)+'px');//删除后列表项向右移动当前元素的长度个像素
					}else{
						$('.tag-warpper').css('margin-left',-(pTagWarpperLeft + 50 + 15)+'px');//删除后列表项向右移动当前元素的长度个像素
					}
				}
				
			}
		});
		//定位当前选项卡操作
		$('.currentItem').click(function(){
			var allIndexWidth = 0;//定义变量存储从首页到当前显示项的总长度
			var itemIndex = $('.public_tag').index($('.b_active'));//取得当前显示的项在列表中的位置（索引）
			for(var i = 0;i <= itemIndex;i++){
				allIndexWidth += $('.public_tag:eq('+i+')').outerWidth(true);//循环相加得到从首页到当前显示项总长度
			}
			var warpperWidth = $('.tag-warpper').css('margin-left');//取得当前item父盒子tag-warpper，margin-left值
			var TagWarpperLeft = Math.abs(parseFloat(warpperWidth));//取得.tag-warpper的margin-left的绝对值
			var boxAndMarW = TagWarpperLeft + itemBoxWidth;//boxAndMarW变量存储盒子长度与margin-left的绝对值的和
			//如果从首页到当前显示项的总长度小于当前margin-left的绝对值，说明当前项处于隐藏状态
			if(allIndexWidth <= TagWarpperLeft){
				//item项隐藏在左边位置
				if(TagWarpperLeft >= (allIndexWidth * 1.5)){//如果margin-left的绝对值是【从首页到当前显示项的总长度】的两倍
					$('.tag-warpper').css('margin-left','-'+(allIndexWidth/2)+'px');//把item盒子的margin-left值设为【从首页到当前显示项的总长度】的一半
				}else{
					$('.tag-warpper').css('margin-left','-'+(TagWarpperLeft-allIndexWidth)+'px');
				}
			}else if(allIndexWidth > boxAndMarW){
				//item项隐藏在右边位置，把item盒子的margin-left值设为【从首页到当前显示项的总长度】减去【盒子长度】在加上原有【margin-left】
				$('.tag-warpper').css('margin-left','-'+(allIndexWidth - boxAndMarW + TagWarpperLeft + 15)+'px');
			}
		});
		//关闭所有选项卡操作
		$('.closeAllItem').click(function(){
			$('.public_tag').each(function(){
				if($(this).text() !='首页'){
					$(this).hide().remove();//遍历item项，如果不是首页，则把item项隐藏并移除
				}
			});
		});
		//关闭其余选项卡操作
		$('.closeNotCurrent').click(function(){
			if($('.tag-warpper').css('margin-left') !=0){
				$('.tag-warpper').css('margin-left','0px');
			}
			$('.public_tag').each(function(){
				if($(this).text() != '首页'){
					if(!$(this).hasClass('b_active')){
						$(this).hide().remove();//遍历item项，如果不是首页，不是当前显示项，则隐藏并移除
					}
				}
			});
		});
	}
	
});