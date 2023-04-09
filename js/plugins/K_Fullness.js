//=============================================================================
// K_Fullness.js
//=============================================================================

/*:ja
 * @plugindesc ver1.11 満腹、水分、睡眠のゲージを追加。
 * @author かいとりせんこう
 *
 * @param fullness
 * @desc 追加ゲージ1つ目
 * @default 満腹
 * 
 * @param hydration
 * @desc 追加ゲージ2つ目
 * @default 水分
 * 
 * @param sleep
 * @desc 追加ゲージ3つ目
 * @default 睡眠
 *
 * @param HPIcon
 * @desc HPのアイコンインデックス
 * @default 84
 *
 * @param MPIcon
 * @desc MPのアイコンインデックス
 * @default 78
 *
 * @param TPIcon
 * @desc TPのアイコンインデックス
 * @default 77
 *
 * @param FullnessIcon
 * @desc 満腹度のアイコンインデックス
 * @default 266
 *
 * @param HydrationIcon
 * @desc 水分のアイコンインデックス
 * @default 67
 *
 * @param SleepIcon
 * @desc 睡眠のアイコンインデックス
 * @default 8
 *
 * @param max
 * @desc ゲージの最大値
 * @default 100
 *
 * @param TPwrite
 * @desc TPを表示するかどうか true or false
 * @default true
 *
 * @param writeIcon
 * @desc trueだとアイコン、falseだとテキストになる
 * @default true
 *
 * 
 * @help
 * 機能
 * 　満腹、水分、睡眠のゲージを追加します(名称をコンフィグで変更可)
 * 　メニュー画面で各種ゲージを小さくして表示します
 * 　ゲージでテキストの代わりにアイコンを表示します(コンフィグで変更可)
 *
 *
 * プラグインコマンド
 * 　K_Fullness fullness x y　：アクターIDxの満腹をy回復します
 * 　K_Fullness hydrate x y　：アクターIDxの水分をy回復します
 * 　K_Fullness sleep x y　：アクターIDxの睡眠をy回復します
 * 　x部分にallと入れるとパーティ全員を回復します
 * 　y部分にはマイナスも入れることが出来ます
 *
 *　以下、Ver1.10で追加されたコマンド
 * 　K_Fullness var x y ful　：変数xにアクターIDyの満腹を代入します
 * 　K_Fullness var x y hyd　：変数xにアクターIDyの水分を代入します
 * 　K_Fullness var x y slp　：変数xにアクターIDyの睡眠を代入します
 *
 * 
 * アイテムのメモ欄への記述
 * 　<fullness:x>：満腹をx回復します
 * 　<hydrate:x>：水分をx回復します
 * 　<sleep:x>：睡眠をx回復します
 *
 *
 * 利用規約
 * 　非営利目的の場合はクレジット表記が必要ありません
 * 　営利目的の場合はクレジットに「かいとりせんこう」を表記してください
 * 　ゲームに含めての再配布が可能です
 * 　必要に応じて改造できます
 * 　R-18、R-18Gの作品にも使えます
 *
 * 変更履歴
 *  ver1.00
 *   公開
 *  ver1.10
 *   英語の説明文を追加
 *   ステータス画面でも各ステータスが表示されるようになった
 *   ロード直後の戦闘で回復したときにエラーが起こるバグを修正（？）
 *  ver1.11
 *   ロード直後の戦闘で回復したときのバグを修正
 *  ver1.12
 *   ソースコード内の誤字に因るバグを修正
 * 
 */

