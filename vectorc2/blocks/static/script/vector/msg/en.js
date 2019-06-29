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
'use strict';

Blockly.Msg["VECTOR_ROBOT_MESSAGE"] = "Use Vector %1 %2 of (optional) serial %3 %4";
Blockly.Msg["VECTOR_ROBOT_TOOLTIP"] = "Wrap all Vector calls around";
Blockly.Msg["VECTOR_ROBOT_VARIABLE_TITLE"] = "Use Vector";
Blockly.Msg["VECTOR_ROBOT_VARIABLE_TOOLTIP"] = "Add, remove, or reorder sections to reconfigure this if block.";  
Blockly.Msg["VECTOR_ROBOT_SERIAL_TITLE"] = "[vector]";
Blockly.Msg["VECTOR_ROBOT_SERIAL_TOOLTIP"] = "Add block to control which vector to use";  

Blockly.Msg["VECTOR_ROBOT_EX_OPT_MESSAGE"] = "Use Vector %1";
Blockly.Msg["VECTOR_ROBOT_EX_OPT_TOOLTIP"] = "Basic code wrapper; drop extensions from the left panel to enable more options";
Blockly.Msg["VECTOR_ROBOT_EX_VARIABLE_OPT_TITLE"] = "with vector robot variable";
Blockly.Msg["VECTOR_ROBOT_EX_VARIABLE_OPT_TOOLTIP"] = "Add to code wrapper to enable to define own Vector robot variable";  
Blockly.Msg["VECTOR_ROBOT_EX_SERIAL_OPT_TITLE"] = "with serial number";
Blockly.Msg["VECTOR_ROBOT_EX_SERIAL_OPT_TOOLTIP"] = "Add to code wrapper to enable to define a custom serial number";  
Blockly.Msg["VECTOR_ROBOT_EX_NAME_OPT_TITLE"] = "with Vector name for autodiscovery";
Blockly.Msg["VECTOR_ROBOT_EX_NAME_OPT_TOOLTIP"] = "Add to code wrapper to enable to define a custom name for autodiscovery";  

Blockly.Msg["VECTOR_ROBOT_EX_MESSAGE"] = "Use Vector %1 %2";
Blockly.Msg["VECTOR_ROBOT_EX_TOOLTIP"] = "Wrap all Vector calls around";
Blockly.Msg["VECTOR_ROBOT_EX_VARIABLE_TITLE"] = "as variable";
Blockly.Msg["VECTOR_ROBOT_EX_VARIABLE_TOOLTIP"] = "Add, remove, or reorder sections to reconfigure this if block.";  
Blockly.Msg["VECTOR_ROBOT_EX_SERIAL_TITLE"] = "with serial number";
Blockly.Msg["VECTOR_ROBOT_EX_SERIAL_TOOLTIP"] = "Add block to control which vector to use";  
Blockly.Msg["VECTOR_ROBOT_EX_NAME_TITLE"] = "with Vector name";
Blockly.Msg["VECTOR_ROBOT_EX_NAME_TOOLTIP"] = "Add block to control which vector to use";  

