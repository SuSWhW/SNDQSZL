//=============================================================================
// Yanfly Engine Plugins - Event Chase Player
// YEP_EventChasePlayer.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_EventChasePlayer = true;

var Yanfly = Yanfly || {};
Yanfly.ECP = Yanfly.ECP || {};
Yanfly.ECP.version = 1.05;

//=============================================================================
 /*:
 * @plugindesc YEP事件追逐 解密推荐 v1.05 
 * @author Yanfly Engine Plugins 汉化：硕明云书
 *
 * @param Sight Lock
 * @text 事件追逐帧数 
 * @desc 这是事件追逐多长时间的帧数
 * 播放器如果 'this._seePlayer = true' 被使用。
 * @default 300
 *
 * @param See Player
 * @text 默认可见
 * @desc 默认情况下，事件是否必须能够看到玩家？
 * NO - false     YES - true
 * @default true
 *
 * @param Alert Timer
 * @text 气泡帧数
 * @desc 这是之前必须发生的帧数
 * 警报气球将出现在同一事件中。
 * @default 120
 *
 * @param Alert Balloon
 * @text 默认气泡
 * @desc 这是看到玩家时使用的默认气球。
 * 请参阅气球 ID。
 * @default 1
 *
 * @param Alert Sound
 * @text 默认声音
 * @desc 这是看到播放器时播放的默认声音。
 * @default Attack1
 *
 * @param Alert Common Event
 * @text 公共事件
 * @desc 看到玩家时播放的默认公共事件。
 * 如果您不想使用公共事件，请使用 0。
 * @default 0
 *
 * @param Return After
 * @text 回归位置
 * @desc 追逐/逃离玩家后，事件返回
 * 回到原来的位置。 NO - false   YES - true
 * @default true
 *
 * @param Return Wait
 * @text 等待帧数
 * @desc 完成追逐/逃跑后等待的帧。
 * @default 180
 *
 * @help
 * ============================================================================
 * ♥ 介绍     (○′3′○)
 * ============================================================================
 * 目前事件只拥有传统乏味的移动行为。
 * 他们站在一个地方，追寻你，远离你，随机移动，或者在一个设定路径行走。
 * 这个插件让你的事件可以迅速切换靠近角色和远离角色.
 * 在你靠近事件范围或者事件看到角色时，这个插件可以让你的事件追寻或者逃离
 * 角色。
 *
 * ============================================================================
 * ♥ 如何使用 (○′3′○)
 * ============================================================================
 * 把下面这些脚本语句插入事件移动路线里的脚本内对其生效！
 * 这些对角色不生效。
 * -----------------------------------------------------------------------------
 * this._chaseRange = 5  事件追逐玩家距离为5格时将触发
  * -----------------------------------------------------------------------------
 *  调用
 *  this._chaseRange = x       如果角色距离事件x，事件追逐角色。
 *  this._fleeRange = x        如果角色距离事件x，事件逃离角色。
 *  this._chaseSpeed = x       事件追逐速度
 *  this._fleeSpeed = x        事件逃离速度
 *  this._sightLock = x        事件追逐或者逃离角色时间
 *  this._seePlayer = true     需要事件能够看到角色
 *  this._seePlayer = false    不需要事件能够看到角色
 *  this._alertBalloon = x     当看到角色时弹出对白框
 *  this._alertSound = x       当看到角色时播放音乐
 *  this._alertSoundVol = x    当看到角色时播放音乐的音量
 *  this._alertSoundPitch = x  警报声音使用的音高。
 *  this._alertSoundPan = x    警报声使用的平移。
 *  this._alertCommonEvent = x 当看到角色时执行公共事件
 *  this._returnAfter = true   将事件返回到其原始位置。
 *  this._returnAfter = false  完成追逐后，事件保持在原处。
 *  this._returnWait = x       完成追逐/逃跑后事件等待多长时间。 chase/flee.
 *
 * 这个最适合用来自定义移动路线的速度。记住这个效果需要事件被设置为移动
 * 这意味着载入地图时，如果事件没有被载入命令，这个事件永远不会追逐角色。
 *
 * ============================================================================
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_EventChasePlayer');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.ECPSightLock = Number(Yanfly.Parameters['Sight Lock']);
Yanfly.Param.ECPSeePlayer = String(Yanfly.Parameters['See Player']);
Yanfly.Param.ECPSeePlayer = eval(Yanfly.Param.ECPSeePlayer);
Yanfly.Param.ECPAlertTimer = Number(Yanfly.Parameters['Alert Timer']);
Yanfly.Param.ECPAlertBalloon = Number(Yanfly.Parameters['Alert Balloon']);
Yanfly.Param.ECPAlertSound = String(Yanfly.Parameters['Alert Sound']);
Yanfly.Param.ECPAlertEvent = Number(Yanfly.Parameters['Alert Common Event']);
Yanfly.Param.ECPReturn = eval(String(Yanfly.Parameters['Return After']));
Yanfly.Param.ECPReturnWait = Number(Yanfly.Parameters['Return Wait']);

//=============================================================================
// Main Code
//=============================================================================

Yanfly.ECP.Game_Event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
    Yanfly.ECP.Game_Event_setupPage.call(this);
    this.clearChaseSettings();
};

Game_Event.prototype.clearChaseSettings = function() {
  this._alertBalloon = Yanfly.Param.ECPAlertBalloon;
  this._alertCommonEvent = Yanfly.Param.ECPAlertEvent;
  this._alertLock = 0;
  this._alertPlayer = false;
  this._alertSound = Yanfly.Param.ECPAlertSound;
  this._alertSoundVol = 100;
  this._alertSoundPitch = 100;
  this._alertSoundPan = 0;
  this._alertTimer = 0;
  this._chasePlayer = false;
  this._chaseRange = 0;
  this._chaseSpeed = this._moveSpeed;
  this._defaultSpeed = this._moveSpeed;
  this._fleePlayer = false;
  this._fleeRange = 0;
  this._fleeSpeed = this._moveSpeed;
  this._seePlayer = Yanfly.Param.ECPSeePlayer;
  this._sightLock = Yanfly.Param.ECPSightLock;
  this._returnAfter = Yanfly.Param.ECPReturn;
  this._returnWait = Yanfly.Param.ECPReturnWait;
  this._returnPhase = false;
  this._returnFrames = 0;
  this._startLocationX = this.x;
  this._startLocationY = this.y;
  this._startLocationDir = this._direction;
};

Yanfly.ECP.Game_Event_updateSelfMovement =
    Game_Event.prototype.updateSelfMovement;
Game_Event.prototype.updateSelfMovement = function() {
    if (Imported.YEP_StopAllMove && $gameSystem.isEventMoveStopped()) return;
    this.updateChaseDistance();
    this.updateFleeDistance();
    this.updateChaseMovement();
};

Yanfly.ECP.Game_Event_update = Game_Event.prototype.update;
Game_Event.prototype.update = function() {
    Yanfly.ECP.Game_Event_update.call(this);
    this.updateAlert();
    this.updateReturnPhase();
};

Game_Event.prototype.canSeePlayer = function() {
    if (!this._seePlayer) return false;
    var sx = this.deltaXFrom($gamePlayer.x);
    var sy = this.deltaYFrom($gamePlayer.y);
    if (Math.abs(sx) > Math.abs(sy)) {
      var direction = (sx > 0) ? 4 : 6;
    } else {
      var direction = (sy > 0) ? 8 : 2;
    }
    if (direction === this.direction()) {
      this._alertLock = this._sightLock;
      return true;
    }
    return false;
};

Game_Event.prototype.updateChaseDistance = function() {
    if (this._erased) return;
    if (this._chaseRange <= 0) return;
    var dis = Math.abs(this.deltaXFrom($gamePlayer.x));
    dis += Math.abs(this.deltaYFrom($gamePlayer.y));
    if (this.chaseConditions(dis)) {
      this.startEventChase();
    } else if (this._chasePlayer) {
      this.endEventChase();
    }
};

Game_Event.prototype.chaseConditions = function(dis) {
    if (dis <= this._chaseRange && this.nonSeePlayer()) {
      this._alertLock = this._sightLock;
      return true;
    }
    if (this._alertLock > 0) return true;
    if (dis <= this._chaseRange && this.canSeePlayer()) return true;
    return false;
};

Game_Event.prototype.nonSeePlayer = function() {
  if (Imported.YEP_X_EventChaseStealth) {
    if (this.meetStealthModeConditions()) {
      this.stealthClearChaseSettings();
      this._stopCount = 0;
      return false;
    }
  }
  return !this._seePlayer;
};

Game_Event.prototype.startEventChase = function() {
    this._chasePlayer = true;
    this.setMoveSpeed(this._chaseSpeed);
};

Game_Event.prototype.endEventChase = function() {
    this._chasePlayer = false;
    this.setMoveSpeed(this._defaultSpeed);
    if (this._alertTimer <= 0) this._alertPlayer = false;
    this.startReturnPhase();
};

Game_Event.prototype.updateFleeDistance = function() {
    if (this._erased) return;
    if (this._fleeRange <= 0) return;
    var dis = Math.abs(this.deltaXFrom($gamePlayer.x));
    dis += Math.abs(this.deltaYFrom($gamePlayer.y));
    if (this.fleeConditions(dis)) {
      this.startEventFlee();
    } else if (this._fleePlayer) {
      this.endEventFlee();
    }
};

Game_Event.prototype.fleeConditions = function(dis) {
    if (this._alertLock > 0) return true;
    if (dis <= this._fleeRange && this.canSeePlayer()) return true;
    if (dis <= this._fleeRange && !this._seePlayer) {
      this._alertLock = this._sightLock;
      return true;
    }
    return false;
};

Game_Event.prototype.startEventFlee = function() {
    this._fleePlayer = true;
    this.setMoveSpeed(this._fleeSpeed);
};

Game_Event.prototype.endEventFlee = function() {
    this._fleePlayer = false;
    this.setMoveSpeed(this._defaultSpeed);
    if (this._alertTimer <= 0) this._alertPlayer = false;
    this.startReturnPhase();
};

Game_Event.prototype.updateChaseMovement = function() {
    if (this._stopCount > 0 && this._chasePlayer) {
      var direction = this.findDirectionTo($gamePlayer.x, $gamePlayer.y);
      if (direction > 0) this.moveStraight(direction);
    } else if (this._stopCount > 0 && this._fleePlayer) {
      this.updateFleeMovement();
    } else if (this._returnPhase) {
      this.updateMoveReturnAfter();
    } else {
      Yanfly.ECP.Game_Event_updateSelfMovement.call(this);
    }
};

Game_Event.prototype.updateFleeMovement = function() {
    switch (Math.randomInt(6)) {
    case 0: case 1: case 2: case 3: case 4:
      this.moveAwayFromPlayer();
      break;
    case 5:
      this.moveRandom();
      break;
    }
};

Game_Event.prototype.updateAlert = function() {
    if (this._erased) return;
    this._alertLock--;
    if (this.alertConditions()) this.activateAlert();
    if (this._alertPlayer) this._alertTimer--;
};

Game_Event.prototype.alertConditions = function() {
    return (this._chasePlayer || this._fleePlayer) && !this._alertPlayer;
};

Game_Event.prototype.activateAlert = function() {
    if (this._alertBalloon >= 0) this.requestBalloon(this._alertBalloon);
    this._alertPlayer = true;
    this._alertTimer = Yanfly.Param.ECPAlertTimer;
    this.playAlertSound();
    this.playAlertCommonEvent();
};

Game_Event.prototype.playAlertSound = function() {
    if (this._alertSound === '') return;
    var sound = {
      name:   this._alertSound,
      volume: this._alertSoundVol,
      pitch:  this._alertSoundPitch,
      pan:    this._alertSoundPan
    };
    AudioManager.playSe(sound);
};

Game_Event.prototype.playAlertCommonEvent = function() {
    if (this._alertCommonEvent <= 0) return;
    $gameTemp.reserveCommonEvent(this._alertCommonEvent);
};

Game_Event.prototype.startReturnPhase = function() {
    if (!this._returnAfter) return;
    this._returnPhase = true;
    this._returnFrames = this._returnWait;
};

Game_Event.prototype.updateReturnPhase = function() {
    if (this._returnPhase) this._returnFrames--;
};

Game_Event.prototype.updateMoveReturnAfter = function() {
    if (this._returnFrames > 0) return;
    var sx = this.deltaXFrom(this._startLocationX);
    var sy = this.deltaYFrom(this._startLocationY);
    if (Math.abs(sx) > Math.abs(sy)) {
      if (Math.randomInt(6) <= 4) {
        this.moveStraight(sx > 0 ? 4 : 6);
        if (!this.isMovementSucceeded() && sy !== 0) {
          this.moveStraight(sy > 0 ? 8 : 2);
        }
      } else {
        this.moveRandom();
      }
    } else if (sy !== 0) {
      if (Math.randomInt(6) <= 4) {
        this.moveStraight(sy > 0 ? 8 : 2);
        if (!this.isMovementSucceeded() && sx !== 0) {
          this.moveStraight(sx > 0 ? 4 : 6);
        }
      } else {
        this.moveRandom();
      }
    }
    if (sx === 0 && sy === 0) {
      this._returnPhase = false;
      this._returnFrames = 0;
      this._direction = this._startLocationDir;
    }
};

//=============================================================================
// End of File
//=============================================================================