/*:
 * @plugindesc ver1.10 Add fullness, hydrate, and sleep gage.
 * @author kaitorisenkou
 *
 * @param fullness
 * @desc 1st gage
 * @default Fullness
 * 
 * @param hydration
 * @desc 2nd gage
 * @default Hydrate
 * 
 * @param sleep
 * @desc 3rd gage
 * @default Sleep
 *
 * @param HPIcon
 * @desc Icon index of HP
 * @default 84
 *
 * @param MPIcon
 * @desc Icon index of MP
 * @default 78
 *
 * @param TPIcon
 * @desc Icon index of TP
 * @default 77
 *
 * @param FullnessIcon
 * @desc Icon index of Fullness
 * @default 266
 *
 * @param HydrationIcon
 * @desc Icon index of Hydrate
 * @default 67
 *
 * @param SleepIcon
 * @desc Icon index of Sleep
 * @default 8
 *
 * @param max
 * @desc Upper limit of gage
 * @default 100
 *
 * @param TPwrite
 * @desc Display TP   true or false
 * @default true
 *
 * @param writeIcon
 * @desc true→Write icon   false→Write text
 * @default true
 *
 * @help
 * Function
 * 　Add fullness, hydrate, and sleep gage.(Name of these gages can be changed)
 * 　Display 6 gages smaller.
 * 　Write icons insted of text on gages(can choose)
 *
 *
 * Plugin command
 * 　K_Fullness fullness x y　：Recover fullness y of ActorIDx.
 * 　K_Fullness hydrate x y　：Recover hydrate y of ActorIDx.
 * 　K_Fullness sleep x y　：Recover sleep y of ActorIDx.
 * 　type 'all' to x and rocover all of team.
 * 　y can be minus.
 *
 * 　K_Fullness var x y ful　：Substitution fullness of ActorIDy to VariableIDx
 * 　K_Fullness var x y hyd　：Substitution hydrate of ActorIDy to VariableIDx
 * 　K_Fullness var x y slp　：Substitution sleep of ActorIDy to VariableIDx
 *
 * 
 * Note of items
 * 　<fullness:x>：Recover fullness x
 * 　<hydrate:x>：Recover hydrate x
 * 　<sleep:x>：Recover sleep x
 *
 *
 * Terms of service
 * 　For non-profit purposes, There is no need credit.
 * 　For commercial purposes, Write "kaitorisenkou" or "かいとりせんこう" on credit.
 * 　This plugin can be redistributed with game.(Not to mention, do not this alone!)
 * 　This plugin can be Customized.
 * 　This plugin can be used for R-18 or R-18G games.
 *
 * Changelog
 *  ver1.00
 *   post
 *  ver1.10
 *   Translated to English
 *   Show stats on "Status"
 *   Fix a bug(maybe)
 *  ver1.11
 *   Fix a bug
 *  ver1.12
 *   Fix bugs due to pypo
 * 
 */

