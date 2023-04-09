 /*:
 * @plugindesc Composition v1.2.
 * @author Kong Jing
 *
 * @param Recipes
 * @text 配方
 * @desc 合成判定条件，仅判断位置关系与九宫格一致，类比MC。
 * 举例，仅材料1和2，那么只需要1在2左一个格子，即可。
 * @type struct<recipe>[]
 * @default
 *
 * @param Introdction
 * @text 介绍
 * @desc 初始介绍（若不填，则没有信息跳出）
 * @default \C[1]这是一个合成系统
 *
 * @param JoinText
 * @text 合成选项
 * @desc 合成显示的文字
 * @default 确认合成
 *
 * @param SelectText
 * @text 选择选项
 * @desc 选择显示的文字
 * @default 选择材料
 *
 * @param ProduceText
 * @text 合成产物
 * @desc 合成显示的文字
 * @default 合成产物：
 *
 * @param ProduceNumber
 * @text 合成产物拥有数
 * @desc 合成显示的文字
 * @default 拥有数：
 *
 * @param SuccessText
 * @text 成功合成
 * @desc 成功显示的文字
 * @default 祝贺，您成功合成了\C[1]
 *
 * @param FailText
 * @text 失败合成
 * @desc 失败显示的文字
 * @default 遗憾，合成失败。
 *
 * @param MaxText
 * @text 物品上限
 * @desc 已经最大数量显示的文字
 * @default 抱歉，您已经拥有了太多\C[1]
 *
 * @param LevelNotEnough
 * @text 工作台限制
 * @desc 材料正确切充足，但Level不够（若不填，则没有信息跳出）
 * @default 抱歉，您目前的水准还无法造出\C[1]
 *
 * @param WindowSkin
 * @text 窗口皮肤
 * @desc 0是窗口，1是暗淡，2是透明（该窗口指所有窗口）
 * @default 0
 *
 * @param WindowPosition
 * @text 窗口位置
 * @desc 0是顶部，1是中间，2是底部（该窗口单指介绍、成功、失败的文字显示）
 * @default 1
 *
 * @param SuccessSound
 * @text 成功音效
 * @desc 成功合成音效
 * @default
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param FailSound
 * @text 失败音效
 * @desc 失败合成音效
 * @default
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @requiredAssets data/Composition.json
 *
 * @help
 * ！注意，以防合成配方参数设置丢失
 * （建议备份js/plugins.js文件，该文件保存的均为各种参数设置。）
 *
 * 进入合成界面的插件命令是Composition Level
 * 比如Composition 1
 * 则表示以当前Level为1进入
 *
 * 参数部分应该没啥问题吧。
 * 其中介绍、成功失败的文字和游戏内物品描述显示一样
 * 可以用\C等调整字颜色大小。
 *
 * maxNumber是该物品最大数量，不填默认是系统的物品数量最大
 *
 * level项，如果非0，则必须得在限制条件下才能合成。
 * 形象化理解，level0，手工制作。level1，工作台制作。level2，熔炉制作。
 * 手工制作，随时可以，工作台产物在非工作台情况下无法达成。
 *
 * 产物以及9个材料可以选物品、武器、装备，但仅能选一项，多选则按顺序选取第一项。
 * 9个材料依次对应第一行1,2,3,第二行4,5,6,第三行7,8,9
 *
 * 对配方的判断参照MC,即满足位置关系:
 * 比如例子中配方前两个即九宫格第一行前两格有物品
 * 那么只需要3号物品在1号物品右边一格,就能满足配方要求,成功合成。
 * 
 */
