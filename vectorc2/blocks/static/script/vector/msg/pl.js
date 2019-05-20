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

Blockly.Msg["VECTOR_ROBOT_MESSAGE"] = "Używaj Vectora %1 %2 z (opcjonalnym) numerem seryjnym %3 %4";
Blockly.Msg["VECTOR_ROBOT_TOOLTIP"] = "Opakowuje wszystkie komendy dla Vectora";
Blockly.Msg["VECTOR_ROBOT_VARIABLE_TITLE"] = "Używaj Vectora";
Blockly.Msg["VECTOR_ROBOT_VARIABLE_TOOLTIP"] = "Add, remove, or reorder sections to reconfigure this if block.";  //TODO-i18n
Blockly.Msg["VECTOR_ROBOT_SERIAL_TITLE"] = "[vector]";
Blockly.Msg["VECTOR_ROBOT_SERIAL_TOOLTIP"] = "Add block to control which vector to use";  //TODO-i18n

Blockly.Msg["VECTOR_ROBOT_EX_OPT_MESSAGE"] = "Używaj Vectora %1";
Blockly.Msg["VECTOR_ROBOT_EX_OPT_TOOLTIP"] = "Podstawowe opakowanie kodu; przenieś elementy z lewego panelu żeby uaktywnić dodatkowe opcje";
Blockly.Msg["VECTOR_ROBOT_EX_VARIABLE_OPT_TITLE"] = "ze zmienną Vector robot";
Blockly.Msg["VECTOR_ROBOT_EX_VARIABLE_OPT_TOOLTIP"] = "Dodaj do opakowania kodu, aby umożliwić zdefiniowanie własnej zmiennej Vector robot";  
Blockly.Msg["VECTOR_ROBOT_EX_SERIAL_OPT_TITLE"] = "z numerem seryjnym";
Blockly.Msg["VECTOR_ROBOT_EX_SERIAL_OPT_TOOLTIP"] = "Dodaj do opakowania kodu, aby umożliwić zdefioniowane własnego numery seryjnego";  
Blockly.Msg["VECTOR_ROBOT_EX_NAME_OPT_TITLE"] = "z nazwą Vectora";
Blockly.Msg["VECTOR_ROBOT_EX_NAME_OPT_TOOLTIP"] = "Dodaj do opakowania kodu, aby umożliwić zdefioniowane własnej nazwy robota";  

Blockly.Msg["VECTOR_ROBOT_EX_MESSAGE"] = "Używaj Vectora %1 %2";
Blockly.Msg["VECTOR_ROBOT_EX_TOOLTIP"] = "Opakowuje wszystkie komendy dla Vectora";
Blockly.Msg["VECTOR_ROBOT_EX_VARIABLE_TITLE"] = "jako zmienną";
Blockly.Msg["VECTOR_ROBOT_EX_VARIABLE_TOOLTIP"] = "Dodaj żeby kontrolować zmienną reprezentująca robota";
Blockly.Msg["VECTOR_ROBOT_EX_SERIAL_TITLE"] = "z numerem seryjnym";
Blockly.Msg["VECTOR_ROBOT_EX_SERIAL_TOOLTIP"] = "Dodaj do podstawowego kodu możliwość kontroli numeru seryjnego";
Blockly.Msg["VECTOR_ROBOT_EX_NAME_TITLE"] = "z nazwą Vectlra";
Blockly.Msg["VECTOR_ROBOT_EX_NAME_TOOLTIP"] = "Dodaj do podstawowego kodu możliwość kontroli nazwy Vectora";