Blockly.Msg["VECTOR_UTILS_DISTANCE_MM_MESSAGE"] = "distance in mm %1";
Blockly.Msg["VECTOR_UTILS_DISTANCE_MM_TOOLTIP"] = "distance in millimeters";
Blockly.Msg["VECTOR_UTILS_SPEED_MMPS_MESSAGE"] = "speed in mm/s %1";
Blockly.Msg["VECTOR_UTILS_SPEED_MMPS_TOOLTIP"] = "speed in millimeters per second";
Blockly.Msg["VECTOR_UTILS_DEGREES_MESSAGE"] = "degrees %1";
Blockly.Msg["VECTOR_UTILS_DEGREES_TOOLTIP"] = "degrees";
Blockly.Msg["VECTOR_UTILS_SLEEP_MESSAGE"] = "Sleep for %1 seconds";
Blockly.Msg["VECTOR_UTILS_SLEEP_TOOLTIP"] = "Will sleep/wait for given amount seconds";
Blockly.Msg["VECTOR_CONST_MIN_HEAD_ANGLE_MESSAGE"] = "MIN_HEAD_ANGLE";
Blockly.Msg["VECTOR_CONST_MIN_HEAD_ANGLE_TOOLTIP"] = "The minimum angle the robot’s head can be set to.";
Blockly.Msg["VECTOR_CONST_MAX_HEAD_ANGLE_MESSAGE"] = "MAX_HEAD_ANGLE";
Blockly.Msg["VECTOR_CONST_MAX_HEAD_ANGLE_TOOLTIP"] = "The maximum angle the robot’s head can be set to";
Blockly.Msg["VECTOR_CONST_MAX_LIFT_HEIGHT_MESSAGE"] = "MAX_LIFT_HEIGHT";
Blockly.Msg["VECTOR_CONST_MAX_LIFT_HEIGHT_TOOLTIP"] = "The largest height-above-ground that lift can be moved to";
Blockly.Msg["VECTOR_CONST_MIN_LIFT_HEIGHT_MESSAGE"] = "MIN_LIFT_HEIGHT ";
Blockly.Msg["VECTOR_CONST_MIN_LIFT_HEIGHT_TOOLTIP"] = "The lowest height-above-ground that lift can be moved to";

Blockly.Msg["VECTOR_SAY_TEXT_MESSAGE"] = "Say: %1"; // with vector voice %3 %4 at relative speed %5";
Blockly.Msg["VECTOR_SAY_TEXT_TOOLTIP"] = "Vector will say something";
Blockly.Msg["VECTOR_SAY_TEXT_SIMPLE_MESSAGE"] = "Vector %1 say %2";
Blockly.Msg["VECTOR_SAY_TEXT_SIMPLE_TOOLTIP"] = "Vector will say something";
Blockly.Msg["VECTOR_SAY_TEXT_EX_MESSAGE"] = "Vector say %1";
Blockly.Msg["VECTOR_SAY_TEXT_EX_TOOLTIP"] = "Basic code wrapper; drop extensions from the left panel to enable more options";
Blockly.Msg["VECTOR_SAY_TEXT_EX_VOICE_OPT_PRE_TITLE"] = "with Vector voice"
Blockly.Msg["VECTOR_SAY_TEXT_EX_VOICE_OPT_TITLE"] = "with voice control"
Blockly.Msg["VECTOR_SAY_TEXT_EX_VOICE_OPT_TOOLTIP"] = "Add to code wrapper to enable to control vector voice"
Blockly.Msg["VECTOR_SAY_TEXT_EX_SPEED_OPT_PRE_TITLE"] = "at speed"
Blockly.Msg["VECTOR_SAY_TEXT_EX_SPEED_OPT_TITLE"] = "with speed control"
Blockly.Msg["VECTOR_SAY_TEXT_EX_SPEED_OPT_TOOLTIP"] = "Add to code wrapper to enable to control relative speed"


Blockly.Msg["VECTOR_BEHAVIOR_DRIVE_OFF_CHARGER_MESSAGE"] = "Drive off charger";
Blockly.Msg["VECTOR_BEHAVIOR_DRIVE_OFF_CHARGER_TOOLTIP"] = "Drive Vector off the charger";
Blockly.Msg["VECTOR_BEHAVIOR_DRIVE_ON_CHARGER_MESSAGE"] = "Drive on charger";
Blockly.Msg["VECTOR_BEHAVIOR_DRIVE_ON_CHARGER_TOOLTIP"] = "Drive Vector onto the charger";
Blockly.Msg["VECTOR_DOCK_WITH_CUBE_MESSAGE"] = "Dock with cube";
Blockly.Msg["VECTOR_DOCK_WITH_CUBE_TOOLTIP"] = "Tells Vector to dock with a light cube, optionally using a given approach angle and distance.";
Blockly.Msg["VECTOR_SET_EYE_COLOR_MESSAGE"] = "Set eye color to %1";
Blockly.Msg["VECTOR_SET_EYE_COLOR_TOOLTIP"] = "Set Vector’s eye color.";

