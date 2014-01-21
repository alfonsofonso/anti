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
var my_media;


Audio = new  function()
{

    this.playAudio=function(url) {
        try {

            my_media = new Media(url,
                // success callback
                function () {
                    my_media.release();
                },
                // error callback
                function (err) {
                    my_media.release();
                });

            // Play audio
            my_media.play();
        } catch (e) {
            alert(e.message);
        }
    }



};