(function() {

    var parameters = PluginManager.parameters('K_Fullness');
    var fuW = String(parameters['fullness']);
    var hydW = String(parameters['hydration']);
    var slpW = String(parameters['sleep']);
    var hpicon = Number(parameters['HPIcon']);
    var mpicon = Number(parameters['MPIcon']);
    var tpicon = Number(parameters['TPIcon']);
    var fulicon = Number(parameters['FullnessIcon']);
    var hydicon = Number(parameters['HydrationIcon']);
    var slpicon = Number(parameters['SleepIcon']);
    var maxparam = Number(parameters['max']);
    var tpwrite = String(parameters['TPwrite']);
    var writeicon = String(parameters['writeIcon']);
    var writeOnField = String(parameters['writeIcon']);
    var reduceOnNoEffects = String(parameters['reduceOnNoEffects']);
    
//HP、MP、TPゲージ書き換え
    
Window_Base.prototype.drawActorHp = function(actor, x, y, width) {
    width = width || 186;
    var color1 = this.hpGaugeColor1();
    var color2 = this.hpGaugeColor2();
    this.drawGauge(x, y, width, actor.hpRate(), color1, color2);
    this.changeTextColor(this.systemColor());
    if(writeicon == 'true'){
    this.drawIcon(hpicon,x,y)
    }else{
    this.drawText(TextManager.hpA, x, y, 44); }
    this.drawCurrentAndMax(actor.hp, actor.mhp, x, y, width,
                           this.hpColor(actor), this.normalColor());
};

Window_Base.prototype.drawActorMp = function(actor, x, y, width) {
    width = width || 186;
    var color1 = this.mpGaugeColor1();
    var color2 = this.mpGaugeColor2();
    this.drawGauge(x, y, width, actor.mpRate(), color1, color2);
    this.changeTextColor(this.systemColor());
    if(writeicon == 'true'){
    this.drawIcon(mpicon,x,y)
    }else{
    this.drawText(TextManager.mpA, x, y, 44);}
    this.drawCurrentAndMax(actor.mp, actor.mmp, x, y, width,
                           this.mpColor(actor), this.normalColor());
};

Window_Base.prototype.drawActorTp = function(actor, x, y, width) {
    width = width || 96;
    var color1 = this.tpGaugeColor1();
    var color2 = this.tpGaugeColor2();
    this.drawGauge(x, y, width, actor.tpRate(), color1, color2);
    this.changeTextColor(this.systemColor());
    if(writeicon == 'true'){
    this.drawIcon(tpicon,x,y)
    }else{
    this.drawText(TextManager.tpA, x, y, 44);}
    this.changeTextColor(this.tpColor(actor));
    this.drawText(actor.tp, x + width - 64, y, 64, 'right');
};
  
//満腹、水分、睡眠を追加
Object.defineProperties(Game_BattlerBase.prototype, {
    // Hit Points
    hp: { get: function() { return this._hp; }, configurable: true },
    // Magic Points
    mp: { get: function() { return this._mp; }, configurable: true },
    // Tactical Points
    tp: { get: function() { return this._tp; }, configurable: true },
    // Maximum Hit Points
    mhp: { get: function() { return this.param(0); }, configurable: true },
    // Maximum Magic Points
    mmp: { get: function() { return this.param(1); }, configurable: true },
    // ATtacK power
    atk: { get: function() { return this.param(2); }, configurable: true },
    // DEFense power
    def: { get: function() { return this.param(3); }, configurable: true },
    // Magic ATtack power
    mat: { get: function() { return this.param(4); }, configurable: true },
    // Magic DeFense power
    mdf: { get: function() { return this.param(5); }, configurable: true },
    // AGIlity
    agi: { get: function() { return this.param(6); }, configurable: true },
    // LUcK
    luk: { get: function() { return this.param(7); }, configurable: true },
    // HIT rate
    hit: { get: function() { return this.xparam(0); }, configurable: true },
    // EVAsion rate
    eva: { get: function() { return this.xparam(1); }, configurable: true },
    // CRItical rate
    cri: { get: function() { return this.xparam(2); }, configurable: true },
    // Critical EVasion rate
    cev: { get: function() { return this.xparam(3); }, configurable: true },
    // Magic EVasion rate
    mev: { get: function() { return this.xparam(4); }, configurable: true },
    // Magic ReFlection rate
    mrf: { get: function() { return this.xparam(5); }, configurable: true },
    // CouNTer attack rate
    cnt: { get: function() { return this.xparam(6); }, configurable: true },
    // Hp ReGeneration rate
    hrg: { get: function() { return this.xparam(7); }, configurable: true },
    // Mp ReGeneration rate
    mrg: { get: function() { return this.xparam(8); }, configurable: true },
    // Tp ReGeneration rate
    trg: { get: function() { return this.xparam(9); }, configurable: true },
    // TarGet Rate
    tgr: { get: function() { return this.sparam(0); }, configurable: true },
    // GuaRD effect rate
    grd: { get: function() { return this.sparam(1); }, configurable: true },
    // RECovery effect rate
    rec: { get: function() { return this.sparam(2); }, configurable: true },
    // PHArmacology
    pha: { get: function() { return this.sparam(3); }, configurable: true },
    // Mp Cost Rate
    mcr: { get: function() { return this.sparam(4); }, configurable: true },
    // Tp Charge Rate
    tcr: { get: function() { return this.sparam(5); }, configurable: true },
    // Physical Damage Rate
    pdr: { get: function() { return this.sparam(6); }, configurable: true },
    // Magical Damage Rate
    mdr: { get: function() { return this.sparam(7); }, configurable: true },
    // Floor Damage Rate
    fdr: { get: function() { return this.sparam(8); }, configurable: true },
    // EXperience Rate
    exr: { get: function() { return this.sparam(9); }, configurable: true },
    //満腹水分睡眠
    ful: { get: function() { return this._ful; }, configurable: true },
    hyd: { get: function() { return this._hyd; }, configurable: true },
    slp: { get: function() { return this._slp; }, configurable: true },
});

//教えてもらったところ
var _Game_BattlerBase_initMembers = Game_BattlerBase.prototype.initMembers;
    Game_BattlerBase.prototype.initMembers = function() {
        _Game_BattlerBase_initMembers.apply(this, arguments);
        this._ful = maxparam;
        this._hyd = maxparam;
        this._slp = maxparam;
    };

Game_BattlerBase.prototype.setFul = function(ful) {
        this._ful = ful.clamp(0, maxparam);
    };

Game_BattlerBase.prototype.setHyd = function(hyd) {
        this._hyd = hyd.clamp(0, maxparam);
    };

Game_BattlerBase.prototype.setSlp = function(slp) {
        this._slp = slp.clamp(0, maxparam);
    };
    
Game_BattlerBase.prototype.gainFul = function(ful) {
    this._ful+=ful.clamp(-this._ful,maxparam-this._ful);
    if (this.ful >= maxparam){
        this._ful = maxparam
    }
    };

Game_BattlerBase.prototype.gainHyd = function(hyd) {
    this._hyd+=hyd.clamp(-this._hyd,maxparam-this._hyd);
    if (this.hyd >= maxparam){
        this._hyd = maxparam
    }
    };

Game_BattlerBase.prototype.gainSlp = function(slp) {
    this._slp+=slp.clamp(-this._slp,maxparam-this._slp);
    if (this.slp >= maxparam){
        this._slp = maxparam
    }
    };

//ここまで教わった
    
Game_BattlerBase.prototype.fulRate = function() {
    return this.ful / maxparam;
};
    
Game_BattlerBase.prototype.hydRate = function() {
    return this.hyd / maxparam;
};
    
Game_BattlerBase.prototype.slpRate = function() {
    return this.slp / maxparam;
};

    
Window_Base.prototype.drawActorFullness = function(actor, x, y, width) {
    width = width || 96;
    var color1 = this.hpGaugeColor1();
    var color2 = this.hpGaugeColor2();
    this.drawGauge(x, y, width, actor.fulRate(), color1, color2);
    this.changeTextColor(this.systemColor());
    if(writeicon == 'true'){
        this.drawIcon(fulicon,x,y);
    }else{
    this.drawText(fuW, x, y, 44);}
    this.drawCurrentAndMax(actor.ful, maxparam, x, y, width,
                           this.hpColor(actor), this.normalColor());
};
    Window_Base.prototype.drawActorHydration = function(actor, x, y, width) {
    width = width || 96;
    var color1 = this.mpGaugeColor1();
    var color2 = this.mpGaugeColor2();
    this.drawGauge(x, y, width, actor.hydRate(), color1, color2);
    this.changeTextColor(this.systemColor());
    if(writeicon == 'true'){
        this.drawIcon(hydicon,x,y);
    }else{
    this.drawText(hydW, x, y, 44);}
    this.drawCurrentAndMax(actor.hyd, maxparam, x, y, width,
                           this.mpColor(actor), this.normalColor());
};
    Window_Base.prototype.drawActorSleep = function(actor, x, y, width) {
    width = width || 96;
    var color1 = this.tpGaugeColor1();
    var color2 = this.tpGaugeColor2();
    this.drawGauge(x, y, width, actor.slpRate(), color1, color2);
    this.changeTextColor(this.systemColor());
    if(writeicon == 'true'){
        this.drawIcon(slpicon,x,y);
    }else{
    this.drawText(slpW, x, y, 44);}
    this.drawCurrentAndMax(actor.slp, maxparam, x, y, width,
                           this.tpColor(actor), this.normalColor());
};
    
//メニュー書き換え
Window_Base.prototype.drawActorSimpleStatus = function(actor, x, y, width) {
    var lineHeight = this.lineHeight();
    var x2 = x + 180;
    var width2 = Math.min(200, width - 180 - this.textPadding())/2;
    var x3 = x2 + width2 + 5;
    this.drawActorName(actor, x, y);
    this.drawActorLevel(actor, x, y + lineHeight * 1);
    this.drawActorIcons(actor, x, y + lineHeight * 2);
    this.drawActorClass(actor, x2, y - lineHeight/2 * 1);
    this.drawActorHp(actor, x2, y + lineHeight/2 * 1, width2);
    this.drawActorMp(actor, x2, y + lineHeight/2 * 3, width2);
    if(tpwrite == 'true'){
        this.drawActorTp(actor, x2, y + lineHeight/2 * 5, width2);
    }
    this.drawActorFullness(actor, x3, y + lineHeight/2 * 1, width2);
    this.drawActorHydration(actor, x3, y + lineHeight/2 * 3, width2);
    this.drawActorSleep(actor, x3, y + lineHeight/2 * 5, width2);
};

//ステータス書き換え,Ver1.10で追加した部分
Window_Status.prototype.drawBasicInfo = function(x, y) {
    var lineHeight = this.lineHeight();
    var lineShift = lineHeight/2;
    //this.drawActorLevel(this._actor, x, y + lineHeight * 0);
    this.drawActorIcons(this._actor, x, y + lineHeight * 1);
    this.drawActorHp(this._actor, x, y + lineHeight * 0);
    this.drawActorMp(this._actor, x, y + lineHeight * 1);
    if(tpwrite == 'true'){
        this.drawActorTp(this._actor, x, y + lineHeight * 2, 90);
        this.drawActorFullness(this._actor, x+96, y + lineHeight * 2, 90);
        this.drawActorHydration(this._actor, x, y + lineHeight * 3, 90);
        this.drawActorSleep(this._actor, x+96, y + lineHeight * 3, 90);
    }else{
        this.drawActorFullness(this._actor, x, y + lineHeight * 2, 90);
        this.drawActorHydration(this._actor, x+96, y + lineHeight * 2, 90);
        this.drawActorSleep(this._actor, x, y + lineHeight * 3, 90);
    }
};
Window_Status.prototype.drawBlock3 = function(y) {
    this.drawActorLevel(this._actor, 48, y-18);
    this.drawParameters(48, y+18);
    this.drawEquipments(432, y);
};
    

    
//プラグインコマンド
var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'K_Fullness') {
            switch (args[0]) {
            case 'fullness':
                    if (args[1]==='all'){
                        for(i = 1; i <= $gameParty.size(); i++){
                            $gameParty.members()[i-1].gainFul(Number(args[2]));
                        }
                    }else{
                $gameActors.actor(Number(args[1])).gainFul(Number(args[2]));
                    }
                break;
            case 'hydrate':
                    if (args[1]==='all'){
                        for(i = 1; i <= $gameParty.size(); i++){
                            $gameParty.members()[i-1].gainHyd(Number(args[2]));
                        }
                    }else{
                $gameActors.actor(Number(args[1])).gainHyd(Number(args[2]));
                    }
                break;
            case 'sleep':
                    if (args[1]==='all'){
                        for(i = 1; i <= $gameParty.size(); i++){
                            $gameParty.members()[i-1].gainSlp(Number(args[2]));
                        }
                    }else{
                $gameActors.actor(Number(args[1])).gainSlp(Number(args[2]));
                    }
                break;
            case 'var'://Ver1.10で追加した部分
                switch (args[3]){
                    case 'ful':
                        $gameVariables.setValue(Number(args[1]),$gameActors.actor(Number(args[2])).ful);
                        break;
                    case 'hyd':
                        $gameVariables.setValue(Number(args[1]),$gameActors.actor(Number(args[2])).hyd);
                        break;
                    case 'slp':
                        $gameVariables.setValue(Number(args[1]),$gameActors.actor(Number(args[2])).slp);
                        break;
            }
                    break;
              }
        }
    };
    