Blockly.Msg["VECTOR_SAY_TEXT_MESSAGE"] = "Powiedz: %1";
Blockly.Msg["VECTOR_SAY_TEXT_TOOLTIP"] = "Vector coś powie";
Blockly.Msg["VECTOR_SAY_TEXT_SIMPLE_MESSAGE"] = "Vector %1 powiedz %2";
Blockly.Msg["VECTOR_SAY_TEXT_SIMPLE_TOOLTIP"] = "Vector coś powie";
Blockly.Msg["VECTOR_SAY_TEXT_EX_MESSAGE"] = "Vector powiedz %1";
Blockly.Msg["VECTOR_SAY_TEXT_EX_TOOLTIP"] = "Basic code wrapper; drop extensions from the left panel to enable more options";
Blockly.Msg["VECTOR_SAY_TEXT_EX_VOICE_OPT_PRE_TITLE"] = "głosem Vectora"
Blockly.Msg["VECTOR_SAY_TEXT_EX_VOICE_OPT_TITLE"] = "z kontrolą głosu"
Blockly.Msg["VECTOR_SAY_TEXT_EX_VOICE_OPT_TOOLTIP"] = "Add to code wrapper to enable to control vector voice"
Blockly.Msg["VECTOR_SAY_TEXT_EX_SPEED_OPT_PRE_TITLE"] = "prędkością"
Blockly.Msg["VECTOR_SAY_TEXT_EX_SPEED_OPT_TITLE"] = "z kontrolą prędkości"
Blockly.Msg["VECTOR_SAY_TEXT_EX_SPEED_OPT_TOOLTIP"] = "Add to code wrapper to enable to control relative speed"

Blockly.Msg["VECTOR_UTILS_DISTANCE_MM_MESSAGE"] = "odległość w mm %1";
Blockly.Msg["VECTOR_UTILS_DISTANCE_MM_TOOLTIP"] = "odległość w milimetrach";
Blockly.Msg["VECTOR_UTILS_SPEED_MMPS_MESSAGE"] = "prędkość w mm/s %1";
Blockly.Msg["VECTOR_UTILS_SPEED_MMPS_TOOLTIP"] = "prędkość w milimetrach na sekundę";
Blockly.Msg["VECTOR_UTILS_DEGREES_MESSAGE"] = "kąt (stopnie) %1";
Blockly.Msg["VECTOR_UTILS_DEGREES_TOOLTIP"] = "kąt w stopniach";
Blockly.Msg["VECTOR_UTILS_SLEEP_MESSAGE"] = "Zatrzymaj przetwarzanie na %1 sekund";
Blockly.Msg["VECTOR_UTILS_SLEEP_TOOLTIP"] = "Zatrzyma wykonanie zadań na zadaną liczbę sekund";
Blockly.Msg["VECTOR_CONST_MIN_HEAD_ANGLE_MESSAGE"] = "MIN_HEAD_ANGLE";
Blockly.Msg["VECTOR_CONST_MIN_HEAD_ANGLE_TOOLTIP"] = "Minimalny kąt nachylenia głowy Vectora.";
Blockly.Msg["VECTOR_CONST_MAX_HEAD_ANGLE_MESSAGE"] = "MAX_HEAD_ANGLE";
Blockly.Msg["VECTOR_CONST_MAX_HEAD_ANGLE_TOOLTIP"] = "Maksymalny kąt nachylenia głowy Vectora.";
Blockly.Msg["VECTOR_CONST_MAX_LIFT_HEIGHT_MESSAGE"] = "MAX_LIFT_HEIGHT";
Blockly.Msg["VECTOR_CONST_MAX_LIFT_HEIGHT_TOOLTIP"] = "Największa wysokość na jaką Vector może podnieść ramiona.";
Blockly.Msg["VECTOR_CONST_MIN_LIFT_HEIGHT_MESSAGE"] = "MIN_LIFT_HEIGHT ";
Blockly.Msg["VECTOR_CONST_MIN_LIFT_HEIGHT_TOOLTIP"] = "Najniższa wysokość na jaką Vector może opuścić ramiona.";