Blockly.Msg["VECTOR_BEHAVIOR_DRIVE_STRAIGHT_MESSAGE"] = "Drive straight %1";
Blockly.Msg["VECTOR_BEHAVIOR_DRIVE_STRAIGHT_TOOLTIP"] = "Tells Vector to drive in a straight line.";
Blockly.Msg["VECTOR_BEHAVIOR_DRIVE_STRAIGHT_EX_MESSAGE"] = "Drive straight %1";
Blockly.Msg["VECTOR_BEHAVIOR_DRIVE_STRAIGHT_EX_TOOLTIP"] = "Tells Vector to drive in a straight line.";
Blockly.Msg["VECTOR_BEHAVIOR_DRIVE_STRAIGHT_EX_OPT_MESSAGE"] = "Drive straight %1";
Blockly.Msg["VECTOR_BEHAVIOR_DRIVE_STRAIGHT_EX_SPEED_OPT_POST_TITLE"] = "at the speed";
Blockly.Msg["VECTOR_BEHAVIOR_DRIVE_STRAIGHT_EX_SPEED_OPT_TITLE"] = "with speed control";
Blockly.Msg["VECTOR_BEHAVIOR_DRIVE_STRAIGHT_EX_SHOULD_PLAY_ANIM_OPT_PRE_TITLE"] = "with animation played";
Blockly.Msg["VECTOR_BEHAVIOR_DRIVE_STRAIGHT_EX_SHOULD_PLAY_ANIM_OPT_TITLE"] = "with control if animation is played";
Blockly.Msg["VECTOR_BEHAVIOR_DRIVE_STRAIGHT_EX_NUM_RETRIES_OPT_PRE_TITLE"] = "Repeat attempts";
Blockly.Msg["VECTOR_BEHAVIOR_DRIVE_STRAIGHT_EX_NUM_RETRIES_OPT_TITLE"] = "with attempt times control";

Blockly.Msg["VECTOR_BEHAVIOR_TURN_IN_PLACE_MESSAGE"] = "Rotate by %1";
Blockly.Msg["VECTOR_BEHAVIOR_TURN_IN_PLACE_TOOLTIP"] = "Turn the robot around its current position.";
Blockly.Msg["VECTOR_BEHAVIOR_TURN_IN_PLACE_EX_MESSAGE"] = "Rotate %1";
Blockly.Msg["VECTOR_BEHAVIOR_TURN_IN_PLACE_EX_TOOLTIP"] = "Turn the robot around its current position.";
Blockly.Msg["VECTOR_BEHAVIOR_TURN_IN_PLACE_EX_OPT_MESSAGE"] = "Rotate %1";
Blockly.Msg["VECTOR_BEHAVIOR_TURN_IN_PLACE_EX_SPEED_OPT_POST_TITLE"] = "with speed"; 
Blockly.Msg["VECTOR_BEHAVIOR_TURN_IN_PLACE_EX_SPEED_OPT_TITLE"] = "with speed control"; 
Blockly.Msg["VECTOR_BEHAVIOR_TURN_IN_PLACE_EX_ACCEL_OPT_POST_TITLE"] = "with acceleration";
Blockly.Msg["VECTOR_BEHAVIOR_TURN_IN_PLACE_EX_ACCEL_OPT_TITLE"] = "with acceleration control";
Blockly.Msg["VECTOR_BEHAVIOR_TURN_IN_PLACE_EX_ANGLE_TOLERANCE_OPT_POST_TITLE"] = "with angle tolerance";
Blockly.Msg["VECTOR_BEHAVIOR_TURN_IN_PLACE_EX_ANGLE_TOLERANCE_OPT_TITLE"] = "with angle tolerance control";
Blockly.Msg["VECTOR_BEHAVIOR_TURN_IN_PLACE_EX_IS_ABSOLUTE_OPT_PRE_TITLE"] = "with angle given as absolute";
Blockly.Msg["VECTOR_BEHAVIOR_TURN_IN_PLACE_EX_IS_ABSOLUTE_OPT_TITLE"] = "with control if angle given as absolute";
Blockly.Msg["VECTOR_BEHAVIOR_TURN_IN_PLACE_EX_NUM_RETRIES_OPT_PRE_TITLE"] = "Repeat attempts";
Blockly.Msg["VECTOR_BEHAVIOR_TURN_IN_PLACE_EX_NUM_RETRIES_OPT_TITLE"] = "with attempt times control";

