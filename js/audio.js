/**
 * Created with JetBrains WebStorm.
 * User: Jordi Borrell
 * Date: 18/09/13
 * Time: 12:45
 * To change this template use File | Settings | File Templates.
 *
 *
 * aplaudiment
 agafa_peca_roba
 arquet_ok
 bola_llenca
 fi_ko
 fi_ok
 ingredient_ok
 lletra
 mec
 minimec
 peca_ok
 personatge_ok
 rebot_amb_paret
 salt
 tira_linia
 touch
 */

var piloteja=true;
Audio = new  function()
{
    this.sonaaplaudiment =function ()
    {
        createjs.Sound.play('aplaudiment', createjs.Sound.INTERRUPT_EARLY, 0, 0, false, 1);
    };

    this.sonaagafa_peca_roba =function ()
    {
        createjs.Sound.play('agafa_peca_roba', createjs.Sound.INTERRUPT_EARLY, 0, 0, false, 1);
    };

    this.sonaarquet_ok =function ()
    {
        createjs.Sound.play('arquet_ok', createjs.Sound.INTERRUPT_EARLY, Math.random()*200, 0, false, 1);
    };

    this.sonabola_llenca =function ()
    {
        createjs.Sound.play('bola_llenca', createjs.Sound.INTERRUPT_EARLY, 0, 0, false, 1);
    };

    this.sonafi_ko =function ()
    {
        createjs.Sound.play('fi_ko', createjs.Sound.INTERRUPT_EARLY, 0, 0, false, 1);
    };

    this.sonafi_ok =function ()
    {
        createjs.Sound.play('fi_ok', createjs.Sound.INTERRUPT_EARLY, 0, 0, false, 1);
    };

    this.sonaingredient_ok =function ()
    {
        createjs.Sound.play('ingredient_ok', createjs.Sound.INTERRUPT_EARLY, 0, 0, false, 1);
    };

    this.sonalletra =function ()
    {
        createjs.Sound.play('lletra', createjs.Sound.INTERRUPT_EARLY, 0, 0, false, 1);
    };

    this.sonamec =function ()
    {
        createjs.Sound.play('mec', createjs.Sound.INTERRUPT_EARLY, 0, 0, false, 1);
    };

    this.sonaminimec =function ()
    {
        createjs.Sound.play('minimec', createjs.Sound.INTERRUPT_EARLY, 0, 0, false, 1);
    };

    this.sonapeca_ok =function ()
    {
        createjs.Sound.play('peca_ok', createjs.Sound.INTERRUPT_EARLY, 0, 0, false, 1);
    };

    this.sonapersonatge_ok =function ()
    {
        createjs.Sound.play('personatge_ok', createjs.Sound.INTERRUPT_EARLY, 0, 0, false, 1);
    };

    this.sonarebot_amb_paret =function ()
    {
        createjs.Sound.play('rebot_amb_paret', createjs.Sound.INTERRUPT_EARLY, 0, 0, false, 1);
    };

    this.sonasalt =function ()
    {
        createjs.Sound.play('salt', createjs.Sound.INTERRUPT_EARLY, 0, 0, false, 1);
    };

    this.sonatira_linia =function ()
    {
        createjs.Sound.play('tira_linia', createjs.Sound.INTERRUPT_EARLY, 0, 0, false, 1);
    };

    this.sonatouch =function ()
    {
        createjs.Sound.play('touch', createjs.Sound.INTERRUPT_EARLY, 0, 0, false, 1);
    };


};