Blockly.Msg["VECTOR_BEHAVIOR_DRIVE_OFF_CHARGER_MESSAGE"] = "Zjedź Vectorem z ładowarki";
Blockly.Msg["VECTOR_BEHAVIOR_DRIVE_OFF_CHARGER_TOOLTIP"] = "Vector zjedzie z ładowarki";
Blockly.Msg["VECTOR_BEHAVIOR_DRIVE_ON_CHARGER_MESSAGE"] = "Wjedź Vectorem na ładowarkę";
Blockly.Msg["VECTOR_BEHAVIOR_DRIVE_ON_CHARGER_TOOLTIP"] = "Vector wjeżdża na ładowarkę";
Blockly.Msg["VECTOR_DOCK_WITH_CUBE_MESSAGE"] = "Jedź z kostką do domu";
Blockly.Msg["VECTOR_DOCK_WITH_CUBE_TOOLTIP"] = "Vector pojedzie ze świecącą kostką do domu";
Blockly.Msg["VECTOR_SET_EYE_COLOR_MESSAGE"] = "Ustaw kolor oczu Vectora %1";
Blockly.Msg["VECTOR_SET_EYE_COLOR_TOOLTIP"] = "Ustawia kolor oczu wektora.";

Blockly.Msg["VECTOR_BEHAVIOR_DRIVE_STRAIGHT_MESSAGE"] = "Jedź prosto %1 ";
Blockly.Msg["VECTOR_BEHAVIOR_DRIVE_STRAIGHT_TOOLTIP"] = "Vector pojedzie w lini prostej.";
Blockly.Msg["VECTOR_BEHAVIOR_DRIVE_STRAIGHT_EX_MESSAGE"] = "Jedź prosto %1";
Blockly.Msg["VECTOR_BEHAVIOR_DRIVE_STRAIGHT_EX_TOOLTIP"] = "Vector pojedzie w lini prostej.";
Blockly.Msg["VECTOR_BEHAVIOR_DRIVE_STRAIGHT_EX_OPT_MESSAGE"] = "Jedź prosto %1";
Blockly.Msg["VECTOR_BEHAVIOR_DRIVE_STRAIGHT_EX_SPEED_OPT_POST_TITLE"] = "z prędkością";
Blockly.Msg["VECTOR_BEHAVIOR_DRIVE_STRAIGHT_EX_SPEED_OPT_TITLE"] = "kontroluj prędkość";
Blockly.Msg["VECTOR_BEHAVIOR_DRIVE_STRAIGHT_EX_SHOULD_PLAY_ANIM_OPT_PRE_TITLE"] = "i odgrywaj animację";
Blockly.Msg["VECTOR_BEHAVIOR_DRIVE_STRAIGHT_EX_SHOULD_PLAY_ANIM_OPT_TITLE"] = "kontroluj czy animacja jest odgrywana";
Blockly.Msg["VECTOR_BEHAVIOR_DRIVE_STRAIGHT_EX_NUM_RETRIES_OPT_PRE_TITLE"] = "Powtórz próby";
Blockly.Msg["VECTOR_BEHAVIOR_DRIVE_STRAIGHT_EX_NUM_RETRIES_OPT_TITLE"] = "kontroluj ilość prób";

Blockly.Msg["VECTOR_BEHAVIOR_TURN_IN_PLACE_MESSAGE"] = "Obróć się o %1";
Blockly.Msg["VECTOR_BEHAVIOR_TURN_IN_PLACE_TOOLTIP"] = "Obróci Vectora w miejscu";
Blockly.Msg["VECTOR_BEHAVIOR_TURN_IN_PLACE_EX_MESSAGE"] = "Obróć Vectora %1";
Blockly.Msg["VECTOR_BEHAVIOR_TURN_IN_PLACE_EX_TOOLTIP"] = "Obróci Vectora w miejscu";
Blockly.Msg["VECTOR_BEHAVIOR_TURN_IN_PLACE_EX_OPT_MESSAGE"] = "Obróć Vectora %1"; 
Blockly.Msg["VECTOR_BEHAVIOR_TURN_IN_PLACE_EX_SPEED_OPT_POST_TITLE"] = "z prędkością"; 
Blockly.Msg["VECTOR_BEHAVIOR_TURN_IN_PLACE_EX_SPEED_OPT_TITLE"] = "kontroluj prędkość"; 
Blockly.Msg["VECTOR_BEHAVIOR_TURN_IN_PLACE_EX_ACCEL_OPT_POST_TITLE"] = "z przyszpieszeniem";
Blockly.Msg["VECTOR_BEHAVIOR_TURN_IN_PLACE_EX_ACCEL_OPT_TITLE"] = "kontroluj przyspieszenie";
Blockly.Msg["VECTOR_BEHAVIOR_TURN_IN_PLACE_EX_ANGLE_TOLERANCE_OPT_POST_TITLE"] = "z toleracją zakończenia";
Blockly.Msg["VECTOR_BEHAVIOR_TURN_IN_PLACE_EX_ANGLE_TOLERANCE_OPT_TITLE"] = "ustal tolerancję zakończenia";
Blockly.Msg["VECTOR_BEHAVIOR_TURN_IN_PLACE_EX_IS_ABSOLUTE_OPT_PRE_TITLE"] = "z kątem absolutnym";
Blockly.Msg["VECTOR_BEHAVIOR_TURN_IN_PLACE_EX_IS_ABSOLUTE_OPT_TITLE"] = "podaj kąt absolutny";
Blockly.Msg["VECTOR_BEHAVIOR_TURN_IN_PLACE_EX_NUM_RETRIES_OPT_PRE_TITLE"] = "Powtórz próby";
Blockly.Msg["VECTOR_BEHAVIOR_TURN_IN_PLACE_EX_NUM_RETRIES_OPT_TITLE"] = "kontroluj ilość prób";

