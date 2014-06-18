//For Web Template
window.onload = function()
{
	webTemp.app.toTip();
	webTemp.app.toBanner();
	webTemp.app.toSelec();
	webTemp.app.toScroll();
};
var webTemp = {}; //命名空间

webTemp.tools = {};
webTemp.tools.getByClass = function(oParn, sClass)
{
	var oParent = oParn || document;
	var aElems = oParent.getElementsByTagName('*');
	var aResult = [];
	//添加正则完全匹配类名
	var reg = new RegExp('\\b' + sClass + '\\b');
	for(var i = 0, len = aElems.length; i < len; i++)
	{
//		if(aElems[i].className == sClass)
		if(reg.test(aElems[i].className))
		{
			aResult.push(aElems[i]);
		}
	}
	return aResult;
}
webTemp.tools.getStyle = function(obj, attr, value)
{
	if(arguments.length == 2)
	{
		if(obj.currentStyle)
		{
			return obj.currentStyle[attr];
		}
		else
		{
			//getComputedStyle()为获取非行间样式函数
			return getComputedStyle(obj, false)[attr];
		}
	}
	else if(arguments.length == 3)
	{
		obj.style[attr] = value;
	}
}

webTemp.ui = {};
webTemp.ui.textChange = function(obj, str)
{
	obj.onfocus = function()
	{
		if(this.value == str)
		{
			this.value = '';
		}
	};
	obj.onblur = function()
	{
		if(this.value == '')
		{
			this.value = str;
		}
	};
};
webTemp.ui.fadeIn = function(obj)
{
	var iStyle = webTemp.tools.getStyle(obj, 'opacity');
	if(iStyle == 1)return false;
	var opacValue = 0;
	if(obj.timer)
	{
		clearInterval(obj.timer);
	}
	obj.timer = setInterval(function()
	{
		var iStep = 5;
		if(opacValue == 100)
		{
			clearInterval(obj.timer);
		}
		else
		{
			opacValue += iStep;
			obj.style.opacity = opacValue / 100;
			obj.style.filter = 'alpha(opacity=' + opacValue + ')';
		}
	}, 30);
};
webTemp.ui.fadeOut = function(obj)
{
	var iStyle = webTemp.tools.getStyle(obj, 'opacity');
	if(iStyle == 0)return false;
	var opacValue = 100;
	if(obj.timer)
	{
		clearInterval(obj.timer);
	}
	obj.timer = setInterval(function()
	{
		var iStep = -5;
		if(opacValue == 0)
		{
			clearInterval(obj.timer);
		}
		else
		{
			opacValue += iStep;
			obj.style.opacity = opacValue / 100;
			obj.style.filter = 'alpha(opacity:' + opacValue + ')';
		}
	}, 30);
};
webTemp.ui.motion = function(obj, old, now)
{
	if(obj.timer)
	{
		clearInterval(obj.timer);
	}
	var repeat = function()
	{
		var iStep = (now - old) / 10;
		iStep = iStep > 0 ? Math.ceil(iStep) : Math.floor(iStep);
		if(now == old)
		{
			clearInterval(obj.timer);
		}
		else
		{
			old += iStep;
			obj.style.left = old + 'px';
		}
	};
	obj.timer = setInterval(repeat, 30);
};

