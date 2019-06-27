/**
 *  Copyright 2019 Sebastian Ryszard Kruk <vectorc2@kruk.me>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 * 
 * @author vectorc2@kruk.me
 */
/**
 * Constants available in the system
 */
const consts = {
  matching: {
    BEST: gettext('the best matching'),
    RANDOM: gettext('radomly selected'),
    WEIGHTED: gettext('weighted randomly selected')
  },
  animation: {
    NAME: gettext('name'),
    TRIGGER: gettext('trigger')
  }
}

 /**
 * Class simulating Vector API in JavaScript for the purpose of running blockly algorithm tests in JavaScript 
 */
const Vectorex = (function(){
  'use strict';

  /**
   * Serial number for "fake" Vector calls
   */
  var __serial;
  /**
   * Delays execution by given number of milliseconds
   * @param {Number} ms 
   */  
  const __wait = ms => new Promise((r, j)=>setTimeout(r, ms))

  /**
   * Initializes Vectorex
   */
  function __init__(serial) {
    __serial = serial;

    if (serial) {
      let msg = gettext('Running Vector with serial number = %(serial)s'); 
      LogPanel.logError(interpolate(msg, {serial: __serial}, true));
    } else {
      LogPanel.logText(gettext('Running Vector'));
    }
  }

  // ------------------------------------------------------------------------------------------------
  // Implementation of fake Vector API
  // ------------------------------------------------------------------------------------------------

  /**
   * Wait given number of seconds
   * @param {Number} seconds 
   */
  function _wait(seconds) {
    var prom = __wait(2000)  // prom, is a promise
    let msg = gettext('Should have waited %(seconds)s'); 
    var showdone = ()=>LogPanel.logText(interpolate(msg, {seconds: seconds}, true))
    prom.then(showdone)
  } 

  function _driveOffCharger() {
    LogPanel.logText(gettext('Vector drives off charger'));
  }
  function _driveOnCharger() {
    LogPanel.logText(gettext('Vector drives on charger'));
  }
  function _driveStraight(distance, speed, should_play_anim, num_retries) {
    let msg = gettext('Vector drives %(distance)s at %(speed)s. (Plays animation: %(should_play_anim)s. Retries: %(num_retries)s)'); 
    LogPanel.logText(interpolate(msg, { distance:distance, 
                                         speed:speed, 
                                         should_play_anim:should_play_anim, 
                                         num_retries:num_retries }, true));
  }
  function _turnInPlace(angle, speed, accel, angle_tolerance, is_absolute, num_retries) {
    let msg = gettext('Vector rotates %(angle)s at speed %(speed)s with acceleration %(accel)s, at tolerance %(angle_tolerance)s. Angle is absolute: %(is_absolute)s. Retries:  %(num_retries)s'); 
    LogPanel.logText(interpolate(msg, { angle: angle, 
                                        speed: speed, 
                                        accel: accel, 
                                        angle_tolerance: angle_tolerance, 
                                        is_absolute: is_absolute, 
                                        num_retries: num_retries }, true));
  }
  function _setEyeColor(color) {
    let msg = gettext('Vector eyes color set to %(color)s'); 
    LogPanel.logTextWithStyle(interpolate(msg, { color: color }, true), `color: ${color}`);
  }
  function _setEyeColorHS(hue, saturation) {
    let msg = gettext('Vector eyes color set with hue=%(hue)s and saturation=%(saturation)s'); 
    LogPanel.logText(interpolate(msg, { hue: hue, saturation: saturation }, true));
  }
  function _dockWithCube() {
    LogPanel.logText(gettext('Vector will dock with cube'));
  }
  function _setHeadAngle(angle) {
    let msg = gettext('Vector will set head angle to %(angle)s'); 
    LogPanel.logText(interpolate(msg, { angle: angle }, true));
  }
  function _setLiftHeight(height) {
    let msg = gettext('Vector will lift to %(height)s'); 
    LogPanel.logText(interpolate(msg, { height: height }, true));
  }

  /**
   * 
   * @param {String} query_tags Coma or space sparated tags to search for animation (trigger) name
   * @param {Matching} dropdown_search_type Which way to select animation (trigger) when multiple found
   * @param {Boolean} is_trigger Should we look for an animation name or an animation trigger
   */
  function _findAnimation(query_tags, dropdown_search_type, is_trigger) {
    let msg = gettext('Found %(type)s following animation %(trigger)s for query "%(query)s": %(results)s');
    let result = (is_trigger) ? 'ReactToObstacle' : 'anim_weather_sunny_01';

    let params = {
      type: dropdown_search_type,
      trigger: (is_trigger) ? consts.animation.TRIGGER : consts.animation.NAME,
      query: query_tags,
      results: result
    }

    LogPanel.logText(interpolate(msg, params, true));

    return result;
  }
  /**
   * 
   * @param {String} anim name or trigger of the animation to play
   * @param {int} loop_count number of loops
   * @param {Boolean} ignore_body_track should we ignore body movement parts
   * @param {Boolean} ignore_head_track should we ignore head movement parts
   * @param {Boolean} ignore_lift_track should we ignore lift movement parts 
   * @param {Boolean} is_trigger is that a trigger animation 
   */
  function _playAnimation(is_trigger, anim, loop_count=1, ignore_body_track=false, ignore_head_track=false, ignore_lift_track=false, safe_lift=true) {
    let msg = gettext('Playing animation %(trigger)s "%(anim)s" %(loop_count)s time(s); ignoring body (%(body)s), head (%(head)s), and lift (%(lift)s%(safe)s).');
    let params = {
      trigger: (is_trigger) ? consts.animation.TRIGGER : consts.animation.NAME,
      anim: anim,
      loop_count: loop_count,
      body: ignore_body_track,
      head: ignore_head_track,
      lift: ignore_lift_track,
      safe: (is_trigger) ? `, ${safe_lift}` : ''
    };

    LogPanel.logText(interpolate(msg, params, true))
  }

  /**
   * Sets Vector screen image with given photo
   * @param {int} id Object with reference to photo id
   * @param {Sgring} label Object with photo label
   * @param {Number} duration For how long should we wait showing this image
   * @param {Boolean} interrupt Should other interactions be interrupted
   * @param {Boolean} fill Should photo fill the screen
   */
  function _setScreenImage(id, label, duration, interrupt, fill) {
    let msg = gettext('Showing given photo %(image)s at Vector for %(duration)s seconds; will allow to interrupt: %(interrupt)s, and photo will fill screen %(fill)');
    let params = {
      image: JSON.stringify({
        id: id,
        label: label
      }),
      duration: duration,
      interrupt: interrupt,
      fill: fill
    }
    LogPanel.logText(interpolate(msg, params, true));
  }


  /**
   * Implementation of the anki_vector.robot.say_text(text, use_vector_voice=True, duration_scalar=1.0)
   */
  function _sayText(text, use_vector_voice/*=True*/, duration_scalar/*=1.0*/) {
    if (use_vector_voice === false) {
      LogPanel.logError(text);
    } else {
      LogPanel.logText(text);
    }
  }

  // -----------------------------------

  /**
   * The fake  API
   */
  return {
    init: __init__,
    sayText: _sayText,
    wait: _wait,
    behavior: {
      driveOffCharger: _driveOffCharger,
      driveOnCharger: _driveOnCharger,
      driveStraight: _driveStraight,
      turnInPlace: _turnInPlace,
      setEyeColor: _setEyeColor,
      setEyeColorHS: _setEyeColorHS,
      dockWithCube: _dockWithCube,
      setHeadAngle: _setHeadAngle,
      setLiftHeight: _setLiftHeight,
      setScreenImage: _setScreenImage
    },
    anim: {
      findAnimation: _findAnimation,
      playAnimation: (...args) => _playAnimation(false, ...Object.values(args)),
      playAnimationTrigger:  (...args) => _playAnimation(true, ...Object.values(args))
    },
    const: {
      MIN_HEAD_ANGLE: -22.0,
      MAX_HEAD_ANGLE: 45.0,
      MAX_LIFT_HEIGHT: 1.0,
      MIN_LIFT_HEIGHT: 0.0
    }
  }
})();