/*~struct~Recipe:
 * @param name
 * @text 配方名字
 * @desc 可不写，仅提供自己设置参数时阅览
 * @default 
 *
 * @param level
 * @text 制作要求
 * @desc 默认为0，可以在任何情况下合成，其余数字均只能再该数字生效时，有权生成该物品。
 * @type Numbers
 * @default 0
 *
 * @param maxNumber
 * @text 上限数量
 * @desc 仅为合成时候生效的限制数量。0表示不限制(则按系统默认最大数量判断)
 * @type Numbers
 * @default 0
 *
 * @param item0
 * @text 产物
 * @desc 物品、武器、装备，三种里仅能选择一项，按顺序生效
 * @type struct<Item>
 * @default
 *
 * @param item1
 * @text 材料1
 * @desc 九宫格第一排第一列
 * 物品、武器、装备，三种里仅能选择一项，按顺序生效
 * @type struct<Item>
 * @default
 * 
 * @param item2
 * @text 材料2
 * @desc 九宫格第一排第二列
 * 物品、武器、装备，三种里仅能选择一项，按顺序生效
 * @type struct<Item>
 * @default 
 * 
 * @param item3
 * @text 材料3
 * @desc 九宫格第一排第三列
 * 物品、武器、装备，三种里仅能选择一项，按顺序生效
 * @type struct<Item>
 * @default 
 * 
 * @param item4
 * @text 材料4
 * @desc 九宫格第二排第一列
 * 物品、武器、装备，三种里仅能选择一项，按顺序生效
 * @type struct<Item>
 * @default 
 * 
 * @param item5
 * @text 材料5
 * @desc 九宫格第二排第二列
 * 物品、武器、装备，三种里仅能选择一项，按顺序生效
 * @type struct<Item>
 * @default 
 *
 * @param item6
 * @text 材料6
 * @desc 九宫格第二排第三列
 * 物品、武器、装备，三种里仅能选择一项，按顺序生效
 * @type struct<Item>
 * @default 
 * 
 * @param item7
 * @text 材料7
 * @desc 九宫格第三排第一列
 * 物品、武器、装备，三种里仅能选择一项，按顺序生效
 * @type struct<Item>
 * @default 
 * 
 * @param item8
 * @text 材料8
 * @desc 九宫格第三排第二列
 * 物品、武器、装备，三种里仅能选择一项，按顺序生效
 * @type struct<Item>
 * @default 
 * 
 * @param item9
 * @text 材料9
 * @desc 九宫格第三排第三列
 * 物品、武器、装备，三种里仅能选择一项，按顺序生效
 * @type struct<Item>
 * @default 
 */
/*~struct~Item:
 * @param item
 * @text 物品
 * @type item
 * @parent Object Selectors
 *
 * @param weapon
 * @text 武器
 * @type weapon
 * @parent Object Selectors
 *
 * @param armor
 * @text 装备
 * @type armor
 * @parent Object Selectors
 */
 
