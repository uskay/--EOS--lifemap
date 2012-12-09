//Markers
var marker_Birth;
var marker_Elementary;
var marker_HighSchool;
var marker_University;
var marker_IBM;
//Menu
var menuItem;
//KeyControll
var isEnter4Offer = false;
var isEnter4Comment = false;

/*********************************************************
*Initialize Application
*********************************************************/ 
	$(document).ready(function(){
		initialize();
		windowResize();
		$("#iptMessageBox").	keydown(function(e){
			isEnter4Offer = (e.keyCode == 13);
		});
		$("#iptMessageBox").	keypress(function(e){
			isEnter4Offer = (e.keyCode == 13) && isEnter4Offer;		
		});		
		$("#iptMessageBox").keyup(function(e){
			if(isEnter4Offer&&(e.keyCode == 13)){
				postOffers();
				$(this).val("");
				isEnter4Offer = false;
			} else {
				isEnter4Offer = false;
			}
		});
		$(".classHover").live({
			mouseenter: function(){
				if($(this).css("opacity")<="0.9"){
					$(this).css("opacity","0.9");
				}				
			},
			mouseleave: function(){
				if($(this).css("opacity")<="0.9"){
					$(this).css("opacity","0.7");
				}
			}
		});
		$("#sRefresh").live({
			mouseenter: function(){
				$(".arrowFU_messenger").css("right","43px");
				$("#dMessageBubble").css("right","3px");
				$("#dMessageBubble").css("height","15");
				$("#dMessageBubble").css("width", "50px");
				$("#dMessageBubble").text("Reload");
				showInfo("dMessageBubbleWrapper");
			},
			mouseleave: function(){
				hideInfo("dMessageBubbleWrapper");
			}
		});
		$("#sUser").live({
			mouseenter: function(){
				$(".arrowFU_messenger").css("right","66px");
				$("#dMessageBubble").css("right","15px");
				$("#dMessageBubble").css("height","28");
				$("#dMessageBubble").css("width", "70px");
				$("#dMessageBubble").text("Message from you");
				showInfo("dMessageBubbleWrapper");
			},
			mouseleave: function(){
				hideInfo("dMessageBubbleWrapper");
			}
		});
		$("#sDM").live({
			mouseenter: function(){
				$(".arrowFU_messenger").css("right","91px");
				$("#dMessageBubble").css("right","40px");
				$("#dMessageBubble").css("height","28");
				$("#dMessageBubble").css("width", "70px");
				$("#dMessageBubble").text("Direct message");
				showInfo("dMessageBubbleWrapper");
			},
			mouseleave: function(){
				hideInfo("dMessageBubbleWrapper");
			}
		});
		getUser();
	});
	
	function initialize() {
		
		//init content_Birth
		marker_Birth = new Array(8);
		marker_Birth[0] = 0;
		marker_Birth[1] = new google.maps.LatLng(34.86113,138.229895);
		marker_Birth[2] = "http://maps.yusukeutsunomiya.com/lib/img/born.jpg";
		marker_Birth[3] = "Birth";
		marker_Birth[4] = 
			"1986 February 3, Yusuke Utsunomiya opened his eyes at 11:00 to the world." +
			" Born in Shizuoka Japan, the 3700g boy was raised in Saitama and Fukuoka with full of love from his parents." +
			" In the early days, his dream was to become a comic illustrator inspired by the creativeness of Japanese \"Manga\"" +
			" which then lead his life to the world of creativity.";
		marker_Birth[5] = "";
		marker_Birth[6] = "javascript:zoomToElementary()";
		marker_Birth[7] = 8;
		
		//init content_Elementary
		marker_Elementary = new Array(8);
		marker_Elementary[0] = 1;
		marker_Elementary[1] = new google.maps.LatLng(42.421834,-85.03418);
		marker_Elementary[2] = "http://maps.yusukeutsunomiya.com/lib/img/elementary.jpg";
		marker_Elementary[3] = "Elementary";
		marker_Elementary[4] = 
			"Yusuke moved to Battle Creek, Michigan when he was 7 due to his father's job." +
			" Taking class in a local Elementary school, he enjoyed his school life with his new friends learning English quickly." +
			" This was also when he first touched a PC which was Macintosh and Windows95." +
			" Back then computer games like \"DOOM\" had major popularity among kids and Yusuke was not the exception." +
			" Life in US accelerated his interest towards computer.";
		marker_Elementary[5] = "javascript:zoomToBirth()";
		marker_Elementary[6] = "javascript:zoomToHighSchool()";
		marker_Elementary[7] = 5;
		
		//init content_HighSchool
		marker_HighSchool = new Array(8);
		marker_HighSchool[0] = 2;
		marker_HighSchool[1] = new google.maps.LatLng(36.216358,139.17738);
		marker_HighSchool[2] = "http://maps.yusukeutsunomiya.com/lib/img/highschool.jpg";
		marker_HighSchool[3] = "Junior high / High school";
		marker_HighSchool[4] = 
			"While his interest towards computer emerges, he was also passionate in playing basketball in his Junior high / High school days." +
			" He played as a team captain for both his junior high school and high school team and was selected as \"Area All Star\" and achieved \"Area Top Scorer\" title." +
			" Leadership, Creativeness and Friendship was his focal point which lead the team to enjoy basketball." +
			" Not to mention, \"No basketball, No life\".";
		marker_HighSchool[5] = "javascript:zoomToElementary()";
		marker_HighSchool[6] = "javascript:zoomToUniversity()";
		marker_HighSchool[7] = 8;
		
		//init content_University
		marker_University = new Array(8);
		marker_University[0] = 3;
		marker_University[1] = new google.maps.LatLng(35.709197,139.719572);
		marker_University[2] = "http://maps.yusukeutsunomiya.com/lib/img/university.jpg";
		marker_University[3] = "University";
		marker_University[4] = 
			"2004. In the year of Iraq War, Yusuke entered the school of Political Science of Waseda to learn global affairs." +
			" While studying politics, he was also wired into street basketball. He produced events, developed portals and published video clips to spread out the scene using self-taught DTP technology." +
			" This was when he determined to become an engineer and support the basketball scene from the technology side.";
		marker_University[5] = "javascript:zoomToHighSchool()";
		marker_University[6] = "javascript:zoomToIBM()";
		marker_University[7] = 15;
		
		//init content_IBM
		marker_IBM = new Array(8);
		marker_IBM[0] = 3;
		marker_IBM[1] = new google.maps.LatLng(35.678598,139.787121);
		marker_IBM[2] = "http://maps.yusukeutsunomiya.com/lib/img/ibm.png";
		marker_IBM[3] = "IBM Japan, Ltd.";
		marker_IBM[4] = 
			"To become a IT specialist, he chose to enter IBM." +
			" His experiences have focused on designing / developing Java application and have lead over 20 projects in his career." +
			" He has achieved the IBM “Service Excellence Award” twice for his successful application delivery." +
			" Outside IBM, he also has been passionate in starting up his own projects to challenge his skills." +
			" Seeking for exiciting projects, his challenge will not end.";
		marker_IBM[5] = "javascript:zoomToUniversity()";
		marker_IBM[6] = "javascript:clickWorks()";
		marker_IBM[7] = 15;
		
		//Menu
		menuItem = new Array(7);
		menuItem[0] = "dIntroduction";
		menuItem[1] = "dBirth";
		menuItem[2] = "dElementary";
		menuItem[3] = "dHighschool";
		menuItem[4] = "dUniversity";
		menuItem[5] = "dCareer";
		menuItem[6] = "dWorks";
		selectMenu(menuItem[0]);
		
		//init GoogleMapsController
		var controller = new GoogleMapsController();
		controller.init(marker_Birth[1], 2);
	}


