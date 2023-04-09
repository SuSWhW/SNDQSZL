//=============================================================================
// BugFixSkillTypeDupe.js
//=============================================================================

/*:
 * @plugindesc fix the bug that the same skill type repeated display
 * @author Sasuke KANNAZUKI
 * 
 * @help This plugin does not provide plugin commands.
 * This plugin is under MIT license.
 */
/*:ja
 * @plugindesc 同じスキルタイプが複数回表示されるバグを解消します
 * @author 神無月サスケ
 * *
 * @help このプラグインにはプラグインコマンドはありません
 *
 * 例えば「魔法」スキルを持つアクターが「魔法」スキルを追加する装備をすると
 * 現状ではメニューやバトルでは「魔法」が複数回表示されていました。
 * このプラグインはこのバグを修正します。
 * 
 * このプラグインは MIT ライセンスにて公開されます。
 */
(function() {

  var _Window_SkillType_addCommand = Window_SkillType.prototype.addCommand;
  Window_SkillType.prototype.addCommand = function(name, symbol, enabled, ext) {
    for(var i = 0; i < this._list.length; i++){
      if (this._list[i].ext === ext) {
        return;
      }
    }
    _Window_SkillType_addCommand.call(this, name, symbol, enabled, ext);
  };

  var _Window_ActorCommand_addCommand = Window_ActorCommand.prototype.addCommand;
  Window_ActorCommand.prototype.addCommand = function(name, symbol, enabled, ext) {
    for(var i = 0; i < this._list.length; i++){
      if (this._list[i].ext === ext) {
        return;
      }
    }
    _Window_ActorCommand_addCommand.call(this, name, symbol, enabled, ext);
  };

})();