Blockly.Msg["VECTOR_SET_EYE_COLOR_HUE_SATURATION_MESSAGE"] = "Ustaw kolor oczu na %1 i nasycenie %2";
Blockly.Msg["VECTOR_SET_EYE_COLOR_HUE_SATURATION_TOOLTIP"] = "Ustawia kolor oczu wektora.";
Blockly.Msg["VECTOR_SET_HEAD_ANGLE_MESSAGE"] = "Obróć głowę do kąta %1";
Blockly.Msg["VECTOR_SET_HEAD_ANGLE_TOOLTIP"] = "Obraca głowę Vectora do podanego kąta.";
Blockly.Msg["VECTOR_SET_LIFT_HEIGHT_MESSAGE"] = "Podnieś ramiona na wysokość %1";
Blockly.Msg["VECTOR_SET_LIFT_HEIGHT_TOOLTIP"] = "Podnosi ramiona Vectora to podanej wysokości.";

Blockly.Msg["VECTOR_BEHAVIOR_DRIVE_OFF_CHARGER_EX_MESSAGE"] = "Zjedź Vectorem z ładowarki %1";
Blockly.Msg["VECTOR_BEHAVIOR_DRIVE_OFF_CHARGER_EX_TOOLTIP"] = "Vector zjedzie z ładowarki";
Blockly.Msg["VECTOR_BEHAVIOR_DRIVE_ON_CHARGER_EX_MESSAGE"] = "Wjedź Vectorem na ładowarkę %1";
Blockly.Msg["VECTOR_BEHAVIOR_DRIVE_ON_CHARGER_EX_TOOLTIP"] = "Vector wjeżdża na ładowarkę";
Blockly.Msg["VECTOR_DOCK_WITH_CUBE_EX_MESSAGE"] = "Jedź z kostką do domu %1";
Blockly.Msg["VECTOR_DOCK_WITH_CUBE_EX_TOOLTIP"] = "Vector pojedzie ze świecącą kostką do domu";
Blockly.Msg["VECTOR_SET_EYE_COLOR_EX_MESSAGE"] = "Ustaw kolor oczu Vectora %1";
Blockly.Msg["VECTOR_SET_EYE_COLOR_EX_TOOLTIP"] = "Ustawia kolor oczu wektora.";

Blockly.Msg["VECTOR_SET_EYE_COLOR_HUE_SATURATION_EX_MESSAGE"] = "Ustaw kolor oczu %1";
Blockly.Msg["VECTOR_SET_EYE_COLOR_HUE_SATURATION_EX_TOOLTIP"] = "Ustawia kolor oczu wektora.";
Blockly.Msg["VECTOR_SET_HEAD_ANGLE_EX_MESSAGE"] = "Obróć głowę %1";
Blockly.Msg["VECTOR_SET_HEAD_ANGLE_EX_TOOLTIP"] = "Obraca głowę Vectora do podanego kąta.";
Blockly.Msg["VECTOR_SET_LIFT_HEIGHT_EX_MESSAGE"] = "Podnieś ramiona %1";
Blockly.Msg["VECTOR_SET_LIFT_HEIGHT_EX_TOOLTIP"] = "Podnosi ramiona Vectora to podanej wysokości.";