webTemp.app = {};
webTemp.app.toTip = function()
{
	var oText1 = document.getElementById('sechTxt1');
	var oText2 = document.getElementById('sechTxt2');

	webTemp.ui.textChange(oText1, 'Search website');
	webTemp.ui.textChange(oText2, 'Search website');
};
webTemp.app.toBanner = function()
{
	var oAd = document.getElementById('adv');
	var aLi = oAd.getElementsByTagName('li');

	var oPrev = webTemp.tools.getByClass(oAd, 'prev')[0];
	var oNext = webTemp.tools.getByClass(oAd, 'next')[0];
	var oPrevBtn = webTemp.tools.getByClass(oAd, 'prev_btn')[0];
	var oNextBtn = webTemp.tools.getByClass(oAd, 'next_btn')[0];
	var iNow = 0;

	var timer = setInterval(autoPlay, 3000);
	function autoPlay()
	{
		if(iNow == aLi.length - 1)
		{
			iNow = 0;
		}
		else
		{
			iNow++;
		}

		for(var i = 0, len = aLi.length; i < len; i++)
		{
			webTemp.ui.fadeOut(aLi[i]);
		}
		webTemp.ui.fadeIn(aLi[iNow]);
	}

	function autoPlayPrev()
	{
		if(iNow == 0)
		{
			iNow = aLi.length - 1;
		}
		else
		{
			iNow--;
		}

		for(var i = 0, len = aLi.length; i < len; i++)
		{
			webTemp.ui.fadeOut(aLi[i]);
		}
		webTemp.ui.fadeIn(aLi[iNow]);
	}

	oPrev.onmouseover = oPrevBtn.onmouseover = function()
	{
		oPrevBtn.style.display = 'block';
		clearInterval(timer);
	};
	oPrev.onmouseout = oPrevBtn.onmouseout= function()
	{
		oPrevBtn.style.display = 'none';
		timer = setInterval(autoPlay, 3000);
	};

	oNext.onmouseover = oNextBtn.onmouseover= function()
	{
		oNextBtn.style.display = 'block';
		clearInterval(timer);
	};
	oNext.onmouseout = oNextBtn.onmouseout = function()
	{
		oNextBtn.style.display = 'none';
		timer = setInterval(autoPlay, 3000);
	};

	oPrev.onclick = oPrevBtn.onclick = function()
	{
		autoPlayPrev();
	};
	oNext.onclick = oNextBtn.onclick = function()
	{
		autoPlay();
	};
};
webTemp.app.toSelec = function()
{
	var oSelec = document.getElementById('selts');
	var aDd = oSelec.getElementsByTagName('dd');
	var aUl = oSelec.getElementsByTagName('ul');
	var aH2 = oSelec.getElementsByTagName('h2');

	for(var i = 0, len = aDd.length; i < len; i++)
	{
		aDd[i].index = i;
		aDd[i].onclick = function(ev)
		{
			var ev = ev || window.event;
			var This = this;
			for(var i = 0, len = aUl.length; i < len; i++)
			{
				aUl[i].style.display = 'none';
			}
			aUl[this.index].style.display = 'block';
			document.onclick = function()
			{
				aUl[This.index].style.display = 'none';
			};
			ev.cancelBubble = true;
		};
	}

	for(var i = 0, len = aUl.length; i < len; i++)
	{
		//通过UL的索引找到对应的H2标签
		aUl[i].index = i;
		(function(ul)
		{
			var aLi = ul.getElementsByTagName('li');
			for(var i = 0, len = aLi.length; i < len; i++)
			{
				aLi[i].onmouseover = function()
				{
					this.className = 'active';
				};
				aLi[i].onmouseout = function()
				{
					this.className = '';
				};
				aLi[i].onclick = function(ev)
				{
					var ev = ev || window.event;
					//当前li标签内容 = 当前li的父级标签ul的索引所对应的h2标签
					aH2[this.parentNode.index].innerHTML = this.innerHTML;

					ev.cancelBubble = true;
					//点击li获取内容后菜单消失
					this.parentNode.style.display = 'none';
				};
			}
		})(aUl[i]);
	}
};
webTemp.app.toScroll = function()
{
	var oScrollDiv = document.getElementById('toScroll');
	var oUl = oScrollDiv.getElementsByTagName('ul')[0];
	var aLi = oUl.getElementsByTagName('li');

	var oPrevBtn = webTemp.tools.getByClass(oScrollDiv, 'scroll_btn_left')[0];
	var oNextBtn = webTemp.tools.getByClass(oScrollDiv, 'scroll_btn_right')[0];

	var iNow = 0;
	oUl.innerHTML += oUl.innerHTML;
	oUl.style.width = aLi.length * aLi[0].offsetWidth + 'px';

	oPrevBtn.onclick = function()
	{
		if(iNow == 0)
		{
			iNow = aLi.length / 2;
			oUl.style.left = -oUl.offsetWidth / 2 + 'px';
		}
		webTemp.ui.motion(oUl, -iNow * aLi[0].offsetWidth, -(iNow - 1) * aLi[0].offsetWidth);
		iNow--;
	};
	oNextBtn.onclick = function()
	{
		if(iNow == aLi.length / 2)
		{
			iNow = 0;
			oUl.style.left = 0;
		}
		webTemp.ui.motion(oUl, -iNow * aLi[0].offsetWidth, -(iNow + 1) * aLi[0].offsetWidth);
		iNow++;
	};
};