/*********************************************************
*Using Google Map 
*********************************************************/ 
	function start(){
		this.start = function(){
			return;
		};
		slideRight();
		zoomToBirth();
		$("#dLightBox").fadeTo("slow", 0, function(){
			hideLightBox();		
		});			
	}
	
	function zoomToBirth(){
		selectMenu(menuItem[1]);
		var controll = getGoogleMapsController();
		controll.moveTo(2, marker_Birth);
	}
	
	function zoomToElementary(){
		selectMenu(menuItem[2]);
		var controll = getGoogleMapsController();
		controll.moveTo(2, marker_Elementary);
	}
	
	function zoomToHighSchool(){
		selectMenu(menuItem[3]);
		var controll = getGoogleMapsController();
		controll.moveTo(2, marker_HighSchool);
	}
	
	function zoomToUniversity(){
		selectMenu(menuItem[4]);
		var controll = getGoogleMapsController();
		controll.moveTo(11, marker_University);
	}
	
	function zoomToIBM(){
		selectMenu(menuItem[5]);
		var controll = getGoogleMapsController();
		controll.moveTo(12, marker_IBM);
	}
	
	function clickBirth(){
		selectMenu(menuItem[1]);
		var controller = getGoogleMapsController();
		controller.show(marker_Birth);
	};
	
	function clickElementary(){
		selectMenu(menuItem[2]);
		var controller = getGoogleMapsController();
		controller.show(marker_Elementary);
	};
	
	function clickHighSchool(){
		selectMenu(menuItem[3]);
		var controller = getGoogleMapsController();
		controller.show(marker_HighSchool);
	};
	
	function clickUniversity(){
		selectMenu(menuItem[4]);
		var controller = getGoogleMapsController();
		controller.show(marker_University);
	};
	
	function clickCareer(){
		selectMenu(menuItem[5]);
		var controller = getGoogleMapsController();
		controller.show(marker_IBM);
	};
	
	function clickWorks(){
		var content = "";
		//foresthigashi
		var foresthigashi = new Array(5);
		foresthigashi[0] = "lib/img/foresthigashi.png";
		foresthigashi[1] = "APP";
		foresthigashi[2] = "http://foresthigashi.jp/";
		foresthigashi[3] = "foresthigashi.jp";
		foresthigashi[4] = "A website development for Okinawa based eco tour company.";
		//lifemap
		var lifemap = new Array(5);
		lifemap[0] = "lib/img/lifemapapp.png";
		lifemap[1] = "APP";
		lifemap[2] = "http://maps.yusukeutsunomiya.jp";
		lifemap[3] = "Lifemap";
		lifemap[4] = "Life tacking app(prototype) built from scratch using Google Map.";
		//allday
		var allday = new Array(5);
		allday[0] = "lib/img/allday.jpg";
		allday[1] = "EVENT";
		allday[2] = "http://www.alldaymag.com/";
		allday[3] = "ALLDAY";
		allday[4] = "Produced oversea pro basketball team to join the tournament.";
		//streetball
		var streetball = new Array(5);
		streetball[0] = "lib/img/sb.jpg";
		streetball[1] = "EVENT";
		streetball[2] = "http://www.youtube.com/watch?v=gv8Z4q1-JI8";
		streetball[3] = "STREETBALL";
		streetball[4] = "Produced several streetball events held in Tokyo hiring oversea players.";
		//streetslam
		var streetslam = new Array(5);
		streetslam[0] = "lib/img/streetslam.jpg";
		streetslam[1] = "VIDEO";
		streetslam[2] = "http://www.youtube.com/watch?v=sq_xIewbzfY";
		streetslam[3] = "STREETSLAM";
		streetslam[4] = "PR and visual direction for the event. Created a <a class='blue' href='http://www.youtube.com/watch?v=rxzK-CeseBA' target='_blank'>documentary short film</a>.";
		//itf
		var itf = new Array(5);
		itf[0] = "lib/img/itf.jpg";
		itf[1] = "VIDEO";
		itf[2] = "http://www.amazon.co.jp/BEST-I-T-F-Vol-3-10th-Anniversary-Special-Edition/dp/B000I8OK1Y";
		itf[3] = "BEST OF I.T.F vol.3";
		itf[4] = "Full video editing from raw footage of the DJ world tournament.";
		
		var works = new Array(6);
		works[0] = foresthigashi;
		works[1] = lifemap;
		works[2] = allday;
		works[3] = streetball;
		works[4] = streetslam;
		works[5] = itf;
		
		for(var i=0;i<works.length;i++){
			content += getWorksContent(
					works[i][0],
					works[i][1],
					works[i][2],
					works[i][3],
					works[i][4]					
					);
		}
		$("#dMyWorks").append(content);		
		$("#dLightBoxBackground").css("display","block");
		document.getElementById("dLightBoxBackground").style.visibility = "visible";
		$("#dLightBox4Works").css("display","block");
	};
	
	function getWorksContent(img, type, href, title, desc){
		var content = 
			"<div style='margin:10px;float:left'>"+
				"<div style='height:145px;overflow-y:hidden'>" +
					"<img src='" + img + "' width='240' style=''>" +
				"</div>" + 
				"<div style='text-align:left'>" +
					"<div style='font-size:11pt;margin-top:5px;'><div class='grayBtn_small'>" + type + "</div>"+
					"<span class='cWorksLink'  style='margin-left:5px;'><a class='gray' href='" + href + "' target='_blank'>" + title + "</a></span></div>"+
					"<div style='width:240px;font-size:9pt;margin-top:5px;color:#808080'>"+
						desc +
					"</div>"+
				"</div>"+
			"</div>";
		return content;
	}
	
	function clickClose(){
		var cell = document.getElementById("dMyWorks");
		if ( cell.hasChildNodes() )
		{
		    while ( cell.childNodes.length >= 1 )
		    {
		        cell.removeChild( cell.firstChild );       
		    } 
		}
		$("#dLightBoxBackground").css("display","none");
		$("#dLightBox4Works").css("display","none");
	}
	