Blockly.Msg["VECTOR_PLAY_ANIMATION_MESSAGE"] = "Animuj wg podanej %1 %2"; //repeat %3 %4 but ignore: %5 body movements %6 %7 head movements %8 %9 lift movements %10
Blockly.Msg["VECTOR_PLAY_ANIMATION_TOOLTIP"] = "Vector odegra animację o podanej nazwie lub odpowiadającą podanemu celowi. Vector musi być poza ładowarką żeby odegrać animację.";
Blockly.Msg["VECTOR_PLAY_ANIMATION_EX_MESSAGE"] = "Animuj %1";
Blockly.Msg["VECTOR_PLAY_ANIMATION_EX_TOOLTIP"] = "Podstawowy blok; dorzuć rozszerzenia z lewego panelu";
Blockly.Msg["VECTOR_PLAY_ANIMATION_EX_LOOP_ANIMATION_OPT_PRE_TITLE"] = "powtórz"
Blockly.Msg["VECTOR_PLAY_ANIMATION_EX_LOOP_ANIMATION_OPT_TITLE"] = "z kontrolą powtarzania"
Blockly.Msg["VECTOR_PLAY_ANIMATION_EX_LOOP_ANIMATION_OPT_TOOLTIP"] = "Dodaj do podstawowego kodu możliwość kontrolowania ilości powtórzeń animacji"
Blockly.Msg["VECTOR_PLAY_ANIMATION_EX_IGNORE_BODY_TRACK_OPT_PRE_TITLE"] = "ignoruj ruch korpusu"
Blockly.Msg["VECTOR_PLAY_ANIMATION_EX_IGNORE_BODY_TRACK_OPT_TITLE"] = "z kontrolą ruchu korpusu"
Blockly.Msg["VECTOR_PLAY_ANIMATION_EX_IGNORE_BODY_TRACK_OPT_TOOLTIP"] = "Dodaj do podstawowego kodu możliwość kontrolowania ruchów korpusu"
Blockly.Msg["VECTOR_PLAY_ANIMATION_EX_IGNORE_HEAD_TRACK_OPT_PRE_TITLE"] = "ignoruj ruch głową"
Blockly.Msg["VECTOR_PLAY_ANIMATION_EX_IGNORE_HEAD_TRACK_OPT_TITLE"] = "z kontrolą ruchu głową"
Blockly.Msg["VECTOR_PLAY_ANIMATION_EX_IGNORE_HEAD_TRACK_OPT_TOOLTIP"] = "Dodaj do podstawowego kodu możliwość kontrolowania ruchów głowy"
Blockly.Msg["VECTOR_PLAY_ANIMATION_EX_IGNORE_LIFT_TRACK_OPT_PRE_TITLE"] = "ignoruj ruch podnośnika"
Blockly.Msg["VECTOR_PLAY_ANIMATION_EX_IGNORE_LIFT_TRACK_OPT_TITLE"] = "z kontrolą ruchu podnośnika"
Blockly.Msg["VECTOR_PLAY_ANIMATION_EX_IGNORE_LIFT_TRACK_OPT_TOOLTIP"] = "Dodaj do podstawowego kodu możliwość kontrolowania ruchów podnośnika"
Blockly.Msg["VECTOR_PLAY_ANIMATION_EX_USE_LIFT_SAFE_OPT_PRE_TITLE"] = "zabezpieczaj ruchy podnośnika"
Blockly.Msg["VECTOR_PLAY_ANIMATION_EX_USE_LIFT_SAFE_OPT_TITLE"] = "z kontrolą bezpieczeństwa ruchów podnośnika"
Blockly.Msg["VECTOR_PLAY_ANIMATION_EX_USE_LIFT_SAFE_OPT_TOOLTIP"] = "Dodaj do podstawowego kodu możliwość kontrolowania zabezpieczeń ruchów podnośnika"