//メモ欄
    
var _game_action_prototype_apply=Game_Action.prototype.apply;
Game_Action.prototype.apply=function(target){
    _game_action_prototype_apply.call(this,target);
    if(target.isActor()){
        var item=this._item.object();
        if(item.meta.fullness){
            target.gainFul(Number(item.meta.fullness))
        }
        if(item.meta.hydrate){
            target.gainHyd(Number(item.meta.hydrate));
        }
        if(item.meta.sleep){
            target.gainSlp(Number(item.meta.sleep));
        }
    }
    
}


/*    
var _Game_Battler_useItem = Game_Battler.prototype.useItem;
Game_Battler.prototype.useItem = function(item) {
        _Game_Battler_useItem.call(this, item);
    //var bef = $gameActors.actor($gameParty._targetActorId);
    if(item.meta.fullness){
        $gameActors.actor($gameParty._targetActorId).gainFul(Number(item.meta.fullness));
    }
    if(item.meta.hydrate){
        $gameActors.actor($gameParty._targetActorId).gainHyd(Number(item.meta.hydrate));
    }
    if(item.meta.sleep){
        $gameActors.actor($gameParty._targetActorId).gainSlp(Number(item.meta.sleep));
    };
    //var aft = $gameActors.actor($gameParty._targetActorId);
    //if(bef===aft){
    //    $gameParty.gainItem($dataItems[item.itemId], 1)
    //}
    };*/

    /*Game_Action.prototype.testApply = function(target) {
    return (this.isForDeadFriend() === target.isDead() &&
            ($gameParty.inBattle() || this.isForOpponent() ||
            (this.isHpRecover() && target.hp < target.mhp) ||
            (this.isMpRecover() && target.mp < target.mmp) ||
            (this.hasItemAnyValidEffects(target))));
};*/
    
    
})();