/*********************************************************
*Util
*********************************************************/ 
	function showLightBox(){
		document.getElementById("dLightBox").style.visibility = "visible";
		document.getElementById("dLightBoxBackground").style.visibility = "visible";
	}
	
	function hideLightBox(){
		$("#dLightBox").css("display","none");
		$("#dLightBoxBackground").css("display","none");
	}
	
	$(window).resize(function() {
		windowResize();
	});
	
	function windowResize(){
		var r;
		if(window.innerWidth<=1000){
			$("#dMenuBar").css("width", "1000px");
			$("#dMessageBar").css("width", "1000px");
			$("#dMapCanvas").css("width", "1000px");
			r = (window.innerWidth - 1000) - 7;
			$("#dAboutWrapper").css("right", r);
		} else {
			$("#dMenuBar").css("width", "100%");
			$("#dMessageBar").css("width", "100%");
			$("#dMapCanvas").css("width", "100%");
			r = 5;
			$("#dAboutWrapper").css("right", r);
		}
		var h;
		if($("#dMenuBar").css("display")=="none"){
			h = window.innerHeight;
		} else {
			h = window.innerHeight - ($("#dMenuBar").height() + $("#dMessageBar").height() + 2);
		}
		$("#dMapCanvas").css("height", h);
		$("#dMessageWrapper").css("height", h-25);
		$("#dMessages").css("height", h-25);
		var lightBoxWidth = $("#dLightBox").width();
		var lightBoxHeight = $("#dLightBox").height();
		$("#dLightBox").css("margin-left", -(lightBoxWidth/2));
		$("#dLightBox").css("margin-top", -(lightBoxHeight/2));
		$("#dLightBox").css("top", "50%");
		$("#dLightBox").css("left", "50%");
		var dLightBox4WorksWidth = $("#dLightBox4Works").width();
		var dLightBox4WorksHeight = $("#dLightBox4Works").height();
		$("#dLightBox4Works").css("margin-left", -(dLightBox4WorksWidth/2));
		$("#dLightBox4Works").css("margin-top", -(dLightBox4WorksHeight/2));
		$("#dLightBox4Works").css("top", "50%");
		$("#dLightBox4Works").css("left", "50%");
		$("#dLightBoxBackground").css("height", document.documentElement.scrollHeight);
		$("#dLightBoxBackground").css("width", document.documentElement.scrollWidth);
	}
	
	function showInfo(idName){
		document.getElementById(idName).style.visibility = 'visible';
	};
	function hideInfo(idName){
		document.getElementById(idName).style.visibility = 'hidden';
	};
	
	function removeObj(idName){
		var obj = document.getElementById(idName);
		if(obj){
			obj.parentNode.removeChild(obj);	
		}	    
	}
	
	function showAbout(){
		if($("#dAboutWrapper").css("display") == "none"){
			$("#dAboutWrapper").css("display","block");
		} else {
			$("#dAboutWrapper").css("display","none");
		}	
	}
	
	function selectMenu(selectID){
		for(var i=0; i<menuItem.length;i++){
			$("#" + menuItem[i]).css("opacity", "0.7");
		}
		if(selectID){
			$("#" + selectID).css("opacity", "1.0");
		}		
	}