var Imported = Imported || {};
Imported.KJ_Composition = true;
// Parameter Variables
var KJ = KJ || {};
KJ.Composition = KJ.Composition || {};
KJ.Composition.Parameters = PluginManager.parameters('KJ_Composition');
KJ.Composition.Param = KJ.Composition.Param || {};
KJ.Composition.Param.Introdction = String(KJ.Composition.Parameters['Introdction']);
KJ.Composition.Param.JoinText = String(KJ.Composition.Parameters['JoinText']);
KJ.Composition.Param.SelectText = String(KJ.Composition.Parameters['SelectText']);
KJ.Composition.Param.ProduceText = String(KJ.Composition.Parameters['ProduceText']);
KJ.Composition.Param.ProduceNumber = String(KJ.Composition.Parameters['ProduceNumber']);
KJ.Composition.Param.SuccessText = String(KJ.Composition.Parameters['SuccessText']);
KJ.Composition.Param.FailText = String(KJ.Composition.Parameters['FailText']);
KJ.Composition.Param.MaxText = String(KJ.Composition.Parameters['MaxText']);
KJ.Composition.Param.LevelNotEnough = String(KJ.Composition.Parameters['LevelNotEnough']);
KJ.Composition.Param.SuccessSound = String(KJ.Composition.Parameters['SuccessSound']);
KJ.Composition.Param.FailSound = String(KJ.Composition.Parameters['FailSound']);
KJ.Composition.Param.WindowSkin = parseInt(KJ.Composition.Parameters['WindowSkin']) || 0;
KJ.Composition.Param.WindowPosition = parseInt(KJ.Composition.Parameters['WindowPosition']) || 1;
KJ.Composition.Param.Recipes = eval(KJ.Composition.Parameters['Recipes']) || [];
KJ.Composition.Recipes = [];
KJ.Composition.Level = 0;
DataManager.loadKJ_CompositionData = function(){
	for(var i = 0; i < KJ.Composition.Param.Recipes.length; i++){
		var recipe = JSON.parse(KJ.Composition.Param.Recipes[i]);
		var items = ["item", "weapon", "armor"];
		var method = {};
		var flag = true;
		var sum = -1;
		method.maxNumber = parseInt(recipe.maxNumber) || 0;
		method.level = parseInt(recipe.level) || 0;
		method.recipe = [];
		var item, type, index;
		for(var j = 0; j < 10; j++){
			item = recipe["item" + j];
			if(item){
				item = JSON.parse(item);
				for(var k = 0; k < 3; k++){
					type = items[k];
					if(item[type]){
						index = parseInt(item[type]);
						if(j){
							method.recipe.push([index, type]);
						}
						else{
							method.produce = [index, type];
						}
						sum++;
						break;
					}
					else if(k == 2){
						if(j){
							method.recipe.push([0, null]);
						}
						else{
							flag = false;
						}
					}
				}	
			}
			else{
				if(j){
					method.recipe.push([0, null]);
				}
				else{
					flag = false;
				}
			}
		}
		if(flag && sum){
			method.count = sum;
			KJ.Composition.Recipes.push(method);
		}
	}
};
KJ.Composition.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
	if (!KJ.Composition.DataManager_isDatabaseLoaded.call(this)) return false;
	this.loadKJ_CompositionData();
	return true;
};
KJ.Composition.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args){
	KJ.Composition.Game_Interpreter_pluginCommand.call(this, command, args);
	if (command === 'Composition') {
		KJ.Composition.Level = parseInt(args[0]) || 0;
		SceneManager.push(Scene_Composition);
	}
};
//Scene
function Scene_Composition() {
    this.initialize.apply(this, arguments);
}
Scene_Composition.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Composition.prototype.constructor = Scene_Composition;
Scene_Composition.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
	this._data = Array(9);
	this._success = {"name":KJ.Composition.Param.SuccessSound,"pan":0,"pitch":100,"volume":90};
	this._fail = {"name":KJ.Composition.Param.FailSound,"pan":0,"pitch":100,"volume":90};
	this._index = 0;
};
Scene_Composition.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	this.createHelpWindow();
	this.createBoxWindow();
	this.createItemWindow();
	this.createOptionWindow();
	this._optionWindow.setBackgroundType(KJ.Composition.Param.WindowSkin);
	this._boxWindow.setBackgroundType(KJ.Composition.Param.WindowSkin);
	this._helpWindow.setBackgroundType(KJ.Composition.Param.WindowSkin);
	this._itemWindow.setBackgroundType(KJ.Composition.Param.WindowSkin);
};
Scene_Composition.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
};
Scene_MenuBase.prototype.createHelpWindow = function() {
    this._helpWindow = new Window_Help(2);
    this.addWindow(this._helpWindow);
};
Scene_Composition.prototype.createBoxWindow = function() {
	var x = Graphics.boxWidth * 0.3;
	var y = this._helpWindow.y + this._helpWindow.height;
	var width = Graphics.boxWidth * 0.7;
	var height = Graphics.boxHeight * 0.8 - y;
    this._boxWindow = new Window_JoinBox(x, y, width, height);
    this._boxWindow.setHandler('ok',     this.onBoxOk.bind(this));
    this._boxWindow.setHandler('cancel', this.onBoxCancel.bind(this));
    this.addWindow(this._boxWindow);
	this._boxWindow.setHelpWindow(this._helpWindow);
	this._boxWindow.setData(this._data);
};
Scene_Composition.prototype.onBoxOk = function() {
	this._index = this._boxWindow.index();
	this._boxWindow.deactivate();
	this._optionWindow.activate();
	this._optionWindow.select(0);
};
Scene_Composition.prototype.onBoxCancel = function() {
	for(var i = 0; i < 9; i++){
		var item = this._data[i];
		$gameParty.gainItem(item, 1);
	}
	this.popScene();
};
Scene_Composition.prototype.createItemWindow = function() {
	var x = 0;
    var y = this._helpWindow.y + this._helpWindow.height;
	var width = this._boxWindow.x;
	var height = Graphics.boxHeight - y;
    this._itemWindow = new Window_CompositionItem(x, y, width, height);
    this._itemWindow.setHelpWindow(this._helpWindow);
    this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
    this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
    this.addWindow(this._itemWindow);
};
Scene_Composition.prototype.onItemOk = function(){
	var item = this._itemWindow.item();
	if(item){
		$gameParty.loseItem(item, 1);
	}
	var lastItem = this._data[this._index];
	if(lastItem){
		$gameParty.gainItem(lastItem, 1);
	}
	this._data[this._index] = item;
	this._itemWindow.refresh();
	this._itemWindow.deactivate();
	this._itemWindow.deselect();
	this._boxWindow.activate();
	this._boxWindow.refresh();
};
Scene_Composition.prototype.onItemCancel = function() {
	this._itemWindow.deactivate();
	this._itemWindow.deselect();
    this._optionWindow.activate();
};
Scene_Composition.prototype.createOptionWindow = function() {
	var x = this._boxWindow.x;
	var width = this._boxWindow.width;
	var height = Graphics.boxHeight - this._boxWindow.height - this._boxWindow.y;
	var y = Graphics.boxHeight - height;
    this._optionWindow = new Window_Composition(x, y, width, height);
	this._optionWindow.setHandler('select',     this.onSelect.bind(this));
	this._optionWindow.setHandler('join',     this.onJoinOk.bind(this));
    this._optionWindow.setHandler('cancel', this.onCancel.bind(this));
    this.addWindow(this._optionWindow);
};
Scene_Composition.prototype.onSelect = function() {
	this._itemWindow.activate();
	this._itemWindow.select(0);
	this._optionWindow.deactivate();
	this._optionWindow.deselect();
};
Scene_Composition.prototype.onJoinOk = function() {
	var data = [];
	var sum = 0;
	for(var i = 0; i < 9; i++){
		var item = this._data[i];
		var id = item ? item.id || 0 : 0;
		var type = this.judgeType(item);
		data.push([id, type]);
		if(type){
			sum++;
		}
	}
	if(sum){
		var moveX = this.getMoveX(data);
		var moveY = this.getMoveY(data);
		for(var i = 0; i < KJ.Composition.Recipes.length; i++){
			var method = KJ.Composition.Recipes[i];
			if(method.count != sum)
				continue;
			var recipe = method.recipe;
			if(this.judgeCorrect(data, recipe, moveX, moveY)){
				this.successJoin(method.produce, method.maxNumber, method.level);
				return;
			}
		}
	}
	this.failJoin();
};
Scene_Composition.prototype.successJoin = function(result, maxNumber, level){
	var item;
	switch(result[1]){
		case "item": item = $dataItems[result[0]];break;
		case "weapon": item = $dataWeapons[result[0]];break;
		case "armor": item = $dataArmors[result[0]];break;
		default:break;
	}
	if(level){
		if(level == KJ.Composition.Level){
			if(KJ.Composition.Param.LevelNotEnough){
				this._helpWindow.setText(KJ.Composition.Param.LevelNotEnough + item.name);
				this._optionWindow.activate();
				return;
			}
		}
	}	
	if(!maxNumber){
		maxNumber = $gameParty.maxItems(item);
	}
	var numbers = $gameParty.numItems(item);
	if(numbers >= maxNumber){
		AudioManager.playSe(this._fail);
		this._helpWindow.setText(KJ.Composition.Param.MaxText + item.name);
		this._optionWindow.activate();
		return;
	}
	$gameParty.gainItem(item, 1);
	numbers++;
	this._itemWindow.refresh();
	this.afterSucess();
	AudioManager.playSe(this._success);
	this._helpWindow.setText(KJ.Composition.Param.SuccessText + item.name + ' × 1');
	this._optionWindow.drawProduce(item, numbers);
	this._optionWindow.activate();
};
Scene_Composition.prototype.afterSucess = function(){
	var i;
	for(i = 0; i < 9; i++){
		var item = this._data[i];
		if(item){
			if($gameParty.hasItem(item)){
				$gameParty.loseItem(item, 1);
			}
			else{
				break;
			}	
		}
	}
	if(i != 9){
		i--;
		for(; i >= 0; i--){
			var item = this._data[i];
			if(item){
				$gameParty.gainItem(item, 1);
			}
		}
	 	this._data = Array(9);
		this._boxWindow.setData(this._data);
	}
};
Scene_Composition.prototype.failJoin = function(){
	AudioManager.playSe(this._fail);
	this._optionWindow.drawProduce();
	this._helpWindow.setText(KJ.Composition.Param.FailText);
	this._optionWindow.activate();
};
Scene_Composition.prototype.getMoveX = function(data){
	var moveX = [0];
	if(!data[0][0] && !data[3][0] && !data[6][0]){
		moveX.push(-1);
		if(!data[1][0] && !data[4][0] && !data[7][0]){
			moveX.push(-2);
		}
	}
	if(!data[2][0] && !data[5][0] && !data[8][0]){
		moveX.push(1);
		if(!data[1][0] && !data[4][0] && !data[7][0]){
			moveX.push(2);
		}
	}
	return moveX;
};
Scene_Composition.prototype.getMoveY = function(data){
	var moveY = [0];
	if(!data[0][0] && !data[1][0] && !data[2][0]){
		moveY.push(-1);
		if(!data[3][0] && !data[4][0] && !data[5][0]){
			moveY.push(-2);
		}
	}
	if(!data[6][0] && !data[7][0] && !data[8][0]){
		moveY.push(1);
		if(!data[3][0] && !data[4][0] && !data[5][0]){
			moveY.push(2);
		}
	}
	return moveY;
};
Scene_Composition.prototype.judgeCorrect = function(data, recipe, moveX, moveY) {
	for(var x = 0; x < moveX.length; x++){
		for(var y = 0; y < moveY.length; y++){
			var change = moveX[x] + 3 * moveY[y];
			var start = Math.max(0, - change);
			var end = Math.min(9, 9 - change);
			var i;
			for(i = start; i < end; i++){
				if(data[i][0] || recipe[i + change][0]){
					if(data[i][0] != recipe[i + change][0])
						break;
					if(data[i][1] != recipe[i + change][1])
						break;
				}
			}
			if(i == end){
				return true;
			}
		}
	}
	return false
};
Scene_Composition.prototype.judgeType = function(item) {
    if (!item) {
        return null;
    } else if (DataManager.isItem(item)) {
        return "item";
    } else if (DataManager.isWeapon(item)) {
        return "weapon";
    } else if (DataManager.isArmor(item)) {
        return "armor";
    } else {
        return null;
    }
};
Scene_Composition.prototype.onCancel = function() {
	this._optionWindow.deactivate();
	this._optionWindow.deselect();
	this._boxWindow.select(this._index);
	this._boxWindow.activate();
};
//Window
function Window_Composition() {
    this.initialize.apply(this, arguments);
}
Window_Composition.prototype = Object.create(Window_HorzCommand.prototype);
Window_Composition.prototype.constructor = Window_Composition;
Window_Composition.prototype.initialize = function(x, y, width, height) {
    this.clearCommandList();
    this.makeCommandList();
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
	this.drawText(KJ.Composition.Param.ProduceText, 0, 0, this.itemWidth() / 2);
	this.drawText(KJ.Composition.Param.ProduceNumber, 0, this.itemHeight(), this.itemWidth() / 2);
};
Window_Composition.prototype.maxCols = function() {
    return 2;
};
Window_Composition.prototype.itemHeight = function() {
    return Math.floor((this.height - this.padding * 2 +
                       this.spacing()) / 2 - this.spacing());
};
Window_Composition.prototype.itemRect = function(index) {
    var rect = new Rectangle();
    var maxCols = this.maxCols();
    rect.width = this.itemWidth() * 0.5;
    rect.height = this.itemHeight();
    rect.x = index % maxCols * (rect.width + this.spacing()) - this._scrollX + 2*rect.width;
    rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY;
	rect.y += (rect.height + this.padding);
    return rect;
};
Window_Composition.prototype.drawAllItems = function() {
	this.drawItem(0);
	this.drawItem(1);
};
Window_Composition.prototype.drawProduce = function(item, numbers){
	var iconBoxWidth = Window_Base._iconWidth + 4;
    var width = this.itemWidth() / 2;
    var height = this.itemHeight();
	var x = width;
    var y = 0;
	this.contents.clearRect(x, y, width*2, height);
	this.contents.clearRect(x, y+height, width, height);
	if(item){
		this.drawIcon(item.iconIndex, x, y);
		this.drawText(item.name, x + iconBoxWidth, y, width);
		this.drawText(numbers, x+5, y + height, width);
	}
};
Window_Composition.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawText(this.commandName(index), rect.x, rect.y, rect.width, 'center');
};
Window_Composition.prototype.makeCommandList = function() {
	this.addCommand(KJ.Composition.Param.SelectText, 'select');
    this.addCommand(KJ.Composition.Param.JoinText, 'join');
};
function Window_JoinBox() {
    this.initialize.apply(this, arguments);
}
Window_JoinBox.prototype = Object.create(Window_Selectable.prototype);
Window_JoinBox.prototype.constructor = Window_Selectable;
Window_JoinBox.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this.select(0);
    this.activate();
};
Window_JoinBox.prototype.maxCols = function() {
    return 3;
};
Window_JoinBox.prototype.maxItems = function() {
    return 9;
};
Window_JoinBox.prototype.itemHeight = function() {
    return Math.floor((this.height - this.padding * 2 +
                       this.spacing()) / this.maxRows() - this.spacing());
};
Window_JoinBox.prototype.itemRect = function(index) {
    var rect = new Rectangle();
    var maxCols = this.maxCols();
    rect.width = this.itemWidth() * 0.7;
    rect.height = this.itemHeight() * 0.7;
    rect.x = index % maxCols * (rect.width + this.spacing()) - this._scrollX;
    rect.y = Math.floor(index / maxCols) * (rect.height + this.spacing()) - this._scrollY;
	rect.x += (this.itemWidth() * 0.45);
	rect.y += (this.itemHeight() * 0.45);
    return rect;
};
Window_JoinBox.prototype.maxPageRows = function() {
    return 3;
};
Window_JoinBox.prototype.setData = function(data) {
    this._data = data;
	this.refresh();
};
Window_JoinBox.prototype.updateHelp = function() {
	if(this._data){
		this.setHelpWindowItem(this._data[this._index]);
	}
};
Window_JoinBox.prototype.drawItem = function(index) {
	var item = this._data[index];
	var rect = this.itemRect(index);
	this.contents.paintOpacity = 150;
	this.contents.gradientFillRect(rect.x, rect.y, rect.width, rect.height, '#444444', '#666666');
	this.contents.paintOpacity = 255;
	if(item){
		var iconBoxWidth = Window_Base._iconWidth + 4;
		var ystart = (rect.height - Window_Base._iconHeight - this.lineHeight()) / 2;
		var y1 = rect.y + ystart;
		var y2 = y1 + Window_Base._iconHeight;
		var x1 = rect.x + (rect.width - iconBoxWidth) / 2
        this.resetTextColor();
        this.drawIcon(item.iconIndex, rect.x + (rect.width - iconBoxWidth) / 2, y1);
        this.drawText(item.name, rect.x, y2, rect.width, 'center');
	}
};
function Window_CompositionItem() {
    this.initialize.apply(this, arguments);
}
Window_CompositionItem.prototype = Object.create(Window_Selectable.prototype);
Window_CompositionItem.prototype.constructor = Window_CompositionItem;
Window_CompositionItem.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
	this._data = [];
	this.refresh();
};
Window_CompositionItem.prototype.maxCols = function() {
    return 1;
};
Window_CompositionItem.prototype.spacing = function() {
    return 48;
};
Window_CompositionItem.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};
Window_CompositionItem.prototype.item = function() {
    var index = this.index();
    return this._data && index >= 0 ? this._data[index] : null;
};
Window_CompositionItem.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this.item());
};
Window_CompositionItem.prototype.includes = function(item) {
	if(DataManager.isItem(item) && item.itypeId < 3){
		return true;
	}
	else if(DataManager.isWeapon(item)){
		return true;
	}
	else if(DataManager.isArmor(item)){
		return true;
	}
	return false;
};
Window_CompositionItem.prototype.needsNumber = function() {
    return true;
};
Window_CompositionItem.prototype.isEnabled = function(item) {
	return true;
};
Window_CompositionItem.prototype.makeItemList = function() {
    this._data = $gameParty.allItems().filter(function(item) {
        return this.includes(item);
    }, this);
	if(this._data){
		this._data.push(null);
	}
    if (this.includes(null)) {
        this._data.push(null);
    }
};
Window_CompositionItem.prototype.selectLast = function() {
    var index = this._data.indexOf($gameParty.lastItem());
    this.select(index >= 0 ? index : 0);
};
Window_CompositionItem.prototype.drawItem = function(index) {
    var item = this._data[index];
    if (item) {
        var numberWidth = this.numberWidth();
        var rect = this.itemRect(index);
        rect.width -= this.textPadding();
        this.changePaintOpacity(this.isEnabled(item));
        this.drawItemName(item, rect.x, rect.y, rect.width - numberWidth);
        this.drawItemNumber(item, rect.x, rect.y, rect.width);
        this.changePaintOpacity(1);
    }
};
Window_CompositionItem.prototype.numberWidth = function() {
    return this.textWidth('000');
};
Window_CompositionItem.prototype.drawItemNumber = function(item, x, y, width) {
    if (this.needsNumber()) {
        this.drawText(':', x, y, width - this.textWidth('00'), 'right');
        this.drawText($gameParty.numItems(item), x, y, width, 'right');
    }
};
Window_CompositionItem.prototype.updateHelp = function() {
    this.setHelpWindowItem(this.item());
};
Window_CompositionItem.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};