Blockly.Msg["VECTOR_SET_EYE_COLOR_HUE_SATURATION_MESSAGE"] = "Set eye color with hue %1 saturation %2";
Blockly.Msg["VECTOR_SET_EYE_COLOR_HUE_SATURATION_TOOLTIP"] = "Set Vector’s eye color.";
Blockly.Msg["VECTOR_SET_HEAD_ANGLE_MESSAGE"] = "Set head angle to %1";
Blockly.Msg["VECTOR_SET_HEAD_ANGLE_TOOLTIP"] = "Tell Vector’s head to move to a given angle.";
Blockly.Msg["VECTOR_SET_LIFT_HEIGHT_MESSAGE"] = "Set lift height to %1";
Blockly.Msg["VECTOR_SET_LIFT_HEIGHT_TOOLTIP"] = "Tell Vector’s lift to move to a given height.";

Blockly.Msg["VECTOR_BEHAVIOR_DRIVE_OFF_CHARGER_EX_MESSAGE"] = "Drive off charger %1";
Blockly.Msg["VECTOR_BEHAVIOR_DRIVE_OFF_CHARGER_EX_TOOLTIP"] = "Drive Vector off the charger";
Blockly.Msg["VECTOR_BEHAVIOR_DRIVE_ON_CHARGER_EX_MESSAGE"] = "Drive on charger %1";
Blockly.Msg["VECTOR_BEHAVIOR_DRIVE_ON_CHARGER_EX_TOOLTIP"] = "Drive Vector onto the charger";
Blockly.Msg["VECTOR_DOCK_WITH_CUBE_EX_MESSAGE"] = "Dock with cube %1";
Blockly.Msg["VECTOR_DOCK_WITH_CUBE_EX_TOOLTIP"] = "Tells Vector to dock with a light cube, optionally using a given approach angle and distance.";
Blockly.Msg["VECTOR_SET_EYE_COLOR_EX_MESSAGE"] = "Set eye color %1";
Blockly.Msg["VECTOR_SET_EYE_COLOR_EX_TOOLTIP"] = "Set Vector’s eye color.";

Blockly.Msg["VECTOR_SET_EYE_COLOR_HUE_SATURATION_EX_MESSAGE"] = "Set eye color %1";
Blockly.Msg["VECTOR_SET_EYE_COLOR_HUE_SATURATION_EX_TOOLTIP"] = "Set Vector’s eye color.";
Blockly.Msg["VECTOR_SET_HEAD_ANGLE_EX_MESSAGE"] = "Set head angle %1";
Blockly.Msg["VECTOR_SET_HEAD_ANGLE_EX_TOOLTIP"] = "Tell Vector’s head to move to a given angle.";
Blockly.Msg["VECTOR_SET_LIFT_HEIGHT_EX_MESSAGE"] = "Set lift height %1";
Blockly.Msg["VECTOR_SET_LIFT_HEIGHT_EX_TOOLTIP"] = "Tell Vector’s lift to move to a given height.";