/*********************************************************
*HTTP Request
*********************************************************/ 
	function login(){
		var target = 'ATMARK';
		window.open("", target, 'width=700,height=440,toolbar=0,scrollbars=0,status=0,resizable=0,location=0,menuBar=0') ;				
		var form = document.createElement("form");
		form.action = '/Google.auth';
		form.target = target;
		form.method = 'post';
		var body = document.getElementsByTagName("body")[0];
		body.appendChild(form);
		form.submit();
		body.removeChild(form);
	}
	
	function reload(){
		location.reload();
	}
	
	function timeout(){
		location.replace("http://maps.yusukeutsunomiya.com/timeout.htm");
	}
	
	function unknown(){
		location.replace("http://maps.yusukeutsunomiya.com/unknown.htm");
	}
	
	function logout(){
		new $.ajax({ 
			url: "/Logout.action", 
			type: "GET",
			dataType: "json",
			success: function(data){
				reload();
			}, 
			error: function(XMLHttpRequest, textStatus, errorThrown){
				sendError(XMLHttpRequest, textStatus, errorThrown);
				unknown();
			}
		});	
	}
	
	function getUser(){	
		new $.ajax({ 
			url: "/GetUser.action", 
			type: "POST",
			dataType: "json", 
			success: function(data){
				if(data.code=="00"){
					$("#dWelcomeMessage").html("<img src='lib/img/Lifemap.png' align='center' height='80'><br><b>Hello " + data.given_name + ".</b><br><div style='line-height:1.5;font-size:11pt;'>I am Yusuke Utsunomiya, an App Engineer in Tokyo.<br>I will navigate you through my Lifemap.</div>");
					removeObj("dLogin");
					showInfo("dStart");
					$("#dSideBarOpener").css("display","block");
					$("#dMenuBar").css("display","block");
					$("#dMessageBar").css("display","block");
					$("#dMessageWrapper").css("display","block");
					$("#dMessages").css("display","block");
					windowResize();
				} else {
					$("#dWelcomeMessage").html("<img src='lib/img/Lifemap.png' align='center' height='80'><br><b>Welcome to my Lifemap!</b><br><div style='line-height:1.5;'>Please login to view my full background.<br><span style='font-size:9.0pt;color:#808080'>This is a prototype. Supports only <img width='15' style='opacity:0.7;margin-top:8px' src='lib/img/chrome.png'></span></div>");
					showInfo("dLogin");
				}
			}, 
			error: function(XMLHttpRequest, textStatus, errorThrown){
				sendError(XMLHttpRequest, textStatus, errorThrown);
				unknown();
			}
		});	
	}
	
	function postOffers(){
		var checkTarget = $("#iptMessageBox").val();
		if (!checkTarget.match(/\S/g)){
			return;
		}
		var query = "message=" + encodeURIComponent($("#iptMessageBox").val()) + "&offer_job=true";
		$("#iptMessageBox").val("");
		new $.ajax({ 
			url: "/PostOffers.action", 
			type: "POST",
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			data: query,
			dataType: "json", 
			success: function(data){
				if(data.code=="00"){
					removeObj("dNoMessage");
					if($("#dMessages").attr("lastChild")=="false"){
						return;
					}
					if($("#dSideBar").css("left")=="-370px"){
						getOffers();
						hideInfo("dSideBarOpener");
						$("#dSideBar").css("left","0px");
					} else {
						var messageID = data._id;
						var messageThumbnail;
						if(data.picture==undefined){
							messageThumbnail = "lib/img/silhouette.png";
						} else {
							messageThumbnail = data.picture;
						}
						var messageName = data.name;
						var messageText = data.message;
						var messageTime = data.post_date;
						var count = 0;
						var messageComments;
						var whiteOrGray = "cMessageGray";
						var cell = document.getElementById("dMessages");	
						if ( cell.hasChildNodes() )
						{
					        if((cell.firstChild.className).indexOf("cMessageGray")==-1){
					        	whiteOrGray = "cMessageGray";
					        } else {
					        	whiteOrGray = "cMessageWhite";			        
						    } 
						}
						messageComments = "+ Add comment";					
						var dMessage = $("<div id='"+ messageID +"' class='"+ whiteOrGray +" clearfix'></div>");
							var dMessageThumbnail = $("<div class='cMessageThumbnail'></div>");
								var imgMessageThumbnail = $("<img src='" + messageThumbnail + "' height='50'>");
							var dMessageBody = $("<div class='cMessageBody'></div>");
								var dMessageName = $("<div class='cMessageName'>"+ messageName +"</div>");
								var sMessageText = $("<div class='cMessageText'>"+ messageText +"</div>");
								var dMessageFooter = $("<div class='cMessageFooter'></div>");
									var sMessageTime = $("<span>"+ messageTime +"</span>");
									var sMessageComment = $("<span id='commentCount"+ messageID + "' class='cMessageComment' messageID='"+ messageID +"' count='"+ count +"' >"+ messageComments +"</span>");
										sMessageComment.click(function(e){	
											if($("#comment"+ $(this).attr("messageID")).css("display")=="none"){
												if($(this).attr("count")=="0"){
													$("#comment"+ $(this).attr("messageID")).slideToggle();
												} else {
													var cell = document.getElementById("cWrapper"+$(this).attr("messageID"));
													if ( cell.hasChildNodes() )
													{
													    while ( cell.childNodes.length >= 1 )
													    {
													        cell.removeChild( cell.firstChild );       
													    } 
													}
													getComments($(this).attr("messageID"));
												}	
											} else {
												$("#comment"+ $(this).attr("messageID")).slideToggle();																			
											}								
										});
						dMessageThumbnail.append(imgMessageThumbnail);
						dMessageFooter.append(sMessageTime);
						dMessageFooter.append(sMessageComment);
						dMessageBody.append(dMessageName);
						dMessageBody.append(sMessageText);
						dMessageBody.append(dMessageFooter);
						dMessage.append(dMessageThumbnail);
						dMessage.append(dMessageBody);
						var dComment = $("<div id='comment"+ messageID +"' class='cCommentWrapper clearfix'></div>");					
						var div = $("<div></div>");	
						var iptComment = $("<input id='ipt" + messageID + "' class='cIptComment' placeholder='Add comment' type='text'></input>");
						iptComment.keydown(function(e){
							isEnter4Comment = (e.keyCode == 13);
						});
						iptComment.keypress(function(e){
							isEnter4Comment = (e.keyCode == 13) && isEnter4Comment;		
						});		
						iptComment.keyup(function(e){
							if(isEnter4Comment&&(e.keyCode == 13)){
								postComments($(this).val(), ($(this).attr("id")).replace("ipt",""));
								$(this).val("");
								isEnter4Comment = false;
							} else {
								isEnter4Comment = false;
							}
						});							
						var dCommentBodyWrapper = $("<div id='cWrapper"+ messageID +"'></div>");	
						div.append(iptComment);
						dComment.append(dCommentBodyWrapper);
						dComment.append(div);				
						dMessage.append(dComment);
						$("#dMessages").prepend(dMessage);	
					}
				}
				else if(data.code=="05"){
					if(data._message="S0001"){
						timeout();
					}
				}
			}, 
			error: function(XMLHttpRequest, textStatus, errorThrown){
				sendError(XMLHttpRequest, textStatus, errorThrown);
				unknown();
			}
		});	
	}
	
	function postComments(message, comment_to){
		var checkTarget = message;
		if (!checkTarget.match(/\S/g)){
			return;
		}
		var query = "message=" + encodeURIComponent(message) + "&comment_to=" + comment_to;				
		new $.ajax({ 
			url: "/PostComments.action", 
			type: "POST",
			data: query,
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			dataType: "json", 
			success: function(data){
				if(data.code=="00"){
					var commentID = data._id;
					var commentThumbnail;
					if(data.picture==undefined){
						commentThumbnail = "lib/img/silhouette.png";
					} else {
						commentThumbnail = data.picture;
					}
					var commentName = data.name;
					var commentText = data.message;
					var commentTime = data.post_date;
					var parentMessage = data.comment_to;
					var dCommentBody = $("<div id='"+ commentID +"' class='cCommentBody'></div>");
						var dCommentInnerBody = $("<div class='cCommentInnerBody'></div>");
							var div = $("<div></div>");						
								var imgCommentThumbnail = $("<img src='" + commentThumbnail + "' class='cCommentThumbNail' align='left'>");
								var dMessageName = $("<div class='cCommentName'>"+ commentName +"</div>");
							var sMessageText = $("<div class='cCommentText'>"+ commentText + " <span class='cCommentTime'>" + commentTime + "</span></div>");
					div.append(imgCommentThumbnail);
					div.append(dMessageName);
					dCommentInnerBody.append(div);
					dCommentInnerBody.append(sMessageText);
					dCommentBody.append(dCommentInnerBody);
					$("#cWrapper"+parentMessage).append(dCommentBody);		
					var count = $("#commentCount"+ parentMessage).html();
					if(count=="+ Add comment"){
						count = "1 Comment";
					} else {
						var array = count.split("", 1);
						var num = parseInt(array[0],10) + 1;
						count = num + " Comments";
					}
					$("#commentCount"+ parentMessage).html(count);
				}
				else if(data.code=="05"){
					if(data._message="S0001"){
						timeout();
					}
				}
			}, 
			error: function(XMLHttpRequest, textStatus, errorThrown){
				sendError(XMLHttpRequest, textStatus, errorThrown);
				unknown();
			}
		});	
	}
	
	function getOffers(){
		var query = "lastChild="+$("#dMessages").attr("lastChild");
		new $.ajax({ 
			url: "/GetOffers.action", 
			type: "POST",
			data: query,
			dataType: "json", 
			success: function(data){
				if(data.code=="00"){
					var len = data.list.length;
					if(data.hasNext=="true"){
						len = len - 1;
					}
					for(var i=0;i<len;i++){
						var messageID = data.list[i]._id;
						var messageThumbnail;
						if(data.list[i].picture==undefined){
							messageThumbnail = "lib/img/silhouette.png";
						} else {
							messageThumbnail = data.list[i].picture;
						}
						var messageName = data.list[i].name;
						var messageText = data.list[i].message;
						var messageTime = data.list[i].post_date;
						var count = data.list[i].comment_count;
						var messageComments;
						var whiteOrGray;
						if(i%2==0){
							whiteOrGray = "cMessageGray";
						} else {
							whiteOrGray = "cMessageWhite";
						}
						if (count == "0"){
							messageComments = "+ Add comment";					
						} else if (count == "1") {
							messageComments = count + " Comment";
						} else {
							messageComments = count + " Comments";					
						}
						var dMessage = $("<div id='"+ messageID +"' class='"+ whiteOrGray +" clearfix'></div>");
							var dMessageThumbnail = $("<div class='cMessageThumbnail'></div>");
								var imgMessageThumbnail = $("<img src='" + messageThumbnail + "' height='50'>");
							var dMessageBody = $("<div class='cMessageBody'></div>");
								var dMessageName = $("<div class='cMessageName'>"+ messageName +"</div>");
								var sMessageText = $("<div class='cMessageText'>"+ messageText +"</div>");
								var dMessageFooter = $("<div class='cMessageFooter'></div>");
									var sMessageTime = $("<span>"+ messageTime +"</span>");
									var sMessageComment = $("<span id='commentCount"+ messageID + "' class='cMessageComment' messageID='"+ messageID +"' count='"+ count +"' >"+ messageComments +"</span>");
										sMessageComment.click(function(e){	
											if($("#comment"+ $(this).attr("messageID")).css("display")=="none"){
												if($(this).attr("count")=="0"){
													$("#comment"+ $(this).attr("messageID")).slideToggle();
												} else {
													var cell = document.getElementById("cWrapper"+$(this).attr("messageID"));
													if ( cell.hasChildNodes() )
													{
													    while ( cell.childNodes.length >= 1 )
													    {
													        cell.removeChild( cell.firstChild );       
													    } 
													}
													getComments($(this).attr("messageID"));
												}	
											} else {
												$("#comment"+ $(this).attr("messageID")).slideToggle();																			
											}								
										});
						dMessageThumbnail.append(imgMessageThumbnail);
						dMessageFooter.append(sMessageTime);
						dMessageFooter.append(sMessageComment);
						dMessageBody.append(dMessageName);
						dMessageBody.append(sMessageText);
						dMessageBody.append(dMessageFooter);
						dMessage.append(dMessageThumbnail);
						dMessage.append(dMessageBody);
						var dComment = $("<div id='comment"+ messageID +"' class='cCommentWrapper clearfix'></div>");					
						var div = $("<div></div>");	
						var iptComment = $("<input id='ipt" + messageID + "' class='cIptComment' placeholder='Add comment' type='text'></input>");
						iptComment.keydown(function(e){
							isEnter4Comment = (e.keyCode == 13);
						});
						iptComment.keypress(function(e){
							isEnter4Comment = (e.keyCode == 13) && isEnter4Comment;		
						});		
						iptComment.keyup(function(e){
							if(isEnter4Comment&&(e.keyCode == 13)){
								postComments($(this).val(), ($(this).attr("id")).replace("ipt",""));
								$(this).val("");
								isEnter4Comment = false;
							} else {
								isEnter4Comment = false;
							}
						});	
						var dCommentBodyWrapper = $("<div id='cWrapper"+ messageID +"'></div>");	
						div.append(iptComment);
						dComment.append(dCommentBodyWrapper);
						dComment.append(div);				
						dMessage.append(dComment);
						$("#dMessages").append(dMessage);
						if(i == len-1){
							$("#dMessages").attr("lastChild",data.list[i]._id);
						}
					}			
					if(data.hasNext=="true"){
						var whiteOrGray ="";
						var cell = document.getElementById("dMessages");	
						if ( cell.hasChildNodes() )
						{
					        if((cell.lastChild.className).indexOf("cMessageGray")==-1){
					        	whiteOrGray = "cMessageGray";
					        } else {
					        	whiteOrGray = "cMessageWhite";			        
						    } 
						}
						var dSeeMore = $("<div id='dSeeMore' class='"+ whiteOrGray +"' clearfix'>see more</div>");
							dSeeMore.click(function(){
								removeObj("dSeeMore");
								getOffers();
							});
						$("#dMessages").append(dSeeMore);
					}
				}
				else if(data.code=="05"){
					if(data._message="S0001"){
						timeout();
					}
				}
			}, 
			error: function(XMLHttpRequest, textStatus, errorThrown){
				sendError(XMLHttpRequest, textStatus, errorThrown);
				unknown();
			}
		});	
	}
	
	function getOffersByUser(){
		var query = "lastChild="+$("#dMessages").attr("lastChild");
		new $.ajax({ 
			url: "/GetOffersByUser.action", 
			type: "POST",
			data: query,
			dataType: "json", 
			success: function(data){
				if(data.code=="00"){
					var len = data.list.length;
					if(len!=0){				
						if(data.hasNext=="true"){
							len = len - 1;
						}
						for(var i=0;i<len;i++){
							var messageID = data.list[i]._id;
							var messageThumbnail;
							if(data.list[i].picture==undefined){
								messageThumbnail = "lib/img/silhouette.png";
							} else {
								messageThumbnail = data.list[i].picture;
							}
							var messageName = data.list[i].name;
							var messageText = data.list[i].message;
							var messageTime = data.list[i].post_date;
							var count = data.list[i].comment_count;
							var messageComments;
							var whiteOrGray;
							if(i%2==0){
								whiteOrGray = "cMessageGray";
							} else {
								whiteOrGray = "cMessageWhite";
							}
							if (count == "0"){
								messageComments = "+ Add comment";					
							} else if (count == "1") {
								messageComments = count + " Comment";
							} else {
								messageComments = count + " Comments";					
							}
							var dMessage = $("<div id='"+ messageID +"' class='"+ whiteOrGray +" clearfix'></div>");
								var dMessageThumbnail = $("<div class='cMessageThumbnail'></div>");
									var imgMessageThumbnail = $("<img src='" + messageThumbnail + "' height='50'>");
								var dMessageBody = $("<div class='cMessageBody'></div>");
									var dMessageName = $("<div class='cMessageName'>"+ messageName +"</div>");
									var sMessageText = $("<div class='cMessageText'>"+ messageText +"</div>");
									var dMessageFooter = $("<div class='cMessageFooter'></div>");
										var sMessageTime = $("<span>"+ messageTime +"</span>");
										var sMessageComment = $("<span id='commentCount"+ messageID + "' class='cMessageComment' messageID='"+ messageID +"' count='"+ count +"' >"+ messageComments +"</span>");
											sMessageComment.click(function(e){	
												if($("#comment"+ $(this).attr("messageID")).css("display")=="none"){
													if($(this).attr("count")=="0"){
														$("#comment"+ $(this).attr("messageID")).slideToggle();
													} else {
														var cell = document.getElementById("cWrapper"+$(this).attr("messageID"));
														if ( cell.hasChildNodes() )
														{
														    while ( cell.childNodes.length >= 1 )
														    {
														        cell.removeChild( cell.firstChild );       
														    } 
														}
														getComments($(this).attr("messageID"));
													}	
												} else {
													$("#comment"+ $(this).attr("messageID")).slideToggle();																			
												}								
											});
							dMessageThumbnail.append(imgMessageThumbnail);
							dMessageFooter.append(sMessageTime);
							dMessageFooter.append(sMessageComment);
							dMessageBody.append(dMessageName);
							dMessageBody.append(sMessageText);
							dMessageBody.append(dMessageFooter);
							dMessage.append(dMessageThumbnail);
							dMessage.append(dMessageBody);
							var dComment = $("<div id='comment"+ messageID +"' class='cCommentWrapper clearfix'></div>");					
							var div = $("<div></div>");	
							var iptComment = $("<input id='ipt" + messageID + "' class='cIptComment' placeholder='Add comment' type='text'></input>");
							iptComment.keyup(function(e){
								if(e.keyCode == 13){
									postComments($(this).val(), ($(this).attr("id")).replace("ipt",""));
									$(this).val("");
								}					
							});
							var dCommentBodyWrapper = $("<div id='cWrapper"+ messageID +"'></div>");	
							div.append(iptComment);
							dComment.append(dCommentBodyWrapper);
							dComment.append(div);				
							dMessage.append(dComment);
							$("#dMessages").append(dMessage);
							if(i == len-1){
								$("#dMessages").attr("lastChild",data.list[i]._id);
							}
						}			
						if(data.hasNext=="true"){
							var whiteOrGray ="";
							var cell = document.getElementById("dMessages");	
							if ( cell.hasChildNodes() )
							{
						        if((cell.lastChild.className).indexOf("cMessageGray")==-1){
						        	whiteOrGray = "cMessageGray";
						        } else {
						        	whiteOrGray = "cMessageWhite";			        
							    } 
							}
							var dSeeMore = $("<div id='dSeeMore' class='"+ whiteOrGray +"' clearfix'>see more</div>");
								dSeeMore.click(function(){
									removeObj("dSeeMore");
									getOffersByUser();
								});
							$("#dMessages").append(dSeeMore);
						}
					} else {
						var dNoMessage = $("<br><div id='dNoMessage'>You have not posted any messages yet</div>");
						$("#dMessages").append(dNoMessage);
					}
				}
				else if(data.code=="05"){
					if(data._message="S0001"){
						timeout();
					}
				}
			}, 
			error: function(XMLHttpRequest, textStatus, errorThrown){
				sendError(XMLHttpRequest, textStatus, errorThrown);
				unknown();
			}
		});	
	}
	
	function getComments(_id){
		var query = "_id=" + _id;				
		new $.ajax({ 
			url: "/GetComments.action", 
			type: "POST",
			data: query,
			dataType: "json", 
			success: function(data){
				if(data.code=="00"){
					for(var i=0;i<data.length;i++){
						var commentID = data.list[i]._id;
						var commentThumbnail;
						if(data.list[i].picture==undefined){
							commentThumbnail = "lib/img/silhouette.png";
						} else {
							commentThumbnail = data.list[i].picture;
						}
						var commentName = data.list[i].name;
						var commentText = data.list[i].message;
						var commentTime = data.list[i].post_date;
						var parentMessage = data.list[i].comment_to;
						var dCommentBody = $("<div id='"+ commentID +"' class='cCommentBody'></div>");
							var dCommentInnerBody = $("<div class='cCommentInnerBody'></div>");
								var div = $("<div></div>");						
									var imgCommentThumbnail = $("<img src='" + commentThumbnail + "' class='cCommentThumbNail' align='left'>");
									var dMessageName = $("<div class='cCommentName'>"+ commentName +"</div>");
								var sMessageText = $("<div class='cCommentText'>"+ commentText + " <span class='cCommentTime'>" + commentTime + "</span></div>");
						div.append(imgCommentThumbnail);
						div.append(dMessageName);
						dCommentInnerBody.append(div);
						dCommentInnerBody.append(sMessageText);
						dCommentBody.append(dCommentInnerBody);
						$("#cWrapper"+parentMessage).append(dCommentBody);
						if(i==data.length-1){
							$("#comment"+ parentMessage).slideToggle();
						}				
					}
				}
				else if(data.code=="05"){
					if(data._message="S0001"){
						timeout();
					}
				}				
			}, 
			error: function(XMLHttpRequest, textStatus, errorThrown){
				sendError(XMLHttpRequest, textStatus, errorThrown);
				unknown();
			}
		});	
	}
	
	function sendError(XMLHttpRequest, textStatus, errorThrown){
		var query = "XMLHttpRequest="+XMLHttpRequest + "&textStatus=" + textStatus + "&errorThrown=" + errorThrown;		
		new $.ajax({ 
			url: "/ClientError.action", 
			type: "POST",
			data: query,
			dataType: "json", 
			success: function(data){
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
			}
		});	
	}

/*********************************************************
*Messenger
*********************************************************/ 
	function refresh(mode){
		$("#dMessages").attr("lastChild","");
		var cell = document.getElementById("dMessages");
		if ( cell.hasChildNodes() )
		{
		    while ( cell.childNodes.length >= 1 )
		    {
		        cell.removeChild( cell.firstChild );       
		    } 
		}
		if(mode==0){
			getOffers();
		} else if(mode==1){
			getOffersByUser();
		}
		
	}
	
	function slideRight(){
		hideInfo("dSideBarOpener");
		$("#dSideBar").animate(
				{"left": "+=370px"},
				"fast",
				"linear",
				function(){
					getOffers();
				}
		);	
	}
	
	function slideLeft(){
		$("#dSideBar").animate(
				{"left": "-=370px"},
				"fast",
				"linear",
				function(){
					$("#dMessages").attr("lastChild","");
					var cell = document.getElementById("dMessages");
					if ( cell.hasChildNodes() )
					{
					    while ( cell.childNodes.length >= 1 )
					    {
					        cell.removeChild( cell.firstChild );       
					    } 
					}
					showInfo("dSideBarOpener");
				}
		);	
	}
	
	function showDM(){
		$("#dMessages").attr("lastChild","");
		var cell = document.getElementById("dMessages");
		if ( cell.hasChildNodes() )
		{
		    while ( cell.childNodes.length >= 1 )
		    {
		        cell.removeChild( cell.firstChild );       
		    } 
		}
		var GooglePlus = new Array(5);
		GooglePlus[0] = "http://ssl.gstatic.com/images/icons/gplus-64.png";
		GooglePlus[1] = "Google+";
		GooglePlus[2] = "Yusuke Utsunomiya";
		GooglePlus[3] = "Or E-mail me at uskay23@gmail.com";
		GooglePlus[4] = "http://plus.google.com/102687903017702576897?prsrc=3";
		var Facebook = new Array(5);
		Facebook[0] = "http://maps.yusukeutsunomiya.com/lib/img/f_logo.png";
		Facebook[1] = "Facebook";
		Facebook[2] = "Yusuke Utsunomiya";
		Facebook[3] = "I'll be checking messenger everyday";
		Facebook[4] = "http://www.facebook.com/yusuke.utsunomiya.9";
		var Twitter = new Array(5);
		Twitter[0] = "http://maps.yusukeutsunomiya.com/lib/img/t_logo.png";
		Twitter[1] = "Twitter";
		Twitter[2] = "@uskay";
		Twitter[3] = "I'll be checking tweets every morning and night";
		Twitter[4] = "https://twitter.com/uskay";
		var LinkedIn = new Array(5);
		LinkedIn[0] = "http://maps.yusukeutsunomiya.com/lib/img/l_logo.png";
		LinkedIn[1] = "LinkedIn";
		LinkedIn[2] = "Yusuke U.";
		LinkedIn[3] = "You can see my resume at LinkedIn";
		LinkedIn[4] = "http://lnkd.in/CfejDN";
		var DM = Array(4);
		DM[0] = GooglePlus;
		DM[1] = Facebook;
		DM[2] = Twitter;
		DM[3] = LinkedIn;		
		for(var i=0;i<DM.length;i++){
			var messageThumbnail= DM[i][0];
			var messageName = DM[i][1];
			var messageText = DM[i][2];
			var messageTime = DM[i][3];
			var link = DM[i][4];
			var whiteOrGray;
			if(i%2==0){
				whiteOrGray = "cMessageGray";
			} else {
				whiteOrGray = "cMessageWhite";
			}
			var dMessage = $("<div class='"+ whiteOrGray +" clearfix'></div>");
				var dMessageThumbnail = $("<div class='cMessageThumbnail'></div>");
					var imgMessageThumbnail = $("<img src='" + messageThumbnail + "' height='50'>");
				var dMessageBody = $("<div class='cMessageBody'></div>");
					var dMessageName = $("<div class='cMessageName'>"+ messageName +"</div>");
					var sMessageText = $("<div class='cMessageText cDMLink'><a class='blue' href='"+ link +"' target='_blank'>"+ messageText +"</a></div>");
					var dMessageFooter = $("<div class='cMessageFooter'></div>");
						var sMessageTime = $("<span>"+ messageTime +"</span>");
			dMessageThumbnail.append(imgMessageThumbnail);
			dMessageFooter.append(sMessageTime);
			dMessageBody.append(dMessageName);
			dMessageBody.append(sMessageText);
			dMessageBody.append(dMessageFooter);
			dMessage.append(dMessageThumbnail);
			dMessage.append(dMessageBody);
			$("#dMessages").append(dMessage);
		}
		$("#dMessages").attr("lastChild","false");
	}