Blockly.Msg["VECTOR_PLAY_ANIMATION_MESSAGE"] = "Play animation ( %1 ) %2"; //repeat %3 %4 but ignore: %5 body movements %6 %7 head movements %8 %9 lift movements %10
Blockly.Msg["VECTOR_PLAY_ANIMATION_TOOLTIP"] = "Vector will play given animation or react to the trigger. Vector must be off of the charger to play an animation.";
Blockly.Msg["VECTOR_PLAY_ANIMATION_TYPE_NAME"] = "name"
Blockly.Msg["VECTOR_PLAY_ANIMATION_TYPE_TRIGGER"] = "trigger"
Blockly.Msg["VECTOR_PLAY_ANIMATION_EX_MESSAGE"] = "Play animation %1";
Blockly.Msg["VECTOR_PLAY_ANIMATION_EX_TOOLTIP"] = "Basic code wrapper; drop extensions from the left panel to enable more options";
Blockly.Msg["VECTOR_PLAY_ANIMATION_EX_LOOP_ANIMATION_OPT_PRE_TITLE"] = "repeat"
Blockly.Msg["VECTOR_PLAY_ANIMATION_EX_LOOP_ANIMATION_OPT_TITLE"] = "with repeat control"
Blockly.Msg["VECTOR_PLAY_ANIMATION_EX_LOOP_ANIMATION_OPT_TOOLTIP"] = "Add to code wrapper to enable to control how many times animation should be repeated"
Blockly.Msg["VECTOR_PLAY_ANIMATION_EX_IGNORE_BODY_TRACK_OPT_PRE_TITLE"] = "ignore body movements"
Blockly.Msg["VECTOR_PLAY_ANIMATION_EX_IGNORE_BODY_TRACK_OPT_TITLE"] = "with body movements control"
Blockly.Msg["VECTOR_PLAY_ANIMATION_EX_IGNORE_BODY_TRACK_OPT_TOOLTIP"] = "Add to code wrapper to enable to control if body movements should be ignored"
Blockly.Msg["VECTOR_PLAY_ANIMATION_EX_IGNORE_HEAD_TRACK_OPT_PRE_TITLE"] = "ignore head movements"
Blockly.Msg["VECTOR_PLAY_ANIMATION_EX_IGNORE_HEAD_TRACK_OPT_TITLE"] = "with head movements control"
Blockly.Msg["VECTOR_PLAY_ANIMATION_EX_IGNORE_HEAD_TRACK_OPT_TOOLTIP"] = "Add to code wrapper to enable to control if head movements should be ignored"
Blockly.Msg["VECTOR_PLAY_ANIMATION_EX_IGNORE_LIFT_TRACK_OPT_PRE_TITLE"] = "ignore lift movements"
Blockly.Msg["VECTOR_PLAY_ANIMATION_EX_IGNORE_LIFT_TRACK_OPT_TITLE"] = "with lift movements control"
Blockly.Msg["VECTOR_PLAY_ANIMATION_EX_IGNORE_LIFT_TRACK_OPT_TOOLTIP"] = "Add to code wrapper to enable to control if lift movements should be ignored"
Blockly.Msg["VECTOR_PLAY_ANIMATION_EX_USE_LIFT_SAFE_OPT_PRE_TITLE"] = "use lift safely"
Blockly.Msg["VECTOR_PLAY_ANIMATION_EX_USE_LIFT_SAFE_OPT_TITLE"] = "with lift safety control"
Blockly.Msg["VECTOR_PLAY_ANIMATION_EX_USE_LIFT_SAFE_OPT_TOOLTIP"] = "Add to code wrapper to enable to control if lift movements should be ignored in case Vector carries something"

Blockly.Msg["VECTOR_FIND_ANIMATION_MESSAGE"] = "Find animation %1 matching %2";
Blockly.Msg["VECTOR_FIND_ANIMATION_TOOLTIP"] = "Returns animation name or trigger that best matches given tags (or is randomly selected)";
Blockly.Msg["VECTOR_FIND_ANIMATION_TYPE_NAME"] = "name"
Blockly.Msg["VECTOR_FIND_ANIMATION_TYPE_TRIGGER"] = "trigger"
Blockly.Msg["VECTOR_FIND_ANIMATION_TYPE_BEST"] = "best"
Blockly.Msg["VECTOR_FIND_ANIMATION_TYPE_RANDOM"] = "randomly"
Blockly.Msg["VECTOR_FIND_ANIMATION_TYPE_WEIGHTED"] = "randomly (weighted)"

Blockly.Msg["VECTOR_PHOTOS_MESSAGE"] = "Set screen image %1 for %2 second(s) %3 and interrupt running any animations %4 %5 and fill screen with image %6"
Blockly.Msg["VECTOR_PHOTOS_TOOLTIP"] = "Display an image on Vector’s Screen (his 'face')."
Blockly.Msg["VECTOR_SELECT_PHOTO_MESSAGE"] = "pick a photo"
Blockly.Msg["VECTOR_SELECT_PHOTO_TOOLTIP"] = "Enables to pick photo from VectorC2 gallery"
